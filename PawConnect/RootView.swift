//
//  RootView.swift
//  PawConnect
//
//  Created by Kyle Baker on 1/11/26.
//

import SwiftUI

struct RootView: View {
    @State private var showSplash = true
    @State private var isAuthenticated = false
    @State private var hasCompletedOnboarding = false

    var body: some View {
        ZStack {
            // Main content
            if !isAuthenticated {
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
            AppColors.backgroundPrimary
                .ignoresSafeArea()
            VStack(spacing: 16) {
                Text(title)
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundStyle(AppColors.textPrimary)
                Text(message)
                    .font(.body)
                    .foregroundStyle(AppColors.textSecondary)
            }
        }
    }
}

#Preview {
    RootView()
}
