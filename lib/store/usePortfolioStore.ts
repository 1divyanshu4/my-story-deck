import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { PortfolioData, Profile, CTAButton, JourneyItem, Project } from "@/types";
import { updateProfile, updatePortfolioTemplate, updateStats, updateSkills, updateJourney, updateProjects } from "@/lib/actions/portfolio.actions";

interface PortfolioState {
    data: PortfolioData | null;
    isLoading: boolean;
    isSaving: boolean;

    setPortfolio: (data: PortfolioData) => void;
    updateProfile: (profile: Partial<Profile>) => void;
    updateCtaButton: (index: number, button: Partial<CTAButton>) => void;
    updateTemplate: (template: string) => void;
    addStat: (stat: any) => void;
    removeStat: (index: number) => void;
    addSkill: (skill: any) => void;
    removeSkill: (index: number) => void;
    addJourneyItem: (item: JourneyItem) => void;
    removeJourneyItem: (index: number) => void;
    addProject: (project: Project) => void;
    removeProject: (index: number) => void;
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

            addStat: (stat) =>
                set((state) => {
                    if (state.data) {
                        if (!state.data.stats) {
                            state.data.stats = [];
                        }
                        state.data.stats.push(stat);
                    }
                }),

            removeStat: (index) =>
                set((state) => {
                    if (state.data && state.data.stats) {
                        state.data.stats.splice(index, 1);
                    }
                }),

            addSkill: (skill) =>
                set((state) => {
                    if (state.data) {
                        if (!state.data.skills) {
                            state.data.skills = [];
                        }
                        state.data.skills.push(skill);
                    }
                }),

            removeSkill: (index) =>
                set((state) => {
                    if (state.data && state.data.skills) {
                        state.data.skills.splice(index, 1);
                    }
                }),

            addJourneyItem: (item) =>
                set((state) => {
                    if (state.data) {
                        if (!state.data.journey) {
                            state.data.journey = [];
                        }
                        state.data.journey.push(item);
                    }
                }),

            removeJourneyItem: (index) =>
                set((state) => {
                    if (state.data && state.data.journey) {
                        state.data.journey.splice(index, 1);
                    }
                }),

            addProject: (project) =>
                set((state) => {
                    if (state.data) {
                        if (!state.data.projects) {
                            state.data.projects = [];
                        }
                        state.data.projects.push(project);
                    }
                }),

            removeProject: (index) =>
                set((state) => {
                    if (state.data && state.data.projects) {
                        state.data.projects.splice(index, 1);
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
                    await updateStats(portfolioId, data.stats);
                    await updateSkills(portfolioId, data.skills);
                    await updateJourney(portfolioId, data.journey);
                    await updateProjects(portfolioId, data.projects);

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
