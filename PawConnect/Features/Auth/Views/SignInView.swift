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

                    // Forgot Password
                    forgotPasswordLink

                    // Submit Button
                    submitButton

                    // Sign Up Link
                    signUpLink

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
        VStack(alignment: .leading, spacing: 8) {
            Text("Welcome Back")
                .font(.largeTitle)
                .fontWeight(.bold)
                .foregroundStyle(AppColors.textPrimary)

            Text("Sign in to continue caring for your pets")
                .font(.body)
                .foregroundStyle(AppColors.textSecondary)
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
            // Email
            TextField("Email", text: $viewModel.email)
                .textFieldStyle(.roundedBorder)
                .textContentType(.emailAddress)
                .keyboardType(.emailAddress)
                .autocapitalization(.none)
                .tint(AppColors.primarySunset)

            // Password
            HStack {
                Group {
                    if viewModel.showPassword {
                        TextField("Password", text: $viewModel.password)
                    } else {
                        SecureField("Password", text: $viewModel.password)
                    }
                }
                .textFieldStyle(.roundedBorder)
                .textContentType(.password)
                .tint(AppColors.primarySunset)

                Button {
                    viewModel.showPassword.toggle()
                } label: {
                    Image(systemName: viewModel.showPassword ? "eye.slash" : "eye")
                        .foregroundStyle(AppColors.textTertiary)
                }
            }
        }
    }

    private var forgotPasswordLink: some View {
        HStack {
            Spacer()
            Button("Forgot password?") {
                // TODO: Navigate to forgot password
            }
            .buttonStyle(.text)
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
        HStack(spacing: 4) {
            Text("Don't have an account?")
                .foregroundStyle(AppColors.textSecondary)

            Button("Sign Up") {
                showSignUp = true
            }
            .fontWeight(.semibold)
            .foregroundStyle(AppColors.primarySunset)
        }
        .font(.subheadline)
        .frame(maxWidth: .infinity)
    }

    private var loadingOverlay: some View {
        ZStack {
            Color.black.opacity(0.4)
                .ignoresSafeArea()

            VStack(spacing: 16) {
                ProgressView()
                    .progressViewStyle(CircularProgressViewStyle(tint: .white))
                    .scaleEffect(1.2)

                Text("Signing in...")
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
        SignInView()
    }
}
