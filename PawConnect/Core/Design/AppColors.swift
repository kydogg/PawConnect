//
//  AppColors.swift
//  PawConnect
//
//  Created by Kyle Baker on 1/11/26.
//

import SwiftUI

enum AppColors {
    // MARK: - Primary (for glass tinting)
    static let primarySunset = Color(hex: "#EA580C")
    static let primaryTerracotta = Color(hex: "#DC2626")

    // MARK: - Secondary
    static let secondarySage = Color(hex: "#059669")
    static let secondaryAmber = Color(hex: "#F59E0B")
    static let secondaryPeach = Color(hex: "#FB923C")

    // MARK: - Backgrounds (non-glass content)
    static let backgroundPrimary = Color(hex: "#FFFBF5")
    static let backgroundElevated = Color.white

    // MARK: - Text
    static let textPrimary = Color(hex: "#1F1B17")
    static let textSecondary = Color(hex: "#5D4E37")
    static let textTertiary = Color(hex: "#B08968")

    // MARK: - Neutrals
    static let neutral100 = Color(hex: "#F5F5F4")
    static let neutral150 = Color(hex: "#E7E5E4")
    static let neutral900 = Color(hex: "#1C1917")

    // MARK: - Semantic
    static let success = secondarySage
    static let warning = secondaryAmber
    static let error = primaryTerracotta
}
