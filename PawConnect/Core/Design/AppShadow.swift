//
//  AppShadow.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//

import SwiftUI

/// Elevation tokens. Canonical values: PRODUCT_SPEC.md § Design System
/// Reference. Apply via the `.cardShadow()`, `.floatShadow()`, and
/// `.modalShadow()` view modifiers.
struct AppShadow: ViewModifier {
    enum Style {
        /// Cards, elevated surfaces — 0 2pt 8pt, 8% black.
        case card
        /// Floating elements, dropdowns — 0 4pt 16pt, 12% black.
        case float
        /// Modals, bottom sheets — 0 8pt 24pt, 16% black.
        case modal

        var opacity: Double {
            switch self {
            case .card: 0.08
            case .float: 0.12
            case .modal: 0.16
            }
        }

        var radius: CGFloat {
            switch self {
            case .card: 8
            case .float: 16
            case .modal: 24
            }
        }

        var yOffset: CGFloat {
            switch self {
            case .card: 2
            case .float: 4
            case .modal: 8
            }
        }
    }

    let style: Style

    func body(content: Content) -> some View {
        content.shadow(
            color: .black.opacity(style.opacity),
            radius: style.radius,
            x: 0,
            y: style.yOffset
        )
    }
}

extension View {
    /// Card elevation — for cards and elevated surfaces.
    func cardShadow() -> some View { modifier(AppShadow(style: .card)) }
    /// Float elevation — for floating elements and dropdowns.
    func floatShadow() -> some View { modifier(AppShadow(style: .float)) }
    /// Modal elevation — for modals and bottom sheets.
    func modalShadow() -> some View { modifier(AppShadow(style: .modal)) }
}
