//
//  Sitter.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//
//  Mirrors public.sitter_profiles (supabase/migrations/0001_initial_schema.sql).
//

import Foundation

struct Sitter: Codable, Identifiable, Hashable {
    let id: UUID
    var userID: UUID
    var bio: String
    var serviceRadiusMiles: Int

    /// JSONB — { "walking": true, "sitting": false, ... }.
    var servicesOffered: [String: Bool]
    /// JSONB — { "walking": 25, "sitting": 75, ... }.
    var rates: [String: Double]
    /// JSONB — { "monday": { "morning": true, "afternoon": false, ... }, ... }.
    var availability: [String: [String: Bool]]

    // Denormalized stats
    var ratingAverage: Double?
    var ratingCount: Int
    var responseTimeMinutes: Int?

    let createdAt: Date
    var updatedAt: Date

    enum CodingKeys: String, CodingKey {
        case id
        case userID = "user_id"
        case bio
        case serviceRadiusMiles = "service_radius_miles"
        case servicesOffered = "services_offered"
        case rates
        case availability
        case ratingAverage = "rating_average"
        case ratingCount = "rating_count"
        case responseTimeMinutes = "response_time_minutes"
        case createdAt = "created_at"
        case updatedAt = "updated_at"
    }
}
