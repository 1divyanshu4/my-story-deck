"use client";

import React, { useState, useTransition } from "react";
import { Check, Loader2 } from "lucide-react";
import { usePortfolioStore } from "@/lib/store/usePortfolioStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface TemplatesProps {
  selectedTemplate: string;
}

const Templates = ({
  selectedTemplate: initialTemplate,
}: TemplatesProps) => {
  const { data, updateTemplate } = usePortfolioStore();
  const selected = data?.selectedTemplate || initialTemplate;

  const handleSelect = (template: string) => {
    updateTemplate(template);
  };

  return (
    <ScrollArea className="form-wrapper">
      <div className="form-content">
        <div className="form-header">
          <div className="form-title">Choose your style</div>
          <div className="form-description">
            Select a template that best fits your personal brand.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Minimalism Card */}
          <div
            className={cn(
              "border rounded-lg p-4 bg-white cursor-pointer transition-all hover:border-primary",
              selected === "minimalism" ? "border-primary border-2" : ""
            )}
            onClick={() => handleSelect("minimalism")}
          >
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold">Minimalism</h3>
                {selected === "minimalism" && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Clean, simple, and focus on content.
              </p>
            </div>
            <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center text-slate-400">
              Preview Image
            </div>
          </div>

          {/* Editorial Card */}
          <div
            className={cn(
              "border rounded-lg p-4 bg-white cursor-pointer transition-all hover:border-primary",
              selected === "editorial" ? "border-primary border-2" : ""
            )}
            onClick={() => handleSelect("editorial")}
          >
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold">Editorial</h3>
                {selected === "editorial" && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Bold typography and strong visual hierarchy.
              </p>
            </div>
            <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center text-slate-400">
              Preview Image
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Templates;
