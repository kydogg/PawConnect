//
//  Message.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//
//  Mirrors public.messages (supabase/migrations/0001_initial_schema.sql).
//

import Foundation

struct Message: Codable, Identifiable, Hashable {
    let id: UUID
    var conversationID: UUID
    var senderID: UUID
    var text: String

    var isRead: Bool
    var readAt: Date?

    let createdAt: Date

    enum CodingKeys: String, CodingKey {
        case id
        case conversationID = "conversation_id"
        case senderID = "sender_id"
        case text
        case isRead = "is_read"
        case readAt = "read_at"
        case createdAt = "created_at"
    }
}
