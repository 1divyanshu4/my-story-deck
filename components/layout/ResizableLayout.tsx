"use client";

import React, { useState, useEffect } from "react";
import { Smartphone, Tablet, Monitor, Code } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import EditorPanel from "../panels/EditorPanel";
import { Separator } from "../ui/separator";
import ResponsivePreview from "./ResponsivePreview";
import { PreviewPanel } from "../panels/PreviewPanel";
import { PortfolioData } from "@/types";
import StoreInitializer from "../store/StoreInitializer";

interface LayoutSwitcherProps {
  portfolioId?: string;
  selectedTemplate?: string;
  portfolioData?: PortfolioData | null;
}

export default function LayoutSwitcher({
  portfolioId,
  selectedTemplate,
  portfolioData,
}: LayoutSwitcherProps) {
 
  const [layoutMode, setLayoutMode] = useState("tab");

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 1024) {
          setLayoutMode((prev) =>
            prev === "tab" || prev === "mobile" ? "editor" : prev
          );
        } else {
          setLayoutMode((prev) => (prev === "editor" ? "tab" : prev));
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getPanelStyles = () => {
    switch (layoutMode) {
      case "editor":
        return {
          editor: "w-full",
          preview: "w-0 opacity-0 pointer-events-none",
        };
      case "mobile":
        return {
          editor: "w-[75%]",
          preview: "w-[25%] opacity-100",
        };
      case "desktop":
        return {
          editor: "w-0 opacity-0 overflow-hidden",
          preview: "w-full opacity-100",
        };
      case "tab":
      default:
        return {
          editor: "w-[50%]",
          preview: "w-[50%] opacity-100",
        };
    }
  };

  const styles = getPanelStyles();

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-slate-50 text-slate-900">
      {portfolioData && <StoreInitializer data={portfolioData} />}
      {/* --- Toolbar --- */}
      <div className="h-14 border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 bg-white shrink-0">
        <div className="font-semibold flex items-center gap-2 text-slate-800">
          <Code size={20} className="text-blue-600" />
          <span>Workspace</span>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 gap-1">
          <ToolbarButton
            active={layoutMode === "editor"}
            onClick={() => setLayoutMode("editor")}
            icon={<Code size={16} />}
            label="Editor"
            className="lg:hidden"
          />
          <ToolbarButton
            active={layoutMode === "mobile"}
            onClick={() => setLayoutMode("mobile")}
            icon={<Smartphone size={16} />}
            label="Mobile"
            className="hidden lg:flex"
          />
          <ToolbarButton
            active={layoutMode === "tab"}
            onClick={() => setLayoutMode("tab")}
            icon={<Tablet size={16} />}
            label="Tab"
            className="hidden lg:flex"
          />
          <ToolbarButton
            active={layoutMode === "desktop"}
            onClick={() => setLayoutMode("desktop")}
            icon={<Monitor size={16} />}
            label="Preview"
          />
        </div>

        <div className="px-2">
          <UserButton />
        </div>
      </div>

      {/* --- Main Layout Area --- */}
      <div className="flex-1 flex w-full overflow-hidden relative">
        {/* Editor Panel */}
        <div
          className={`h-full transition-all duration-500 ease-in-out ${styles.editor}`}
        >
          <div className="w-full h-full">
            <EditorPanel
              portfolioId={portfolioId}
              selectedTemplate={selectedTemplate}
              portfolioData={portfolioData}
            />
          </div>
        </div>


        {/* Preview Panel */}
        <div
          className={`h-full transition-all duration-500 ease-in-out bg-slate-50 ${styles.preview}`}
        >
          <ResponsivePreview>
            <PreviewPanel />
          </ResponsivePreview>
        </div>
      </div>
    </div>
  );
}

interface ToolbarButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  className?: string;
}
// Helper component to clean up the toolbar JSX
const ToolbarButton = ({
  active,
  onClick,
  icon,
  label,
  className = "flex",
}: ToolbarButtonProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${
      active
        ? "bg-white shadow-sm text-blue-700 ring-1 ring-black/5"
        : "text-slate-500 hover:bg-slate-200 hover:text-slate-700"
    } ${className}`}
    title={label}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </button>
);
