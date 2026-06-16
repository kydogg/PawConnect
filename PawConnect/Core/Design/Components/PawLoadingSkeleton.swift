//
//  PawLoadingSkeleton.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//

import SwiftUI

/// Shimmering placeholder block for list/content loading states. Respects
/// Reduce Motion (renders a static block when enabled).
struct PawLoadingSkeleton: View {
    var cornerRadius: CGFloat = AppRadius.sm

    @State private var isAnimating = false
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    var body: some View {
        RoundedRectangle(cornerRadius: cornerRadius)
            .fill(AppColor.border)
            .overlay {
                if !reduceMotion {
                    GeometryReader { geo in
                        LinearGradient(
                            colors: [.clear, AppColor.backgroundElevated.opacity(0.7), .clear],
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                        .frame(width: geo.size.width * 0.5)
                        .offset(x: isAnimating ? geo.size.width : -geo.size.width * 0.5)
                    }
                }
            }
            .clipShape(RoundedRectangle(cornerRadius: cornerRadius))
            .onAppear {
                guard !reduceMotion else { return }
                withAnimation(.linear(duration: 1.2).repeatForever(autoreverses: false)) {
                    isAnimating = true
                }
            }
            .accessibilityHidden(true)
    }
}

#Preview {
    VStack(alignment: .leading, spacing: AppSpacing.sm) {
        PawLoadingSkeleton().frame(height: 120)
        PawLoadingSkeleton().frame(height: 16)
        PawLoadingSkeleton().frame(width: 200, height: 16)
        PawLoadingSkeleton(cornerRadius: AppRadius.full)
            .frame(width: 60, height: 60)
    }
    .padding()
    .background(AppColor.backgroundPrimary)
}
