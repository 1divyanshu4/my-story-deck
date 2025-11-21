import { PreviewPanel } from "@/components/panels/PreviewPanel";
import { initialPortfolioData } from "@/data/testData";

const PublicPortfolio = () => {
  return (
    <div>
      <PreviewPanel data={initialPortfolioData} />
    </div>
  );
};

export default PublicPortfolio;
