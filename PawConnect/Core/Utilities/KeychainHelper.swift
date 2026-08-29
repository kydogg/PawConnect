//
//  KeychainHelper.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//
//  Minimal hand-rolled wrapper over the Keychain for small secrets
//  (auth tokens, etc.). Generic-password items keyed by account string.
//

import Foundation
import Security

enum KeychainHelper {
    /// Store raw data for a key, overwriting any existing value.
    @discardableResult
    static func save(_ data: Data, for key: String) -> Bool {
        let baseQuery: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
        ]
        SecItemDelete(baseQuery as CFDictionary)

        var attributes = baseQuery
        attributes[kSecValueData as String] = data
        attributes[kSecAttrAccessible as String] = kSecAttrAccessibleAfterFirstUnlock

        return SecItemAdd(attributes as CFDictionary, nil) == errSecSuccess
    }

    /// Store a UTF-8 string for a key.
    @discardableResult
    static func save(_ string: String, for key: String) -> Bool {
        guard let data = string.data(using: .utf8) else { return false }
        return save(data, for: key)
    }

    /// Read raw data for a key, or nil if absent.
    static func read(_ key: String) -> Data? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne,
        ]
        var result: AnyObject?
        guard SecItemCopyMatching(query as CFDictionary, &result) == errSecSuccess else {
            return nil
        }
        return result as? Data
    }

    /// Read a UTF-8 string for a key, or nil if absent.
    static func readString(_ key: String) -> String? {
        guard let data = read(key) else { return nil }
        return String(data: data, encoding: .utf8)
    }

    /// Remove the value for a key. Returns true if removed or already absent.
    @discardableResult
    static func delete(_ key: String) -> Bool {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
        ]
        let status = SecItemDelete(query as CFDictionary)
        return status == errSecSuccess || status == errSecItemNotFound
    }
}
