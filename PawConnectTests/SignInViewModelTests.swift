//
//  SignInViewModelTests.swift
//  PawConnectTests
//

import Foundation
import Testing
@testable import PawConnect

@Suite struct SignInViewModelTests {
    @Test func formValidityRequiresBothFields() {
        let vm = SignInViewModel()
        #expect(!vm.isFormValid)
        vm.email = "kyle@example.com"
        #expect(!vm.isFormValid)
        vm.password = "x"
        #expect(vm.isFormValid)
        vm.email = "   "
        #expect(!vm.isFormValid)
    }

    @Test func invalidFormIsANoOp() async {
        let auth = MockAuth()
        let vm = SignInViewModel(auth: auth)
        await vm.signIn()
        #expect(auth.signInCalls.isEmpty)
        #expect(!vm.isLoading && vm.error == nil)
    }

    @Test func successTrimsEmailAndClearsLoading() async {
        let auth = MockAuth()
        let vm = SignInViewModel(auth: auth)
        vm.email = " kyle@example.com "
        vm.password = "password1"
        await vm.signIn()
        #expect(auth.signInCalls.first?.email == "kyle@example.com")
        #expect(vm.error == nil && !vm.isLoading)
    }

    @Test func invalidCredentialsShowsSpecCopyAndClearsFields() async {
        let auth = MockAuth()
        auth.nextError = Fixtures.authError(.invalidCredentials)
        let vm = SignInViewModel(auth: auth)
        vm.email = "kyle@example.com"
        vm.password = "wrong"
        await vm.signIn()
        #expect(vm.error?.errorDescription == "Invalid email or password. Please try again.")
        #expect(vm.email.isEmpty && vm.password.isEmpty)
        #expect(!vm.isLoading)
    }

    @Test func rateLimitKeepsFieldsAndShowsSpecCopy() async {
        let auth = MockAuth()
        auth.nextError = Fixtures.authError(.overRequestRateLimit)
        let vm = SignInViewModel(auth: auth)
        vm.email = "kyle@example.com"
        vm.password = "password1"
        await vm.signIn()
        #expect(vm.error?.errorDescription == "Too many attempts. Please try again later.")
        #expect(vm.email == "kyle@example.com" && vm.password == "password1")
    }

    @Test func nonAuthErrorMapsToNetwork() async {
        let auth = MockAuth()
        auth.nextError = URLError(.timedOut)
        let vm = SignInViewModel(auth: auth)
        vm.email = "kyle@example.com"
        vm.password = "password1"
        await vm.signIn()
        guard case .network = vm.error else {
            Issue.record("expected .network, got \(String(describing: vm.error))")
            return
        }
    }
}
