//
//  AuthManager.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//
//  Observable source of truth for auth state. Mirrors the Supabase session
//  into UI-facing properties and persists the access token in the Keychain.
//

import Foundation
import Supabase

@Observable
final class AuthManager {
    static let shared = AuthManager()

    private enum Keys {
        static let accessToken = "auth.accessToken"
    }

    private(set) var isAuthenticated = false
    private(set) var userID: UUID?
    private(set) var userEmail: String?

    private var observationTask: Task<Void, Never>?

    private init() {}

    /// Begin observing Supabase auth state. Call once at launch.
    func start() {
        guard observationTask == nil else { return }
        observationTask = Task { [weak self] in
            let stream = SupabaseClient.shared.client.auth.authStateChanges
            for await state in stream {
                self?.apply(session: state.session)
            }
        }
    }

    func signIn(email: String, password: String) async throws {
        _ = try await SupabaseClient.shared.client.auth.signIn(email: email, password: password)
    }

    /// The profiles row is created server-side by the on_auth_user_created
    /// trigger, which reads full_name from the signup metadata.
    func signUp(email: String, password: String, fullName: String) async throws {
        _ = try await SupabaseClient.shared.client.auth.signUp(
            email: email,
            password: password,
            data: ["full_name": .string(fullName)]
        )
    }

    func signOut() async throws {
        try await SupabaseClient.shared.client.auth.signOut()
    }

    private func apply(session: Session?) {
        // emitLocalSessionAsInitialSession delivers the stored session even
        // when expired; stay signed out until autoRefreshToken emits a valid one.
        if let session, !session.isExpired {
            isAuthenticated = true
            userID = session.user.id
            userEmail = session.user.email
            KeychainHelper.save(session.accessToken, for: Keys.accessToken)
        } else {
            isAuthenticated = false
            userID = nil
            userEmail = nil
            KeychainHelper.delete(Keys.accessToken)
        }
    }
}
