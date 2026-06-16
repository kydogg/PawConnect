//
//  CareSession.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//
//  Mirrors public.care_sessions (supabase/migrations/0001_initial_schema.sql).
//

import Foundation

struct CareSession: Codable, Identifiable, Hashable {
    let id: UUID
    var bookingID: UUID
    var sitterID: UUID

    /// SQL TEXT column (not an enum). Expected values: "active", "completed".
    var status: String

    let startedAt: Date
    var completedAt: Date?

    var completedItemsCount: Int
    var totalItemsCount: Int

    enum CodingKeys: String, CodingKey {
        case id
        case bookingID = "booking_id"
        case sitterID = "sitter_id"
        case status
        case startedAt = "started_at"
        case completedAt = "completed_at"
        case completedItemsCount = "completed_items_count"
        case totalItemsCount = "total_items_count"
    }
}
