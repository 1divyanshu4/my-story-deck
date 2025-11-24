import React from "react";

import MinimalismTemplate from "@/templates/minimalism";
import { PortfolioData } from "@/types";
import EditorialTemplate from "@/templates/editorial";

import { usePortfolioStore } from "@/lib/store/usePortfolioStore";

interface PreviewViewProps {
  // data prop is no longer needed as we use store
}

export const PreviewPanel: React.FC<PreviewViewProps> = () => {
  const data = usePortfolioStore((state) => state.data);

  if (!data) return null;

  const renderTemplate = () => {
    switch (data.selectedTemplate) {
      case "minimalism":
        return <MinimalismTemplate data={data} />;

      case "editorial":
        return <EditorialTemplate data={data} />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">Template not found.</p>
          </div>
        );
    }
  };

  return <div className="relative">{renderTemplate()}</div>;
};
