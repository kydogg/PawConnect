//
//  PawTextField.swift
//  PawConnect
//
//  Created by Kyle Baker on 1/11/26.
//

import SwiftUI

struct PawTextField: View {
    let label: String
    @Binding var text: String
    var placeholder: String = ""
    var error: String?
    var isSecure: Bool = false

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(label)
                .font(.subheadline)
                .foregroundStyle(AppColors.textSecondary)

            Group {
                if isSecure {
                    SecureField(placeholder, text: $text)
                } else {
                    TextField(placeholder, text: $text)
                }
            }
            .textFieldStyle(.roundedBorder)
            .tint(AppColors.primarySunset)

            if let error {
                Text(error)
                    .font(.caption)
                    .foregroundStyle(AppColors.error)
            }
        }
    }
}

#Preview {
    VStack(spacing: 20) {
        PawTextField(
            label: "Email",
            text: .constant(""),
            placeholder: "Enter your email"
        )

        PawTextField(
            label: "Password",
            text: .constant(""),
            placeholder: "Enter your password",
            isSecure: true
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
