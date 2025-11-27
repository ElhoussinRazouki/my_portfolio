import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Code, Smartphone, Settings } from "lucide-react";
import { ReactNode } from "react";
import { trackSectionView } from "@/lib/analytics";

// Skills Section
const SkillsSection = () => {
  const handleSkillHover = (skillName: string) => {
    trackSectionView(`skills_${skillName}`);
  };

  return (
    <section
      id="skills"
      className="py-16 md:py-32 dark:bg-transparent min-h-screen flex items-center justify-center"
      onMouseEnter={() => trackSectionView("skills")}
    >
      <div className="@container mx-auto max-w-5xl px-6 w-full">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Skills
          </h2>
          <p className="mt-4">My technical expertise and proficiencies.</p>
        </div>
        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
          <Card
            className="group shadow-zinc-950/5"
            onMouseEnter={() => handleSkillHover("full_stack")}
          >
            <CardHeader>
              <CardDecorator>
                <Code className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Full-Stack Web Development</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Experienced in full-stack web development with modern
                technologies.
              </p>
            </CardContent>
          </Card>

          <Card
            className="group shadow-zinc-950/5"
            onMouseEnter={() => handleSkillHover("mobile")}
          >
            <CardHeader>
              <CardDecorator>
                <Smartphone className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Mobile Development</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Skilled in mobile app development using React Native and native
                technologies.
              </p>
            </CardContent>
          </Card>

          <Card
            className="group shadow-zinc-950/5"
            onMouseEnter={() => handleSkillHover("additional")}
          >
            <CardHeader>
              <CardDecorator>
                <Settings className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Additional Skills</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Proficient in additional technologies including Automation and
                AI.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
    />

    <div className="bg-background/60 rounded-4xl absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);

export default SkillsSection;
