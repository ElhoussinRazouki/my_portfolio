/**
 * All portfolio copy lives here. Edit this file to update the site —
 * components only handle layout and styling.
 *
 * Images: drop files into /public (e.g. /public/projects/aevo-1.png) and import
 * them below; imported images are resized for each slot by next/image. A plain
 * path with a leading slash ("/projects/aevo-1.png") also works but is served
 * at full size. Any slot left empty renders a striped placeholder with its label.
 */

import type { StaticImageData } from 'next/image'
import avatar from '../../public/avatar.png'
import products from '../../public/products.webp'
import aevo1 from '../../public/projects/aevo-1.webp'
import aevo2 from '../../public/projects/aevo-2.webp'
import ctrbuddy from '../../public/projects/ctrbuddy.jpg'
import mobtwin from '../../public/projects/mobtwin.webp'
import studyTime1 from '../../public/projects/study-time-1.png'

export const profile = {
  name: 'El Houssin Razouki',
  displayName: 'EL HOUSSIN',
  role: 'Software Engineer',
  location: 'Morocco',
  status: 'Open to new work and hard problems',
  headline: ['I build AI products', 'that real people actually use.'],
  email: 'razzoukihoussin@gmail.com',
  github: 'https://github.com/ElhoussinRazouki',
  linkedin: 'https://linkedin.com/in/el-houssin-razouki-a03a61235',
  cvUrl: '/El_Houssin_Razouki_Resume.pdf',
  heroTags: ['Ships AI agents', 'Solo founder x3'],
  /** Small round photo in the hero */
  avatar,
  photo: avatar,
  photoCaption: 'me, 2026',
  /** Second polaroid in About: the products I run */
  productsPhoto: products,
  productsCaption: 'the three I run',
}

export const about = {
  intro:
    "I'm a software engineer who gets a little too excited about turning AI models into products people actually pay for.",
  body:
    '3+ years building web, mobile and AI products end to end — LLM agents, RAG pipelines and MCP servers on top of solid full-stack foundations. Right now I run three products I built myself.',
  stamps: [
    { label: 'AI Agents & RAG', color: 'yellow', icon: 'bot' },
    { label: 'MCP Servers', color: 'green', icon: 'plug' },
    { label: 'React Native', color: 'pink', icon: 'phone' },
    { label: 'Full-Stack TypeScript', color: 'blue', icon: 'code' },
  ],
} as const

export type ProjectTheme = 'dark' | 'yellow' | 'blue' | 'mint'

export interface Project {
  id: string
  number: string
  name: string
  /** Still running in production (counted in the section header) */
  live?: boolean
  /** Small label beside the project number tab (first card only in the design) */
  extraTab?: string
  theme: ProjectTheme
  /** Horizontal position of the folder tab, as a CSS length */
  tabOffset: string
  meta: string
  tagline: string
  bullets?: string[]
  stats?: { value: string; label: string }[]
  tech: string[]
  /** Leave empty to hide the "View project" link */
  href?: string
  media: {
    kind: 'browser' | 'phones'
    /** Labels shown on placeholders; one entry per frame */
    labels: string[]
    /** Image paths matching labels by index */
    images?: (string | StaticImageData)[]
  }
  /** Put the media on the left */
  reverse?: boolean
  /** Handwritten sticky note pinned to the media */
  note?: string
}

export const projects: Project[] = [
  {
    id: 'ctrbuddy',
    number: '01',
    name: 'CTRBuddy',
    live: true,
    extraTab: 'AI SaaS',
    theme: 'dark',
    tabOffset: '0px',
    meta: 'Live · ctrbuddy.com',
    tagline:
      'An AI agent that takes YouTube creators from video idea to script to finished thumbnail — in one chat.',
    bullets: [
      "Channel DNA: RAG over a channel's transcripts writes hooks in the creator's own voice",
      'Remote MCP server so Claude, Cursor, VS Code and Codex users generate from their own agents',
      'Identity-consistent personas and an AI thumbnail scorer',
    ],
    tech: ['Next.js', 'Convex', 'MCP', 'LLM + image APIs'],
    href: 'https://ctrbuddy.com',
    media: { kind: 'browser', labels: ['CTRBuddy screenshot'], images: [ctrbuddy] },
  },
  {
    id: 'aevo',
    number: '02',
    name: 'Aevo',
    live: true,
    theme: 'yellow',
    tabOffset: 'min(34%, 420px)',
    meta: 'Aug 2026 · App Store',
    tagline:
      'An all-in-one AI image & video studio: text-to-image, image-to-video, motion control, face swap and trending effects.',
    stats: [
      { value: '1,000+', label: 'Monthly active users' },
      { value: '~$2K', label: 'MRR' },
      { value: '$0', label: 'Marketing spend' },
    ],
    tech: ['Expo', 'Node / Express', 'Seedance · Kling', 'Nano Banana · Seedream'],
    href: 'https://apps.apple.com/us/app/aevo-ai-video-studio/id6788737364',
    media: {
      kind: 'phones',
      labels: ['Aevo screen 1', 'Aevo screen 2'],
      images: [aevo1, aevo2],
    },
  },
  {
    id: 'study-time',
    number: '03',
    name: 'Study Time',
    live: true,
    theme: 'blue',
    tabOffset: 'min(62%, 760px)',
    meta: 'v2.0 · Apr 2026 · App Store',
    tagline:
      'An AI study app that unlocks screen time. Your PDFs, notes, audio and YouTube videos become quizzes, flashcards and a tutor you can question.',
    bullets: [
      'AI tutor grounded in your material via RAG on Convex vector search',
      'Custom SwiftUI modules block distracting apps until a session is done',
      'Rebuilt from scratch for v2.0, localized into 6 languages',
    ],
    tech: ['Expo', 'SwiftUI', 'Convex vector search', 'Screen Time API'],
    href: 'https://apps.apple.com/us/app/study-time-ai-app-blocker/id6757340083',
    media: { kind: 'phones', labels: ['Study Time screen'], images: [studyTime1] },
    reverse: true,
    note: 'study first,\nscroll later :)',
  },
  {
    id: 'mobtwin',
    number: '04',
    name: 'MobTwin',
    theme: 'mint',
    tabOffset: 'min(14%, 180px)',
    meta: '2023 — 2024 · Built at AI Wolves',
    tagline:
      'Market intelligence for mobile apps — tracking rankings, updates and performance for millions of apps on Google Play and the App Store.',
    stats: [
      { value: '<1s', label: 'Search over millions of apps' },
      { value: '4', label: 'Layers owned: ingest · search · UI · billing' },
    ],
    tech: ['Elasticsearch', 'GraphQL', 'MongoDB replica sets', 'Node workers'],
    href: 'https://www.linkedin.com/posts/ai-wolves_excited-to-introduce-mobtwin-the-ultimate-activity-7330205407010770944-GfgU',
    media: { kind: 'browser', labels: ['MobTwin screenshot'], images: [mobtwin] },
  },
]

