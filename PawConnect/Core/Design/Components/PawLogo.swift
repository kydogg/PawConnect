//
//  PawLogo.swift
//  PawConnect
//
//  Created by Kyle Baker on 1/11/26.
//

import SwiftUI

struct PawLogo: View {
    var size: LogoSize = .medium
    var showAppName: Bool = true
    var showTagline: Bool = false

    enum LogoSize {
        case small   // 32pt - for nav bars
        case medium  // 48pt - for welcome screen
        case large   // 80pt - for splash screen

        var iconSize: CGFloat {
            switch self {
            case .small: return 32
            case .medium: return 48
            case .large: return 80
            }
        }

        var cornerRadius: CGFloat {
            switch self {
            case .small: return 8
            case .medium: return 12
            case .large: return 16
            }
        }

        var pawSize: CGFloat {
            switch self {
            case .small: return 18
            case .medium: return 24
            case .large: return 40
            }
        }
    }

    var body: some View {
        VStack(spacing: showAppName ? 12 : 0) {
            // Logo Icon
            RoundedRectangle(cornerRadius: size.cornerRadius)
                .fill(AppColors.primarySunset)
                .frame(width: size.iconSize, height: size.iconSize)
                .overlay {
                    Image(systemName: "pawprint.fill")
                        .font(.system(size: size.pawSize, weight: .semibold))
                        .foregroundStyle(.white)
                }

            if showAppName {
                VStack(spacing: 4) {
                    Text("PawConnect")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                        .foregroundStyle(AppColors.textPrimary)

                    if showTagline {
                        Text("Peace of mind, one paw at a time")
                            .font(.body)
                            .foregroundStyle(AppColors.textSecondary)
                    }
                }
            }
        }
    }
}

#Preview("Large with Tagline") {
    PawLogo(size: .large, showAppName: true, showTagline: true)
}

#Preview("Medium") {
    PawLogo(size: .medium, showAppName: true, showTagline: false)
}

#Preview("Small - Icon Only") {
    PawLogo(size: .small, showAppName: false)
}
