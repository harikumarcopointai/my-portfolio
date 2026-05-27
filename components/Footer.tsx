export default function Footer() {
  return (
    <footer
      style={{
        padding: '40px 60px',
        borderTop: '1px solid rgba(255,255,255,.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        background: 'var(--bg)',
      }}
      className="max-[900px]:flex-col max-[900px]:gap-3 max-[900px]:text-center max-[900px]:px-6 max-[900px]:py-7"
    >
      <div style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: '24px', color: 'var(--red)', letterSpacing: '2px' }}>
        HARIKUMAR
      </div>
      <div style={{ fontSize: '13px', color: 'rgba(115,115,115,.7)', fontStyle: 'italic' }}>
        Every frame tells a story.
      </div>
      <div style={{ fontSize: '12px', color: 'rgba(115,115,115,1)', letterSpacing: '1px' }}>
        © 2026 · Delhi, India
      </div>
    </footer>
  )
}
