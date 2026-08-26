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
                AppColor.backgroundPrimary
                    .ignoresSafeArea()

                VStack(spacing: 0) {
                    Spacer()

                    // Logo Section (upper third)
                    logoSection
                        .padding(.bottom, AppSpacing.xl)

                    // Illustration Area (middle third)
                    illustrationArea
                        .padding(.bottom, AppSpacing.xxl)

                    Spacer()

                    // Action Buttons (lower third)
                    actionButtons
                        .padding(.horizontal, AppSpacing.lg)
                        .padding(.bottom, AppSpacing.md)

                    // Footer
                    footer
                        .padding(.bottom, AppSpacing.xl)
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
        PawLogo(size: .medium, showAppName: true, showTagline: true)
    }

    private var illustrationArea: some View {
        // Gradient placeholder for illustration
        RoundedRectangle(cornerRadius: AppRadius.lg)
            .fill(
                LinearGradient(
                    colors: [
                        AppColor.primarySunset.opacity(0.1),
                        AppColor.secondaryPeach.opacity(0.1)
                    ],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            )
            .frame(height: 200)
            .overlay {
                VStack(spacing: AppSpacing.sm) {
                    Image(systemName: "person.and.dog")
                        .font(.system(size: 60))
                        .foregroundStyle(AppColor.primarySunset.opacity(0.5))
                    Text("Your pets deserve the best care")
                        .font(.bodyRegular)
                        .foregroundStyle(AppColor.textTertiary)
                }
            }
            .padding(.horizontal, AppSpacing.md)
    }

    private var actionButtons: some View {
        VStack(spacing: AppSpacing.md) {
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
        HStack(spacing: AppSpacing.xs) {
            Button("Terms") {
                // TODO: Open terms
            }
            .buttonStyle(.text)

            Text("·")
                .foregroundStyle(AppColor.textTertiary)

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
