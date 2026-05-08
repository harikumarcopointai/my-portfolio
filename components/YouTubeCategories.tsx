'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import CoverflowCarousel from './CoverflowCarousel'
import PosterGrid from './PosterGrid'
import HeroVideoCard from './HeroVideoCard'
import { YT_CATEGORIES, YTCategory } from '@/lib/data'

const CATEGORY_ICONS: Record<string, string> = {
  hotels: '<svg viewBox="0 0 24 24"><path d="M3 21V8l9-5 9 5v13"/><path d="M3 21h18"/><path d="M9 21v-6h6v6"/><path d="M7 11h2M11 11h2M15 11h2M7 14h2M15 14h2"/></svg>',
  brand:  '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>',
  docu:   '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2.5"/><path d="M7 2v20M17 2v20M2 7h5M17 7h5M2 12h20M2 17h5M17 17h5"/></svg>',
  ibw:    '<svg viewBox="0 0 24 24"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h2l1.5 5L15 17.5h-9L9 12h6l-2.5-6"/><path d="M5.5 17.5L9 12"/></svg>',
  music:  '<svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  podcast:'<svg viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="13" rx="3"/><path d="M5 10v1a7 7 0 0014 0v-1M12 19v3M8 22h8"/></svg>',
  series: '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8M12 18v3"/></svg>',
  bts:    '<svg viewBox="0 0 24 24"><path d="M3 9h18v11a1 1 0 01-1 1H4a1 1 0 01-1-1z"/><path d="M3 9l1.5-5L21 7l-.5 2"/><path d="M7 4l-.5 5M11 3.5l-.5 5.5M15 3l-.5 6"/></svg>',
}

interface VideoMeta { title: string }

function useVideoTitles(ids: string[]): Record<string, string> {
  const [titles, setTitles] = useState<Record<string, string>>({})
  const idsKey = ids.join(',')

  useEffect(() => {
    const controllers: AbortController[] = []
    ids.forEach(id => {
      const ac = new AbortController()
      controllers.push(ac)
      fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`, {
        signal: ac.signal,
      })
        .then(r => r.ok ? r.json() : null)
        .then((d: VideoMeta | null) => {
          if (d?.title) setTitles(prev => ({ ...prev, [id]: d.title }))
        })
        .catch(() => {})
    })
    return () => controllers.forEach(ac => ac.abort())
  // idsKey is a stable string derived from ids so we avoid array identity issues
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey])

  return titles
}

function RowHeader({ cat }: { cat: YTCategory }) {
  const iconSvg = CATEGORY_ICONS[cat.key] || CATEGORY_ICONS.bts
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 60px 14px', cursor: 'pointer' }} className="max-[900px]:px-5">
      <span
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', color: 'var(--red)', flexShrink: 0, opacity: .9 }}
        dangerouslySetInnerHTML={{ __html: iconSvg.replace('<svg', '<svg fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"') }}
      />
      <span style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)', letterSpacing: '.3px' }}>{cat.label}</span>
      <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--dim)', letterSpacing: '1px', textTransform: 'uppercase', marginLeft: 'auto' }}>
        {cat.ids.length} {cat.ids.length === 1 ? 'Film' : 'Films'}
      </span>
    </div>
  )
}

function CategoryRow({ cat }: { cat: YTCategory }) {
  const titles = useVideoTitles(cat.ids)

  const items = cat.ids.map(id => ({
    title: titles[id] || cat.label,
    thumb: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    tags: cat.tags,
    url: `https://www.youtube.com/watch?v=${id}`,
    glow: cat.glow,
  }))

  return (
    <motion.div
      className="row"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: .6, ease: EASE }}
      style={{ marginBottom: '6px' }}
    >
      <RowHeader cat={cat} />

      {cat.ids.length === 1 ? (
        <HeroVideoCard
          id={cat.ids[0]}
          label={titles[cat.ids[0]] || cat.label}
          tags={cat.tags}
          glow={cat.glow}
        />
      ) : cat.layout === 'posters' ? (
        <PosterGrid
          items={cat.ids.map(id => ({
            id, title: titles[id] || cat.label, tags: cat.tags,
            glow: cat.glow, accent: cat.accent || '#5ad2a0',
          }))}
          glow={cat.glow}
        />
      ) : (
        <CoverflowCarousel items={items} glow={cat.glow} label={cat.label} />
      )}
    </motion.div>
  )
}

export default function YouTubeCategories() {
  return (
    <div id="yt-categories">
      {YT_CATEGORIES.map(cat => (
        <CategoryRow key={cat.key} cat={cat} />
      ))}
    </div>
  )
}
