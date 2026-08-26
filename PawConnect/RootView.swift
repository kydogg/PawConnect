//
//  RootView.swift
//  PawConnect
//
//  Created by Kyle Baker on 1/11/26.
//

import SwiftUI

struct RootView: View {
    @State private var showSplash = true
    private let auth = AuthManager.shared
    // Real onboarding routing lands with AUTH-05 (issue #5)
    private let hasCompletedOnboarding = false

    var body: some View {
        ZStack {
            // Main content
            if !auth.isAuthenticated {
                WelcomeView()
            } else if !hasCompletedOnboarding {
                // TODO: OnboardingView()
                placeholderView(title: "Onboarding", message: "Onboarding flow coming soon")
            } else {
                // TODO: MainTabView()
                placeholderView(title: "Home", message: "Main app coming soon")
            }

            // Splash overlay
            if showSplash {
                SplashView {
                    withAnimation(.easeOut(duration: 0.3)) {
                        showSplash = false
                    }
                }
                .transition(.opacity)
                .zIndex(1)
            }
        }
        .animation(.easeInOut, value: showSplash)
    }

    // MARK: - Views

    private func placeholderView(title: String, message: String) -> some View {
        ZStack {
            AppColor.backgroundPrimary
                .ignoresSafeArea()
            VStack(spacing: 16) {
                Text(title)
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundStyle(AppColor.textPrimary)
                Text(message)
                    .font(.body)
                    .foregroundStyle(AppColor.textSecondary)
            }
        }
    }
}

#Preview {
    RootView()
}
