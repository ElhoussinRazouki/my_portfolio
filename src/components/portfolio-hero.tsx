import React from "react";
import { motion } from "motion/react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Image from "next/image";
import Link from "next/link";
import { contactInfo } from "@/lib/contact";
import { IconMail } from "@tabler/icons-react";
import { Mail } from "lucide-react";
import { Highlighter } from "@/components/ui/highlighter";

// Customized Hero Section (Adapted from Aceternity Hero)
const PortfolioHero = () => {
  const summaryParts = [
    { text: "Dynamic ", highlight: false, className: "" },
    {
      text: "software engineer",
      highlight: true,
      action: "highlight",
      color: "#FFD700",
      className: "dark:text-white",
    },
    {
      text: " with a solid grasp of software fundamentals and hands-on expertise in crafting web and mobile applications using ",
      highlight: false,
      className: "",
    },
    {
      text: "JavaScript/TypeScript, React, Node.js, and React Native",
      highlight: false,
      className: "",
    },
    { text: ". ", highlight: false, className: "" },
    {
      text: "I've successfully built and launched multiple products into production, drawing on my deep understanding of server hardware and software, networking, and IT essentials from ",
      highlight: false,
      className: "",
    },
    {
      text: "Cisco",
      highlight: true,
      action: "highlight",
      color: "#FF4500",
      className: "dark:text-white",
    },
    {
      text: "—the gold standard in the industry. ",
      highlight: false,
      className: "",
    },
    {
      text: "This broad foundation in hardware principles, from physics and electronics to integration with software layers, empowers me to create ",
      highlight: false,
      className: "",
    },
    {
      text: "scalable",
      highlight: true,
      action: "underline",
      color: "#1E90FF",
      className: "dark:text-white",
    },
    { text: ", ", highlight: false, className: "" },
    {
      text: "secure",
      highlight: true,
      action: "under-line",
      color: "#9370DB",
      className: "dark:text-white",
    },
    { text: ", and properly configured ", highlight: false, className: "" },
    {
      text: "systems",
      highlight: true,
      action: "underline",
      color: "#DC143C",
      className: "dark:text-white",
    },
    {
      text: " that perform reliably under real-world demands.",
      highlight: false,
      className: "",
    },
  ];

  return (
    <div id="hero" className="relative min-h-screen">
      <BackgroundBeams className="absolute inset-0 z-0" />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-0 mb-20 flex flex-col items-center justify-center">
        <div className="px-4 py-6 md:py-12">
          {/* Profile Image Placeholder - Adapted from image preview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 my-8 rounded-full overflow-hidden aspect-square size-52 mx-auto shadow-lg border-2 border-neutral-200 dark:border-neutral-700"
          >
            <Image
              src="https://lh3.googleusercontent.com/a/ACg8ocLwLdSfciBxubaHezLLfg6h4hhB5uFz8HF3BFTCFctCJt_7gMVm=s576-c-no"
              alt="Professional Headshot"
              fill
              className="object-cover rounded-full"
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-6xl dark:text-slate-300"
          >
            {contactInfo.name.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="relative z-10 mx-auto max-w-5xl py-2 min-h-[120px]"
          >
            <div className="text-center text-md font-normal text-neutral-600 dark:text-neutral-400">
              {summaryParts.map((part, index) =>
                part.highlight ? (
                  <Highlighter
                    key={index}
                    action={part.action as any}
                    color={part.color}
                    className={part.className}
                  >
                    {part.text}
                  </Highlighter>
                ) : (
                  <span key={index} className={part.className}>
                    {part.text}
                  </span>
                )
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href={`mailto:${contactInfo.email}`}
              className="transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Contact Me
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHero;
