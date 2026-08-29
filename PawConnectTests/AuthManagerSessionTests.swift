//
//  AuthManagerSessionTests.swift
//  PawConnectTests
//
//  Session-gating behavior of AuthManager.apply — regression coverage for
//  the emitLocalSessionAsInitialSession opt-in (expired sessions must not
//  authenticate). Uses the shared singleton; each test sets state explicitly
//  and finishes signed out so tests stay order-independent.
//

import Foundation
import Testing
@testable import PawConnect

@Suite(.serialized) struct AuthManagerSessionTests {
    private let keychainKey = "auth.accessToken"

    @Test func validSessionAuthenticatesAndStoresToken() {
        let userID = UUID()
        AuthManager.shared.apply(session: Fixtures.session(expired: false, userID: userID))
        #expect(AuthManager.shared.isAuthenticated)
        #expect(AuthManager.shared.userID == userID)
        #expect(AuthManager.shared.userEmail == "probe@example.com")
        #expect(KeychainHelper.readString(keychainKey) == "test-access-token")
        AuthManager.shared.apply(session: nil)
    }

    @Test func expiredSessionStaysSignedOut() {
        AuthManager.shared.apply(session: nil)
        AuthManager.shared.apply(session: Fixtures.session(expired: true))
        #expect(!AuthManager.shared.isAuthenticated)
        #expect(AuthManager.shared.userID == nil)
        #expect(AuthManager.shared.userEmail == nil)
        #expect(KeychainHelper.readString(keychainKey) == nil)
    }

    @Test func nilSessionClearsStateAndKeychain() {
        AuthManager.shared.apply(session: Fixtures.session(expired: false))
        AuthManager.shared.apply(session: nil)
        #expect(!AuthManager.shared.isAuthenticated)
        #expect(AuthManager.shared.userID == nil)
        #expect(AuthManager.shared.userEmail == nil)
        #expect(KeychainHelper.readString(keychainKey) == nil)
    }
}
