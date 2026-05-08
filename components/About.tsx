'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: .7, delay: i * .1, ease: EASE },
  }),
}

const milestones = [
  { title: 'TOTM Awards Show — SonyLIV', sub: 'Senior Editor · Millions of Viewers · Broadcast', icon: 'tv' },
  { title: 'Gold — State Taekwondo Championship', sub: 'Haryana State · Individual Competition', icon: 'trophy' },
  { title: 'Gold — Inter-College Championship', sub: 'University Level · Combat Sports', icon: 'trophy' },
  { title: 'Silver — Inter-University Championship', sub: 'Regional Level · Taekwondo', icon: 'trophy' },
  { title: 'National Taekwondo Participant', sub: 'National Championship', icon: 'trophy' },
  { title: 'Open Mic Performer', sub: 'Poetry · Storytelling · Singing · Delhi', icon: 'mic' },
]

const TAGS = ['Premiere Pro','DaVinci Resolve','After Effects','HeyGen','Higgsfield','Hedra','Midjourney','Claude AI']

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: '80px 60px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto',
      }}
      className="max-[900px]:grid-cols-1 max-[900px]:gap-12 max-[900px]:px-6 max-[900px]:py-[60px]"
    >
      {/* Left column */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {/* Photo card */}
        <motion.div
          custom={0} variants={fadeUp}
          style={{
            position: 'relative', marginBottom: '32px', width: '100%',
            aspectRatio: '4/5', maxWidth: '420px', borderRadius: '18px', overflow: 'hidden',
            boxShadow: '0 30px 60px -15px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.06) inset',
            transition: 'transform .6s cubic-bezier(.22,.85,.27,1.01), box-shadow .6s',
            isolation: 'isolate',
          }}
          whileHover={{ y: -4, rotate: -0.5, boxShadow: '0 40px 80px -15px rgba(0,0,0,.85), 0 0 0 1px rgba(229,9,20,.3) inset, 0 0 80px -20px rgba(229,9,20,.4)' }}
        >
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(to top, rgba(0,0,0,.55) 0%, transparent 35%)' }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hari.jpg"
            alt="Hari Kumar"
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(1.05) contrast(1.05)', transition: 'transform .9s cubic-bezier(.22,.85,.27,1.01), filter .6s' }}
          />
          <div style={{
            position: 'absolute', bottom: '20px', left: '22px', right: '22px', zIndex: 3,
            display: 'flex', alignItems: 'center', gap: '10px', pointerEvents: 'none',
          }}>
            <span style={{
              fontSize: '10.5px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase',
              color: '#fff', padding: '5px 11px', background: 'rgba(229,9,20,.85)', borderRadius: '999px',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff', animation: 'pulse 1.8s ease infinite' }} />
              Filmmaker
            </span>
            <span style={{ fontSize: '12px', letterSpacing: '1.5px', color: 'rgba(255,255,255,.85)', fontWeight: 500 }}>Hari Kumar · Delhi</span>
          </div>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--red)', fontWeight: 700, marginBottom: '16px' }}>
          My Story
        </motion.div>

        <motion.h2
          custom={2} variants={fadeUp}
          style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: 'clamp(48px,5vw,72px)', lineHeight: .95, marginBottom: '28px' }}
        >
          The Man<br/>Behind the <span style={{ color: 'var(--red)' }}>Frame</span>
        </motion.h2>

        {[
          <>Filmmaker, storyteller, and creative producer based in Delhi. My work lives at the intersection of <strong style={{ color: 'var(--text)' }}>raw emotional truth</strong> and <strong style={{ color: 'var(--text)' }}>precise visual craft</strong>.</>,
          <>From editing the <strong style={{ color: 'var(--text)' }}>TOTM Awards Show on SonyLIV</strong> to building AI-integrated pipelines at CoPoint AI — 8+ years of obsessive storytelling.</>,
          <>Outside the edit suite: <strong style={{ color: 'var(--text)' }}>Open Mic poet, storyteller, singer.</strong> Three-time Taekwondo medalist. Same discipline. Every frame.</>,
        ].map((text, i) => (
          <motion.p key={i} custom={i + 3} variants={fadeUp} style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--dim)', marginBottom: '20px' }}>
            {text}
          </motion.p>
        ))}

        <motion.blockquote
          custom={6} variants={fadeUp}
          style={{ borderLeft: '3px solid var(--red)', padding: '20px 28px', margin: '32px 0', background: 'rgba(229,9,20,.06)' }}
        >
          <p style={{ fontSize: '20px', fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.6 }}>
            "From middle-class nostalgia to love that never quite left — Zakir Khan meets Imtiaz Ali, in film form."
          </p>
        </motion.blockquote>

        <motion.div custom={7} variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '28px' }}>
          {TAGS.map(tag => (
            <span
              key={tag}
              style={{
                fontSize: '12px', fontWeight: 600, letterSpacing: '1px', color: 'var(--dim)',
                border: '1px solid rgba(255,255,255,.12)', padding: '7px 16px',
                transition: 'all .3s', cursor: 'default',
              }}
              className="hover:border-red-600/50 hover:text-red-500"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Right column — milestones card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: .7, ease: EASE }}
      >
        <div style={{ background: 'var(--bg2)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ background: 'var(--red)', padding: '24px 28px' }}>
            <h3 style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: '26px', letterSpacing: '2px' }}>Milestones</h3>
            <p style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', opacity: .8, marginTop: '3px' }}>Career Achievements</p>
          </div>

          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .5, delay: i * .08, ease: EASE }}
              style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                padding: '18px 28px',
                borderBottom: i < milestones.length - 1 ? '1px solid rgba(255,255,255,.06)' : 'none',
                transition: 'background .2s',
              }}
              className="hover:bg-white/5"
            >
              <div style={{ width: '40px', height: '40px', background: 'rgba(229,9,20,.12)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MilestoneIcon type={m.icon} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '3px' }}>{m.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--dim)' }}>{m.sub}</div>
              </div>
            </motion.div>
          ))}

          <div style={{ display: 'flex', gap: '8px', padding: '18px 28px', background: 'rgba(255,255,255,.03)', flexWrap: 'wrap' }}>
            {['English','Hindi','Punjabi','Haryanvi'].map(lang => (
              <span key={lang} style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--dim)', border: '1px solid rgba(255,255,255,.12)', padding: '5px 12px' }}>
                {lang}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function MilestoneIcon({ type }: { type: string }) {
  if (type === 'tv') return (
    <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', stroke: 'var(--red)', fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M7 3l5 4 5-4"/>
    </svg>
  )
  if (type === 'mic') return (
    <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', stroke: 'var(--red)', fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
      <rect x="9" y="2" width="6" height="13" rx="3"/><path d="M5 10v1a7 7 0 0014 0v-1M12 19v3M8 22h8"/>
    </svg>
  )
  return (
    <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', stroke: 'var(--red)', fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
      <circle cx="12" cy="15" r="6"/><path d="M9 11L5 2h6l3 7M15 11l4-9h-6"/>
    </svg>
  )
}
