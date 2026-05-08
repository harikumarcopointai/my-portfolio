'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import BentoGrid from './BentoGrid'
import YouTubeCategories from './YouTubeCategories'
import ToolstackMarquee from './ToolstackMarquee'

function RowHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 60px 14px', cursor: 'pointer' }} className="max-[900px]:px-5">
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', color: 'var(--red)', flexShrink: 0, opacity: .9 }}>
        {icon}
      </span>
      <span style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)', letterSpacing: '.3px' }}>{title}</span>
    </div>
  )
}

export default function WorkSection() {
  return (
    <section
      id="work"
      style={{ padding: '0 0 60px', marginTop: '-80px', position: 'relative', zIndex: 10 }}
    >
      {/* Featured — Bento Grid */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: .6, ease: EASE }}
        style={{ marginBottom: '6px' }}
      >
        <RowHeader
          title="Featured"
          icon={
            <svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px', stroke: 'currentColor', fill: 'none', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
              <polygon points="12 2 14.6 8.6 22 9.3 16.5 14 18.2 21 12 17.3 5.8 21 7.5 14 2 9.3 9.4 8.6"/>
            </svg>
          }
        />
        <BentoGrid />
      </motion.div>

      {/* YouTube categories */}
      <YouTubeCategories />

      {/* Toolstack marquee */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: .6, ease: EASE }}
        style={{ marginBottom: '6px' }}
      >
        <RowHeader
          title="My Toolstack"
          icon={
            <svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px', stroke: 'currentColor', fill: 'none', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
              <rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/>
              <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>
            </svg>
          }
        />
        <ToolstackMarquee />
      </motion.div>
    </section>
  )
}
