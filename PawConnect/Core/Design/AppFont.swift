//
//  AppFont.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//

import SwiftUI

/// Typography tokens, mapped to Apple's semantic fonts so the app respects
/// Dynamic Type. The design-intent point sizes live in PRODUCT_SPEC.md §
/// Design System Reference — do NOT hardcode them; use these tokens.
///
/// Usage: `Text("Welcome").font(.displayLarge)`
extension Font {
    /// 34pt Bold — hero headlines, welcome screens.
    static let displayLarge = Font.largeTitle.weight(.bold)
    /// 24pt Bold — screen titles.
    static let headingH1 = Font.title.weight(.bold)
    /// 20pt Semibold — section headers.
    static let headingH2 = Font.title2.weight(.semibold)
    /// 17pt Semibold — card titles, emphasized text.
    static let headingH3 = Font.headline
    /// 17pt Regular — primary body text.
    static let bodyLarge = Font.body
    /// 15pt Regular — secondary body text.
    static let bodyRegular = Font.subheadline
    /// 13pt Regular — captions, metadata.
    static let bodySmall = Font.footnote
    /// 17pt Semibold — primary button labels.
    static let buttonLarge = Font.headline
    /// 15pt Medium — secondary button labels.
    static let buttonSmall = Font.subheadline.weight(.medium)
    /// 12pt Regular — timestamps, labels, fine print.
    static let caption = Font.caption
}
