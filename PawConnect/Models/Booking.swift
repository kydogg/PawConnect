//
//  Booking.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//
//  Mirrors public.bookings (supabase/migrations/0001_initial_schema.sql).
//

import Foundation

/// SQL: service_type ENUM ('walking', 'dropin', 'sitting', 'boarding', 'daycare').
enum ServiceType: String, Codable, Hashable, CaseIterable {
    case walking
    case dropin
    case sitting
    case boarding
    case daycare
}

/// SQL: booking_status ENUM ('pending', 'confirmed', 'active', 'completed', 'cancelled', 'declined').
enum BookingStatus: String, Codable, Hashable, CaseIterable {
    case pending
    case confirmed
    case active
    case completed
    case cancelled
    case declined
}

struct Booking: Codable, Identifiable, Hashable {
    let id: UUID
    var ownerID: UUID
    var sitterID: UUID
    var serviceType: ServiceType

    // Dates and times. start_date/end_date are SQL DATE; start_time/end_time
    // are "HH:MM" text.
    var startDate: Date
    var endDate: Date?
    var startTime: String
    var endTime: String?

    var isRecurring: Bool
    var recurringDays: [String]?

    var status: BookingStatus
    var notes: String?

    // Pricing
    var subtotal: Double
    var serviceFee: Double
    var total: Double

    var declineReason: String?
    var declineMessage: String?

    let createdAt: Date
    var updatedAt: Date
    var confirmedAt: Date?
    var completedAt: Date?
    var cancelledAt: Date?

    enum CodingKeys: String, CodingKey {
        case id
        case ownerID = "owner_id"
        case sitterID = "sitter_id"
        case serviceType = "service_type"
        case startDate = "start_date"
        case endDate = "end_date"
        case startTime = "start_time"
        case endTime = "end_time"
        case isRecurring = "is_recurring"
        case recurringDays = "recurring_days"
        case status
        case notes
        case subtotal
        case serviceFee = "service_fee"
        case total
        case declineReason = "decline_reason"
        case declineMessage = "decline_message"
        case createdAt = "created_at"
        case updatedAt = "updated_at"
        case confirmedAt = "confirmed_at"
        case completedAt = "completed_at"
        case cancelledAt = "cancelled_at"
    }
}
