//
//  AssetImage.swift
//  PawConnect
//
//  Created by Kyle Baker on 3/14/26.
//

import SwiftUI

/// Type-safe references to image assets in `Assets.xcassets`.
///
/// Each case's raw value is the imageset name. Names and categories mirror
/// the Asset Catalog Folder Structure in `docs/PawConnect-Asset-Library.md`
/// (catalog folders are organizational only — they do not namespace the
/// asset name). `AppIcon` is intentionally omitted; it is referenced by the
/// system, not through this enum.
///
/// Skeleton: cases are defined ahead of the art. Imagesets are imported as
/// assets land (see the asset pipeline in the master checklist); until then a
/// missing asset simply renders as an empty image.
enum AssetImage: String, CaseIterable {
    // MARK: - Brand
    case logoLockup = "LogoLockup"                      // ASSET-002
    case logoIcon = "LogoIcon"                          // ASSET-003

    // MARK: - Onboarding
    case welcomeHero = "WelcomeHero"                    // ASSET-010
    case confetti = "Confetti"                          // ASSET-011
    case successCheckmark = "SuccessCheckmark"          // ASSET-012
    case welcomeHeroCat = "WelcomeHeroCat"              // ASSET-013

    // MARK: - Empty States
    case emptyNoPets = "EmptyNoPets"                    // ASSET-020
    case emptyNoSitters = "EmptyNoSitters"              // ASSET-021
    case emptyNoMessages = "EmptyNoMessages"            // ASSET-022
    case emptyNoBookings = "EmptyNoBookings"            // ASSET-023
    case emptyNoReviews = "EmptyNoReviews"              // ASSET-024
    case emptyNoRecommendations = "EmptyNoRecommendations" // ASSET-025

    // MARK: - Status & Feedback
    case feedbackSuccess = "FeedbackSuccess"            // ASSET-040
    case feedbackError = "FeedbackError"                // ASSET-041
    case feedbackWarning = "FeedbackWarning"            // ASSET-042

    // MARK: - Trust Badges
    case badgeVerified = "BadgeVerified"                // ASSET-043
    case badgeBackgroundCheck = "BadgeBackgroundCheck"  // ASSET-045

    // MARK: - Status
    case mailIcon = "MailIcon"                          // ASSET-044

    // Live Activity icons (ASSET-050–054) ship as SF Symbols via
    // CareActivityIcon / Image(activity:) — no catalog assets.

    // MARK: - Profile Placeholders
    case dogAvatar = "DogAvatar"                        // ASSET-060
    case catAvatar = "CatAvatar"                        // ASSET-061
    case personAvatar = "PersonAvatar"                  // ASSET-062
    case petHeroPlaceholder = "PetHeroPlaceholder"      // ASSET-063
    case sitterHeroPlaceholder = "SitterHeroPlaceholder" // ASSET-064
    case otherPetAvatar = "OtherPetAvatar"              // ASSET-065

    // MARK: - Map & Location
    case pricePin = "PricePin"                          // ASSET-070
    case pricePinSelected = "PricePinSelected"          // ASSET-071
}

extension AssetImage {
    /// The SwiftUI `Image` for this asset.
    var image: Image {
        Image(rawValue, bundle: .main)
    }
}
