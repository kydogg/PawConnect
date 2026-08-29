//
//  SupabaseClient.swift
//  PawConnect
//
//  Singleton entry point to the Supabase backend.
//  Info.plist values (settable via a gitignored Local.xcconfig) override the
//  defaults in Constants. The anon key is safe to ship in the client —
//  RLS is the authorization boundary (ADR-0001).
//

import Foundation
import Supabase

enum SupabaseConfig {
    static var url: URL {
        if let raw = Bundle.main.object(forInfoDictionaryKey: "SUPABASE_URL") as? String,
           let override = URL(string: raw), !raw.isEmpty {
            return override
        }
        guard let url = URL(string: Constants.Supabase.url) else {
            fatalError("Invalid Constants.Supabase.url")
        }
        return url
    }

    static var anonKey: String {
        if let key = Bundle.main.object(forInfoDictionaryKey: "SUPABASE_ANON_KEY") as? String,
           !key.isEmpty {
            return key
        }
        return Constants.Supabase.anonKey
    }
}

final class SupabaseClient {
    static let shared = SupabaseClient()

    let client: Supabase.SupabaseClient

    private init() {
        client = Supabase.SupabaseClient(
            supabaseURL: SupabaseConfig.url,
            supabaseKey: SupabaseConfig.anonKey,
            options: SupabaseClientOptions(
                // Opt in to the post-2.x initial-session behavior: the stored
                // session is emitted immediately even if expired, so consumers
                // must check Session.isExpired (see AuthManager.apply).
                auth: .init(emitLocalSessionAsInitialSession: true)
            )
        )
    }
}
