'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  /* Particles */
  useEffect(() => {
    const pc = particlesRef.current
    if (!pc) return
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div')
      p.className = 'particle'
      p.style.cssText = `left:${Math.random()*100}%;animation-duration:${8+Math.random()*12}s;animation-delay:${Math.random()*10}s;opacity:${.3+Math.random()*.7}`
      pc.appendChild(p)
    }
    return () => { if (pc) pc.innerHTML = '' }
  }, [])

  /* Cursor glow */
  useEffect(() => {
    const hero = heroRef.current
    const glow = glowRef.current
    if (!hero || !glow) return
    let raf: number | null = null
    let mx = 0, my = 0
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect()
      mx = e.clientX - r.left
      my = e.clientY - r.top
      if (raf == null) raf = requestAnimationFrame(() => {
        glow.style.left = mx + 'px'
        glow.style.top = my + 'px'
        raf = null
      })
    }
    hero.addEventListener('mousemove', onMove)
    return () => hero.removeEventListener('mousemove', onMove)
  }, [])

  /* Hero name 3D letter effect */
  useEffect(() => {
    const name = nameRef.current
    if (!name) return

    let idx = 0
    name.querySelectorAll<HTMLElement>('[data-row]').forEach(row => {
      row.innerHTML = ''
      const text = row.dataset.row || ''
      ;[...text].forEach(ch => {
        const span = document.createElement('span')
        span.className = 'hn-letter' + (ch === ' ' ? ' space' : '')
        span.style.setProperty('--i', String(idx++))
        const inner = document.createElement('span')
        inner.className = 'hn-letter-inner'
        inner.textContent = ch === ' ' ? ' ' : ch
        span.appendChild(inner)
        row.appendChild(span)
      })
    })

    const letters = [...name.querySelectorAll<HTMLElement>('.hn-letter')]
    const rows = [...name.querySelectorAll<HTMLElement>('.hn-row')]
    const hero = heroRef.current
    if (!hero) return

    let raf: number | null = null, mx = 0, my = 0, active = false
    const RADIUS = 220, MAX_LIFT = 22, MAX_TILT = 7

    function applyTransforms() {
      raf = null
      if (!active) return
      const nameRect = name!.getBoundingClientRect()
      const cx = nameRect.left + nameRect.width / 2
      const cy = nameRect.top + nameRect.height / 2
      const dx = (mx - cx) / Math.max(nameRect.width, 1)
      const dy = (my - cy) / Math.max(nameRect.height, 1)
      rows.forEach(r => {
        r.style.setProperty('--rx', `${(-dy * MAX_TILT).toFixed(2)}deg`)
        r.style.setProperty('--ry', `${(dx * MAX_TILT * 1.4).toFixed(2)}deg`)
      })
      letters.forEach(l => {
        const r = l.getBoundingClientRect()
        const lcx = r.left + r.width / 2
        const lcy = r.top + r.height / 2
        const dist = Math.hypot(mx - lcx, my - lcy)
        const power = Math.max(0, 1 - dist / RADIUS)
        l.style.setProperty('--lift', `${(-power * MAX_LIFT).toFixed(2)}px`)
        l.style.setProperty('--scale', (1 + power * 0.18).toFixed(3))
        l.style.setProperty('--glow', power.toFixed(2))
      })
    }

    function reset() {
      rows.forEach(r => { r.style.setProperty('--rx','0deg'); r.style.setProperty('--ry','0deg') })
      letters.forEach(l => { l.style.setProperty('--lift','0px'); l.style.setProperty('--scale','1'); l.style.setProperty('--glow','0') })
    }

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY; active = true
      if (raf == null) raf = requestAnimationFrame(applyTransforms)
    }
    const onLeave = () => { active = false; reset() }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)

    const clickHandlers: Array<{ el: HTMLElement; fn: EventListener }> = []
    letters.forEach(l => {
      const fn = () => {
        l.classList.remove('popping')
        void l.offsetWidth
        l.classList.add('popping')
        setTimeout(() => l.classList.remove('popping'), 750)
      }
      l.addEventListener('click', fn)
      clickHandlers.push({ el: l, fn })
    })

    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
      clickHandlers.forEach(({ el, fn }) => el.removeEventListener('click', fn))
    }
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          linear-gradient(to right, rgba(0,0,0,.85) 0%, rgba(0,0,0,.4) 50%, transparent 100%),
          linear-gradient(to top, #141414 0%, transparent 40%),
          linear-gradient(135deg,#0a0a0a 0%,#1a0808 30%,#0d0d0d 60%,#080808 100%)
        `,
      }} />

      {/* Light beams */}
      <div style={{
        position: 'absolute', top: '-20%', right: '20%',
        width: '600px', height: '140%',
        background: 'linear-gradient(180deg,transparent 0%,rgba(229,9,20,.04) 30%,rgba(229,9,20,.08) 50%,rgba(229,9,20,.04) 70%,transparent 100%)',
        transform: 'rotate(-15deg)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '-20%', right: '10%',
        width: '300px', height: '140%',
        background: 'linear-gradient(180deg,transparent 0%,rgba(255,180,0,.02) 40%,rgba(255,180,0,.04) 55%,transparent 100%)',
        transform: 'rotate(-12deg)', pointerEvents: 'none',
      }} />

      {/* Scan lines */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.03) 2px,rgba(0,0,0,.03) 4px)',
        pointerEvents: 'none',
      }} />

      {/* BG text */}
      <div style={{
        position: 'absolute', right: '-20px', top: '50%',
        transform: 'translateY(-60%)',
        fontFamily: 'var(--font-bebas-neue), sans-serif',
        fontSize: 'clamp(200px,22vw,340px)',
        color: 'rgba(255,255,255,.025)',
        lineHeight: 1, letterSpacing: '-10px',
        pointerEvents: 'none', userSelect: 'none',
      }}>HK</div>

      {/* Particles */}
      <div ref={particlesRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }} />

      {/* Cursor glow */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute', pointerEvents: 'none',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229,9,20,.12) 0%, rgba(229,9,20,.04) 30%, transparent 60%)',
          transform: 'translate(-50%,-50%)',
          zIndex: 1, mixBlendMode: 'screen', opacity: 0,
          transition: 'opacity .5s', filter: 'blur(20px)',
        }}
        className="group-hover:opacity-100"
      />

      {/* Portrait */}
      <div
        className="max-[1100px]:hidden"
        style={{
          position: 'absolute', right: '8vw', top: '50%',
          transform: 'translateY(-50%) rotate(2.5deg)',
          width: 'clamp(280px,28vw,460px)',
          aspectRatio: '3/4', zIndex: 2,
          borderRadius: '14px', overflow: 'hidden',
          boxShadow: '0 50px 100px -10px rgba(0,0,0,.85), 0 0 0 1px rgba(255,255,255,.08) inset, 0 0 80px -10px rgba(229,9,20,.3)',
          transition: 'transform .8s cubic-bezier(.22,.85,.27,1.01), box-shadow .8s',
          opacity: 0,
          animation: 'portraitIn 1.4s cubic-bezier(.22,.85,.27,1.01) forwards 1.1s',
          isolation: 'isolate',
        }}
      >
        <span style={{
          position: 'absolute', top: '-12px', left: '50%',
          transform: 'translateX(-50%) rotate(-3deg)',
          width: '90px', height: '24px',
          background: 'linear-gradient(180deg, rgba(255,255,255,.3) 0%, rgba(255,255,255,.18) 100%)',
          zIndex: 4, borderRadius: '2px',
          boxShadow: '0 4px 14px rgba(0,0,0,.4)',
          pointerEvents: 'none',
          backdropFilter: 'blur(2px)',
          border: '1px solid rgba(255,255,255,.12)',
        }} />
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
            background: 'linear-gradient(to right, rgba(20,20,20,.5) 0%, transparent 30%, transparent 60%, rgba(20,20,20,.4) 100%), linear-gradient(to bottom, transparent 50%, rgba(20,20,20,.55) 100%)',
            mixBlendMode: 'multiply',
          }}
        />
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
            background: 'repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(0,0,0,.06) 2px, rgba(0,0,0,.06) 3px)',
            mixBlendMode: 'overlay', opacity: .5,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hari.jpg"
          alt="Hari Kumar"
          loading="eager"
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            filter: 'saturate(1.05) contrast(1.05) brightness(.95)',
            transition: 'transform 1.2s cubic-bezier(.22,.85,.27,1.01), filter .6s',
            position: 'relative', zIndex: 1,
          }}
        />
        <span style={{
          position: 'absolute', bottom: '18px', left: '18px',
          zIndex: 4,
          fontFamily: 'var(--font-bebas-neue), sans-serif',
          fontSize: '13px', letterSpacing: '3px',
          color: 'rgba(255,255,255,.85)',
          background: 'rgba(0,0,0,.5)',
          backdropFilter: 'blur(8px)',
          padding: '5px 12px', borderRadius: '4px',
          border: '1px solid rgba(255,255,255,.12)',
          pointerEvents: 'none',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--red)', animation: 'pulse 1.8s ease infinite', flexShrink: 0 }} />
          Delhi · 2026
        </span>
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative', zIndex: 3,
          padding: '0 60px 100px',
          maxWidth: '700px',
        }}
        className="max-[900px]:!px-6 max-[900px]:!pb-20"
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(229,9,20,.15)', border: '1px solid rgba(229,9,20,.3)',
          padding: '6px 16px', marginBottom: '20px',
          fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase',
          color: 'var(--red)', fontWeight: 600,
          opacity: 0, animation: 'fadeup .8s forwards .3s',
        }}>
          <span style={{ width: '8px', height: '8px', background: 'var(--red)', borderRadius: '50%', animation: 'pulse 1.5s ease infinite' }} />
          Now Available for Projects
        </div>

        <div
          ref={nameRef}
          style={{
            fontFamily: 'var(--font-bebas-neue), sans-serif',
            fontSize: 'clamp(80px,10vw,140px)',
            lineHeight: .88, letterSpacing: '2px',
            marginBottom: '12px',
            perspective: '1200px',
            transformStyle: 'preserve-3d',
            userSelect: 'none',
          }}
        >
          <span className="hn-row" data-row="HARI" />
          <span className="hn-row" style={{ color: 'var(--red)' }} data-row="KUMAR" />
        </div>

        <div style={{
          fontSize: '18px', fontWeight: 300, color: 'var(--dim)',
          letterSpacing: '3px', textTransform: 'uppercase',
          marginBottom: '24px',
          opacity: 0, animation: 'fadeup .8s forwards .7s',
        }}>
          Filmmaker &nbsp;·&nbsp; Creative Producer &nbsp;·&nbsp; Storyteller
        </div>

        <p style={{
          fontSize: '18px', lineHeight: 1.7, color: 'rgba(229,229,229,.8)',
          maxWidth: '520px', marginBottom: '36px', fontStyle: 'italic',
          opacity: 0, animation: 'fadeup .8s forwards .85s',
        }}>
          "Stories that stay with you — where every frame has a feeling, and every word hits home."
        </p>

        <div style={{ display: 'flex', gap: '14px', opacity: 0, animation: 'fadeup .8s forwards 1s' }}>
          <Link href="#work" style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: 'white', color: 'black',
            padding: '14px 32px', fontSize: '16px', fontWeight: 700,
            textDecoration: 'none', transition: 'background .2s',
          }} className="hover:!bg-white/75">
            <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px', fill: 'black' }}><polygon points="5,3 19,12 5,21"/></svg>
            View Work
          </Link>
          <Link href="#about" style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: 'rgba(109,109,110,.7)', color: 'white',
            padding: '14px 32px', fontSize: '16px', fontWeight: 600,
            textDecoration: 'none', backdropFilter: 'blur(4px)', transition: 'background .2s',
          }} className="hover:!bg-[rgba(109,109,110,0.9)]">
            <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px', fill: 'none', stroke: 'white', strokeWidth: 2 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="1" fill="white"/>
            </svg>
            My Story
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          position: 'absolute', right: '60px', bottom: '100px',
          zIndex: 3, textAlign: 'right',
          opacity: 0, animation: 'fadeup .8s forwards 1.2s',
        }}
        className="max-[900px]:hidden"
      >
        {[
          { num: '8+', label: 'Years in Film' },
          { num: '40%', label: 'Faster Pipelines' },
          { num: 'M+', label: 'Viewers Reached' },
        ].map(({ num, label }) => (
          <div key={label} style={{ marginBottom: '16px' }}>
            <div style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: '52px', color: 'white', lineHeight: 1 }}>{num}</div>
            <div style={{ fontSize: '11px', letterSpacing: '2.5px', color: 'var(--dim)', textTransform: 'uppercase' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,.1)', zIndex: 3 }}>
        <div style={{ height: '100%', background: 'var(--red)', width: '0%', animation: 'heroProgress 8s linear infinite' }} />
      </div>
    </section>
  )
}
