import { PortfolioData } from "@/types";
import ProfileSection from "./components/Profile";

const EditorialTemplate = ({ data }: { data: PortfolioData }) => {
  return (
    <div>
      <ProfileSection profile={data.profile} />
    </div>
  );
};

export default EditorialTemplate;
