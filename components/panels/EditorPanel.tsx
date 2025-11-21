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
import Profile from "../forms/Profile";
import Templates from "../forms/Templates";
import Stats from "../forms/Stats";
import Skills from "../forms/Skills";
import Journey from "../forms/Journey";
import Projects from "../forms/Projects";
import Contact from "../forms/Contact";

const EditorPanel = () => {
  return (
    <div className="flex flex-col h-full w-full items-center justify-start">
      <Tabs defaultValue="templates" className="h-full w-full">
        <TabsList className="">
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
          <Templates />
        </TabsContent>
        <TabsContent value="profile">
          <Profile />
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
  );
};

export default EditorPanel;
