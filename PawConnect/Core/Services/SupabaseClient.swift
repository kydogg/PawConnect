//
//  SupabaseClient.swift
//  PawConnect
//
//  Singleton entry point to the Supabase backend.
//  Reads URL + anon key from Info.plist (set via Local.xcconfig — gitignored).
//

import Foundation
import Supabase

enum SupabaseConfig {
    static var url: URL {
        guard let raw = Bundle.main.object(forInfoDictionaryKey: "SUPABASE_URL") as? String,
              let url = URL(string: raw) else {
            fatalError("SUPABASE_URL missing from Info.plist — set it in Local.xcconfig")
        }
        return url
    }

    static var anonKey: String {
        guard let key = Bundle.main.object(forInfoDictionaryKey: "SUPABASE_ANON_KEY") as? String,
              !key.isEmpty else {
            fatalError("SUPABASE_ANON_KEY missing from Info.plist — set it in Local.xcconfig")
        }
        return key
    }
}

final class SupabaseClient {
    static let shared = SupabaseClient()

    let client: Supabase.SupabaseClient

    private init() {
        client = Supabase.SupabaseClient(
            supabaseURL: SupabaseConfig.url,
            supabaseKey: SupabaseConfig.anonKey
        )
    }
}
