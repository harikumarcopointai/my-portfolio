'use client'

import { TOOLS } from '@/lib/data'

export default function ToolstackMarquee() {
  const doubled = [...TOOLS, ...TOOLS]

  return (
    <div className="marquee" aria-label="Tools and software I work with">
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <a
            key={i}
            href="#exp"
            aria-label={t.name}
            style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '18px 28px',
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: '18px',
              cursor: 'pointer', flexShrink: 0, minWidth: '200px',
              textDecoration: 'none', color: 'inherit',
              position: 'relative', isolation: 'isolate',
              transition: 'transform .35s cubic-bezier(.22,.85,.27,1.01), background .3s, border-color .3s, box-shadow .35s',
              ['--tool-glow' as string]: t.glow,
            } as React.CSSProperties}
            className="hover:scale-[1.18] hover:-translate-y-[6px] hover:bg-white/8 hover:border-white/22 hover:z-[5] hover:shadow-[0_24px_60px_-10px_rgba(0,0,0,.6)]"
          >
            {/* Glow behind */}
            <span style={{
              content: '', position: 'absolute', inset: '-3px', borderRadius: 'inherit', zIndex: -2,
              background: `radial-gradient(60% 60% at 50% 50%, ${t.glow}, transparent 70%)`,
              filter: 'blur(22px)', opacity: 0,
              transition: 'opacity .4s',
            }} className="[a:hover_>_&]:opacity-85" />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={t.logo}
              alt={t.name}
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              style={{
                width: '46px', height: '46px', objectFit: 'contain',
                display: 'block', flexShrink: 0,
                transition: 'transform .4s cubic-bezier(.22,.85,.27,1.4), filter .4s',
                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.4))',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#fff', letterSpacing: '.3px', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                {t.name}
              </span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,.55)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '4px', whiteSpace: 'nowrap', transition: 'color .3s' }}>
                {t.cat}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
