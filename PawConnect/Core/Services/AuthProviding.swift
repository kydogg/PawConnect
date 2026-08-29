//
//  AuthProviding.swift
//  PawConnect
//
//  Seam for injecting auth into ViewModels so their action paths can be
//  exercised in unit tests without the network. AuthManager is the one
//  production conformer.
//

import Foundation

protocol AuthProviding {
    func signIn(email: String, password: String) async throws
    func signUp(email: String, password: String, fullName: String) async throws
    func signOut() async throws
}

extension AuthManager: AuthProviding {}
