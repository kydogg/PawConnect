//
//  RootView.swift
//  PawConnect
//
//  Created by Kyle Baker on 1/11/26.
//

import SwiftUI

struct RootView: View {
    @State private var isAuthenticated = false
    @State private var hasCompletedOnboarding = false
    @State private var isLoading = true

    var body: some View {
        Group {
            if isLoading {
                loadingView
            } else if !isAuthenticated {
                // TODO: WelcomeView()
                placeholderView(title: "Welcome", message: "Auth flow coming soon")
            } else if !hasCompletedOnboarding {
                // TODO: OnboardingView()
                placeholderView(title: "Onboarding", message: "Onboarding flow coming soon")
            } else {
                // TODO: MainTabView()
                placeholderView(title: "Home", message: "Main app coming soon")
            }
        }
        .task {
            await checkAuthState()
        }
    }

    // MARK: - Views

    private var loadingView: some View {
        ZStack {
            AppColors.backgroundPrimary
                .ignoresSafeArea()
            ProgressView()
                .tint(AppColors.primarySunset)
        }
    }

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

    // MARK: - Actions

    private func checkAuthState() async {
        // TODO: Check Supabase auth state
        // For now, simulate a brief loading state
        try? await Task.sleep(for: .milliseconds(500))
        isLoading = false
    }
}

#Preview {
    RootView()
}
