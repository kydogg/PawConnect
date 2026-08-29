//
//  PawButton.swift
//  PawConnect
//
//  Created by Kyle Baker on 1/11/26.
//

import SwiftUI

// MARK: - Primary Button Style

struct PrimaryButtonStyle: ButtonStyle {
    @Environment(\.isEnabled) private var isEnabled

    var isLoading: Bool = false

    func makeBody(configuration: Configuration) -> some View {
        HStack(spacing: 8) {
            if isLoading {
                ProgressView()
                    .progressViewStyle(CircularProgressViewStyle(tint: .white))
                    .scaleEffect(0.8)
            }
            configuration.label
        }
        .font(.body)
        .fontWeight(.semibold)
        .foregroundStyle(.white)
        .frame(maxWidth: .infinity)
        .frame(height: 56)
        .background(
            RoundedRectangle(cornerRadius: AppRadius.md)
                .fill(isEnabled ? AppColor.primarySunset : AppColor.primarySunset.opacity(0.6))
        )
        .scaleEffect(configuration.isPressed ? 0.98 : 1.0)
        .animation(.easeInOut(duration: 0.1), value: configuration.isPressed)
    }
}

// MARK: - Secondary Button Style

struct SecondaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.body)
            .fontWeight(.medium)
            .foregroundStyle(AppColor.primarySunset)
            .frame(maxWidth: .infinity)
            .frame(height: 56)
            .background(
                RoundedRectangle(cornerRadius: AppRadius.md)
                    .stroke(AppColor.primarySunset, lineWidth: 1.5)
            )
            .scaleEffect(configuration.isPressed ? 0.98 : 1.0)
            .animation(.easeInOut(duration: 0.1), value: configuration.isPressed)
    }
}

// MARK: - Text Button Style

struct TextButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.subheadline)
            .fontWeight(.medium)
            .foregroundStyle(configuration.isPressed ? AppColor.primaryTerracotta : AppColor.primarySunset)
    }
}

// MARK: - Button Extensions

extension ButtonStyle where Self == PrimaryButtonStyle {
    static var primary: PrimaryButtonStyle { PrimaryButtonStyle() }
    static func primary(isLoading: Bool) -> PrimaryButtonStyle {
        PrimaryButtonStyle(isLoading: isLoading)
    }
}

extension ButtonStyle where Self == SecondaryButtonStyle {
    static var secondary: SecondaryButtonStyle { SecondaryButtonStyle() }
}

extension ButtonStyle where Self == TextButtonStyle {
    static var text: TextButtonStyle { TextButtonStyle() }
}

// MARK: - Previews

#Preview("Primary Button") {
    VStack(spacing: 16) {
        Button("Get Started") {}
            .buttonStyle(.primary)

        Button("Loading...") {}
            .buttonStyle(.primary(isLoading: true))

        Button("Disabled") {}
            .buttonStyle(.primary)
            .disabled(true)
    }
    .padding()
}

#Preview("Secondary Button") {
    VStack(spacing: 16) {
        Button("I already have an account") {}
            .buttonStyle(.secondary)
    }
    .padding()
}

#Preview("Text Button") {
    VStack(spacing: 16) {
        Button("Forgot password?") {}
            .buttonStyle(.text)
    }
    .padding()
}
