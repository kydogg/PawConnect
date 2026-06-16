//
//  PawAlert.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//

import SwiftUI

/// Banner alert with a leading accent bar, icon, title, and optional message.
/// Use for inline success/warning/error/info feedback (not system alerts).
struct PawAlert: View {
    enum Style {
        case success, warning, error, info

        var tint: Color {
            switch self {
            case .success: AppColor.success
            case .warning: AppColor.warning
            case .error: AppColor.error
            // The design system has no dedicated info token; use the brand accent.
            case .info: AppColor.primarySunset
            }
        }

        var icon: String {
            switch self {
            case .success: "checkmark.circle.fill"
            case .warning: "exclamationmark.circle.fill"
            case .error: "exclamationmark.triangle.fill"
            case .info: "info.circle.fill"
            }
        }
    }

    let style: Style
    let title: String
    var message: String?
    var onDismiss: (() -> Void)?

    var body: some View {
        HStack(alignment: .top, spacing: AppSpacing.sm) {
            Image(systemName: style.icon)
                .font(.headingH3)
                .foregroundStyle(style.tint)

            VStack(alignment: .leading, spacing: AppSpacing.xxs) {
                Text(title)
                    .font(.headingH3)
                    .foregroundStyle(AppColor.textPrimary)
                if let message {
                    Text(message)
                        .font(.bodyRegular)
                        .foregroundStyle(AppColor.textSecondary)
                }
            }

            Spacer(minLength: 0)

            if let onDismiss {
                Button(action: onDismiss) {
                    Image(systemName: "xmark")
                        .font(.caption)
                        .foregroundStyle(AppColor.textTertiary)
                }
                .buttonStyle(.plain)
            }
        }
        .padding(AppSpacing.md)
        .background(AppColor.backgroundElevated)
        .overlay(alignment: .leading) {
            Rectangle()
                .fill(style.tint)
                .frame(width: 4)
        }
        .clipShape(RoundedRectangle(cornerRadius: AppRadius.md))
        .cardShadow()
    }
}

#Preview {
    VStack(spacing: AppSpacing.md) {
        PawAlert(style: .success, title: "Booking confirmed", message: "Your sitter has accepted the request.")
        PawAlert(style: .warning, title: "Heads up", message: "This sitter responds slowly.")
        PawAlert(style: .error, title: "Couldn't sign in", message: "Check your email and password.", onDismiss: {})
        PawAlert(style: .info, title: "New feature", message: "Live Activities are now available.")
    }
    .padding()
    .background(AppColor.backgroundPrimary)
}
