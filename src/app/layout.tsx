import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Gochi_Hand, Inter, Silkscreen, Space_Mono } from 'next/font/google'
import 'lenis/dist/lenis.css'
import '../styles/global.css'
import { MotionProvider } from '../components/MotionProvider'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-inter' })
const gochiHand = Gochi_Hand({ subsets: ['latin'], weight: '400', variable: '--font-gochi-hand' })
const silkscreen = Silkscreen({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-silkscreen' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono' })

export const metadata: Metadata = {
  title: 'El Houssin Razouki — Software Engineer',
  description:
    'Software engineer building AI products end to end — LLM agents, RAG pipelines and MCP servers. Creator of CTRBuddy, Study Time and Aevo.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'El Houssin Razouki — Software Engineer',
    description: 'I build AI products that real people actually use.',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${gochiHand.variable} ${silkscreen.variable} ${spaceMono.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
