'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#exp', label: 'Journey' },
  { href: '#skills', label: 'Craft' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const onScroll = () => nav.classList.toggle('solid', window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          height: '68px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(to bottom,rgba(0,0,0,.9) 0%,transparent 100%)',
          transition: 'background .4s',
          paddingLeft: 'clamp(16px, 5vw, 60px)',
          paddingRight: 'clamp(16px, 5vw, 60px)',
        }}
        className="[&.solid]:bg-[#141414]"
      >
        <Link
          href="#hero"
          onClick={() => setOpen(false)}
          style={{
            fontFamily: 'var(--font-bebas-neue), sans-serif',
            color: 'var(--red)',
            letterSpacing: '2px',
            textDecoration: 'none',
            textShadow: '0 0 30px rgba(229,9,20,.4)',
            fontSize: 'clamp(22px, 4.5vw, 32px)',
          }}
        >
          HARIKUMAR
        </Link>

        <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: '14px',
                color: 'var(--dim)',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color .2s',
              }}
              className="max-[900px]:hidden hover:text-white"
            >
              {label}
            </Link>
          ))}
          <Link
            href="#contact"
            style={{
              background: 'var(--red)',
              color: '#fff',
              padding: '12px 22px',
              fontWeight: 600,
              fontSize: '13px',
              textDecoration: 'none',
              transition: 'background .2s',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
            }}
            className="hover:bg-[#f40612] max-[480px]:!px-4 max-[480px]:!text-[12px]"
          >
            Hire Me
          </Link>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
            className="hidden max-[900px]:flex"
            style={{
              width: '44px', height: '44px',
              alignItems: 'center', justifyContent: 'center',
              background: 'transparent', border: 'none', color: '#fff',
              cursor: 'pointer', padding: 0,
            }}
          >
            <span style={{ position: 'relative', width: '22px', height: '14px', display: 'inline-block' }}>
              <span style={{
                position: 'absolute', left: 0, right: 0, height: '2px', background: '#fff',
                top: open ? '6px' : '0', transform: open ? 'rotate(45deg)' : 'none',
                transition: 'transform .3s, top .3s',
              }} />
              <span style={{
                position: 'absolute', left: 0, right: 0, height: '2px', background: '#fff',
                top: '6px', opacity: open ? 0 : 1, transition: 'opacity .2s',
              }} />
              <span style={{
                position: 'absolute', left: 0, right: 0, height: '2px', background: '#fff',
                top: open ? '6px' : '12px', transform: open ? 'rotate(-45deg)' : 'none',
                transition: 'transform .3s, top .3s',
              }} />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(0,0,0,.92)',
          backdropFilter: 'blur(20px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity .3s ease',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '8px', padding: '80px 24px 40px',
        }}
        className="min-[901px]:!hidden"
      >
        {NAV_LINKS.map(({ href, label }, i) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            style={{
              fontFamily: 'var(--font-bebas-neue), sans-serif',
              fontSize: '42px',
              color: '#fff',
              letterSpacing: '3px',
              textDecoration: 'none',
              padding: '12px 24px',
              minHeight: '56px',
              display: 'inline-flex', alignItems: 'center',
              transform: open ? 'translateY(0)' : 'translateY(20px)',
              opacity: open ? 1 : 0,
              transition: `transform .4s ease ${i * .05}s, opacity .4s ease ${i * .05}s`,
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  )
}
