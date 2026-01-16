//
//  WelcomeView.swift
//  PawConnect
//
//  Created by Kyle Baker on 1/11/26.
//

import SwiftUI

struct WelcomeView: View {
    @State private var showSignUp = false
    @State private var showSignIn = false

    var body: some View {
        NavigationStack {
            ZStack {
                // Background
                AppColors.backgroundPrimary
                    .ignoresSafeArea()

                VStack(spacing: 0) {
                    Spacer()

                    // Logo Section (upper third)
                    logoSection
                        .padding(.bottom, 32)

                    // Illustration Area (middle third)
                    illustrationArea
                        .padding(.bottom, 48)

                    Spacer()

                    // Action Buttons (lower third)
                    actionButtons
                        .padding(.horizontal, Constants.UI.standardPadding)
                        .padding(.bottom, 16)

                    // Footer
                    footer
                        .padding(.bottom, 32)
                }
            }
            .navigationDestination(isPresented: $showSignUp) {
                SignUpView()
            }
            .navigationDestination(isPresented: $showSignIn) {
                SignInView()
            }
        }
    }

    // MARK: - Subviews

    private var logoSection: some View {
        VStack(spacing: 8) {
            // Logo Icon
            RoundedRectangle(cornerRadius: 12)
                .fill(AppColors.primarySunset)
                .frame(width: 48, height: 48)
                .overlay {
                    Image(systemName: "pawprint.fill")
                        .font(.system(size: 24, weight: .semibold))
                        .foregroundStyle(.white)
                }

            // App Name
            Text("PawConnect")
                .font(.largeTitle)
                .fontWeight(.bold)
                .foregroundStyle(AppColors.textPrimary)

            // Tagline
            Text("Peace of mind, one paw at a time")
                .font(.body)
                .foregroundStyle(AppColors.textSecondary)
        }
    }

    private var illustrationArea: some View {
        // Gradient placeholder for illustration
        RoundedRectangle(cornerRadius: 24)
            .fill(
                LinearGradient(
                    colors: [
                        AppColors.primarySunset.opacity(0.1),
                        AppColors.secondaryPeach.opacity(0.1)
                    ],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            )
            .frame(height: 200)
            .overlay {
                VStack(spacing: 12) {
                    Image(systemName: "person.and.dog")
                        .font(.system(size: 60))
                        .foregroundStyle(AppColors.primarySunset.opacity(0.5))
                    Text("Your pets deserve the best care")
                        .font(.subheadline)
                        .foregroundStyle(AppColors.textTertiary)
                }
            }
            .padding(.horizontal, Constants.UI.standardPadding)
    }

    private var actionButtons: some View {
        VStack(spacing: 12) {
            // Primary CTA
            Button("Get Started") {
                showSignUp = true
            }
            .buttonStyle(.primary)

            // Secondary CTA
            Button("I already have an account") {
                showSignIn = true
            }
            .buttonStyle(.secondary)
        }
    }

    private var footer: some View {
        HStack(spacing: 4) {
            Button("Terms") {
                // TODO: Open terms
            }
            .buttonStyle(.text)

            Text("·")
                .foregroundStyle(AppColors.textTertiary)

            Button("Privacy") {
                // TODO: Open privacy policy
            }
            .buttonStyle(.text)
        }
        .font(.caption)
    }
}

#Preview {
    WelcomeView()
}
