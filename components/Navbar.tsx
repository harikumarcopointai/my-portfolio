'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const onScroll = () => nav.classList.toggle('solid', window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: '68px', display: 'flex', alignItems: 'center',
        padding: '0 60px', justifyContent: 'space-between',
        background: 'linear-gradient(to bottom,rgba(0,0,0,.9) 0%,transparent 100%)',
        transition: 'background .4s',
      }}
      className="[&.solid]:bg-[#141414]"
    >
      <Link
        href="#hero"
        style={{
          fontFamily: 'var(--font-bebas-neue), sans-serif',
          fontSize: '32px',
          color: 'var(--red)',
          letterSpacing: '2px',
          textDecoration: 'none',
          textShadow: '0 0 30px rgba(229,9,20,.4)',
        }}
      >
        HARIKUMAR
      </Link>

      <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        {[
          { href: '#work', label: 'Work' },
          { href: '#about', label: 'About' },
          { href: '#exp', label: 'Journey' },
          { href: '#skills', label: 'Craft' },
        ].map(({ href, label }) => (
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
            padding: '8px 22px',
            fontWeight: 600,
            fontSize: '13px',
            textDecoration: 'none',
            transition: 'background .2s',
          }}
          className="hover:bg-[#f40612]"
        >
          Hire Me
        </Link>
      </div>
    </nav>
  )
}
