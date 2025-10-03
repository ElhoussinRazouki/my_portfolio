import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { certifications } from "@/lib/portfolio-data";
import { Highlighter } from "./ui/highlighter";
import { BookOpen, Award } from "lucide-react";
import { useMemo } from "react";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogClose,
} from "@/components/motion-primitives/morphing-dialog";

const getCertPdf = (cert: string) => {
  const map: Record<string, string> = {
    "IT Essentials": "/certificates/it-essentials.pdf",
    "JavaScript Essentials": "/certificates/javascript-essentials.pdf",
    "NDG Linux Essentials": "/certificates/linux-essentials.pdf",
    "PCAP: Programming Essentials In Python": "/certificates/programming-essentials.pdf",
  };
  return map[cert];
};

const EducationSection = () => {
  const highlight = useMemo(
    () => (
      <Highlighter action="underline" color="orange">
        key achievements.
      </Highlighter>
    ),
    []
  );

  return (
    <section id="education" className="py-12 md:py-20 lg:py-32 min-h-screen">
      <div className="bg-linear-to-b absolute inset-0 -z-10 sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]"></div>
      <div className="mx-auto max-w-7xl space-y-8 px-6 md:space-y-16 lg:space-y-20 dark:[--color-border:color-mix(in_oklab,var(--color-white)_10%,transparent)]">
        <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-6xl">
            Certifications
          </h2>
          <p>My {highlight}</p>
        </div>

        <div className="space-y-12">

          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Certifications</h3>
            <BentoGrid className="md:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert, index) => {
                const pdf = getCertPdf(cert.name);
                return (
                  <MorphingDialog key={index}>
                    <MorphingDialogTrigger className="w-full">
                      <BentoCard
                        name={cert.name}
                        className="col-span-1"
                        background={
                          pdf ? (
                            <iframe
                              src={`${pdf}#toolbar=0&navpanes=0&scrollbar=0`}
                              className="w-full h-full border-none"
                              title={cert.name}
                            />
                          ) : (
                            <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 to-blue-900" />
                          )
                        }
                        Icon={Award}
                        description={cert.name}
                        href={cert.link}
                        cta="View Course Details"
                      />
                    </MorphingDialogTrigger>
                    <MorphingDialogContainer>
                      <MorphingDialogClose className="absolute top-6 right-6 z-[101] hover:cursor-pointer" />
                      <MorphingDialogContent className="max-w-4xl w-full h-[80vh] overflow-hidden">
                        <div className="flex flex-col h-full">
                          {pdf && (
                            <iframe
                              src={`${pdf}#toolbar=0&navpanes=0&scrollbar=0`}
                              className="flex-1 w-full border-none"
                              title={cert.name}
                            />
                          )}
                          <div className="p-4 bg-white dark:bg-zinc-900 border-t">
                            <h3 className="text-lg font-bold mb-2">{cert.name}</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">{cert.brief}</p>
                            {cert.link && (
                              <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 underline text-sm"
                              >
                                View Course Details
                              </a>
                            )}
                          </div>
                        </div>
                      </MorphingDialogContent>
                    </MorphingDialogContainer>
                  </MorphingDialog>
                );
              })}
            </BentoGrid>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;