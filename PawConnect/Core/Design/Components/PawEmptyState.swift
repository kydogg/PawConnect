//
//  PawEmptyState.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//

import SwiftUI

/// Empty-state placeholder: illustration (or SF Symbol fallback), title,
/// optional subtitle, and an optional call-to-action button.
struct PawEmptyState: View {
    var image: Image?
    var systemImage: String = "tray"
    let title: String
    var message: String?
    var actionTitle: String?
    var action: (() -> Void)?

    var body: some View {
        VStack(spacing: AppSpacing.md) {
            Group {
                if let image {
                    image.resizable().scaledToFit()
                } else {
                    Image(systemName: systemImage)
                        .resizable()
                        .scaledToFit()
                        .foregroundStyle(AppColor.textTertiary)
                }
            }
            .frame(width: 120, height: 120)

            VStack(spacing: AppSpacing.xs) {
                Text(title)
                    .font(.headingH2)
                    .foregroundStyle(AppColor.textPrimary)
                    .multilineTextAlignment(.center)

                if let message {
                    Text(message)
                        .font(.bodyRegular)
                        .foregroundStyle(AppColor.textSecondary)
                        .multilineTextAlignment(.center)
                }
            }

            if let actionTitle, let action {
                Button(actionTitle, action: action)
                    .buttonStyle(.primary)
                    .frame(maxWidth: 260)
                    .padding(.top, AppSpacing.xs)
            }
        }
        .padding(AppSpacing.xl)
        .frame(maxWidth: .infinity)
    }
}

#Preview {
    PawEmptyState(
        systemImage: "pawprint.circle.fill",
        title: "No pets yet",
        message: "Add your first furry family member to get started.",
        actionTitle: "Add a Pet",
        action: {}
    )
    .background(AppColor.backgroundPrimary)
}
