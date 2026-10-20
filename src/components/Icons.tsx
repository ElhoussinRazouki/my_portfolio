import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

const base = (size = 16): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  focusable: false,
})

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export const StarIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z" />
  </svg>
)

export const UserIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <circle cx="12" cy="7" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z" />
  </svg>
)

export const GridIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <rect x="3" y="3" width="8" height="8" />
    <rect x="13" y="3" width="8" height="8" />
    <rect x="3" y="13" width="8" height="8" />
    <rect x="13" y="13" width="8" height="8" />
  </svg>
)

export const DiamondIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <path d="M12 2l10 10-10 10L2 12z" />
  </svg>
)

export const HeartIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z" />
  </svg>
)

export const SmileIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...stroke} strokeWidth={2.2} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 14.5c1 1.3 2.2 2 3.5 2s2.5-.7 3.5-2M9 9.5v.5M15 9.5v.5" />
  </svg>
)

export const ArrowUpRightIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...stroke} strokeWidth={2.5} {...p}>
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
)

export const GithubIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...stroke} {...p}>
    <path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </svg>
)

export const LinkedinIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...stroke} {...p}>
    <rect x="3" y="9" width="4" height="12" />
    <circle cx="5" cy="4" r="2" />
    <path d="M10 21V9h4v2a4 4 0 0 1 7 3v7h-4v-6a2 2 0 0 0-4 0v6z" />
  </svg>
)

export const MailIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...stroke} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
)

export const DownloadIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...stroke} {...p}>
    <path d="M12 15V3M7 10l5 5 5-5M5 21h14" />
  </svg>
)

export const CodeIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...stroke} {...p}>
    <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" />
  </svg>
)

export const CodeSlashIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...stroke} {...p}>
    <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13.5 6l-3 12" />
  </svg>
)

export const BotIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...stroke} {...p}>
    <rect x="5" y="8" width="14" height="11" rx="2" />
    <path d="M12 4v4M9.5 13v1M14.5 13v1" />
  </svg>
)

export const PlugIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...stroke} {...p}>
    <path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4" />
  </svg>
)

export const PhoneIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...stroke} {...p}>
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path d="M11 18.5h2" />
  </svg>
)

export const SparkleIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...stroke} strokeWidth={2.2} {...p}>
    <path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />
  </svg>
)

export const stampIcons = {
  bot: BotIcon,
  plug: PlugIcon,
  phone: PhoneIcon,
  code: CodeIcon,
}

export const navIcons = {
  star: StarIcon,
  user: UserIcon,
  grid: GridIcon,
  diamond: DiamondIcon,
}

export const CloseIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...stroke} strokeWidth={2.5} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const ExpandIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...stroke} {...p}>
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
)
