import { PortfolioData } from "@/types";
import ProfileSection from "./components/Profile";
import { StatsSection } from "./components/Stats";
import { Separator } from "@/components/ui/separator";
import { SkillSection } from "./components/Skills";
import { JourneySection } from "./components/Journey";
import { Header } from "./components/Header";
import { ProjectsSection } from "./components/Projects";

const MinimalismTemplate = ({ data }: { data: PortfolioData }) => {
  return (
    <div className="bg-white">
      <Header name={data.profile.name} />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ProfileSection profile={data.profile} />
        <Separator />
        {data.stats && <StatsSection stats={data.stats} />}
        <Separator />
        {data.skills && <SkillSection skills={data.skills} />}
        <Separator />
        {data.journey && <JourneySection items={data.journey} />}
        <Separator />
        {data.projects && <ProjectsSection projects={data.projects} />}
      </main>
    </div>
  );
};

export default MinimalismTemplate;
