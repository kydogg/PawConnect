//
//  AppSpacing.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//

import CoreGraphics

/// Spacing scale (8pt grid). Canonical values: PRODUCT_SPEC.md § Design
/// System Reference. Use for padding, stack spacing, and layout gaps.
enum AppSpacing {
    /// 2pt — hairline gaps.
    static let xxs: CGFloat = 2
    /// 4pt — tight element spacing.
    static let xs: CGFloat = 4
    /// 8pt — compact spacing.
    static let sm: CGFloat = 8
    /// 16pt — standard spacing between elements.
    static let md: CGFloat = 16
    /// 24pt — section padding, comfortable gaps.
    static let lg: CGFloat = 24
    /// 32pt — large section spacing.
    static let xl: CGFloat = 32
    /// 48pt — screen section breaks.
    static let xxl: CGFloat = 48
}
