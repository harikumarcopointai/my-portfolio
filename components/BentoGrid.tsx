'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { EASE } from '@/lib/motion'

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: .6, delay: i * .1, ease: EASE } }),
}

export default function BentoGrid() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: '240px 240px 200px',
        gap: '14px',
        padding: '18px 60px 36px',
        maxWidth: '1700px',
        margin: '0 auto',
        gridTemplateAreas: `"totm totm ai ai" "totm totm years viewers" "quote quote quote quote"`,
      }}
      className="bento-grid max-[1100px]:!grid-cols-2 max-[1100px]:!auto-rows-auto max-[1100px]:![grid-template-rows:none] max-[600px]:!grid-cols-1 max-[600px]:!px-6 max-[600px]:!gap-3"
    >
      {/* TOTM Awards hero tile */}
      <motion.a
        custom={0} variants={fadeIn}
        href="https://www.youtube.com/watch?v=FAWCezOcx_Y"
        target="_blank" rel="noopener"
        style={{
          gridArea: 'totm',
          position: 'relative', borderRadius: '20px', overflow: 'hidden',
          background: 'linear-gradient(145deg,#161616 0%,#0a0a0a 100%)',
          border: '1px solid rgba(255,255,255,.07)',
          boxShadow: '0 20px 50px -20px rgba(0,0,0,.6)',
          textDecoration: 'none', color: 'inherit',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '34px', isolation: 'isolate', cursor: 'pointer',
          transition: 'transform .5s cubic-bezier(.22,.85,.27,1.01), border-color .4s, box-shadow .5s',
        }}
        whileHover={{
          y: -4,
          boxShadow: '0 30px 70px -20px rgba(0,0,0,.85), 0 0 0 1px rgba(255,255,255,.12) inset, 0 0 80px -20px rgba(255,140,40,.4)',
          borderColor: 'rgba(255,255,255,.18)',
        }}
        className="max-[1100px]:!min-h-[320px] max-[1100px]:!p-6 max-[600px]:!min-h-[300px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 0, opacity: .55,
            filter: 'saturate(1.1) contrast(1.05)',
            transition: 'opacity .6s, transform .9s cubic-bezier(.22,.85,.27,1.01)',
          }}
          className="group-hover:opacity-70 group-hover:scale-[1.04]"
          src="https://i.ytimg.com/vi/FAWCezOcx_Y/maxresdefault.jpg"
          alt="TOTM Awards Show"
          loading="lazy"
        />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(135deg, rgba(0,0,0,.85) 0%, rgba(0,0,0,.5) 40%, rgba(20,8,0,.4) 100%)',
        }} />
        <div style={{ position: 'absolute', top: '34px', left: '34px', zIndex: 2 }}>
          <BtTag accent="var(--red)" label="FLAGSHIP" />
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            fontFamily: 'var(--font-bebas-neue)', fontSize: 'clamp(40px,4vw,64px)',
            letterSpacing: '1.5px', lineHeight: .95, color: '#fff',
            textShadow: '0 4px 30px rgba(0,0,0,.7)', marginBottom: '14px', marginTop: '14px',
          }}>TOTM Awards<br/>Show</div>
          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,.85)', letterSpacing: '.5px', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '18px' }}>
            <span>Senior Editor</span><span style={{ color: 'rgba(255,255,255,.45)' }}>·</span>
            <span>SonyLIV</span><span style={{ color: 'rgba(255,255,255,.45)' }}>·</span>
            <span>Broadcast to millions</span>
          </div>
          <span style={{
            alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontSize: '13px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
            color: '#000', padding: '10px 18px', background: 'rgba(255,255,255,.92)', borderRadius: '999px',
            transition: 'transform .25s, background .2s',
          }}>
            Watch the cut
            <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', fill: 'currentColor' }}><polygon points="5 3 19 12 5 21"/></svg>
          </span>
        </div>
      </motion.a>

      {/* AI Pipeline tile */}
      <motion.a
        custom={1} variants={fadeIn}
        href="#exp"
        style={{
          gridArea: 'ai',
          position: 'relative', borderRadius: '20px', overflow: 'hidden',
          border: '1px solid rgba(255,255,255,.07)',
          textDecoration: 'none', color: 'inherit',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '24px 26px', isolation: 'isolate', cursor: 'pointer',
          transition: 'transform .5s, border-color .4s, box-shadow .5s',
        }}
        whileHover={{ y: -4, borderColor: 'rgba(255,255,255,.18)', boxShadow: '0 30px 70px -20px rgba(0,0,0,.85), 0 0 0 1px rgba(255,255,255,.12) inset, 0 0 80px -20px rgba(80,160,255,.5)' }}
        className="max-[1100px]:min-h-[200px]"
      >
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'linear-gradient(135deg, rgba(0,40,80,.6) 0%, rgba(0,12,30,.9) 100%), radial-gradient(circle at 80% 20%, rgba(66,198,255,.25), transparent 50%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, opacity: .35,
          backgroundImage: 'linear-gradient(rgba(66,198,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(66,198,255,.25) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 70% 40%, black, transparent)',
        }} />
        <div style={{
          position: 'absolute', top: '-30%', right: '-15%', zIndex: 0,
          width: '280px', height: '280px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(66,198,255,.5) 0%, transparent 65%)',
          filter: 'blur(20px)', animation: 'floatOrb 8s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', top: '24px', right: '26px', zIndex: 2,
          fontFamily: 'var(--font-bebas-neue)', fontSize: '48px', lineHeight: 1,
          color: '#42C6FF', textShadow: '0 0 20px rgba(66,198,255,.5)',
        }}>
          40<sub style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,.7)', textShadow: 'none', marginLeft: '2px', verticalAlign: 'middle' }}>%</sub>
        </div>
        <div style={{ position: 'absolute', top: '24px', left: '26px', zIndex: 2 }}>
          <BtTag accent="#42C6FF" label="PRESENT" />
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            fontFamily: 'var(--font-bebas-neue)', fontSize: 'clamp(28px,2.4vw,38px)',
            letterSpacing: '1.5px', lineHeight: 1, color: '#fff', marginBottom: '8px',
          }}>AI Content Pipeline</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.72)', letterSpacing: '.3px' }}>
            CoPoint AI · HeyGen · Higgsfield · Hedra · Claude
          </div>
        </div>
      </motion.a>

      {/* 8+ Years stat */}
      <motion.div
        custom={2} variants={fadeIn}
        style={{
          gridArea: 'years',
          position: 'relative', borderRadius: '20px', overflow: 'hidden',
          background: 'linear-gradient(145deg,#161616 0%,#0a0a0a 100%)',
          border: '1px solid rgba(255,255,255,.07)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          alignItems: 'flex-start', padding: '24px 24px 22px',
          ['--bt-accent' as string]: '#ff7a00',
        } as React.CSSProperties}
        className="max-[1100px]:min-h-[200px]"
      >
        <div style={{ position: 'absolute', top: '18px', right: '20px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', color: '#ff7a00' }}>
          <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', stroke: 'currentColor', fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
        </div>
        <div className="bt-stat-num" style={{
          fontFamily: 'var(--font-bebas-neue)', fontSize: 'clamp(70px,7vw,110px)',
          lineHeight: .85, letterSpacing: '-1px', marginTop: 'auto',
        }}>8+</div>
        <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,.65)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '14px', height: '1px', background: '#ff7a00', display: 'inline-block' }} />
          Years in Film
        </div>
      </motion.div>

      {/* M+ Viewers stat */}
      <motion.div
        custom={3} variants={fadeIn}
        style={{
          gridArea: 'viewers',
          position: 'relative', borderRadius: '20px', overflow: 'hidden',
          background: 'linear-gradient(145deg,#161616 0%,#0a0a0a 100%)',
          border: '1px solid rgba(255,255,255,.07)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          alignItems: 'flex-start', padding: '24px 24px 22px',
          ['--bt-accent' as string]: 'var(--red)',
        } as React.CSSProperties}
        className="max-[1100px]:min-h-[200px]"
      >
        <div style={{ position: 'absolute', top: '18px', right: '20px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', color: 'var(--red)' }}>
          <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', stroke: 'currentColor', fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
        <div className="bt-stat-num" style={{
          fontFamily: 'var(--font-bebas-neue)', fontSize: 'clamp(70px,7vw,110px)',
          lineHeight: .85, letterSpacing: '-1px', marginTop: 'auto',
        }}>M+</div>
        <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,.65)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '14px', height: '1px', background: 'var(--red)', display: 'inline-block' }} />
          Viewers Reached
        </div>
      </motion.div>

      {/* Quote / CTA */}
      <motion.a
        custom={4} variants={fadeIn}
        href="#contact"
        style={{
          gridArea: 'quote',
          position: 'relative', borderRadius: '20px', overflow: 'hidden',
          border: '1px solid rgba(255,255,255,.07)',
          background: 'linear-gradient(135deg, #1a0a0a 0%, #0a0a0a 50%, #0a0a14 100%)',
          textDecoration: 'none', color: 'inherit', cursor: 'pointer',
          display: 'flex', flexDirection: 'row', alignItems: 'center',
          justifyContent: 'space-between', padding: '28px 38px', gap: '24px',
          transition: 'transform .5s, border-color .4s, box-shadow .5s',
        }}
        whileHover={{ y: -4, borderColor: 'rgba(255,255,255,.18)', boxShadow: '0 30px 70px -20px rgba(0,0,0,.85)' }}
        className="max-[1100px]:!flex-col max-[1100px]:!items-start max-[1100px]:!gap-4 max-[600px]:!p-6"
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0,
          background: 'radial-gradient(60% 100% at 0% 50%, rgba(229,9,20,.15), transparent 60%), radial-gradient(60% 100% at 100% 50%, rgba(80,80,255,.08), transparent 60%)',
        }} />
        <p style={{
          position: 'relative', zIndex: 1,
          fontStyle: 'italic', fontSize: 'clamp(15px,1.4vw,19px)',
          color: 'rgba(255,255,255,.85)', lineHeight: 1.55, maxWidth: '75%', letterSpacing: '.2px',
        }} className="max-[600px]:max-w-full">
          <span style={{ fontSize: '60px', fontFamily: 'Georgia, serif', color: 'var(--red)', opacity: .6, marginRight: '6px', lineHeight: 0, verticalAlign: '-15px' }}>"</span>
          From middle-class nostalgia to love that never quite left — Zakir Khan meets Imtiaz Ali, in film form.
        </p>
        <span style={{
          position: 'relative', zIndex: 1, flexShrink: 0,
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
          color: '#fff', padding: '10px 18px', background: 'var(--red)', borderRadius: '999px',
          transition: 'transform .25s, background .2s, box-shadow .3s',
        }}>
          Start a Project
          <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </span>
      </motion.a>
    </motion.div>
  )
}

function BtTag({ accent, label }: { accent: string; label: string }) {
  return (
    <span style={{
      fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
      color: '#fff', padding: '5px 12px',
      background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)',
      backdropFilter: 'blur(14px) saturate(1.4)', borderRadius: '999px',
      display: 'inline-flex', alignItems: 'center', gap: '7px',
    }}>
      <span style={{
        width: '6px', height: '6px', borderRadius: '50%',
        background: accent, boxShadow: `0 0 10px ${accent}`,
        animation: 'pulse 1.8s ease infinite',
      }} />
      {label}
    </span>
  )
}
