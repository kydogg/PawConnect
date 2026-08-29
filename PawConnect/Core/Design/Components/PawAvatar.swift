//
//  PawAvatar.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//

import SwiftUI

/// Circular avatar with three standard sizes and an SF Symbol placeholder
/// fallback. Pass a resolved `Image`; async loading is the caller's concern.
struct PawAvatar: View {
    enum Size {
        case small, medium, large

        /// Diameter in points (PRODUCT_SPEC § Standard Components).
        var dimension: CGFloat {
            switch self {
            case .small: 40
            case .medium: 60
            case .large: 100
            }
        }
    }

    var image: Image?
    var size: Size = .medium
    var fallbackSystemImage: String = "person.crop.circle.fill"

    var body: some View {
        Group {
            if let image {
                image
                    .resizable()
                    .scaledToFill()
            } else {
                Image(systemName: fallbackSystemImage)
                    .resizable()
                    .scaledToFit()
                    .padding(size.dimension * 0.18)
                    .foregroundStyle(AppColor.textTertiary)
            }
        }
        .frame(width: size.dimension, height: size.dimension)
        .background(AppColor.backgroundElevated)
        .clipShape(Circle())
        .overlay(Circle().stroke(AppColor.border, lineWidth: 1))
    }
}

#Preview {
    HStack(spacing: AppSpacing.md) {
        PawAvatar(size: .small)
        PawAvatar(size: .medium)
        PawAvatar(image: Image(systemName: "dog.fill"), size: .large)
    }
    .padding()
    .background(AppColor.backgroundPrimary)
}
