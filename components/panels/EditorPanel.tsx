import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
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
import Templates from "../forms/Templates";
import Stats from "../forms/Stats";
import Skills from "../forms/Skills";
import Journey from "../forms/Journey";
import Projects from "../forms/Projects";
import Contact from "../forms/Contact";
import { usePortfolioStore } from "@/lib/store/usePortfolioStore";
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

  const handleSave = async () => {
    if (portfolioId) {
      await saveChanges(portfolioId);
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-full w-full items-center justify-start ">
      <div className="flex justify-between items-center text-sm text-gray-500 w-full pt-4 px-6">
        <span className="font-medium">Preview Mode</span>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
            Live Interactive
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
      <div className="flex flex-col h-full w-full items-center justify-start p-4">
        <Tabs defaultValue="templates" className="h-full w-full gap-2">
          <TabsList className="z-10 bg-gray-300 h-10">
            <TabsTrigger value="templates">
              <LayoutTemplate />
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User />
            </TabsTrigger>
            <TabsTrigger value="stats">
              <Activity />
            </TabsTrigger>
            <TabsTrigger value="skills">
              <CodeXml />
            </TabsTrigger>
            <TabsTrigger value="journey">
              <GraduationCap />
            </TabsTrigger>
            <TabsTrigger value="projects">
              <Folder />
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Mail />
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="templates">
            <Templates
              selectedTemplate={selectedTemplate || "minimalist"}
            />
          </TabsContent>
          <TabsContent value="profile">
            <ProfileForm />
          </TabsContent>
          <TabsContent value="stats">
            <StatsForm />
          </TabsContent>
          <TabsContent value="skills">
            <Skills />
          </TabsContent>
          <TabsContent value="journey">
            <Journey />
          </TabsContent>
          <TabsContent value="projects">
            <Projects />
          </TabsContent>
          <TabsContent value="contact">
            <Contact />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EditorPanel;
