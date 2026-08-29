//
//  AppRadius.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//

import CoreGraphics

/// Corner radius scale. Canonical values: PRODUCT_SPEC.md § Design System
/// Reference. Use with `RoundedRectangle(cornerRadius:)` and `.clipShape`.
enum AppRadius {
    /// 8pt — input fields, small buttons.
    static let sm: CGFloat = 8
    /// 12pt — cards, primary buttons.
    static let md: CGFloat = 12
    /// 16pt — bottom sheets, large cards.
    static let lg: CGFloat = 16
    /// 9999pt — circular avatars, pills.
    static let full: CGFloat = 9999
}
