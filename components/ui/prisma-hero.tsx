'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

/* ─── WordsPullUp ─── */
interface WordsPullUpProps {
  text: string
  className?: string
  showAsterisk?: boolean
  style?: React.CSSProperties
}

export const WordsPullUp = ({ text, className = '', showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : '0.25em' }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        )
      })}
    </div>
  )
}

/* ─── WordsPullUpMultiStyle ─── */
interface Segment {
  text: string
  className?: string
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[]
  className?: string
  style?: React.CSSProperties
}

export const WordsPullUpMultiStyle = ({ segments, className = '', style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const words: { word: string; className?: string }[] = []
  segments.forEach((seg) => {
    seg.text.split(' ').forEach((w) => {
      if (w) words.push({ word: w, className: seg.className })
    })
  })

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ''}`}
          style={{ marginRight: '0.25em' }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  )
}

/* ─── PrismaHero ─── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const PrismaHero = () => {
  return (
    <section
      id="hero"
      style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* Background video — looping parallax */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
      />

      {/* Gradient overlay — dark left side for text legibility, fades to transparent right */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          linear-gradient(to right, rgba(0,0,0,.88) 0%, rgba(0,0,0,.55) 45%, rgba(0,0,0,.2) 70%, transparent 100%),
          linear-gradient(to top, #141414 0%, transparent 45%)
        `,
      }} />

      {/* Noise grain */}
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-overlay" />

      {/* Portrait — right side, hidden below 1100px */}
      <div
        className="max-[1100px]:hidden"
        style={{
          position: 'absolute', right: '8vw', top: '50%',
          transform: 'translateY(-50%) rotate(2.5deg)',
          width: 'clamp(280px,28vw,460px)',
          aspectRatio: '3/4', zIndex: 2,
          borderRadius: '14px', overflow: 'hidden',
          boxShadow: '0 50px 100px -10px rgba(0,0,0,.85), 0 0 0 1px rgba(255,255,255,.08) inset, 0 0 80px -10px rgba(229,9,20,.3)',
          opacity: 0,
          animation: 'portraitIn 1.4s cubic-bezier(.22,.85,.27,1.01) forwards 1.1s',
          isolation: 'isolate',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to right, rgba(20,20,20,.5) 0%, transparent 30%, transparent 60%, rgba(20,20,20,.4) 100%), linear-gradient(to bottom, transparent 50%, rgba(20,20,20,.55) 100%)',
          mixBlendMode: 'multiply',
        }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hari.jpg"
          alt="Hari Kumar"
          loading="eager"
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            filter: 'saturate(1.05) contrast(1.05) brightness(.95)',
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

      {/* Stats — far right bottom, hidden below 900px */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
        style={{
          position: 'absolute', right: '60px', bottom: '100px',
          zIndex: 3, textAlign: 'right',
        }}
        className="max-[900px]:hidden"
      >
        {[
          { num: '8+',  label: 'Years in Film' },
          { num: '40%', label: 'Faster Pipelines' },
          { num: 'M+',  label: 'Viewers Reached' },
        ].map(({ num, label }) => (
          <div key={label} style={{ marginBottom: '16px' }}>
            <div style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: '52px', color: 'white', lineHeight: 1 }}>{num}</div>
            <div style={{ fontSize: '11px', letterSpacing: '2.5px', color: 'var(--dim)', textTransform: 'uppercase' }}>{label}</div>
          </div>
        ))}
      </motion.div>

      {/* Main content — bottom left */}
      <div
        style={{ position: 'relative', zIndex: 3, padding: '0 60px 100px', maxWidth: '700px' }}
        className="max-[900px]:!px-6 max-[900px]:!pb-20"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(229,9,20,.15)', border: '1px solid rgba(229,9,20,.3)',
            padding: '6px 16px', marginBottom: '20px',
            fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--red)', fontWeight: 600,
          }}
        >
          <span style={{ width: '8px', height: '8px', background: 'var(--red)', borderRadius: '50%', animation: 'pulse 1.5s ease infinite' }} />
          Now Available for Projects
        </motion.div>

        {/* Name — WordsPullUp animation */}
        <div
          style={{
            fontFamily: 'var(--font-bebas-neue), sans-serif',
            fontSize: 'clamp(80px,10vw,140px)',
            lineHeight: .88, letterSpacing: '2px',
            marginBottom: '12px',
          }}
        >
          <WordsPullUp text="HARI" />
          <br />
          <WordsPullUp text="KUMAR" style={{ color: 'var(--red)' }} />
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          style={{
            fontSize: '18px', fontWeight: 300, color: 'var(--dim)',
            letterSpacing: '3px', textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          Filmmaker &nbsp;·&nbsp; Creative Producer &nbsp;·&nbsp; Storyteller
        </motion.div>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          style={{
            fontSize: '18px', lineHeight: 1.7, color: 'rgba(229,229,229,.8)',
            maxWidth: '520px', marginBottom: '36px', fontStyle: 'italic',
          }}
        >
          "Stories that stay with you — where every frame has a feeling, and every word hits home."
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
          style={{ display: 'flex', gap: '14px' }}
        >
          <Link
            href="#work"
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'white', color: 'black',
              padding: '14px 32px', fontSize: '16px', fontWeight: 700,
              textDecoration: 'none', transition: 'background .2s',
            }}
            className="hover:!bg-white/75"
          >
            <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px', fill: 'black' }}><polygon points="5,3 19,12 5,21" /></svg>
            View Work
          </Link>
          <Link
            href="#about"
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'rgba(109,109,110,.7)', color: 'white',
              padding: '14px 32px', fontSize: '16px', fontWeight: 600,
              textDecoration: 'none', backdropFilter: 'blur(4px)', transition: 'background .2s',
            }}
            className="hover:!bg-[rgba(109,109,110,0.9)]"
          >
            <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px', fill: 'none', stroke: 'white', strokeWidth: 2 }}>
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><circle cx="12" cy="16" r="1" fill="white" />
            </svg>
            My Story
          </Link>
        </motion.div>
      </div>

      {/* Red progress bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,.1)', zIndex: 3 }}>
        <div style={{ height: '100%', background: 'var(--red)', width: '0%', animation: 'heroProgress 8s linear infinite' }} />
      </div>
    </section>
  )
}

export default PrismaHero
