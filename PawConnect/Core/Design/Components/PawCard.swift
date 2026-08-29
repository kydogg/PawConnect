//
//  PawCard.swift
//  PawConnect
//
//  Created by Kyle Baker on 1/11/26.
//

import SwiftUI

struct PawCard<Content: View>: View {
    @ViewBuilder let content: () -> Content

    var body: some View {
        content()
            .padding()
            .background(AppColor.backgroundElevated)
            .clipShape(RoundedRectangle(cornerRadius: AppRadius.md))
            .cardShadow()
    }
}

#Preview {
    PawCard {
        VStack(alignment: .leading, spacing: 8) {
            Text("Card Title")
                .font(.headline)
                .foregroundStyle(AppColor.textPrimary)
            Text("Card description goes here")
                .font(.subheadline)
                .foregroundStyle(AppColor.textSecondary)
        }
    }
    .padding()
}
