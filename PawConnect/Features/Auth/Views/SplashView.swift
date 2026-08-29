//
//  SplashView.swift
//  PawConnect
//
//  Created by Kyle Baker on 1/11/26.
//

import SwiftUI

struct SplashView: View {
    @State private var logoScale: CGFloat = 0.8
    @State private var logoOpacity: Double = 0
    @State private var textOpacity: Double = 0

    var onFinished: () -> Void

    var body: some View {
        ZStack {
            // Background
            AppColor.backgroundPrimary
                .ignoresSafeArea()

            VStack(spacing: 16) {
                // Animated Logo Icon
                RoundedRectangle(cornerRadius: 16)
                    .fill(AppColor.primarySunset)
                    .frame(width: 80, height: 80)
                    .overlay {
                        Image(systemName: "pawprint.fill")
                            .font(.system(size: 40, weight: .semibold))
                            .foregroundStyle(.white)
                    }
                    .shadow(color: AppColor.primarySunset.opacity(0.3), radius: 20, y: 10)
                    .scaleEffect(logoScale)
                    .opacity(logoOpacity)

                // App Name
                VStack(spacing: 4) {
                    Text("PawConnect")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                        .foregroundStyle(AppColor.textPrimary)

                    Text("Peace of mind, one paw at a time")
                        .font(.subheadline)
                        .foregroundStyle(AppColor.textSecondary)
                }
                .opacity(textOpacity)
            }
        }
        .onAppear {
            startAnimations()
        }
    }

    private func startAnimations() {
        // Logo scale and fade in
        withAnimation(.spring(response: 0.6, dampingFraction: 0.7)) {
            logoScale = 1.0
            logoOpacity = 1.0
        }

        // Text fade in (delayed)
        withAnimation(.easeOut(duration: 0.4).delay(0.3)) {
            textOpacity = 1.0
        }

        // Dismiss after animation completes
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.8) {
            onFinished()
        }
    }
}

#Preview {
    SplashView {
        print("Splash finished")
    }
}
