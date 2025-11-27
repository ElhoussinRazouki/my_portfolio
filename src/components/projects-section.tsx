"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, AnimatePresence } from "motion/react";
import { BorderBeam } from "./ui/border-beam";
import { projects } from "@/lib/portfolio-data";
import { Highlighter } from "./ui/highlighter";
import { Iphone } from "./ui/iphone";
import { useMemo, useState } from "react";
import {
  trackProjectInteraction,
  trackLinkClick,
  trackSectionView,
} from "@/lib/analytics";

const getIconSrc = (title: string) => {
  const iconMap: Record<string, string> = {
    "Fat AI - Body Fat Percentage": "fatai",
    Mobtwin: "mobtwin",
    "Viralth - AI Thumbnail Maker": "viralthum",
  };
  const iconName = iconMap[title];
  return iconName ? `/icons/${iconName}.png` : null;
};

const ProjectsSection = () => {
  const [activeItem, setActiveItem] = useState("0");
  const activeProject = projects[parseInt(activeItem)];
  const isPortrait =
    activeProject &&
    ((activeProject.previewType === "video" &&
      (activeProject.appstore || activeProject.title === "Video Generator")) ||
      (activeProject.previewType === "image" && activeProject.appstore));

  const handleProjectClick = (projectName: string) => {
    trackProjectInteraction(projectName, "open");
    setActiveItem(
      projects.findIndex((p) => p.title === projectName).toString()
    );
  };

  const handleProjectLinkClick = (
    projectName: string,
    linkType: string,
    url: string
  ) => {
    trackProjectInteraction(projectName, "click");
    trackLinkClick(url, `${projectName} - ${linkType}`, true);
  };

  const renderPreview = (project: (typeof projects)[0]) => {
    if (project.title === "MerchGhost") {
      return (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <a
            href={project.preview}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline text-center"
            onClick={() =>
              handleProjectLinkClick(project.title, "preview", project.preview)
            }
          >
            Visit {project.title}
          </a>
        </div>
      );
    }
    if (project.previewType === "image") {
      if (project.appstore) {
        return <Iphone src={project.preview} />;
      } else {
        return (
          <img
            src={project.preview}
            alt={project.title}
            className="w-full h-full object-contain rounded-lg"
          />
        );
      }
    } else if (project.previewType === "video") {
      if (project.appstore || project.title === "Video Generator") {
        return <Iphone videoSrc={project.preview} />;
      } else {
        return (
          <video
            src={project.preview}
            className="w-full h-full object-contain rounded-lg"
            controls
          />
        );
      }
    } else if (project.previewType === "link") {
      return (
        <iframe
          src={project.preview}
          className="w-full h-full rounded-lg border-none"
          title={project.title}
          allow="fullscreen"
          referrerPolicy="no-referrer"
        />
      );
    } else {
      return (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Project Preview
            </p>
          </div>
        </div>
      );
    }
  };

  const highlight = useMemo(
    () => (
      <Highlighter action="underline" color="orange">
        key achievements.
      </Highlighter>
    ),
    []
  );

  return (
    <section
      id="projects"
      className="py-12 md:py-20 lg:py-32 min-h-screen"
      onMouseEnter={() => trackSectionView("projects")}
    >
      <div className="bg-linear-to-b absolute inset-0 -z-10 sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]"></div>
      <div className="mx-auto max-w-7xl space-y-8 px-6 md:space-y-16 lg:space-y-20 dark:[--color-border:color-mix(in_oklab,var(--color-white)_10%,transparent)]">
        <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-6xl">
            Projects
          </h2>
          <p>My projects and {highlight}</p>
        </div>

        <div className="grid gap-12 sm:px-12 md:grid-cols-2 lg:gap-20 lg:px-0">
          <Accordion
            type="single"
            value={activeItem}
            onValueChange={(value) => {
              setActiveItem(value);
              trackProjectInteraction(projects[parseInt(value)].title, "view");
            }}
            className="w-full"
          >
            {projects.map((project, index) => {
              const iconSrc = getIconSrc(project.title);
              const Icon = project.icon;
              return (
                <AccordionItem key={index} value={index.toString()}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-2 text-base">
                      {iconSrc ? (
                        <img
                          src={iconSrc}
                          alt={project.title}
                          className="size-4 rounded"
                        />
                      ) : (
                        <Icon className="size-4" />
                      )}
                      {project.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p>{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.website && (
                          <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 underline transition-colors"
                            onClick={() =>
                              handleProjectLinkClick(
                                project.title,
                                "website",
                                project.website
                              )
                            }
                          >
                            Visit Website
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 underline transition-colors"
                            onClick={() =>
                              handleProjectLinkClick(
                                project.title,
                                "github",
                                project.github
                              )
                            }
                          >
                            View on GitHub
                          </a>
                        )}
                        {project.appstore && (
                          <a
                            href={project.appstore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 underline transition-colors"
                            onClick={() =>
                              handleProjectLinkClick(
                                project.title,
                                "appstore",
                                project.appstore
                              )
                            }
                          >
                            Download on App Store
                          </a>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <div
            className={`bg-background relative flex overflow-hidden rounded-3xl border p-2 ${
              isPortrait
                ? "aspect-[9/16] justify-center items-center"
                : "aspect-video"
            } max-h-[500px] max-w-full md:min-h-full `}
          >
            <div className="w-15 absolute inset-0 right-0 ml-auto border-l bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_8px)]"></div>
            <div
              className={`${
                isPortrait ? "aspect-[9/16]" : "aspect-video"
              } bg-background relative ${
                isPortrait ? "h-full w-auto" : "w-full"
              } rounded-2xl`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeItem}-project`}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className={`size-full overflow-hidden rounded-2xl border bg-transparent shadow-md flex items-center justify-center ${
                    isPortrait ? "p-5" : ""
                  }`}
                >
                  {renderPreview(projects[parseInt(activeItem)])}
                </motion.div>
              </AnimatePresence>
            </div>
            <BorderBeam
              duration={6}
              size={200}
              className="from-transparent via-yellow-700 to-transparent dark:via-white/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
