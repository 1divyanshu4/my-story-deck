"use client";

import React, { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Check, Loader2 } from "lucide-react";
import { updatePortfolioTemplate } from "@/lib/actions/portfolio.actions";
import { cn } from "@/lib/utils";

interface TemplatesProps {
  portfolioId: string;
  selectedTemplate: string;
}

const Templates = ({
  portfolioId,
  selectedTemplate: initialTemplate,
}: TemplatesProps) => {
  const [selected, setSelected] = useState(initialTemplate);
  const [isPending, startTransition] = useTransition();

  const handleSelect = (template: string) => {
    if (!portfolioId) {
      console.error("Portfolio ID is missing");
      return;
    }
    setSelected(template);
    startTransition(async () => {
      try {
        await updatePortfolioTemplate(portfolioId, template);
      } catch (error) {
        console.error("Failed to update template", error);
        // Revert on failure if needed
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Choose your style</h2>
        <p className="text-muted-foreground">
          Select a template that best fits your personal brand.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Minimalism Card */}
        <Card
          className={cn(
            "cursor-pointer transition-all hover:border-primary",
            selected === "minimalist" ? "border-primary border-2" : ""
          )}
          onClick={() => handleSelect("minimalist")}
        >
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Minimalism
              {selected === "minimalist" && (
                <Check className="h-5 w-5 text-primary" />
              )}
            </CardTitle>
            <CardDescription>
              Clean, simple, and focus on content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center text-slate-400">
              Preview Image
            </div>
          </CardContent>
        </Card>

        {/* Editorial Card */}
        <Card
          className={cn(
            "cursor-pointer transition-all hover:border-primary",
            selected === "editorial" ? "border-primary border-2" : ""
          )}
          onClick={() => handleSelect("editorial")}
        >
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Editorial
              {selected === "editorial" && (
                <Check className="h-5 w-5 text-primary" />
              )}
            </CardTitle>
            <CardDescription>
              Bold typography and strong visual hierarchy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-md bg-slate-100 flex items-center justify-center text-slate-400">
              Preview Image
            </div>
          </CardContent>
        </Card>
      </div>

      {isPending && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving changes...
        </div>
      )}
    </div>
  );
};

export default Templates;
