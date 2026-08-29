//
//  TestFixtures.swift
//  PawConnectTests
//
//  Shared mocks and builders for auth-related tests.
//

import Foundation
import Supabase
@testable import PawConnect

/// AuthProviding mock: records calls, throws whatever `nextError` holds.
final class MockAuth: AuthProviding {
    var nextError: (any Error)?
    private(set) var signInCalls: [(email: String, password: String)] = []
    private(set) var signUpCalls: [(email: String, password: String, fullName: String)] = []
    private(set) var signOutCallCount = 0

    func signIn(email: String, password: String) async throws {
        signInCalls.append((email, password))
        if let nextError { throw nextError }
    }

    func signUp(email: String, password: String, fullName: String) async throws {
        signUpCalls.append((email, password, fullName))
        if let nextError { throw nextError }
    }

    func signOut() async throws {
        signOutCallCount += 1
        if let nextError { throw nextError }
    }
}

enum Fixtures {
    static func authError(_ code: ErrorCode, message: String = "test error") -> AuthError {
        .api(
            message: message,
            errorCode: code,
            underlyingData: Data(),
            underlyingResponse: HTTPURLResponse(
                url: URL(string: "https://example.supabase.co/auth/v1")!,
                statusCode: 400,
                httpVersion: nil,
                headerFields: nil
            )!
        )
    }

    static func session(expired: Bool, userID: UUID = UUID(), email: String = "probe@example.com") -> Session {
        let expiresAt = expired
            ? Date().addingTimeInterval(-3600).timeIntervalSince1970
            : Date().addingTimeInterval(3600).timeIntervalSince1970
        return Session(
            accessToken: "test-access-token",
            tokenType: "bearer",
            expiresIn: 3600,
            expiresAt: expiresAt,
            refreshToken: "test-refresh-token",
            user: User(
                id: userID,
                appMetadata: [:],
                userMetadata: [:],
                aud: "authenticated",
                email: email,
                createdAt: Date(),
                updatedAt: Date()
            )
        )
    }
}
