//
//  AssetGallery.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/17/26.
//
//  Debug-only catalog of imported image assets, rendered at a representative
//  size. Use to verify imagesets resolve (incl. light/dark) while building.
//

#if DEBUG
import SwiftUI

struct AssetGallery: View {
    /// Assets currently imported into Assets.xcassets. Add cases here as more
    /// art lands so they show up in the gallery.
    private let assets: [AssetImage] = [
        .welcomeHero,
        .welcomeHeroCat,
        .confetti,
        .successCheckmark,
        .mailIcon,
        .emptyNoMessages,
        .emptyNoReviews,
        .emptyNoRecommendations,
    ]

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: AppSpacing.lg) {
                    ForEach(assets, id: \.self) { asset in
                        VStack(spacing: AppSpacing.sm) {
                            asset.image
                                .resizable()
                                .scaledToFit()
                                .frame(maxWidth: .infinity)
                                .frame(height: 160)

                            Text(asset.rawValue)
                                .font(.caption)
                                .foregroundStyle(AppColor.textTertiary)
                        }
                        .padding(AppSpacing.md)
                        .frame(maxWidth: .infinity)
                        .background(AppColor.backgroundElevated)
                        .clipShape(RoundedRectangle(cornerRadius: AppRadius.md))
                        .cardShadow()
                    }
                }
                .padding(AppSpacing.md)
            }
            .background(AppColor.backgroundPrimary)
            .navigationTitle("Asset Gallery")
        }
    }
}

#Preview {
    AssetGallery()
}
#endif
