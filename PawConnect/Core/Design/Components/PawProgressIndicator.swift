//
//  PawProgressIndicator.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//

import SwiftUI

/// Segmented progress bar for multi-step flows (e.g. onboarding). Completed
/// segments use the brand accent; remaining segments use the border color.
struct PawProgressIndicator: View {
    /// 1-based index of the current step.
    let currentStep: Int
    let totalSteps: Int
    var showsLabel: Bool = true

    var body: some View {
        VStack(alignment: .leading, spacing: AppSpacing.sm) {
            HStack(spacing: AppSpacing.xs) {
                ForEach(0 ..< max(totalSteps, 0), id: \.self) { index in
                    Capsule()
                        .fill(index < currentStep ? AppColor.primarySunset : AppColor.border)
                        .frame(height: 6)
                }
            }

            if showsLabel {
                Text("Step \(min(currentStep, totalSteps)) of \(totalSteps)")
                    .font(.caption)
                    .foregroundStyle(AppColor.textTertiary)
            }
        }
        .animation(.easeInOut, value: currentStep)
    }
}

#Preview {
    VStack(spacing: AppSpacing.xl) {
        PawProgressIndicator(currentStep: 1, totalSteps: 3)
        PawProgressIndicator(currentStep: 2, totalSteps: 3)
        PawProgressIndicator(currentStep: 5, totalSteps: 5, showsLabel: false)
    }
    .padding()
    .background(AppColor.backgroundPrimary)
}
