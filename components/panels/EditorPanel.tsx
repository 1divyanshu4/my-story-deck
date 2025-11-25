import React from "react";
import {
  Activity,
  CodeXml,
  Folder,
  GraduationCap,
  LayoutTemplate,
  Mail,
  User,
} from "lucide-react";
import { ProfileForm } from "../forms/Profile";
import { StatsForm } from "../forms/StatsForm";
import { SkillsForm } from "../forms/SkillsForm";
import Templates from "../forms/Templates";
import Stats from "../forms/Stats";
import Skills from "../forms/Skills";
import Journey from "../forms/Journey";
import Projects from "../forms/Projects";
import Contact from "../forms/Contact";
import { usePortfolioStore } from "@/lib/store/usePortfolioStore";
import { useEditorTabStore } from "@/lib/store/useEditorTabStore";
import { Loader2, Save } from "lucide-react";
import { Button } from "../ui/button";
import { PortfolioData } from "@/types";

interface EditorPanelProps {
  portfolioId?: string;
  selectedTemplate?: string;
  portfolioData?: PortfolioData | null;
}

const EditorPanel = ({
  portfolioId,
  selectedTemplate,
  portfolioData,
}: EditorPanelProps) => {
  const { data, saveChanges, isSaving } = usePortfolioStore();
  const { activeTab, setActiveTab } = useEditorTabStore();

  const handleSave = async () => {
    if (portfolioId) {
      await saveChanges(portfolioId);
    }
  };

  if (!data) return <div>Loading...</div>;

  const tabs = [
    { id: "templates" as const, icon: LayoutTemplate, label: "Templates" },
    { id: "profile" as const, icon: User, label: "Profile" },
    { id: "stats" as const, icon: Activity, label: "Stats" },
    { id: "skills" as const, icon: CodeXml, label: "Skills" },
    { id: "journey" as const, icon: GraduationCap, label: "Journey" },
    { id: "projects" as const, icon: Folder, label: "Projects" },
    { id: "contact" as const, icon: Mail, label: "Contact" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "templates":
        return <Templates selectedTemplate={selectedTemplate || "minimalist"} />;
      case "profile":
        return <ProfileForm />;
      case "stats":
        return <StatsForm />;
      case "skills":
        return <SkillsForm />;
      case "journey":
        return <Journey />;
      case "projects":
        return <Projects />;
      case "contact":
        return <Contact />;
      default:
        return <Templates selectedTemplate={selectedTemplate || "minimalist"} />;
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header - Desktop only */}
      <div className="hidden md:flex justify-between items-center w-full pt-3 px-4 pt-1">
        {/* Tab Navigation - Desktop */}
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center p-2 rounded-md transition-all ${
                  activeTab === tab.id
                    ? "bg-white shadow-sm text-blue-700 ring-1 ring-black/5"
                    : "text-slate-500 hover:bg-slate-200 hover:text-slate-700"
                }`}
                title={tab.label}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-2">
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
            Todo Publish Button
          </span>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save
          </Button>
        </div>
      </div>

      {/* Header - Mobile only (Save button only) */}
      <div className="md:hidden flex justify-end items-center w-full pt-3 px-4 pb-2">
        <Button
          size="sm"
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save
        </Button>
      </div>

      {/* Content Area */}
      <div className="flex-1 w-full p-4 overflow-hidden">
        {renderContent()}
      </div>

      {/* Bottom Navigation - Mobile only */}
      <div className="md:hidden border-t bg-white">
        <div className="flex justify-around items-center px-1 py-1.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-md transition-all ${
                  activeTab === tab.id
                    ? "text-blue-700"
                    : "text-slate-500"
                }`}
              >
                <div className={`${activeTab === tab.id ? "scale-110" : ""} transition-transform`}>
                  <Icon size={16} />
                </div>
                <span className="text-[9px] font-medium leading-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
