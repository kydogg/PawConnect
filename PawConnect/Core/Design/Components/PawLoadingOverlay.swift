//
//  PawLoadingOverlay.swift
//  PawConnect
//
//  Full-screen dimmed overlay with a spinner and message, shown while an
//  async action (sign in, sign up) is in flight.
//

import SwiftUI

struct PawLoadingOverlay: View {
    let message: String

    var body: some View {
        ZStack {
            Color.black.opacity(0.4)
                .ignoresSafeArea()

            VStack(spacing: AppSpacing.md) {
                ProgressView()
                    .progressViewStyle(CircularProgressViewStyle(tint: .white))
                    .scaleEffect(1.2)

                Text(message)
                    .font(.bodyRegular)
                    .foregroundStyle(.white)
            }
            .padding(AppSpacing.xl)
            .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: AppRadius.lg))
        }
    }
}

#Preview {
    PawLoadingOverlay(message: "Signing in...")
}
