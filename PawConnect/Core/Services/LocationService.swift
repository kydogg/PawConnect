//
//  LocationService.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//
//  Wraps CLLocationManager: exposes observable authorization status and the
//  latest location, and handles one-shot location requests + permissions.
//

import CoreLocation
import Observation

@Observable
final class LocationService: NSObject, CLLocationManagerDelegate {
    static let shared = LocationService()

    private let manager = CLLocationManager()

    private(set) var authorizationStatus: CLAuthorizationStatus
    private(set) var currentLocation: CLLocation?
    var error: AppError?

    override private init() {
        authorizationStatus = manager.authorizationStatus
        super.init()
        manager.delegate = self
        manager.desiredAccuracy = kCLLocationAccuracyHundredMeters
    }

    /// Prompt for "when in use" permission if not yet determined.
    func requestPermission() {
        manager.requestWhenInUseAuthorization()
    }

    /// Request a single location fix.
    func requestLocation() {
        manager.requestLocation()
    }

    // MARK: - CLLocationManagerDelegate

    func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        authorizationStatus = manager.authorizationStatus
    }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        currentLocation = locations.last
    }

    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        self.error = .network(underlying: error)
    }
}
