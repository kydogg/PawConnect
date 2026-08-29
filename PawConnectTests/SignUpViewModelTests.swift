//
//  SignUpViewModelTests.swift
//  PawConnectTests
//

import Foundation
import Testing
@testable import PawConnect

@Suite struct SignUpValidationTests {
    @Test func fullNameRequiresTwoTrimmedCharacters() {
        let vm = SignUpViewModel()
        vm.fullName = "A"
        #expect(!vm.isFullNameValid)
        vm.fullName = "  A  "
        #expect(!vm.isFullNameValid)
        vm.fullName = "Al"
        #expect(vm.isFullNameValid)
    }

    @Test func emailRegexAcceptsValidAndRejectsInvalid() {
        let vm = SignUpViewModel()
        vm.email = "kyle@example.com"
        #expect(vm.isEmailValid)
        for bad in ["", "kyle", "kyle@", "kyle@example", "@example.com", "kyle@example.com "] {
            vm.email = bad
            #expect(!vm.isEmailValid, "expected invalid: \(bad)")
        }
    }

    @Test func passwordBoundaryIsEightCharactersWithNumber() {
        let vm = SignUpViewModel()
        vm.password = "abcdef1"          // 7 chars
        #expect(!vm.hasMinLength && vm.hasNumber && !vm.isPasswordValid)
        vm.password = "abcdefg1"         // 8 chars + digit
        #expect(vm.hasMinLength && vm.hasNumber && vm.isPasswordValid)
        vm.password = "abcdefgh"         // 8 chars, no digit
        #expect(vm.hasMinLength && !vm.hasNumber && !vm.isPasswordValid)
    }

    @Test func formIsValidOnlyWhenAllPartsAre() {
        let vm = SignUpViewModel()
        vm.fullName = "Kyle Baker"
        vm.email = "kyle@example.com"
        vm.password = "password1"
        #expect(vm.isFormValid)
        vm.email = "not-an-email"
        #expect(!vm.isFormValid)
    }

    @Test func inlineErrorsAppearOnlyForNonEmptyInvalidInput() {
        let vm = SignUpViewModel()
        #expect(vm.fullNameError == nil && vm.emailError == nil)
        vm.fullName = "A"
        vm.email = "nope"
        #expect(vm.fullNameError == "Name must be at least 2 characters")
        #expect(vm.emailError == "Please enter a valid email")
        vm.fullName = "Kyle"
        vm.email = "kyle@example.com"
        #expect(vm.fullNameError == nil && vm.emailError == nil)
    }
}

@Suite struct SignUpActionTests {
    private func makeValidVM(auth: MockAuth) -> SignUpViewModel {
        let vm = SignUpViewModel(auth: auth)
        vm.fullName = "  Kyle Baker  "   // name is trimmed for validity + submission
        vm.email = "kyle@example.com"    // the email regex itself rejects whitespace
        vm.password = "password1"
        return vm
    }

    @Test func invalidFormIsANoOp() async {
        let auth = MockAuth()
        let vm = SignUpViewModel(auth: auth)
        await vm.signUp()
        #expect(auth.signUpCalls.isEmpty)
        #expect(!vm.isLoading && vm.error == nil)
    }

    @Test func successTrimsInputsAndClearsLoading() async {
        let auth = MockAuth()
        let vm = makeValidVM(auth: auth)
        await vm.signUp()
        #expect(auth.signUpCalls.count == 1)
        #expect(auth.signUpCalls.first?.fullName == "Kyle Baker")
        #expect(vm.error == nil && !vm.isLoading)
    }

    @Test func emailExistsMapsToSpecCopy() async {
        let auth = MockAuth()
        auth.nextError = Fixtures.authError(.emailExists)
        let vm = makeValidVM(auth: auth)
        await vm.signUp()
        #expect(vm.error?.errorDescription == "An account with this email already exists")
        #expect(!vm.isLoading)
    }

    @Test func weakPasswordMapsToSpecCopy() async {
        let auth = MockAuth()
        auth.nextError = Fixtures.authError(.weakPassword)
        let vm = makeValidVM(auth: auth)
        await vm.signUp()
        #expect(vm.error?.errorDescription == "Password does not meet requirements")
    }

    @Test func rateLimitMapsToSpecCopy() async {
        let auth = MockAuth()
        auth.nextError = Fixtures.authError(.overRequestRateLimit)
        let vm = makeValidVM(auth: auth)
        await vm.signUp()
        #expect(vm.error?.errorDescription == "Too many attempts. Please try again later.")
    }

    @Test func nonAuthErrorMapsToNetwork() async {
        let auth = MockAuth()
        auth.nextError = URLError(.notConnectedToInternet)
        let vm = makeValidVM(auth: auth)
        await vm.signUp()
        guard case .network = vm.error else {
            Issue.record("expected .network, got \(String(describing: vm.error))")
            return
        }
    }

    @Test func clearErrorResetsError() async {
        let auth = MockAuth()
        auth.nextError = Fixtures.authError(.emailExists)
        let vm = makeValidVM(auth: auth)
        await vm.signUp()
        #expect(vm.error != nil)
        vm.clearError()
        #expect(vm.error == nil)
    }
}
