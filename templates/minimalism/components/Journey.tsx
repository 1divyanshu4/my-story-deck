import React from "react";
import { JourneyItem } from "../../../types";
import { BriefcaseIcon, GraduationCapIcon, StarIcon } from "lucide-react";

interface JourneyProps {
  items: JourneyItem[];
}

const SectionTitle: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => (
  <div className="text-center mb-12 sm:mb-16">
    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tighter">
      {title}
    </h2>
    <p className="mt-2 text-sm sm:text-base font-semibold text-gray-500 tracking-[0.2em] sm:tracking-[0.3em] uppercase">
      {subtitle}
    </p>
  </div>
);

const JourneyTimelineItem: React.FC<{ item: JourneyItem; isLast: boolean }> = ({
  item,
  isLast,
}) => {
  const getIcon = () => {
    switch (item.type) {
      case "Experience":
        return <BriefcaseIcon className="w-6 h-6 text-white" />;
      case "Education":
        return <GraduationCapIcon className="w-6 h-6 text-white" />;
      case "Milestone":
        return <StarIcon className="w-6 h-6 text-white" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative pl-16">
      {!isLast && (
        <div className="absolute left-[22px] top-6 bottom-0 w-0.5 bg-gray-200/80"></div>
      )}
      <div className="absolute left-0 top-0 flex items-center justify-center w-11 h-11 bg-gray-800 rounded-full ring-8 ring-white">
        {getIcon()}
      </div>
      <div className="pb-12 sm:pb-16">
        <p className="text-sm font-medium text-gray-500 mb-1">{item.year}</p>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
          {item.title}
        </h3>
        {item.institution && (
          <p className="text-base font-medium text-gray-600 mt-0.5">
            {item.institution}
          </p>
        )}
        <p className="mt-3 text-gray-600 leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
};

export const JourneySection: React.FC<JourneyProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  // Sort items by year, assuming 'Present' comes last.
  const sortedItems = [...items].sort((a, b) => {
    const yearA = a.year.includes("Present")
      ? 9999
      : parseInt(a.year.split(" - ")[0] || a.year, 10);
    const yearB = b.year.includes("Present")
      ? 9999
      : parseInt(b.year.split(" - ")[0] || b.year, 10);
    return yearB - yearA;
  });

  return (
    <section id="journey" className="py-16">
      <SectionTitle title="MY JOURNEY" subtitle="& EXPERIENCE" />
      <div className="max-w-2xl mx-auto">
        {sortedItems.map((item, index) => (
          <JourneyTimelineItem
            key={item.id}
            item={item}
            isLast={index === sortedItems.length - 1}
          />
        ))}
      </div>
    </section>
  );
};
