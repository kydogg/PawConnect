//
//  ImageUploadService.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//
//  Uploads image data to Supabase Storage and returns a public URL.
//

import Foundation
import Supabase

final class ImageUploadService {
    static let shared = ImageUploadService()

    private init() {}

    /// Upload `data` to `bucket` at `path`; returns the public URL.
    @discardableResult
    func upload(
        _ data: Data,
        to bucket: String,
        path: String,
        contentType: String = "image/jpeg"
    ) async throws -> URL {
        let storage = SupabaseClient.shared.client.storage.from(bucket)
        do {
            try await storage.upload(
                path,
                data: data,
                options: FileOptions(contentType: contentType, upsert: true)
            )
            return try storage.getPublicURL(path: path)
        } catch {
            throw AppError.network(underlying: error)
        }
    }
}
