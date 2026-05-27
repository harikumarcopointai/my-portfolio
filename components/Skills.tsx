'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { GlowCard } from '@/components/ui/spotlight-card'

const skills = [
  {
    name: 'Production & Post',
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px', stroke: 'var(--red)', fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        <path d="M3 9h18v11a1 1 0 01-1 1H4a1 1 0 01-1-1z"/><path d="M3 9l1.5-5L21 7l-.5 2"/>
        <path d="M7 4l-.5 5M11 3.5l-.5 5.5M15 3l-.5 6"/>
      </svg>
    ),
    items: ['Adobe Premiere Pro','DaVinci Resolve','After Effects','Colour Grading','Audio Mix & Sound Design','Multi-Camera Production','Live Event Production'],
  },
  {
    name: 'Creative & Strategy',
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px', stroke: 'var(--red)', fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        <path d="M12 19l7-7 3 3-7 7H12v-3z"/><path d="M14 6l5 5"/><path d="M5 14l-2 7 7-2"/>
      </svg>
    ),
    items: ['Narrative Design & Storytelling','Creative Direction','Content Strategy (YT, IG, LI)','Branded Content','Podcast Production','Script Development','Shot Design & Visual Grammar'],
  },
  {
    name: 'AI Toolstack',
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px', stroke: 'var(--red)', fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        <rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/>
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>
      </svg>
    ),
    items: ['HeyGen — AI Video Generation','Higgsfield — Motion AI','Hedra — Talking Head AI','Midjourney — Visual AI','Claude — LLM Workflows','ChatGPT — Content AI'],
  },
]

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '80px 60px', background: 'var(--bg2)' }} className="max-[900px]:px-6 max-[900px]:py-[60px]">
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: .6, ease: EASE }}
        >
          <div style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--red)', fontWeight: 700, marginBottom: '16px' }}>
            Expertise
          </div>
          <h2 style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: 'clamp(48px,5vw,72px)', marginBottom: '50px' }}>
            Tools & <span style={{ color: 'var(--red)' }}>Craft</span>
          </h2>
        </motion.div>

        <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '3px' }}>
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: .6, delay: i * .12, ease: EASE }}
            >
              <GlowCard
                glowColor="red"
                customSize={true}
                className="skill-card w-full h-full"
              >
                <div style={{ padding: '32px 28px' }}>
                  <div style={{ marginBottom: '16px' }}>{skill.icon}</div>
                  <div style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: '22px', letterSpacing: '2px', marginBottom: '20px', color: 'var(--text)' }}>
                    {skill.name}
                  </div>
                  <ul style={{ listStyle: 'none' }}>
                    {skill.items.map((item, j) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: .4, delay: i * .12 + j * .05, ease: 'easeOut' }}
                        style={{
                          fontSize: '13px', color: 'var(--dim)', padding: '7px 0',
                          borderBottom: j < skill.items.length - 1 ? '1px solid rgba(255,255,255,.05)' : 'none',
                          display: 'flex', alignItems: 'center', gap: '10px',
                        }}
                      >
                        <span style={{ color: 'var(--red)', fontSize: '8px', flexShrink: 0 }}>▶</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
