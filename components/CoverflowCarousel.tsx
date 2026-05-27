'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface CarouselItem {
  title: string
  thumb?: string
  tags?: string[]
  url: string
  glow?: string
}

interface Props {
  items: CarouselItem[]
  glow: string
  label: string
}

export default function CoverflowCarousel({ items, glow, label }: Props) {
  const [active, setActive] = useState(() => Math.min(items.length > 2 ? Math.floor(items.length / 2) : 0, items.length - 1))
  const stageRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const ambientRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeRef = useRef(active)
  const pausedRef = useRef(false)
  useEffect(() => { activeRef.current = active }, [active])

  /* Auto-scroll: advance every 4s, loop, pause on hover/touch/visibility */
  useEffect(() => {
    if (items.length <= 1) return
    const wrap = wrapRef.current
    if (!wrap) return

    let inView = false
    const io = new IntersectionObserver(
      ([entry]) => { inView = entry.isIntersecting },
      { threshold: 0.25 }
    )
    io.observe(wrap)

    const onEnter = () => { pausedRef.current = true }
    const onLeave = () => { pausedRef.current = false }
    wrap.addEventListener('mouseenter', onEnter)
    wrap.addEventListener('mouseleave', onLeave)
    wrap.addEventListener('touchstart', onEnter, { passive: true })
    wrap.addEventListener('touchend', () => { setTimeout(onLeave, 2500) })

    const id = setInterval(() => {
      if (pausedRef.current || !inView || document.hidden) return
      setActive(prev => (prev + 1) % items.length)
    }, 1000)

    const onVis = () => { /* interval naturally pauses via document.hidden */ }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      clearInterval(id)
      io.disconnect()
      wrap.removeEventListener('mouseenter', onEnter)
      wrap.removeEventListener('mouseleave', onLeave)
      wrap.removeEventListener('touchstart', onEnter)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [items.length])

  const setActiveIdx = useCallback((i: number) => {
    setActive(Math.max(0, Math.min(items.length - 1, i)))
  }, [items.length])

  /* Update card transforms */
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const cards = cardRefs.current
    cards.forEach((card, i) => {
      if (!card) return
      const offset = i - active
      const abs = Math.abs(offset)
      const sign = Math.sign(offset)
      const cardWidth = card.offsetWidth
      const xUnit = cardWidth * 0.55
      const x = offset * xUnit
      const z = -abs * 180
      const ry = -sign * 32
      const scale = abs === 0 ? 1 : Math.max(.55, 1 - abs * .13)
      const visible = abs <= 3
      const opacity = !visible ? 0 : 1 - abs * .18
      const blur = abs === 0 ? 0 : Math.min(abs * .9, 3)

      card.style.transform = `translate(-50%,-50%) translate3d(${x}px,0,${z}px) rotateY(${ry}deg) scale(${scale})`
      card.style.opacity = String(opacity)
      card.style.filter = `blur(${blur}px)`
      card.style.zIndex = String(100 - abs)
      card.style.pointerEvents = visible ? 'auto' : 'none'
      card.classList.toggle('is-active', i === active)
      card.style.setProperty('--cf-glow', items[i]?.glow || glow)
    })

    if (ambientRef.current) {
      ambientRef.current.style.setProperty('--cf-glow', items[active]?.glow || glow)
    }
  }, [active, items, glow])

  /* Drag / swipe */
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    let dragStart: number | null = null, dragLast = 0, dragMoved = false

    function onDown(x: number) { dragStart = x; dragLast = x; dragMoved = false }
    function onMove(x: number) {
      if (dragStart === null) return
      if (Math.abs(x - dragStart) > 5) dragMoved = true
      dragLast = x
    }
    function onUp() {
      if (dragStart === null) return
      const dx = dragLast - dragStart
      dragStart = null
      if (Math.abs(dx) > 40) setActive(prev => Math.max(0, Math.min(items.length - 1, prev + (dx < 0 ? 1 : -1))))
    }

    const mouseDown = (e: MouseEvent) => onDown(e.clientX)
    const mouseMove = (e: MouseEvent) => { if (dragStart !== null) onMove(e.clientX) }
    const touchStart = (e: TouchEvent) => onDown(e.touches[0].clientX)
    const touchMove = (e: TouchEvent) => onMove(e.touches[0].clientX)

    stage.addEventListener('mousedown', mouseDown)
    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mouseup', onUp)
    stage.addEventListener('touchstart', touchStart, { passive: true })
    stage.addEventListener('touchmove', touchMove, { passive: true })
    stage.addEventListener('touchend', onUp)

    /* Keyboard */
    const keyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); setActive(p => Math.max(0, p - 1)) }
      else if (e.key === 'ArrowRight') { e.preventDefault(); setActive(p => Math.min(items.length - 1, p + 1)) }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(items[activeRef.current]?.url, '_blank', 'noopener') }
    }
    stage.addEventListener('keydown', keyDown)

    /* Trackpad horizontal scroll — accumulate delta, step only when threshold crossed */
    const SCROLL_THRESHOLD = 80   // px of accumulated horizontal scroll to trigger one step
    const STEP_COOLDOWN    = 500  // ms before another step can fire
    let accX = 0
    let lastStep = 0
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY) * 1.2) return  // mostly-vertical → let page scroll
      e.preventDefault()
      accX += e.deltaX
      const now = Date.now()
      if (Math.abs(accX) >= SCROLL_THRESHOLD && now - lastStep > STEP_COOLDOWN) {
        setActive(p => Math.max(0, Math.min(items.length - 1, p + (accX > 0 ? 1 : -1))))
        lastStep = now
        accX = 0
      }
    }
    stage.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      stage.removeEventListener('mousedown', mouseDown)
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('mouseup', onUp)
      stage.removeEventListener('touchstart', touchStart)
      stage.removeEventListener('touchmove', touchMove)
      stage.removeEventListener('touchend', onUp)
      stage.removeEventListener('keydown', keyDown)
      stage.removeEventListener('wheel', onWheel)
    }
  }, [items])

  const cur = items[active]

  return (
    <div ref={wrapRef} className="cf-stage-wrap" style={{ position: 'relative', padding: '18px 0 28px', isolation: 'isolate', overflowX: 'clip' }}>
      {/* Ambient glow */}
      <div
        ref={ambientRef}
        style={{
          position: 'absolute', inset: '-8% -10%', zIndex: 0,
          pointerEvents: 'none', filter: 'blur(70px)', opacity: .7,
          transition: 'background 1.1s ease, opacity .8s',
          background: `radial-gradient(60% 60% at 50% 45%, var(--cf-glow,${glow}), transparent 70%)`,
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(20,20,20,.6) 90%, #141414 100%)',
        }} />
      </div>

      {/* Stage */}
      <div
        ref={stageRef}
        tabIndex={0}
        aria-label={label}
        aria-roledescription="carousel"
        style={{
          position: 'relative',
          height: 'clamp(220px,45vw,440px)',
          minHeight: '220px',
          perspective: '1700px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          userSelect: 'none',
          outline: 'none',
        }}
      >
        {/* Prev */}
        <button
          onClick={() => setActiveIdx(active - 1)}
          disabled={active === 0}
          aria-label="Previous"
          style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)',
            left: '24px', zIndex: 20,
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'rgba(20,20,20,.55)', backdropFilter: 'blur(18px) saturate(1.6)',
            border: '1px solid rgba(255,255,255,.1)', color: '#fff',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background .2s, transform .2s, opacity .3s', opacity: .85,
          }}
          className="hover:bg-white/20 disabled:opacity-25 max-[900px]:left-[10px]"
        >
          <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px', fill: '#fff' }}><path d="M15.5 3.5L7 12l8.5 8.5 1.4-1.4L9.8 12l7.1-7.1z"/></svg>
        </button>

        {/* Cards track */}
        <div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}>
          {items.map((item, i) => (
            <div
              key={item.url + i}
              ref={el => { cardRefs.current[i] = el }}
              className="cf-card"
              style={{ width: 'clamp(240px,60vw,620px)', aspectRatio: '16/9', borderRadius: '14px' }}
              onClick={() => {
                if (i === active) window.open(item.url, '_blank', 'noopener')
                else setActiveIdx(i)
              }}
            >
              {item.thumb ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.thumb}
                  alt={item.title}
                  loading="lazy"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { (e.target as HTMLImageElement).src = item.thumb!.replace('maxresdefault', 'hqdefault') }}
                />
              ) : (
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg,#232323,#0e0e0e)', color: 'rgba(255,255,255,.9)',
                }}>
                  <svg viewBox="0 0 24 24" style={{ width: '60px', height: '60px', stroke: 'currentColor', fill: 'none', strokeWidth: 1.6 }}><polygon points="6 4 20 12 6 20"/></svg>
                </div>
              )}
              <div className="cf-card-tint" />
              <div className="cf-card-cap" style={{ padding: '12px 16px 14px' }}>
                <div className="t">{item.title}</div>
                <div className="s">{(item.tags || []).join(' · ')}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => setActiveIdx(active + 1)}
          disabled={active === items.length - 1}
          aria-label="Next"
          style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)',
            right: '24px', zIndex: 20,
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'rgba(20,20,20,.55)', backdropFilter: 'blur(18px) saturate(1.6)',
            border: '1px solid rgba(255,255,255,.1)', color: '#fff',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background .2s, transform .2s, opacity .3s', opacity: .85,
          }}
          className="hover:bg-white/20 disabled:opacity-25 max-[900px]:right-[10px]"
        >
          <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px', fill: '#fff' }}><path d="M8.5 3.5L17 12l-8.5 8.5-1.4-1.4L14.2 12 7.1 4.9z"/></svg>
        </button>
      </div>

      {/* Mini player */}
      <div style={{
        position: 'relative', zIndex: 6,
        margin: '6px auto 0',
        maxWidth: '760px', width: 'calc(100% - 48px)',
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '9px 14px',
        background: 'rgba(22,22,22,.55)',
        border: '1px solid rgba(255,255,255,.08)',
        backdropFilter: 'blur(28px) saturate(1.6)',
        borderRadius: '999px',
        boxShadow: '0 22px 50px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.03) inset',
      }}>
        <button
          onClick={() => cur && window.open(cur.url, '_blank', 'noopener')}
          style={{
            width: '42px', height: '42px', borderRadius: '50%',
            background: 'rgba(255,255,255,.95)', border: 'none', color: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0, transition: 'background .2s, transform .15s',
          }}
          aria-label="Play on YouTube"
          className="hover:bg-white"
        >
          <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor', marginLeft: '2px' }}><polygon points="6 4 20 12 6 20"/></svg>
        </button>

        <div
          onClick={() => cur && window.open(cur.url, '_blank', 'noopener')}
          style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: '11px',
            minWidth: 0, padding: '0 12px', height: '46px',
            borderLeft: '1px solid rgba(255,255,255,.1)',
            borderRight: '1px solid rgba(255,255,255,.1)',
            cursor: 'pointer', transition: 'background .2s', borderRadius: '6px',
          }}
          className="hover:bg-white/5"
        >
          {cur?.thumb && (
            <div style={{ position: 'relative', width: '38px', height: '38px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#222' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cur.thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.25 }}>
              {cur?.title || '—'}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.65)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '1px', letterSpacing: '.3px' }}>
              {(cur?.tags || []).join(' · ')}
            </div>
          </div>
        </div>

        <button
          onClick={() => cur && window.open(cur.url, '_blank', 'noopener')}
          style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'transparent', border: 'none', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0, transition: 'background .2s, transform .15s',
          }}
          aria-label="Open on YouTube"
          className="hover:bg-white/10"
        >
          <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}><path d="M21.6 7.2a2.5 2.5 0 00-1.7-1.8C18.3 5 12 5 12 5s-6.3 0-7.9.4A2.5 2.5 0 002.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 001.7 1.8C5.7 19 12 19 12 19s6.3 0 7.9-.4a2.5 2.5 0 001.7-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5 3z"/></svg>
        </button>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '10px', position: 'relative', zIndex: 5 }}>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            aria-label={`Go to item ${i + 1}`}
            style={{
              minWidth: '40px', height: '36px',
              padding: 0, background: 'transparent', border: 'none',
              cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              flex: '0 0 auto',
            }}
          >
            <span
              style={{
                width: i === active ? '22px' : '6px',
                height: '6px', borderRadius: i === active ? '3px' : '50%',
                background: i === active ? '#fff' : 'rgba(255,255,255,.2)',
                transition: 'all .3s ease',
                display: 'inline-block',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