export const experience = [
  {
    dates: 'Dec 2024 — Present',
    title: 'Founder & Software Engineer',
    org: 'Independent',
    color: 'var(--yellow)',
    summary:
      'Built and launched CTRBuddy, Study Time and Aevo solo — architecture, backend, mobile, AI, payments and App Store releases. Shared AI systems with LLM orchestration, RAG, credit metering and background jobs.',
  },
  {
    dates: 'Jul 2024 — Jan 2025',
    title: 'Full-Stack Engineer',
    org: 'Dahbi Group',
    color: 'var(--pink-pale)',
    summary:
      "Led the Jimmy's Fitness platform across a chain of four clubs on web and mobile, including QR-code door entry for members, a shared component library and multi-language support.",
  },
  {
    dates: 'Oct 2023 — May 2024',
    title: 'Full-Stack Engineer',
    org: 'AI Wolves Inc.',
    color: 'var(--mint)',
    summary:
      'Core engineer on MobTwin, a market-intelligence platform tracking millions of mobile apps. Built its data ingestion, search, frontend and billing layers.',
  },
  {
    dates: 'Mar 2023 — Sep 2023',
    title: 'Frontend Developer Intern',
    org: 'Datacium',
    color: 'var(--blue-pale)',
    summary:
      'React frontend for a real-time transport platform with live GPS vehicle tracking, Google Maps routing and Chart.js fleet dashboards.',
  },
]

export const skills = [
  {
    title: 'AI & LLMs',
    color: 'var(--yellow-soft)',
    items: 'AI agents & tool calling · RAG · MCP servers · OpenAI · Gemini · LangChain · image & video generation · TTS / STT · prompt engineering',
  },
  {
    title: 'Frontend & Mobile',
    color: 'var(--mint)',
    items: 'React · Next.js · React Native (Expo) · SwiftUI modules · Redux · React Query · Tailwind CSS · Angular',
  },
  {
    title: 'Backend & APIs',
    color: 'var(--pink-pale)',
    items: 'Node.js · GraphQL · REST · Django · Supabase · Convex · Stripe',
  },
  {
    title: 'Data & Search',
    color: 'var(--blue-pale)',
    items: 'PostgreSQL · MongoDB · MySQL · SQL Server · Elasticsearch · Prisma',
  },
  {
    title: 'Languages',
    color: '#ffffff',
    items: 'TypeScript · JavaScript · Python · Java · C# · PHP · SQL',
  },
  {
    title: 'DevOps & Automation',
    color: 'var(--peach)',
    items: 'Docker / Swarm · AWS S3 · CI/CD · Linux · Bash · Git · n8n · web scraping',
  },
]

export const education = [
  {
    title: "Professional Bachelor's in Computer Science",
    detail: 'Web & Mobile Applications · Faculté des Sciences, Université Mohammed V de Rabat',
    dates: '2022 — 2023',
  },
  {
    title: 'Specialized Technician Diploma, Software Development',
    detail: 'Institut de Technologie Appliquée de Khémisset',
    dates: '2020 — 2022',
  },
]

/** Each certificate opens in a viewer: `image` is shown, `pdf` is the download. */
export const certifications = {
  issuer: 'Cisco Networking Academy',
  items: [
    {
      name: 'JavaScript Essentials',
      color: 'var(--yellow)',
      image: '/certificates/javascript-essentials.jpg',
      pdf: '/certificates/javascript-essentials.pdf',
    },
    {
      name: 'PCAP: Programming Essentials in Python',
      color: 'var(--green-bright)',
      image: '/certificates/programming-essentials.jpg',
      pdf: '/certificates/programming-essentials.pdf',
    },
    {
      name: 'IT Essentials',
      color: 'var(--pink-soft)',
      image: '/certificates/it-essentials.jpg',
      pdf: '/certificates/it-essentials.pdf',
    },
    {
      name: 'NDG Linux Essentials',
      color: 'var(--blue-soft)',
      image: '/certificates/linux-essentials.jpg',
      pdf: '/certificates/linux-essentials.pdf',
    },
  ],
}

export const navItems = [
  { id: 'top', label: 'Home', icon: 'star' },
  { id: 'about', label: 'About', icon: 'user' },
  { id: 'projects', label: 'Projects', icon: 'grid' },
  { id: 'experience', label: 'Experience', icon: 'diamond' },
] as const
