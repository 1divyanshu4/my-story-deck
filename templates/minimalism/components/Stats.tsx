import { Stat } from "@/types";
import React from "react";

interface StatsProps {
  stats: Stat[];
}

export const StatsSection: React.FC<StatsProps> = ({ stats }) => {
  if (!stats || stats.length === 0) return null;

  return (
    <section id="stats" className="py-12">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.id}>
            <p className="text-4xl sm:text-5xl font-extrabold text-gray-900">
              {stat.value}
            </p>
            <p className="mt-1 text-sm sm:text-base font-semibold text-gray-500 tracking-widest uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
