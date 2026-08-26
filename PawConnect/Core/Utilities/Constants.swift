//
//  Constants.swift
//  PawConnect
//
//  Created by Kyle Baker on 1/11/26.
//

import Foundation

enum Constants {
    // MARK: - Supabase
    enum Supabase {
        static let url = "https://jculjhfkganixztkswjp.supabase.co"
        static let anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjdWxqaGZrZ2FuaXh6dGtzd2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMzc4MzQsImV4cCI6MjA4MzkxMzgzNH0.n3gHRv6dQcNVTwRl0Y7QRtQcfXrYJPgARhE1lL7q2pk"
    }

    // MARK: - App Info
    enum App {
        static let name = "PawConnect"
        static let bundleId = "com.pawconnect.app"
    }

    // MARK: - Validation
    enum Validation {
        static let minPasswordLength = 8
        static let maxBioLength = 500
        static let maxPetNameLength = 50
    }
}
