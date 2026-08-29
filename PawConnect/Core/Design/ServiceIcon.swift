//
//  ServiceIcon.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/22/26.
//
//  Service-type icons ship as SF Symbols (no catalog assets). System-tinted,
//  Dynamic Type-aware, and dark-mode-aware. Render via Image(service:).
//

import SwiftUI

enum ServiceIcon {
    case walking
    case dropIn
    case sitting
    case boarding
    case daycare

    var systemName: String {
        switch self {
        case .walking:  return "figure.walk.motion"
        case .dropIn:   return "door.left.hand.open"
        case .sitting:  return "house.and.flag.fill"
        case .boarding: return "house.lodge.fill"
        case .daycare:  return "tennisball.fill"
        }
    }
}

extension Image {
    init(service: ServiceIcon) {
        self.init(systemName: service.systemName)
    }
}
