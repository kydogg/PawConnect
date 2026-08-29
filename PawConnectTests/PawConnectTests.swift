//
//  PawConnectTests.swift
//  PawConnectTests
//
//  Smoke test proving the hosted test bundle loads the app module.
//

import Testing
@testable import PawConnect

struct PawConnectTests {
    @Test func appModuleIsLoadable() {
        #expect(Constants.App.name == "PawConnect")
    }
}
