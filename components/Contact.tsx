'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

const links = [
  {
    href: 'mailto:hkumaar45@gmail.com',
    label: 'hkumaar45@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', stroke: 'currentColor', fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>
      </svg>
    ),
  },
  {
    href: 'tel:+919625101898',
    label: '+91 96251 01898',
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', stroke: 'currentColor', fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/boy_with_golden__heart',
    label: 'Instagram',
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', stroke: 'currentColor', fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r=".7" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: 'https://www.youtube.com/@harrykumaar9552',
    label: 'YouTube',
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: 'currentColor' }}>
        <path d="M21.6 7.2a2.5 2.5 0 00-1.7-1.8C18.3 5 12 5 12 5s-6.3 0-7.9.4A2.5 2.5 0 002.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 001.7 1.8C5.7 19 12 19 12 19s6.3 0 7.9-.4a2.5 2.5 0 001.7-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5 3z"/>
      </svg>
    ),
  },
]

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '120px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }} className="max-[900px]:px-6 max-[900px]:py-20">
      {/* BG glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 100%,rgba(229,9,20,.12),transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: .6, ease: EASE }}
          style={{ fontSize: '11px', letterSpacing: '5px', textTransform: 'uppercase', color: 'var(--red)', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}
        >
          <span style={{ width: '30px', height: '1px', background: 'var(--red)', display: 'inline-block' }} />
          Let&apos;s Create Together
          <span style={{ width: '30px', height: '1px', background: 'var(--red)', display: 'inline-block' }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7, delay: .1, ease: EASE }}
          style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: 'clamp(64px,9vw,120px)', lineHeight: .88, marginBottom: '20px' }}
        >
          Start Your<br/><span style={{ color: 'var(--red)' }}>Next Project</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6, delay: .2, ease: EASE }}
          style={{ fontSize: '17px', color: 'var(--dim)', marginBottom: '44px', lineHeight: 1.7, fontStyle: 'italic' }}
        >
          Filmmaker. Editor. Producer. Delhi-based — open anywhere.<br/>
          Branded content · Narrative films · Documentary · AI-integrated production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6, delay: .3, ease: EASE }}
          style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)',
                padding: '14px 26px', textDecoration: 'none', color: 'var(--text)',
                fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase',
                transition: 'all .3s',
                minHeight: '48px',
              }}
              className="max-[600px]:!px-4 max-[600px]:!text-[12px]"
              whileHover={{
                background: 'var(--red)',
                borderColor: 'var(--red)',
                y: -2,
              }}
            >
              {link.icon}
              {link.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
