import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas-neue',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hari Kumar — Filmmaker',
  description: 'Filmmaker, storyteller, and creative producer based in Delhi. Branded content · Narrative films · Documentary · AI-integrated production.',
  openGraph: {
    title: 'Hari Kumar — Filmmaker',
    description: 'From middle-class nostalgia to love that never quite left — Zakir Khan meets Imtiaz Ali, in film form.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="min-h-full">{children}</body>
    </html>
  )
}
