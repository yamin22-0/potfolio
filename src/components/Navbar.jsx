import React, { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'

const SECTIONS = ['hero', 'about', 'services', 'skills', 'contact']

const COLORS = {
  light: {
    bg: '#F5F5F5',
    text: '#141414',
    accent: '#C8B8A2',
    accentDark: '#a8967e',
    border: 'rgba(0,0,0,0.08)',
    menuBorder: 'rgba(0,0,0,0.06)',
    ctaBg: '#141414',
    ctaText: '#F5F5F5',
    ctaHoverBg: '#C8B8A2',
    ctaHoverText: '#141414',
  },
  dark: {
    bg: '#141414',
    text: '#F5F5F5',
    accent: '#C8B8A2',
    accentDark: '#a8967e',
    border: 'rgba(255,255,255,0.08)',
    menuBorder: 'rgba(255,255,255,0.06)',
    ctaBg: '#C8B8A2',
    ctaText: '#141414',
    ctaHoverBg: '#F5F5F5',
    ctaHoverText: '#141414',
  },
}

/* Smooth-scroll helper */
const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function Navbar({ toggleTheme, theme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const c = COLORS[theme] ?? COLORS.light

  /* Add subtle shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleContact = () => {
    setMenuOpen(false)
    scrollTo('contact')
  }

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: c.bg,
        borderBottom: `1px solid ${c.border}`,
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <nav
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          height: 70,
          maxWidth: 1400,
          margin: '0 auto',
        }}
      >
        {/* ── LOGO ── */}
        <div style={{ flexShrink: 0 }}>
          <img
            src="potfolio-logo.png"
            alt="logo"
            style={{
              height: 120,
              objectFit: 'contain',
              filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none',
              transition: '0.3s',
            }}
          />
        </div>

        {/* ── CENTER NAV (desktop) ── */}
        <div
          style={{
            display: 'none',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            alignItems: 'center',
            gap: '2.5rem',
          }}
          className="desktop-nav"
        >
          {SECTIONS.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(section)
              }}
              style={{
                position: 'relative',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: c.text,
                textDecoration: 'none',
                opacity: 0.7,
                transition: 'opacity 0.2s',
                letterSpacing: '0.03em',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
              className="nav-link"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
              <span className="nav-underline" style={{ background: c.accent }} />
            </a>
          ))}
        </div>

        {/* ── RIGHT SIDE ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              width: 38,
              height: 38,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              border: `1px solid ${c.border}`,
              background: 'transparent',
              color: c.text,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = c.accent + '28'
              e.currentTarget.style.borderColor = c.accent
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = c.border
            }}
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>

          {/* CTA — desktop */}
          <button
            onClick={handleContact}
            className="cta-btn"
            style={{
              display: 'none', /* shown via CSS media query */
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1.25rem',
              borderRadius: 999,
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              border: 'none',
              background: c.ctaBg,
              color: c.ctaText,
              transition: 'all 0.22s ease',
              boxShadow: theme === 'dark'
                ? '0 2px 12px rgba(200,184,162,0.18)'
                : '0 2px 12px rgba(0,0,0,0.12)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = c.ctaHoverBg
              e.currentTarget.style.color = c.ctaHoverText
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = theme === 'dark'
                ? '0 6px 20px rgba(200,184,162,0.3)'
                : '0 6px 20px rgba(0,0,0,0.18)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = c.ctaBg
              e.currentTarget.style.color = c.ctaText
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = theme === 'dark'
                ? '0 2px 12px rgba(200,184,162,0.18)'
                : '0 2px 12px rgba(0,0,0,0.12)'
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Contact Me
          </button>

          {/* MOBILE HAMBURGER */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'flex', /* hidden on desktop via CSS */
              width: 38,
              height: 38,
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${c.border}`,
              borderRadius: 10,
              background: 'transparent',
              color: c.text,
              cursor: 'pointer',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = c.accent + '20'
              e.currentTarget.style.borderColor = c.accent
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = c.border
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div
        style={{
          maxHeight: menuOpen ? '400px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
          backgroundColor: c.bg,
          borderTop: menuOpen ? `1px solid ${c.border}` : 'none',
        }}
      >
        <div style={{ padding: '0.75rem 1.5rem 1.25rem' }}>
          {SECTIONS.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(e) => {
                e.preventDefault()
                setMenuOpen(false)
                scrollTo(section)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 0',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: c.text,
                textDecoration: 'none',
                opacity: 0.75,
                borderBottom: `1px solid ${c.menuBorder}`,
                transition: 'opacity 0.2s, padding-left 0.2s',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.paddingLeft = '0.5rem'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.75'
                e.currentTarget.style.paddingLeft = '0'
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </a>
          ))}

          {/* Mobile CTA */}
          <button
            onClick={handleContact}
            style={{
              marginTop: '1rem',
              width: '100%',
              padding: '0.8rem',
              borderRadius: 12,
              fontSize: '0.88rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              border: 'none',
              background: c.ctaBg,
              color: c.ctaText,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.22s ease',
              boxShadow: theme === 'dark'
                ? '0 2px 16px rgba(200,184,162,0.2)'
                : '0 2px 16px rgba(0,0,0,0.14)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = c.ctaHoverBg
              e.currentTarget.style.color = c.ctaHoverText
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = c.ctaBg
              e.currentTarget.style.color = c.ctaText
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Contact Me
          </button>
        </div>
      </div>

      {/* ── Scoped Styles ── */}
      <style>{`
        /* Desktop nav links */
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .cta-btn     { display: inline-flex !important; }
          .mobile-menu-btn { display: none !important; }
        }

        /* Nav underline animation */
        .nav-link { overflow: visible; }
        .nav-underline {
          position: absolute;
          left: 0;
          bottom: -3px;
          height: 2px;
          width: 0;
          border-radius: 2px;
          transition: width 0.28s ease;
          display: block;
        }
        .nav-link:hover .nav-underline { width: 100%; }
      `}</style>
    </header>
  )
}

export default Navbar