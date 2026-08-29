//
//  AppColor.swift
//  PawConnect
//
//  Created by Kyle Baker on 1/11/26.
//

import SwiftUI

/// Brand color tokens, backed by asset-catalog Color Sets so they adapt to
/// light/dark mode automatically. Brand, accent, and semantic hues are
/// constant across modes; only background, surface, text, and border tokens
/// shift. Canonical values: PRODUCT_SPEC.md § Design System Reference.
enum AppColor {
    // MARK: - Primary (for glass tinting) — constant across modes
    static let primarySunset = Color("PrimarySunset", bundle: .main)
    static let primaryTerracotta = Color("PrimaryTerracotta", bundle: .main)

    // MARK: - Secondary — constant across modes
    static let secondarySage = Color("SecondarySage", bundle: .main)
    static let secondaryAmber = Color("SecondaryAmber", bundle: .main)
    static let secondaryPeach = Color("SecondaryPeach", bundle: .main)

    // MARK: - Backgrounds (non-glass content)
    static let backgroundPrimary = Color("BackgroundPrimary", bundle: .main)
    static let backgroundElevated = Color("BackgroundElevated", bundle: .main)

    // MARK: - Text
    static let textPrimary = Color("TextPrimary", bundle: .main)
    static let textSecondary = Color("TextSecondary", bundle: .main)
    static let textTertiary = Color("TextTertiary", bundle: .main)

    // MARK: - Border / divider
    static let border = Color("Border", bundle: .main)

    // MARK: - Semantic (constant across modes)
    static let success = secondarySage
    static let warning = secondaryAmber
    static let error = primaryTerracotta
}
