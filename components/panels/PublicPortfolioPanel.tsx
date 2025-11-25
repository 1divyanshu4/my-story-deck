"use client";

import MinimalismTemplate from "@/templates/minimalism";
import EditorialTemplate from "@/templates/editorial";
import { PortfolioData } from "@/types";

interface PublicPortfolioPanelProps {
  data: PortfolioData;
}

export const PublicPortfolioPanel = ({ data }: PublicPortfolioPanelProps) => {
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
