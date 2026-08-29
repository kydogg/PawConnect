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
                // Per-section gaps follow PRODUCT_SPEC § AUTH-02.
                VStack(alignment: .leading, spacing: 0) {
                    header
                        .padding(.top, AppSpacing.xl)

                    appleSignInSection
                        .padding(.top, AppSpacing.xl)

                    PawAuthDivider()
                        .padding(.top, AppSpacing.lg)

                    emailForm
                        .padding(.top, AppSpacing.lg)

                    passwordRequirements
                        .padding(.top, AppSpacing.sm)

                    submitButton
                        .padding(.top, AppSpacing.xl)

                    legalFooter
                        .padding(.top, AppSpacing.md)

                    Spacer(minLength: AppSpacing.xl)
                }
                .padding(.horizontal, AppSpacing.md)
            }

            // Loading Overlay
            if viewModel.isLoading {
                PawLoadingOverlay(message: "Creating your account...")
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

}

#Preview {
    NavigationStack {
        SignUpView()
    }
}
