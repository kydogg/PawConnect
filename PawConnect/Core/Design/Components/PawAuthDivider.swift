//
//  PawAuthDivider.swift
//  PawConnect
//
//  Horizontal rule with a centered "or" label, used between the Apple
//  Sign In button and the email form on auth screens (AUTH-02/03).
//

import SwiftUI

struct PawAuthDivider: View {
    var label: String = "or"

    var body: some View {
        HStack {
            Rectangle()
                .fill(AppColor.border)
                .frame(height: 1)

            Text(label)
                .font(.caption)
                .foregroundStyle(AppColor.textTertiary)
                .padding(.horizontal, AppSpacing.md)

            Rectangle()
                .fill(AppColor.border)
                .frame(height: 1)
        }
    }
}

#Preview {
    PawAuthDivider()
        .padding()
        .background(AppColor.backgroundPrimary)
}
