import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { AuroraText } from "@/components/ui/aurora-text";
import { experienceData } from "@/lib/portfolio-data";
import { Highlighter } from "./ui/highlighter";

// Experience Section
const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="py-16 md:py-32 dark:bg-transparent min-h-screen flex items-center justify-center"
    >
      <div className="@container mx-auto max-w-5xl px-6 w-full">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Experience
          </h2>
          <p className="mt-4">
            My professional journey and{" "}
            <Highlighter action="underline" color="orange">
              key experiences.
            </Highlighter>
          </p>
        </div>
        <Timeline data={experienceData} />
      </div>
    </section>
  );
};

export default ExperienceSection;
