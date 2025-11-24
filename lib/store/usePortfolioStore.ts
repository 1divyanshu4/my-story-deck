import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { PortfolioData, Profile, CTAButton } from "@/types";
import { updateProfile, updatePortfolioTemplate } from "@/lib/actions/portfolio.actions";

interface PortfolioState {
    data: PortfolioData | null;
    isLoading: boolean;
    isSaving: boolean;

    setPortfolio: (data: PortfolioData) => void;
    updateProfile: (profile: Partial<Profile>) => void;
    updateCtaButton: (index: number, button: Partial<CTAButton>) => void;
    updateTemplate: (template: string) => void;
    saveChanges: (portfolioId: string) => Promise<void>;
}

export const usePortfolioStore = create<PortfolioState>()(
    persist(
        immer((set, get) => ({
            data: null,
            isLoading: false,
            isSaving: false,

            setPortfolio: (data) =>
                set((state) => {
                    state.data = data;
                }),

            updateProfile: (profile) =>
                set((state) => {
                    if (state.data) {
                        state.data.profile = { ...state.data.profile, ...profile };
                    }
                }),

            updateCtaButton: (index, button) =>
                set((state) => {
                    if (state.data && state.data.profile.ctaButtons) {
                        if (!state.data.profile.ctaButtons[index]) {
                            state.data.profile.ctaButtons[index] = {
                                id: index === 0 ? "1" : "2",
                                type: index === 0 ? "primary" : "secondary",
                                label: "",
                                scrollTo: ""
                            }
                        }
                        state.data.profile.ctaButtons[index] = {
                            ...state.data.profile.ctaButtons[index],
                            ...button,
                        };
                    }
                }),

            updateTemplate: (template) =>
                set((state) => {
                    if (state.data) {
                        state.data.selectedTemplate = template;
                    }
                }),

            saveChanges: async (portfolioId) => {
                const { data } = get();
                if (!data) return;

                set((state) => {
                    state.isSaving = true;
                });

                try {
                    await updateProfile(portfolioId, data.profile);
                    await updatePortfolioTemplate(portfolioId, data.selectedTemplate);

                } catch (error) {
                    console.error("Failed to save changes:", error);
                } finally {
                    set((state) => {
                        state.isSaving = false;
                    });
                }
            },
        })),
        {
            name: "portfolio-storage",
            partialize: (state) => ({ data: state.data }),
        }
    )
);
