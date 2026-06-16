//
//  Review.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//
//  Mirrors public.reviews (supabase/migrations/0001_initial_schema.sql).
//

import Foundation

struct Review: Codable, Identifiable, Hashable {
    let id: UUID
    var bookingID: UUID
    var reviewerID: UUID
    var revieweeID: UUID

    /// SQL CHECK (rating >= 1 AND rating <= 5).
    var rating: Int
    var text: String?
    var tags: [String]?

    let createdAt: Date

    enum CodingKeys: String, CodingKey {
        case id
        case bookingID = "booking_id"
        case reviewerID = "reviewer_id"
        case revieweeID = "reviewee_id"
        case rating
        case text
        case tags
        case createdAt = "created_at"
    }
}
