'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

interface Props {
  id: string
  label: string
  tags: string[]
  glow: string
}

export default function HeroVideoCard({ id, label, tags, glow }: Props) {
  return (
    <motion.a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noopener"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: .6, ease: EASE }}
      style={{
        display: 'block',
        margin: '14px 60px 28px',
        borderRadius: '18px',
        overflow: 'hidden',
        aspectRatio: '16/9',
        cursor: 'pointer',
        background: '#1f1f1f',
        textDecoration: 'none', color: 'inherit',
        boxShadow: '0 30px 80px -20px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.04) inset',
        transition: 'transform .5s cubic-bezier(.22,.85,.27,1.01), box-shadow .5s',
        isolation: 'isolate',
        maxWidth: '1280px',
        position: 'relative',
        ['--cf-glow' as string]: glow,
      } as React.CSSProperties}
      className="max-[900px]:mx-5 max-[900px]:my-3"
      whileHover={{
        y: -4,
        boxShadow: `0 50px 100px -20px rgba(0,0,0,.85), 0 0 0 1px rgba(255,255,255,.08) inset, 0 0 80px -10px ${glow}`,
      }}
    >
      {/* Glow */}
      <div style={{
        position: 'absolute', inset: '-30px', zIndex: -1,
        filter: 'blur(60px)', opacity: .5, pointerEvents: 'none',
        background: `radial-gradient(50% 50% at 50% 50%, ${glow}, transparent 70%)`,
      }} />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
        alt={label}
        loading="lazy"
        onError={(e) => { (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg` }}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
          transition: 'transform .8s cubic-bezier(.22,.85,.27,1.01)',
        }}
        className="group-hover:scale-[1.03]"
      />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,.92) 0%, rgba(0,0,0,.5) 35%, rgba(0,0,0,.1) 65%, transparent 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '36px 44px 32px', pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: 'var(--font-bebas-neue)', fontSize: 'clamp(30px,3.6vw,56px)',
          letterSpacing: '1.5px', color: '#fff', lineHeight: 1.02,
          marginBottom: '10px', textShadow: '0 4px 20px rgba(0,0,0,.6)', maxWidth: '80%',
        }}>{label}</div>
        <div style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,.85)', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{
            fontSize: '11px', fontWeight: 700, color: 'var(--red)',
            background: 'rgba(229,9,20,.12)', border: '1px solid rgba(229,9,20,.4)',
            padding: '4px 10px', letterSpacing: '2px',
          }}>FEATURED</span>
          {tags.map(t => <span key={t}>{t}</span>)}
        </div>
      </div>

      {/* Play button */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(`https://www.youtube.com/watch?v=${id}`, '_blank', 'noopener') }}
        aria-label="Watch on YouTube"
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '84px', height: '84px', borderRadius: '50%',
          background: 'rgba(255,255,255,.94)', color: '#000',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: 'none', cursor: 'pointer', zIndex: 2,
          boxShadow: '0 14px 50px rgba(0,0,0,.5), 0 0 0 8px rgba(255,255,255,.08)',
          transition: 'transform .3s cubic-bezier(.22,.85,.27,1.01), background .2s, box-shadow .3s',
          pointerEvents: 'auto',
        }}
        className="hover:scale-110 hover:bg-white"
      >
        <svg viewBox="0 0 24 24" style={{ width: '32px', height: '32px', marginLeft: '4px', fill: 'currentColor' }}><polygon points="6 4 20 12 6 20"/></svg>
      </button>
    </motion.a>
  )
}
