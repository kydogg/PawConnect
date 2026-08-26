//
//  PawTextField.swift
//  PawConnect
//
//  Created by Kyle Baker on 1/11/26.
//

import SwiftUI

struct PawTextField: View {
    var label: String?
    @Binding var text: String
    var placeholder: String = ""
    var error: String?
    var isSecure: Bool = false
    /// When set together with `isSecure`, shows an eye toggle on the right
    /// side of the field that reveals the secure text.
    var isRevealed: Binding<Bool>?

    var body: some View {
        VStack(alignment: .leading, spacing: AppSpacing.xs) {
            if let label {
                Text(label)
                    .font(.bodySmall.weight(.medium))
                    .foregroundStyle(AppColor.textSecondary)
            }

            Group {
                if isSecure && !(isRevealed?.wrappedValue ?? false) {
                    SecureField(placeholder, text: $text)
                } else {
                    TextField(placeholder, text: $text)
                }
            }
            .textFieldStyle(.roundedBorder)
            .tint(AppColor.primarySunset)
            .overlay(alignment: .trailing) {
                if isSecure, let isRevealed {
                    Button {
                        isRevealed.wrappedValue.toggle()
                    } label: {
                        Image(systemName: isRevealed.wrappedValue ? "eye.slash" : "eye")
                            .foregroundStyle(AppColor.textTertiary)
                            .padding(.trailing, AppSpacing.sm)
                    }
                }
            }

            if let error {
                Text(error)
                    .font(.caption)
                    .foregroundStyle(AppColor.error)
            }
        }
    }
}

#Preview {
    VStack(spacing: AppSpacing.lg) {
        PawTextField(
            label: "Email",
            text: .constant(""),
            placeholder: "Enter your email"
        )

        PawTextField(
            label: "Password",
            text: .constant(""),
            placeholder: "Enter your password",
            isSecure: true,
            isRevealed: .constant(false)
        )

        PawTextField(
            text: .constant(""),
            placeholder: "No label (sign-in style)",
            isSecure: true,
            isRevealed: .constant(true)
        )

        PawTextField(
            label: "Email with error",
            text: .constant("invalid"),
            placeholder: "Enter your email",
            error: "Please enter a valid email"
        )
    }
    .padding()
}
