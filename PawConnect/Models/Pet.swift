//
//  Pet.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//
//  Mirrors public.pets (supabase/migrations/0001_initial_schema.sql).
//

import Foundation

/// SQL: pet_species ENUM ('dog', 'cat', 'other').
enum PetSpecies: String, Codable, Hashable, CaseIterable {
    case dog
    case cat
    case other
}

/// SQL: pet_sex ENUM ('male', 'female', 'unknown').
enum PetSex: String, Codable, Hashable, CaseIterable {
    case male
    case female
    case unknown
}

/// SQL: pets.vet_info JSONB — { "clinic_name", "phone", "doctor_name" }.
struct VetInfo: Codable, Hashable {
    var clinicName: String?
    var phone: String?
    var doctorName: String?

    enum CodingKeys: String, CodingKey {
        case clinicName = "clinic_name"
        case phone
        case doctorName = "doctor_name"
    }
}

struct Pet: Codable, Identifiable, Hashable {
    let id: UUID
    var ownerID: UUID
    var name: String
    var species: PetSpecies
    var breed: String?
    /// In years; 0 for < 1 year.
    var age: Int
    /// In pounds.
    var weight: Int?
    var sex: PetSex
    var avatarURL: String?
    var specialInstructions: String?
    var vetInfo: VetInfo?

    let createdAt: Date
    var updatedAt: Date

    enum CodingKeys: String, CodingKey {
        case id
        case ownerID = "owner_id"
        case name
        case species
        case breed
        case age
        case weight
        case sex
        case avatarURL = "avatar_url"
        case specialInstructions = "special_instructions"
        case vetInfo = "vet_info"
        case createdAt = "created_at"
        case updatedAt = "updated_at"
    }
}
