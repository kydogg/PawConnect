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
            AppColors.backgroundPrimary
                .ignoresSafeArea()

            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    // Header
                    header
                        .padding(.top, 8)

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
                .padding(.horizontal, Constants.UI.standardPadding)
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
                        .foregroundStyle(AppColors.primarySunset)
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
        VStack(alignment: .leading, spacing: 8) {
            Text("Create Account")
                .font(.largeTitle)
                .fontWeight(.bold)
                .foregroundStyle(AppColors.textPrimary)

            Text("Join our community of pet lovers")
                .font(.body)
                .foregroundStyle(AppColors.textSecondary)
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
        .clipShape(RoundedRectangle(cornerRadius: Constants.UI.cornerRadius))
    }

    private var divider: some View {
        HStack {
            Rectangle()
                .fill(AppColors.textTertiary.opacity(0.3))
                .frame(height: 1)

            Text("or")
                .font(.caption)
                .foregroundStyle(AppColors.textTertiary)
                .padding(.horizontal, 16)

            Rectangle()
                .fill(AppColors.textTertiary.opacity(0.3))
                .frame(height: 1)
        }
    }

    private var emailForm: some View {
        VStack(spacing: 16) {
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
                isSecure: !viewModel.showPassword
            )
            .textContentType(.newPassword)
            .overlay(alignment: .trailing) {
                Button {
                    viewModel.showPassword.toggle()
                } label: {
                    Image(systemName: viewModel.showPassword ? "eye.slash" : "eye")
                        .foregroundStyle(AppColors.textTertiary)
                        .padding(.trailing, 12)
                        .padding(.top, 24)
                }
            }
        }
    }

    private var passwordRequirements: some View {
        VStack(alignment: .leading, spacing: 8) {
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
        HStack(spacing: 8) {
            Image(systemName: met ? "checkmark.circle.fill" : "xmark.circle")
                .font(.caption)
                .foregroundStyle(met ? AppColors.secondarySage : AppColors.textTertiary)

            Text(text)
                .font(.caption)
                .foregroundStyle(met ? AppColors.secondarySage : AppColors.textTertiary)
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
        Text("By signing up, you agree to our ")
            .foregroundStyle(AppColors.textTertiary)
        +
        Text("Terms of Service")
            .foregroundStyle(AppColors.primarySunset)
        +
        Text(" and ")
            .foregroundStyle(AppColors.textTertiary)
        +
        Text("Privacy Policy")
            .foregroundStyle(AppColors.primarySunset)
    }

    private var loadingOverlay: some View {
        ZStack {
            Color.black.opacity(0.4)
                .ignoresSafeArea()

            VStack(spacing: 16) {
                ProgressView()
                    .progressViewStyle(CircularProgressViewStyle(tint: .white))
                    .scaleEffect(1.2)

                Text("Creating your account...")
                    .font(.subheadline)
                    .foregroundStyle(.white)
            }
            .padding(32)
            .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 16))
        }
    }
}

#Preview {
    NavigationStack {
        SignUpView()
    }
}
