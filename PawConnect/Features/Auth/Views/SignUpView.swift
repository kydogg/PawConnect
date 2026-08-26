//
//  SignUpView.swift
//  PawConnect
//
//  Created by Kyle Baker on 1/11/26.
//

import SwiftUI
import AuthenticationServices

struct SignUpView: View {
    @Environment(\.dismiss) private var dismiss
    @State private var viewModel = SignUpViewModel()

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

                    // Password Requirements
                    passwordRequirements

                    // Submit Button
                    submitButton

                    // Legal Footer
                    legalFooter

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
            Text("Create Account")
                .font(.displayLarge)
                .foregroundStyle(AppColor.textPrimary)

            Text("Join our community of pet lovers")
                .font(.bodyLarge)
                .foregroundStyle(AppColor.textSecondary)
        }
    }

    private var appleSignInSection: some View {
        SignInWithAppleButton(.signUp) { request in
            request.requestedScopes = [.fullName, .email]
        } onCompletion: { result in
            Task {
                await viewModel.signUpWithApple()
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
            // Full Name
            PawTextField(
                label: "Full Name",
                text: $viewModel.fullName,
                placeholder: "Your name",
                error: viewModel.fullNameError
            )
            .textContentType(.name)
            .autocapitalization(.words)

            // Email
            PawTextField(
                label: "Email",
                text: $viewModel.email,
                placeholder: "you@example.com",
                error: viewModel.emailError
            )
            .textContentType(.emailAddress)
            .keyboardType(.emailAddress)
            .autocapitalization(.none)

            // Password
            PawTextField(
                label: "Password",
                text: $viewModel.password,
                placeholder: "At least 8 characters",
                isSecure: true,
                isRevealed: $viewModel.showPassword
            )
            .textContentType(.newPassword)
        }
    }

    private var passwordRequirements: some View {
        VStack(alignment: .leading, spacing: AppSpacing.sm) {
            requirementRow(
                met: viewModel.hasMinLength,
                text: "8+ characters"
            )
            requirementRow(
                met: viewModel.hasNumber,
                text: "1 number"
            )
        }
    }

    private func requirementRow(met: Bool, text: String) -> some View {
        HStack(spacing: AppSpacing.sm) {
            Image(systemName: met ? "checkmark.circle.fill" : "xmark.circle")
                .font(.caption)
                .foregroundStyle(met ? AppColor.secondarySage : AppColor.textTertiary)

            Text(text)
                .font(.caption)
                .foregroundStyle(met ? AppColor.secondarySage : AppColor.textTertiary)
        }
    }

    private var submitButton: some View {
        Button("Create Account") {
            Task {
                await viewModel.signUp()
            }
        }
        .buttonStyle(.primary(isLoading: viewModel.isLoading))
        .disabled(!viewModel.isFormValid || viewModel.isLoading)
    }

    private var legalFooter: some View {
        Text("By signing up, you agree to our \(Text("Terms of Service").foregroundStyle(AppColor.primarySunset)) and \(Text("Privacy Policy").foregroundStyle(AppColor.primarySunset))")
            .font(.caption)
            .foregroundStyle(AppColor.textTertiary)
            .multilineTextAlignment(.center)
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

                Text("Creating your account...")
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
        SignUpView()
    }
}
