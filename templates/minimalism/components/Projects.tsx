import React from "react";
import { Project } from "../../../types";

import Image from "next/image";
import { ExternalLinkIcon, GithubIcon, LockIcon } from "lucide-react";

interface ProjectsProps {
  projects: Project[];
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

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {project.imageUrl && (
        <a
          href={project.liveUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={800}
            height={400}
            className="w-full h-48 object-cover"
          />
        </a>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <hr className="border-gray-200/80" />
        <div className="pt-4 flex justify-between items-center text-sm font-semibold">
          <div className="flex items-center gap-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors"
              >
                {project.liveAccess === "private" ? (
                  <LockIcon className="w-4 h-4" />
                ) : (
                  <ExternalLinkIcon className="w-4 h-4" />
                )}
                <span>Live Demo</span>
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors"
              >
                {project.repoAccess === "private" ? (
                  <LockIcon className="w-4 h-4" />
                ) : (
                  <GithubIcon className="w-4 h-4" />
                )}
                <span>Code</span>
              </a>
            )}
          </div>
          {project.companyName && (
            <a
              href={project.companyUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              @ {project.companyName}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsProps> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;
  return (
    <section id="projects" className="py-16">
      <SectionTitle title="FEATURED PROJECTS" subtitle="SHOWCASE" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
