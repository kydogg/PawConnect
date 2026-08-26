//
//  SignInView.swift
//  PawConnect
//
//  Created by Kyle Baker on 1/11/26.
//

import SwiftUI
import AuthenticationServices

struct SignInView: View {
    @Environment(\.dismiss) private var dismiss
    @State private var viewModel = SignInViewModel()
    @State private var showSignUp = false

    var body: some View {
        ZStack {
            // Background
            AppColor.backgroundPrimary
                .ignoresSafeArea()

            ScrollView {
                VStack(alignment: .leading, spacing: AppSpacing.lg) {
                    // Header
                    header
                        .padding(.top, AppSpacing.sm)

                    // Apple Sign In
                    appleSignInSection

                    // Divider
                    divider

                    // Email Form
                    emailForm

                    // Forgot Password
                    forgotPasswordLink

                    // Submit Button
                    submitButton

                    // Sign Up Link
                    signUpLink

                    Spacer(minLength: 32)
                }
                .padding(.horizontal, AppSpacing.md)
            }

            // Loading Overlay
            if viewModel.isLoading {
                loadingOverlay
            }
        }
        .navigationBarBackButtonHidden(true)
        .toolbar {
            ToolbarItem(placement: .navigationBarLeading) {
                Button {
                    dismiss()
                } label: {
                    Image(systemName: "chevron.left")
                        .font(.body.weight(.semibold))
                        .foregroundStyle(AppColor.primarySunset)
                }
            }
        }
        .navigationDestination(isPresented: $showSignUp) {
            SignUpView()
        }
        .alert("Error", isPresented: .init(
            get: { viewModel.error != nil },
            set: { if !$0 { viewModel.clearError() } }
        )) {
            Button("OK") { viewModel.clearError() }
        } message: {
            Text(viewModel.error?.localizedDescription ?? "An error occurred")
        }
    }

    // MARK: - Subviews

    private var header: some View {
        VStack(alignment: .leading, spacing: AppSpacing.sm) {
            Text("Welcome Back")
                .font(.displayLarge)
                .foregroundStyle(AppColor.textPrimary)

            Text("Sign in to continue caring for your pets")
                .font(.bodyLarge)
                .foregroundStyle(AppColor.textSecondary)
        }
    }

    private var appleSignInSection: some View {
        SignInWithAppleButton(.signIn) { request in
            request.requestedScopes = [.fullName, .email]
        } onCompletion: { result in
            Task {
                await viewModel.signInWithApple()
            }
        }
        .signInWithAppleButtonStyle(.black)
        .frame(height: 56)
        .clipShape(RoundedRectangle(cornerRadius: AppRadius.md))
    }

    private var divider: some View {
        HStack {
            Rectangle()
                .fill(AppColor.border)
                .frame(height: 1)

            Text("or")
                .font(.caption)
                .foregroundStyle(AppColor.textTertiary)
                .padding(.horizontal, AppSpacing.md)

            Rectangle()
                .fill(AppColor.border)
                .frame(height: 1)
        }
    }

    private var emailForm: some View {
        VStack(spacing: AppSpacing.md) {
            // Email
            PawTextField(
                text: $viewModel.email,
                placeholder: "Email"
            )
            .textContentType(.emailAddress)
            .keyboardType(.emailAddress)
            .autocapitalization(.none)

            // Password
            PawTextField(
                text: $viewModel.password,
                placeholder: "Password",
                isSecure: true,
                isRevealed: $viewModel.showPassword
            )
            .textContentType(.password)
        }
    }

    private var forgotPasswordLink: some View {
        HStack {
            Spacer()
            Button("Forgot password?") {
                // TODO: Navigate to forgot password
            }
            .buttonStyle(.text)
            .frame(minHeight: 44)
        }
    }

    private var submitButton: some View {
        Button("Sign In") {
            Task {
                await viewModel.signIn()
            }
        }
        .buttonStyle(.primary(isLoading: viewModel.isLoading))
        .disabled(!viewModel.isFormValid || viewModel.isLoading)
    }

    private var signUpLink: some View {
        HStack(spacing: AppSpacing.xs) {
            Text("Don't have an account?")
                .foregroundStyle(AppColor.textSecondary)

            Button("Sign Up") {
                showSignUp = true
            }
            .fontWeight(.semibold)
            .foregroundStyle(AppColor.primarySunset)
        }
        .font(.bodyRegular)
        .frame(maxWidth: .infinity)
    }

    private var loadingOverlay: some View {
        ZStack {
            Color.black.opacity(0.4)
                .ignoresSafeArea()

            VStack(spacing: AppSpacing.md) {
                ProgressView()
                    .progressViewStyle(CircularProgressViewStyle(tint: .white))
                    .scaleEffect(1.2)

                Text("Signing in...")
                    .font(.bodyRegular)
                    .foregroundStyle(.white)
            }
            .padding(AppSpacing.xl)
            .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: AppRadius.lg))
        }
    }
}

#Preview {
    NavigationStack {
        SignInView()
    }
}
