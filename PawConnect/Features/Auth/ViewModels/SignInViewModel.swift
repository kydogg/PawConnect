//
//  SignInViewModel.swift
//  PawConnect
//
//  Created by Kyle Baker on 1/11/26.
//

import Foundation

@Observable
class SignInViewModel {
    // MARK: - Form State
    var email = ""
    var password = ""
    var showPassword = false

    // MARK: - UI State
    var isLoading = false
    var error: AppError?

    // MARK: - Validation

    var isEmailValid: Bool {
        !email.trimmingCharacters(in: .whitespaces).isEmpty
    }

    var isPasswordValid: Bool {
        !password.isEmpty
    }

    var isFormValid: Bool {
        isEmailValid && isPasswordValid
    }

    // MARK: - Actions

    func signIn() async {
        guard isFormValid else { return }

        isLoading = true
        error = nil

        do {
            // TODO: Implement actual Supabase sign in
            // try await AuthService.shared.signIn(
            //     email: email,
            //     password: password
            // )

            // Simulate network delay for now
            try await Task.sleep(for: .seconds(1.5))

            // Success - navigation will be handled by auth state change
        } catch let appError as AppError {
            self.error = appError
        } catch {
            self.error = .auth(message: "Invalid email or password")
        }

        isLoading = false
    }

    func signInWithApple() async {
        isLoading = true
        error = nil

        do {
            // TODO: Implement Apple Sign In
            // try await AuthService.shared.signInWithApple()

            // Simulate network delay for now
            try await Task.sleep(for: .seconds(1.5))
        } catch let appError as AppError {
            self.error = appError
        } catch {
            self.error = .network(underlying: error)
        }

        isLoading = false
    }

    func clearError() {
        error = nil
    }
}
