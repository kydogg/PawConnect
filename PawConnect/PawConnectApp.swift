//
//  PawConnectApp.swift
//  PawConnect
//
//  Created by Kyle Baker on 1/11/26.
//

import SwiftUI

@main
struct PawConnectApp: App {
    init() {
        // Begin mirroring the Supabase session (also restores a persisted
        // session on relaunch via the initial auth-state event).
        AuthManager.shared.start()
    }

    var body: some Scene {
        WindowGroup {
            RootView()
        }
    }
}
