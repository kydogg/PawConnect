//
//  CareActivityIcon.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/24/26.
//
//  Care-activity icons for the Live Activity care checklist ship as SF Symbols
//  (no catalog assets). Lock Screen rendering is optimized for SF Symbols —
//  system-tinted and dark-mode-aware. Render via Image(activity:).
//

import SwiftUI

enum CareActivityIcon {
    case medication
    case feeding
    case walk
    case bathroom
    case play

    var systemName: String {
        switch self {
        case .medication: return "pills.fill"
        case .feeding:    return "cup.and.saucer.fill"
        case .walk:       return "figure.walk"
        case .bathroom:   return "tree.fill"
        case .play:       return "tennisball.fill"
        }
    }
}

extension Image {
    init(activity: CareActivityIcon) {
        self.init(systemName: activity.systemName)
    }
}
