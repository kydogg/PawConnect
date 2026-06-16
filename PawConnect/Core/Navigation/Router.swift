//
//  Router.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//
//  Observable wrapper around a NavigationStack path. Inject per flow and
//  bind to a NavigationStack(path:). Push any Hashable Route value.
//

import SwiftUI

@Observable
final class Router {
    var path = NavigationPath()

    func push(_ route: some Hashable) {
        path.append(route)
    }

    func pop() {
        guard !path.isEmpty else { return }
        path.removeLast()
    }

    func popToRoot() {
        path = NavigationPath()
    }
}
