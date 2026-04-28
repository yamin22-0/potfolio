import React, { useState } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'

const SECTIONS = ['hero', 'about', 'services', 'skills', 'contact']

const COLORS = {
  light: { bg: '#F5F5F5', text: '#141414', accent: '#C8B8A2' },
  dark: { bg: '#141414', text: '#F5F5F5', accent: '#C8B8A2' },
}

function Navbar({ toggleTheme, theme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const c = COLORS[theme] ?? COLORS.light

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: c.bg,
        borderBottom: `1px solid ${
          theme === 'dark'
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(0,0,0,0.08)'
        }`,
        transition: 'all 0.3s ease',
      }}
    >
      <nav className="relative flex items-center justify-between px-6 md:px-10 h-[70px]">

        {/* LOGO */}
        <div className="flex-shrink-0 pl-2">
          <img
            src="potfolio-logo.png"
            alt="logo"
            style={{
              height: '48px',
              objectFit: 'contain',
              filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none',
              transition: '0.3s',
            }}
          />
        </div>

        {/* CENTER NAV */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
          {SECTIONS.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className="group relative text-sm"
              style={{ color: c.text }}
            >
              <span className="opacity-70 group-hover:opacity-100 transition">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </span>

              {/* underline */}
              <span
                className="absolute left-0 -bottom-1 h-[2px] w-0 group-hover:w-full transition-all duration-300"
                style={{ background: c.accent }}
              />
            </a>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full transition"
            style={{ color: c.text }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = 'rgba(200,184,162,0.15)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = 'transparent')
            }
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* CTA */}
          <button
            className="hidden md:block px-5 py-2 rounded-full text-sm transition"
            style={{
              border: `1px solid ${c.accent}`,
              color: c.text,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = c.accent
              e.currentTarget.style.color = '#141414'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = c.text
            }}
          >
            Contact Me
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: c.text }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        style={{
          maxHeight: menuOpen ? '350px' : '0px',
          overflow: 'hidden',
          transition: '0.35s ease',
          backgroundColor: c.bg,
          borderTop: menuOpen
            ? `1px solid ${
                theme === 'dark'
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(0,0,0,0.08)'
              }`
            : 'none',
        }}
      >
        <div className="flex flex-col px-6 py-4 gap-2">
          {SECTIONS.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-sm opacity-70 hover:opacity-100 transition"
              style={{
                color: c.text,
                borderBottom: `1px solid ${
                  theme === 'dark'
                    ? 'rgba(255,255,255,0.08)'
                    : 'rgba(0,0,0,0.08)'
                }`,
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}

          {/* MOBILE CTA */}
          <button
            className="mt-3 py-2 rounded-full text-sm transition"
            style={{
              border: `1px solid ${c.accent}`,
              color: c.text,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = c.accent
              e.currentTarget.style.color = '#141414'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = c.text
            }}
          >
            Contact Me
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar