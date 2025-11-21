import React from "react";

import Image from "next/image";
import { Skill } from "@/types";

interface ToolkitProps {
  skills: Skill[];
}

const SectionTitle: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => (
  <div className="text-center mb-12">
    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tighter">
      {title}
    </h2>
    <p className="mt-2 text-sm sm:text-base font-semibold text-gray-500 tracking-[0.2em] sm:tracking-[0.3em] uppercase">
      {subtitle}
    </p>
  </div>
);

export const SkillSection: React.FC<ToolkitProps> = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <section id="skills" className="my-16">
      <SectionTitle title="MY TOOLKIT" subtitle="I WORK WITH" />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 sm:gap-8 justify-items-center">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex flex-col items-center gap-3 text-center transition-transform hover:-translate-y-1"
          >
            <Image
              src={skill.logoUrl}
              alt={skill.name}
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
              width={28}
              height={28}
            />
            <span className="text-sm sm:text-base font-semibold text-gray-700">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
