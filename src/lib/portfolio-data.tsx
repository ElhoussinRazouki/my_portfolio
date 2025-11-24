import React from "react";
import {
  Palette,
  Server,
  Database,
  Smartphone,
  Anchor,
  Settings,
  Code,
  Film,
  Search,
  MapPin,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { AuroraText } from "@/components/ui/aurora-text";
import { Highlighter } from "@/components/ui/highlighter";

export const personalInfo = {
  name: "El Houssin Razouki",
  image: "https://lh3.googleusercontent.com/a/ACg8ocLwLdSfciBxubaHezLLfg6h4hhB5uFz8HF3BFTCFctCJt_7gMVm=s576-c-no",
};

export const skills = [
  {
    title: "Frontend",
    description: "React, Next.js, TypeScript, Tailwind CSS, HTML5, CSS",
    icon: Palette,
  },
  {
    title: "Backend",
    description: "Node.js, GraphQL, Python, Django, PHP, SQL",
    icon: Server,
  },
  {
    title: "Databases",
    description: "MongoDB, MySQL, SQL Server, Elasticsearch",
    icon: Database,
  },
  {
    title: "Mobile",
    description: "React Native, Android SDK, Java",
    icon: Smartphone,
  },
  {
    title: "DevOps",
    description: "Docker, AWS, Linux, Bash, Git",
    icon: Anchor,
  },
  {
    title: "Other",
    description: "C++, C#, AI Agents, Web Scraping, Networking",
    icon: Settings,
  },
];

export const experienceData = [
  {
    title: "Jul 2024 — Present",
    content: (
      <div>
        <AuroraText className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">
          Dahbi Group
        </AuroraText>
        <p className="text-zinc-600 dark:text-zinc-400 mb-2">
          Platform that manages all fitness club stuff from employees, members,
          clubs to analytics.
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          <Highlighter
            action="highlight"
            color="#8b5cf6"
            className="text-white"
          >
            Technologies: React, React Native, TypeScript, Python, Django,
            TrueNAS, AWS, Docker, Swarm
          </Highlighter>
        </p>
        <ul className="mt-4 list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400">
          <li>
            Modern React Native Architecture: Functional components, React
            hooks, TypeScript, React Navigation, and multi-language support.
          </li>
          <li>
            Performance & Data Management: React Query, Zod validation,
            token-based authentication, FlashList for large datasets, and
            optimized rendering.
          </li>
          <li>
            UI/UX & Best Practices: Tailwind CSS, dark/light themes, reusable
            component library, animations, accessibility, testing, and
            structured project organization.
          </li>
          <li>
            Mobile app for club members to access multiple club locations.
            Website: www.mobtwin.com
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Oct 2023 — May 2024",
    content: (
      <div>
        <AuroraText
          className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-2"
          colors={["#f97316", "#ea580c", "#dc2626", "#b91c1c"]}
        >
          AI Wolves Inc
        </AuroraText>
        <p className="text-zinc-600 dark:text-zinc-400 mb-2">
          Web applications platform that tracks mobile applications states over
          time in both Google Play and App Store for statistics and analytics.
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          <Highlighter
            action="highlight"
            color="#f97316"
            className="text-white"
          >
            Technologies: TypeScript, Node.js, GraphQL, React, Redux, MongoDB,
            Elasticsearch, Stripe, Web Scraping
          </Highlighter>
        </p>
        <ul className="mt-4 list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400">
          <li>
            Built a user-friendly search engine for millions of mobile apps,
            offering a seamless experience to find the perfect app in seconds.
          </li>
          <li>
            Coordinating multiple worker processes in Node.js to enable
            horizontal scaling for complex operations.
          </li>
          <li>
            Automated deployments using custom CI scripts and managed MongoDB
            replica sets.
          </li>
          <li>
            Leveraging Redux for application state management, GraphQL as a
            server-side data endpoint, and a promise-based HTTP client on the
            frontend.
          </li>
          <li>
            Utilizing the latest technologies and modern UI to deliver an
            enhanced user experience.
          </li>
          <li>
            Using React with ShadCN for the frontend, along with supporting
            libraries to ensure data consistency and reliability between
            frontend and backend.
          </li>
          <li>
            Developing reusable components to maintain a clean codebase and
            follow best practices and conventions.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "May 2023 — Sep 2023",
    content: (
      <div>
        <AuroraText
          className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-2"
          colors={["#22c55e", "#16a34a", "#15803d", "#166534"]}
        >
          Intern, DATACIUM
        </AuroraText>
        <p className="text-zinc-600 dark:text-zinc-400 mb-2">
          Streamline Logistics Operations: Real-time Transport Management
          Platform.
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          <Highlighter
            action="highlight"
            color="#22c55e"
            className="text-white"
          >
            Technologies: JavaScript, React, Tailwind CSS, Axios, Chart.js,
            Google Maps API, Node.js, Postman
          </Highlighter>
        </p>
        <ul className="mt-4 list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400">
          <li>
            Developed a cutting-edge GPS-based platform that utilized advanced
            technologies to provide highly sophisticated solutions.
          </li>
          <li>
            Adopted industry best practices to create a modular, scalable, and
            high-performing solution.
          </li>
          <li>
            Enhanced Location Tracking with Google Maps API Integration:
            Real-time Communication for Dynamic Updates and Streamlined
            Interactions.
          </li>
          <li>
            Built graphs using Chart.js for visualization of related data.
          </li>
          <li>
            Implemented the latest security protocols to ensure robust platform
            safety and safeguarded against potential vulnerabilities.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "March — June 2022",
    content: (
      <div>
        <AuroraText
          className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-2"
          colors={["#3b82f6", "#2563eb", "#1d4ed8", "#1e40af"]}
        >
          Intern, WEB LOGICIAL MAROC
        </AuroraText>
        <p className="text-zinc-600 dark:text-zinc-400 mb-2">
          Custom database schema and website redesign.
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          <Highlighter
            action="highlight"
            color="#3b82f6"
            className="text-white"
          >
            Technologies: HTML5, CSS, EJS, Node.js, REST API, PHP, MySQL,
            Postman
          </Highlighter>
        </p>
        <ul className="mt-4 list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400">
          <li>
            Designed a relational database schema to suit the structure of JSON
            data.
          </li>
          <li>
            Wrote scripts to import data from JSON files into MySQL database.
          </li>
          <li>
            Redesign the website of company. Led the transition of the company's
            official website from PHP code to Node.js.
          </li>
          <li>Improved user interfaces to match the new standards.</li>
          <li>Integrated the Nodemailer API to send emails over SMTP.</li>
          <li>
            API of an online service that facilitates matching individuals with
            service providers.
          </li>
          <li>
            Implemented user authentication flows using JWT and email
            verification.
          </li>
          <li>Automated the encryption of users' sensitive information.</li>
          <li>
            Wrote SQL queries to insert and retrieve data from the database.
          </li>
        </ul>
      </div>
    ),
  },
];

export const projects = [
  {
    title: "Viralth - AI Thumbnail Maker",
    description:
      "Built and launched Viralth - AI Thumbnail Maker, an iOS app for AI-powered thumbnail creation using React Native for mobile, Node.js for APIs, GPT-Image1 for image generation, and AWS S3 for storage. Implemented AI-driven thumbnail design, personalized suggestions, and real-time editing to enhance user creativity and engagement.",
    icon: Code,
    preview: "/video/viralthumb.mp4",
    previewType: "video",
    appstore:
      "https://apps.apple.com/us/app/viralth-ai-thumbnail-maker/id6744122688?platform=iphone",
  },
  {
    title: "Mobtwin",
    description:
      "Built and launched Mobtwin, a web platform for tracking mobile app states across Google Play and App Store for statistics and analytics. Developed a user-friendly search engine for millions of apps, enabling horizontal scaling with Node.js workers, automated CI deployments, and managed MongoDB replica sets. Leveraged TypeScript, React, Redux, GraphQL, MongoDB, Elasticsearch, and web scraping to deliver real-time data and enhanced user experiences.",
    icon: Smartphone,
    preview: "/images/mobtwin.png",
    previewType: "image",
    website: "https://www.mobtwin.com",
  },
  {
    title: "Fat AI - Body Fat Percentage",
    description:
      "Built and launched Fat AI, an iOS app for body fat tracking using React Native for mobile, Node.js for APIs, LLMs for chat and vision, and AWS S3 for storage. Implemented AI-driven body fat analysis, personalized fitness plans, and real-time progress tracking to enhance user health and engagement.",
    icon: Code,
    preview: "/images/fatai.png",
    previewType: "image",
    appstore:
      "https://apps.apple.com/us/app/fat-ai-body-fat-percentage/id6739364929?platform=iphone",
  },
  {
    title: "Video Generator",
    description:
      "Developed a tool that generates complete videos based on a given prompt, automating the entire process from concept to production. Leveraged large language models (LLM) for content generation, text-to-speech for narration, and an image generator for visuals, all integrated with MoviePy for seamless video editing automation.",
    icon: Film,
    preview: "/video/video-generator.mp4",
    previewType: "video",
  },
  {
    title: "Spyci",
    description:
      "Built a tool that exploits persistent XSS to remotely execute JavaScript code in real-time. Using JavaScript, Node.js, Socket.io, Webpack, HTML5, CSS.",
    icon: Search,
    preview: "/images/spyci.png",
    previewType: "image",
    github: "https://github.com/ElhoussinRazouki/spyci",
  },
  {
    title: "MerchGhost",
    description:
      "Developed MerchGhost, a web application and browser extension for managing custom merchandise designs. Built with Next.js for the web app, Plasmo framework for the browser extension, and integrated with print-on-demand services to streamline the design-to-print workflow.",
    icon: Code,
    preview: "https://merchghost.com",
    previewType: "link",
    website: "https://merchghost.com",
  },
  // {
  //   title: "Gpscuim",
  //   description:
  //     "Built a GPS platform that facilitates logistics enterprises in managing and real-time monitoring of their transport resources. Using Node.js, React, Tailwind, WebSocket, Google Maps API, Chart.js.",
  //   icon: MapPin,
  // },
  // {
  //   title: "Library Management",
  //   description:
  //     "Built for Windows, using C#, WinForms, Entity Framework, SQL Server, Crystal Reports.",
  //   icon: BookOpen,
  // },
  // {
  //   title: "Quiz App",
  //   description:
  //     "Android application for users to take quizzes in a selected field in order to test themselves. Using Java, Android SDK, SQLite, also following OOP principles and patterns.",
  //   icon: HelpCircle,
  // },
];

export const education = [
  {
    title: "Licence professionnelle: Informatique, Web et Applications Mobiles",
    description:
      "Faculté des Sciences, Université Mohammed V de Rabat, Oct 2022 — Jul 2023",
  },
  {
    title: "Technicien Spécialisé en Développement Informatique",
    description:
      "Institut de Technologie Appliquée de Khémisset, Oct 2020 — Jul 2022",
  },
  {
    title: "Cisco Networking Academy - Online",
    description: "Field: Computer Science",
  },
];

export const certifications = [
  // "Cisco Networking Academy",
  {
    name: "JavaScript Essentials",
    link: "https://www.netacad.com/courses/javascript-essentials-1?courseLang=en-US",
    brief: "Completed JavaScript Essentials course covering: Introduction to JavaScript and web development, Variables, data types, and operators, Control structures (loops and conditionals), Functions and scope, Objects, arrays, and JSON, DOM manipulation and events, Error handling and debugging, Basic algorithms and problem-solving. Gained skills in writing interactive client-side scripts for web applications."
  },
  {
    name: "PCAP: Programming Essentials In Python",
    link: "https://www.netacad.com/courses/python-essentials-1?courseLang=en-US",
    brief: "Completed PCAP: Programming Essentials in Python course covering: Introduction to Python programming, Data types, variables, and basic I/O, Control structures and loops, Functions, modules, and packages, Strings, lists, and dictionaries, Object-oriented programming basics, File handling and exceptions, Basic algorithms and data structures. Developed proficiency in Python for general-purpose programming and software development."
  },
  {
    name: "IT Essentials",
    link: "https://www.netacad.com/courses/it-essentials?courseLang=en-US",
    brief: "Completed IT Essentials course covering: Computer hardware components and peripherals, Operating systems (Windows, macOS, Linux), Networking fundamentals and protocols, Security threats and best practices, Troubleshooting methodologies, Mobile devices and cloud computing, Virtualization and emerging technologies, Professional communication and customer service. Acquired comprehensive IT support and maintenance skills."
  },
  {
    name: "NDG Linux Essentials",
    link: "https://www.netacad.com/courses/linux-essentials?courseLang=en-US",
    brief: "Completed NDG Linux Essentials course covering: Linux distributions and open-source philosophy, Command line interface and basic commands, File system navigation and management, User and group administration, Permissions and security, Process management and system monitoring, Package management (apt, yum), Shell scripting basics, Networking configuration, System maintenance and troubleshooting. Mastered essential Linux system administration skills."
  },
];
