//
//  ComponentGallery.swift
//  PawConnect
//
//  Created by Kyle Baker on 6/16/26.
//
//  Debug-only visual catalog of every shared component in its states.
//  Serves as a lightweight visual-regression check while building screens.
//

#if DEBUG
import SwiftUI

struct ComponentGallery: View {
    @State private var emptyText = ""
    @State private var filledText = "Buddy"
    @State private var errorText = "invalid"

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: AppSpacing.xl) {
                    buttonsSection
                    textFieldSection
                    cardSection
                    alertsSection
                    avatarsSection
                    progressSection
                    emptyStateSection
                    skeletonSection
                }
                .padding(AppSpacing.md)
            }
            .background(AppColor.backgroundPrimary)
            .navigationTitle("Component Gallery")
        }
    }

    // MARK: - Sections

    private var buttonsSection: some View {
        section("Buttons") {
            VStack(spacing: AppSpacing.sm) {
                Button("Primary") {}.buttonStyle(.primary)
                Button("Loading") {}.buttonStyle(.primary(isLoading: true))
                Button("Disabled") {}.buttonStyle(.primary).disabled(true)
                Button("Secondary") {}.buttonStyle(.secondary)
                Button("Tertiary / text") {}.buttonStyle(.text)
            }
        }
    }

    private var textFieldSection: some View {
        section("Text Field") {
            VStack(spacing: AppSpacing.md) {
                PawTextField(label: "Empty", text: $emptyText, placeholder: "Enter text")
                PawTextField(label: "Filled", text: $filledText)
                PawTextField(label: "Secure", text: $filledText, isSecure: true)
                PawTextField(label: "With error", text: $errorText, error: "Please enter a valid email")
            }
        }
    }

    private var cardSection: some View {
        section("Card") {
            PawCard {
                VStack(alignment: .leading, spacing: AppSpacing.xs) {
                    Text("Card title").font(.headingH3).foregroundStyle(AppColor.textPrimary)
                    Text("Elevated surface with card shadow.")
                        .font(.bodyRegular).foregroundStyle(AppColor.textSecondary)
                }
            }
        }
    }

    private var alertsSection: some View {
        section("Alerts") {
            VStack(spacing: AppSpacing.sm) {
                PawAlert(style: .success, title: "Success", message: "Booking confirmed.")
                PawAlert(style: .warning, title: "Warning", message: "Slow to respond.")
                PawAlert(style: .error, title: "Error", message: "Something went wrong.", onDismiss: {})
                PawAlert(style: .info, title: "Info", message: "A new feature is available.")
            }
        }
    }

    private var avatarsSection: some View {
        section("Avatars") {
            HStack(spacing: AppSpacing.md) {
                PawAvatar(size: .small)
                PawAvatar(size: .medium)
                PawAvatar(image: Image(systemName: "cat.fill"), size: .large)
            }
        }
    }

    private var progressSection: some View {
        section("Progress Indicator") {
            VStack(spacing: AppSpacing.md) {
                PawProgressIndicator(currentStep: 1, totalSteps: 3)
                PawProgressIndicator(currentStep: 3, totalSteps: 3)
            }
        }
    }

    private var emptyStateSection: some View {
        section("Empty State") {
            PawEmptyState(
                systemImage: "pawprint.circle.fill",
                title: "No pets yet",
                message: "Add your first furry family member.",
                actionTitle: "Add a Pet",
                action: {}
            )
        }
    }

    private var skeletonSection: some View {
        section("Loading Skeleton") {
            VStack(alignment: .leading, spacing: AppSpacing.sm) {
                PawLoadingSkeleton().frame(height: 80)
                PawLoadingSkeleton().frame(height: 16)
                PawLoadingSkeleton().frame(width: 200, height: 16)
            }
        }
    }

    // MARK: - Helpers

    @ViewBuilder
    private func section(_ title: String, @ViewBuilder content: () -> some View) -> some View {
        VStack(alignment: .leading, spacing: AppSpacing.sm) {
            Text(title)
                .font(.headingH2)
                .foregroundStyle(AppColor.textPrimary)
            content()
        }
    }
}

#Preview {
    ComponentGallery()
}
#endif
