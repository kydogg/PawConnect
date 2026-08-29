//
//  Route.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//
//  Typed navigation destinations, grouped by flow. Use these with a
//  NavigationStack path (see Router) instead of stringly-typed navigation.
//

import Foundation

/// Authentication flow (AUTH-01 … AUTH-04b).
enum AuthRoute: Hashable {
    case welcome
    case signUp
    case signIn
    case forgotPassword
    case forgotPasswordSuccess
}

/// Onboarding flow (AUTH-05 … AUTH-14).
enum OnboardingRoute: Hashable {
    case roleSelection

    // Owner path
    case ownerLocation
    case ownerAddPet
    case ownerPetCareDetails

    // Sitter path
    case sitterServiceArea
    case sitterServices
    case sitterAvailability
    case sitterRates
    case sitterBioPhoto

    case success
}

/// Top-level destinations once authenticated.
enum AppRoute: Hashable {
    case home
    case search
    case bookings
    case messages
    case profile
}
