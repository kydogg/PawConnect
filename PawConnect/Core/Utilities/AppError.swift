//
//  AppError.swift
//  PawConnect
//
//  Created by Kyle Baker on 1/11/26.
//

import Foundation

enum AppError: LocalizedError {
    case network(underlying: Error)
    case auth(message: String)
    case validation(field: String, message: String)
    case server(message: String)
    case notFound
    case unknown

    var errorDescription: String? {
        switch self {
        case .network:
            return "Connection error. Please check your internet."
        case .auth(let message):
            return message
        case .validation(_, let message):
            return message
        case .server(let message):
            return message
        case .notFound:
            return "Not found."
        case .unknown:
            return "Something went wrong. Please try again."
        }
    }
}
