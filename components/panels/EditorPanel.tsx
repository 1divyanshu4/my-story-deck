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
import Templates from "../forms/Templates";
import Stats from "../forms/Stats";
import Skills from "../forms/Skills";
import Journey from "../forms/Journey";
import Projects from "../forms/Projects";
import Contact from "../forms/Contact";
import { initialPortfolioData } from "@/data/testData";

interface EditorPanelProps {
  portfolioId?: string;
  selectedTemplate?: string;
}

const EditorPanel = ({ portfolioId, selectedTemplate }: EditorPanelProps) => {
  return (
    <div className="flex flex-col h-full w-full items-center justify-start ">
      <div className="flex justify-between items-center text-sm text-gray-500 w-full pt-4 px-6">
        <span className="font-medium">Preview Mode</span>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
          Live Interactive
        </span>
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
              portfolioId={portfolioId || ""}
              selectedTemplate={selectedTemplate || "minimalist"}
            />
          </TabsContent>
          <TabsContent value="profile">
            <ProfileForm
              data={initialPortfolioData.profile}
              onProfileChange={() => {}}
              onCtaChange={() => {}}
            />
          </TabsContent>
          <TabsContent value="stats">
            <Stats />
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
