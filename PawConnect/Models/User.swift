//
//  User.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//
//  Mirrors public.profiles (supabase/migrations/0001_initial_schema.sql).
//

import Foundation

/// SQL: user_role ENUM ('owner', 'sitter', 'both').
enum UserRole: String, Codable, Hashable, CaseIterable {
    case owner
    case sitter
    case both
}

struct User: Codable, Identifiable, Hashable {
    let id: UUID
    var email: String
    var fullName: String
    var phone: String?
    var avatarURL: String?
    var role: UserRole

    // Location
    var address: String?
    var city: String?
    var state: String?
    var zipCode: String?
    var latitude: Double?
    var longitude: Double?

    var hasCompletedOnboarding: Bool

    let createdAt: Date
    var updatedAt: Date

    enum CodingKeys: String, CodingKey {
        case id
        case email
        case fullName = "full_name"
        case phone
        case avatarURL = "avatar_url"
        case role
        case address
        case city
        case state
        case zipCode = "zip_code"
        case latitude
        case longitude
        case hasCompletedOnboarding = "has_completed_onboarding"
        case createdAt = "created_at"
        case updatedAt = "updated_at"
    }
}
