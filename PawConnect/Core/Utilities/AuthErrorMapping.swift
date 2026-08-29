//
//  AuthErrorMapping.swift
//  PawConnect
//
//  Single home for the AuthError → user-facing copy mapping the auth
//  ViewModels share. The spec'd copy lives in PRODUCT_SPEC AUTH-02/03.
//

import Foundation
import Supabase

/// Which auth flow produced the error — some copy differs per flow.
enum AuthFlow {
    case signUp
    case signIn
}

enum AuthErrorMapping {
    /// Maps any error thrown by an auth action to the spec'd AppError.
    static func appError(from error: any Error, flow: AuthFlow) -> AppError {
        if let appError = error as? AppError {
            return appError
        }
        guard let authError = error as? AuthError else {
            return .network(underlying: error)
        }
        switch (flow, authError.errorCode) {
        case (.signUp, .userAlreadyExists), (.signUp, .emailExists):
            return .auth(message: "An account with this email already exists")
        case (.signUp, .weakPassword):
            return .auth(message: "Password does not meet requirements")
        case (.signIn, .invalidCredentials):
            return .auth(message: "Invalid email or password. Please try again.")
        case (_, .overRequestRateLimit):
            return .auth(message: "Too many attempts. Please try again later.")
        default:
            return .auth(message: authError.localizedDescription)
        }
    }
}
