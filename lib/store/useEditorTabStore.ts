import { create } from "zustand";

type EditorTab = "templates" | "profile" | "stats" | "skills" | "journey" | "projects" | "contact";

interface EditorTabState {
    activeTab: EditorTab;
    setActiveTab: (tab: EditorTab) => void;
}

export const useEditorTabStore = create<EditorTabState>((set) => ({
    activeTab: "templates",
    setActiveTab: (tab) => set({ activeTab: tab }),
}));
