import React from "react";

import Image from "next/image";
import { Profile } from "@/types";

interface HeroProps {
  profile: Profile;
}

const ProfileSection: React.FC<HeroProps> = ({ profile }) => {
  return (
    <section id="hero" className="pt-16 md:pt-20 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
        <div className="md:col-span-2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-gray-900 dark:text-gray-200 mb-4">
            {profile.name}
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-400 mb-6">
            {profile.role}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            {profile.bio}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {profile.ctaButtons.map((btn) => {
              const isPrimary = btn.type === "primary";
              return (
                <a
                  key={btn.id}
                  href={btn.scrollTo}
                  className={`text-center px-6 py-3 sm:px-8 sm:py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 ${
                    isPrimary
                      ? "bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600 border-2 border-gray-900 dark:border-gray-700 hover:border-gray-800 dark:hover:border-gray-600 shadow-md"
                      : "bg-white text-gray-800 border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                  }`}
                >
                  {btn.label}
                </a>
              );
            })}
          </div>
        </div>
        <div className="md:col-span-1 flex justify-center md:justify-end order-first md:order-last">
          {profile.imageUrl && (
            <Image
              src={profile.imageUrl}
              alt={profile.name}
              className="w-64 h-64 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-xl  "
              width={800}
              height={800}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
