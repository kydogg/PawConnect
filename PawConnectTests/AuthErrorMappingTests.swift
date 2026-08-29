//
//  AuthErrorMappingTests.swift
//  PawConnectTests
//

import Foundation
import Testing
import Supabase
@testable import PawConnect

@Suite struct AuthErrorMappingTests {
    private func copy(_ code: ErrorCode, flow: AuthFlow) -> String? {
        AuthErrorMapping.appError(from: Fixtures.authError(code), flow: flow).errorDescription
    }

    @Test func signUpCodesMapToSpecCopy() {
        #expect(copy(.userAlreadyExists, flow: .signUp) == "An account with this email already exists")
        #expect(copy(.emailExists, flow: .signUp) == "An account with this email already exists")
        #expect(copy(.weakPassword, flow: .signUp) == "Password does not meet requirements")
    }

    @Test func signInCodesMapToSpecCopy() {
        #expect(copy(.invalidCredentials, flow: .signIn) == "Invalid email or password. Please try again.")
    }

    @Test func rateLimitCopyIsSharedAcrossFlows() {
        let expected = "Too many attempts. Please try again later."
        #expect(copy(.overRequestRateLimit, flow: .signUp) == expected)
        #expect(copy(.overRequestRateLimit, flow: .signIn) == expected)
    }

    @Test func flowSpecificCodesDoNotLeakAcrossFlows() {
        // signIn's invalid-credentials copy must not fire for signUp and vice versa.
        #expect(copy(.invalidCredentials, flow: .signUp) != "Invalid email or password. Please try again.")
        #expect(copy(.emailExists, flow: .signIn) != "An account with this email already exists")
    }

    @Test func appErrorPassesThroughUnchanged() {
        let original = AppError.validation(field: "email", message: "custom")
        let mapped = AuthErrorMapping.appError(from: original, flow: .signIn)
        #expect(mapped.errorDescription == "custom")
    }

    @Test func unknownErrorsBecomeNetwork() {
        let mapped = AuthErrorMapping.appError(from: URLError(.badServerResponse), flow: .signUp)
        guard case .network = mapped else {
            Issue.record("expected .network, got \(mapped)")
            return
        }
    }
}
