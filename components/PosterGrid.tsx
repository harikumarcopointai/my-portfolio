'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

interface PosterItem {
  id: string
  title: string
  tags: string[]
  glow: string
  accent: string
}

interface Props {
  items: PosterItem[]
  glow: string
}

export default function PosterGrid({ items, glow }: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '40px',
        padding: '24px 60px 48px',
        maxWidth: '1700px',
        margin: '0 auto',
        position: 'relative',
      } as React.CSSProperties}
      className="max-[900px]:grid-cols-1 max-[900px]:gap-[18px] max-[900px]:px-6 min-[600px]:max-[900px]:grid-cols-3 min-[600px]:max-[900px]:gap-3"
    >
      {/* Ambient glow */}
      <div style={{
        content: '',
        position: 'absolute', inset: '-40px', zIndex: -1,
        background: `radial-gradient(70% 60% at 50% 50%, ${glow}, transparent 70%)`,
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      {items.map((item, i) => (
        <motion.a
          key={item.id}
          href={`https://www.youtube.com/watch?v=${item.id}`}
          target="_blank"
          rel="noopener"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: .6, delay: i * .12, ease: EASE }}
          className="poster-card"
          style={{
            position: 'relative',
            aspectRatio: '2/3',
            borderRadius: '22px',
            overflow: 'hidden',
            cursor: 'pointer',
            background: 'linear-gradient(145deg,#0a1525 0%,#04080f 100%)',
            border: '1px solid rgba(255,255,255,.08)',
            boxShadow: '0 30px 60px -20px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.04) inset',
            textDecoration: 'none', color: 'inherit', isolation: 'isolate',
            transition: 'transform .55s cubic-bezier(.22,.85,.27,1.01), box-shadow .55s, border-color .4s',
            ['--poster-glow' as string]: item.glow,
            ['--poster-accent' as string]: item.accent,
          } as React.CSSProperties}
          whileHover={{
            y: -10,
            borderColor: 'rgba(255,255,255,.15)',
            boxShadow: `0 50px 90px -20px rgba(0,0,0,.85), 0 0 0 1px rgba(255,255,255,.12) inset`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${item.id}/maxresdefault.jpg`}
            alt={item.title}
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg` }}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', display: 'block', zIndex: 1,
              transition: 'transform .9s cubic-bezier(.22,.85,.27,1.01), filter .5s',
              filter: 'saturate(1.05) contrast(1.05)',
            }}
          />
          <div className="poster-glass" />
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: '28px 28px 30px',
            background: 'linear-gradient(to top, rgba(0,0,0,.95) 0%, rgba(0,0,0,.65) 25%, rgba(0,0,0,.15) 55%, transparent 80%)',
            pointerEvents: 'none',
          }}>
            <span style={{
              alignSelf: 'flex-start', fontSize: '10.5px', fontWeight: 700,
              letterSpacing: '2.5px', textTransform: 'uppercase', color: '#fff',
              marginBottom: '14px', padding: '5px 11px',
              background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)',
              backdropFilter: 'blur(14px) saturate(1.4)', borderRadius: '999px',
              display: 'flex', alignItems: 'center', gap: '7px',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: item.accent, boxShadow: `0 0 10px ${item.accent}`,
              }} />
              {item.tags[0] || 'Film'}
            </span>
            <div style={{
              fontFamily: 'var(--font-bebas-neue)', fontSize: 'clamp(24px,2.1vw,36px)',
              letterSpacing: '1px', lineHeight: 1.02, color: '#fff',
              textShadow: '0 4px 24px rgba(0,0,0,.7)',
              display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
              overflow: 'hidden', marginBottom: '8px',
            }}>
              {item.title}
            </div>
            <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,.7)', letterSpacing: '.5px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ width: '14px', height: '1px', background: 'rgba(255,255,255,.4)', display: 'inline-block' }} />
              {item.tags.slice(1).join(' · ') || 'Watch on YouTube'}
            </div>
          </div>

          {/* Play button */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(`https://www.youtube.com/watch?v=${item.id}`, '_blank', 'noopener') }}
            aria-label="Watch on YouTube"
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%) scale(.7)',
              opacity: 0,
              width: '84px', height: '84px', borderRadius: '50%',
              background: 'rgba(255,255,255,.96)', color: '#000',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: 'none', cursor: 'pointer', zIndex: 4,
              boxShadow: '0 12px 40px rgba(0,0,0,.6), 0 0 0 8px rgba(255,255,255,.06)',
              transition: 'transform .45s cubic-bezier(.22,.85,.27,1.4), opacity .35s, box-shadow .35s',
            }}
            className="group-hover:opacity-100 [.poster-card:hover_&]:opacity-100 [.poster-card:hover_&]:!scale-100"
          >
            <svg viewBox="0 0 24 24" style={{ width: '30px', height: '30px', marginLeft: '4px', fill: 'currentColor' }}><polygon points="6 4 20 12 6 20"/></svg>
          </button>
        </motion.a>
      ))}
    </div>
  )
}
