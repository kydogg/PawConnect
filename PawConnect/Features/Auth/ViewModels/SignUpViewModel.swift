//
//  SignUpViewModel.swift
//  PawConnect
//
//  Created by Kyle Baker on 1/11/26.
//

import Foundation
import Supabase

@Observable
class SignUpViewModel {
    // MARK: - Form State
    var fullName = ""
    var email = ""
    var password = ""
    var showPassword = false

    // MARK: - UI State
    var isLoading = false
    var error: AppError?

    // MARK: - Validation

    var isFullNameValid: Bool {
        fullName.trimmingCharacters(in: .whitespaces).count >= 2
    }

    var isEmailValid: Bool {
        let emailRegex = #"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"#
        return email.range(of: emailRegex, options: .regularExpression) != nil
    }

    var hasMinLength: Bool {
        password.count >= Constants.Validation.minPasswordLength
    }

    var hasNumber: Bool {
        password.range(of: #"\d"#, options: .regularExpression) != nil
    }

    var isPasswordValid: Bool {
        hasMinLength && hasNumber
    }

    var isFormValid: Bool {
        isFullNameValid && isEmailValid && isPasswordValid
    }

    // MARK: - Error Messages

    var fullNameError: String? {
        guard !fullName.isEmpty else { return nil }
        return isFullNameValid ? nil : "Name must be at least 2 characters"
    }

    var emailError: String? {
        guard !email.isEmpty else { return nil }
        return isEmailValid ? nil : "Please enter a valid email"
    }

    // MARK: - Actions

    func signUp() async {
        guard isFormValid else { return }

        isLoading = true
        error = nil

        do {
            try await AuthManager.shared.signUp(
                email: email.trimmingCharacters(in: .whitespaces),
                password: password,
                fullName: fullName.trimmingCharacters(in: .whitespaces)
            )
            // Success - navigation is driven by the auth state change
        } catch let appError as AppError {
            self.error = appError
        } catch let authError as AuthError {
            switch authError.errorCode {
            case .userAlreadyExists, .emailExists:
                self.error = .auth(message: "An account with this email already exists")
            case .weakPassword:
                self.error = .auth(message: "Password does not meet requirements")
            case .overRequestRateLimit:
                self.error = .auth(message: "Too many attempts. Please try again later.")
            default:
                self.error = .auth(message: authError.localizedDescription)
            }
        } catch {
            self.error = .network(underlying: error)
        }

        isLoading = false
    }

    func signUpWithApple() async {
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
