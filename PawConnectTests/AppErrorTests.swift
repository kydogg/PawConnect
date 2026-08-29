//
//  AppErrorTests.swift
//  PawConnectTests
//

import Foundation
import Testing
@testable import PawConnect

@Suite struct AppErrorTests {
    @Test func descriptionsMatchSpecCopy() {
        #expect(AppError.network(underlying: URLError(.timedOut)).errorDescription
            == "Connection error. Please check your internet.")
        #expect(AppError.auth(message: "verbatim").errorDescription == "verbatim")
        #expect(AppError.validation(field: "email", message: "msg").errorDescription == "msg")
        #expect(AppError.notFound.errorDescription == "Not found.")
        #expect(AppError.unknown.errorDescription == "Something went wrong. Please try again.")
    }
}
