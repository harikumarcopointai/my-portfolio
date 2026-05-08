'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { EXPERIENCE } from '@/lib/data'

export default function Experience() {
  return (
    <section
      id="exp"
      style={{ padding: '80px 60px', maxWidth: '1400px', margin: '0 auto' }}
      className="max-[900px]:px-6 max-[900px]:py-[60px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: .6, ease: EASE }}
      >
        <div style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--red)', fontWeight: 700, marginBottom: '16px' }}>
          Career
        </div>
        <h2 style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: 'clamp(48px,5vw,72px)', marginBottom: '60px', lineHeight: .95 }}>
          Eight Years<br/>in the <span style={{ color: 'var(--red)' }}>Making</span>
        </h2>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {EXPERIENCE.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: .6, delay: i * .08, ease: EASE }}
            style={{
              display: 'grid',
              gridTemplateColumns: '160px 1px 1fr',
              gap: '40px',
              padding: '36px 0',
              borderBottom: i < EXPERIENCE.length - 1 ? '1px solid rgba(255,255,255,.07)' : 'none',
            }}
            className="max-[900px]:grid-cols-1 max-[900px]:gap-3"
          >
            {/* Date */}
            <div
              style={{
                fontFamily: 'var(--font-bebas-neue)', fontSize: '13px', letterSpacing: '2px',
                color: 'var(--red)', textAlign: 'right', paddingTop: '4px', lineHeight: 1.8,
                whiteSpace: 'pre-line',
              }}
              className="max-[900px]:text-left"
            >
              {exp.date}
            </div>

            {/* Timeline line */}
            <div
              style={{ background: 'rgba(255,255,255,.1)', position: 'relative' }}
              className="max-[900px]:hidden"
            >
              <span style={{
                content: '', position: 'absolute', top: '6px', left: '50%',
                transform: 'translateX(-50%)', width: '8px', height: '8px',
                background: 'var(--red)', borderRadius: '50%', boxShadow: '0 0 12px var(--red)',
                display: 'block',
              }} />
            </div>

            {/* Content */}
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--red)', fontWeight: 700, marginBottom: '8px' }}>
                {exp.company}
              </div>
              <div style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: '34px', marginBottom: '18px', lineHeight: 1 }}>
                {exp.role}
              </div>
              <ul style={{ listStyle: 'none' }}>
                {exp.points.map((point, j) => (
                  <li key={j} style={{ fontSize: '14px', color: 'var(--dim)', lineHeight: 1.7, padding: '4px 0 4px 20px', position: 'relative' }}>
                    <span style={{ content: '▶', color: 'var(--red)', position: 'absolute', left: 0, fontSize: '8px', top: '8px', display: 'block' }}>▶</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
