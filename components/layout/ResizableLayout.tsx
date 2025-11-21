"use client";

import React, { useState } from "react";
import { Smartphone, Tablet, Monitor, Code } from "lucide-react";
import { PreviewPanel } from "../panels/PreviewPanel";
import EditorPanel from "../panels/EditorPanel";
import ResponsivePreview from "./ResponsivePreview";
import { initialPortfolioData } from "@/data/testData";
import { Separator } from "../ui/separator";
import { UserButton } from "@clerk/nextjs";

export default function LayoutSwitcher() {
  // Modes: 'mobile' (75/25), 'tab' (50/50), 'desktop' (0/100 - Fullscreen Preview)
  const [layoutMode, setLayoutMode] = useState("tab");

  // Calculate widths based on current mode
  const getPanelStyles = () => {
    switch (layoutMode) {
      case "mobile":
        return {
          editor: "w-[75%]",
          preview: "w-[25%]",
          editorOpacity: "opacity-100",
          previewOpacity: "opacity-100",
        };
      case "desktop":
        return {
          editor: "w-[0%]",
          preview: "w-[100%]",
          editorOpacity: "opacity-0 overflow-hidden",
          previewOpacity: "opacity-100",
        };
      case "tab":
      default:
        return {
          editor: "w-[50%]",
          preview: "w-[50%]",
          editorOpacity: "opacity-100",
          previewOpacity: "opacity-100",
        };
    }
  };

  const styles = getPanelStyles();

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* --- Mode Switcher Toolbar --- */}
      <div className="h-14 border-b  flex items-center justify-between px-6">
        <div className=" font-semibold flex items-center gap-2">
          <Code size={20} className="text-blue-900" />
          <span>Workspace</span>
        </div>
        <div className="flex bg-slate-200 p-1 rounded-lg border border-slate-200 gap-1">
          <button
            onClick={() => setLayoutMode("mobile")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${
              layoutMode === "mobile"
                ? "bg-white shadow-sm"
                : " hover:bg-slate-50"
            }`}
            title="Mobile Layout (75% Editor / 25% Preview)"
          >
            <Smartphone size={16} />
            <span className="hidden sm:inline">Mobile</span>
          </button>

          <button
            onClick={() => setLayoutMode("tab")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${
              layoutMode === "tab" ? "bg-white shadow-sm" : " hover:bg-slate-50"
            }`}
            title="Tab Layout (50% / 50%)"
          >
            <Tablet size={16} />
            <span className="hidden sm:inline">Tab</span>
          </button>

          <button
            onClick={() => setLayoutMode("desktop")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${
              layoutMode === "desktop"
                ? "bg-white shadow-sm"
                : " hover:bg-slate-50"
            }`}
            title="Desktop Layout (Fullscreen Preview)"
          >
            <Monitor size={16} />
            <span className="hidden sm:inline">Desktop</span>
          </button>
        </div>
        <div className="px-4">
          <UserButton></UserButton>
        </div>
      </div>

      {/* --- Main Layout Area --- */}
      <div className="flex-1 flex w-full overflow-hidden relative">
        {/* Editor Panel Area */}
        <div
          className={`
            h-full  transition-all duration-500 ease-in-out
            ${styles.editor} 
            ${styles.editorOpacity}
          `}
        >
          <div className="min-w-[300px] h-full mt-4">
            <EditorPanel />
          </div>
        </div>
        <Separator orientation="vertical" />
        {/* Preview Panel Area */}
        <div
          className={`
            h-full transition-all duration-500 ease-in-out bg-slate-100
            ${styles.preview}
            ${styles.previewOpacity}
          `}
        >
          <div className="h-full w-full flex items-center justify-center mt-6">
            <ResponsivePreview>
              <PreviewPanel data={initialPortfolioData} />
            </ResponsivePreview>
          </div>
        </div>
      </div>
    </div>
  );
}
