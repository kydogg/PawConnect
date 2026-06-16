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
    var isLoading = false
    var error: AppError?

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

    func signIn(email: String, password: String) async {
        await perform {
            _ = try await SupabaseClient.shared.client.auth.signIn(email: email, password: password)
        }
    }

    func signUp(email: String, password: String) async {
        await perform {
            _ = try await SupabaseClient.shared.client.auth.signUp(email: email, password: password)
        }
    }

    func signOut() async {
        await perform {
            try await SupabaseClient.shared.client.auth.signOut()
        }
    }

    // MARK: - Private

    private func perform(_ action: @escaping () async throws -> Void) async {
        isLoading = true
        error = nil
        do {
            try await action()
        } catch {
            self.error = .auth(message: error.localizedDescription)
        }
        isLoading = false
    }

    private func apply(session: Session?) {
        if let session {
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
