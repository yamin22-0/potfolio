// Hero.jsx - MOBILE FIXED
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, FileDown, X, ArrowDown } from 'lucide-react'

/* ─── Brand SVG Icons ─────────────────────────────────── */
const ReactIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="2.4" fill="#61DAFB" />
    <ellipse cx="12" cy="12" rx="9.5" ry="3.7" stroke="#61DAFB" strokeWidth="1.3" fill="none" />
    <ellipse cx="12" cy="12" rx="9.5" ry="3.7" stroke="#61DAFB" strokeWidth="1.3" fill="none" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9.5" ry="3.7" stroke="#61DAFB" strokeWidth="1.3" fill="none" transform="rotate(120 12 12)" />
  </svg>
)

const TypeScriptIcon = () => (
  <svg width="20" height="20" viewBox="0 0 400 400" fill="none">
    <rect width="400" height="400" rx="50" fill="#3178C6"/>
    <path d="M87.6 242v-21.4h134V242H176v109h-31.7V242H87.6z" fill="white"/>
    <path d="M321.8 221c-4.8-1-9.7-1.5-14.6-1.5-8 0-14.4 1.6-19 4.8-4.6 3.2-7 7.6-7 13.2 0 4.8 1.4 8.7 4.2 11.7 2.8 3 8.4 5.9 16.8 8.7 8.4 2.8 14.2 5.6 17.6 8.4 3.4 2.8 5.1 6.5 5.1 11.1 0 5-2 9-6 12s-9.5 4.5-16.5 4.5c-4.8 0-9.5-.6-14.1-1.8-4.6-1.2-8.7-2.9-12.3-5.1v27.3c3.8 1.8 7.9 3.1 12.3 3.9 4.4.8 9.1 1.2 14.1 1.2 14.6 0 26-3.3 34.2-9.9 8.2-6.6 12.3-15.7 12.3-27.3 0-8-2.2-14.6-6.6-19.8-4.4-5.2-11.8-9.6-22.2-13.2-7.2-2.4-12-4.8-14.4-7.2-2.4-2.4-3.6-5.3-3.6-8.7 0-4 1.6-7.1 4.8-9.3 3.2-2.2 7.7-3.3 13.5-3.3 4 0 8 .5 12 1.5 4 1 7.7 2.4 11.1 4.2v-25.5c-3.2-1.4-6.7-2.5-10.5-3.3z" fill="white"/>
  </svg>
)

const NextjsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 180 180" fill="none">
    <rect width="180" height="180" rx="36" fill="black"/>
    <path d="M149.508 157.52L69.142 54H54v71.97h12.374V71.306l72.436 94.414c3.7-2.61 7.21-5.47 10.698-8.2z" fill="white"/>
    <path d="M125.5 54h12v72h-12z" fill="white"/>
  </svg>
)

const TailwindIcon = () => (
  <svg width="20" height="20" viewBox="0 0 256 256" fill="none">
    <rect width="256" height="256" rx="50" fill="#0EA5E9"/>
    <path d="M128 72c-19.2 0-31.2 9.6-36 28.8 7.2-9.6 15.6-13.2 25.2-10.8 5.48 1.37 9.4 5.35 13.74 9.76C138.14 107.2 146.14 115.2 164 115.2c19.2 0 31.2-9.6 36-28.8-7.2 9.6-15.6 13.2-25.2 10.8-5.48-1.37-9.4-5.35-13.74-9.76C153.86 79.97 145.86 72 128 72zM92 115.2c-19.2 0-31.2 9.6-36 28.8 7.2-9.6 15.6-13.2 25.2-10.8 5.48 1.37 9.4 5.35 13.74 9.76C102.14 150.37 110.14 158.4 128 158.4c19.2 0 31.2-9.6 36-28.8-7.2 9.6-15.6 13.2-25.2 10.8-5.48-1.37-9.4-5.35-13.74-9.76C117.86 123.17 109.86 115.2 92 115.2z" fill="white"/>
  </svg>
)

const FramerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 256 256" fill="none">
    <rect width="256" height="256" rx="50" fill="#0055FF"/>
    <path d="M64 32h128v64H128L64 32zM64 96h64l64 64H128v64L64 160V96z" fill="white"/>
  </svg>
)

const NodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 256 256" fill="none">
    <rect width="256" height="256" rx="50" fill="#1a1a1a"/>
    <path d="M128 28L32 82v92l96 54 96-54V82L128 28zm0 16l80 45v80l-80 45-80-45V89l80-45z" fill="#539E43"/>
    <path d="M128 44v168M48 89l80 45 80-45" stroke="#539E43" strokeWidth="8" fill="none"/>
  </svg>
)

/* ─── Animation Variants ──────────────────────────────── */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
}

/* ─── Skill Bar ───────────────────────────────────────── */
const SkillBar = ({ name, pct, delay = 0 }) => {
  const fillRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (fillRef.current) fillRef.current.style.width = `${pct}%`
    }, 900 + delay)
    return () => clearTimeout(timer)
  }, [pct, delay])

  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 500, color: 'var(--text)' }}>{name}</span>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent)' }}>{pct}%</span>
      </div>
      <div className="skill-track">
        <div
          ref={fillRef}
          className="skill-fill"
          style={{ width: 0, transition: 'width 1.5s cubic-bezier(0.25,1,0.5,1)' }}
        />
      </div>
    </div>
  )
}

const NAVBAR_H = 72

// Orbit chips with angles — same as before
const ORBIT_CHIPS = [
  { icon: <ReactIcon />,      label: 'React',       bg: '#0D1117', angle: -90  },
  { icon: <TypeScriptIcon />, label: 'TypeScript',  bg: '#1a3a5c', angle: -30  },
  { icon: <TailwindIcon />,   label: 'Tailwind',    bg: '#0c3547', angle:  30  },
  { icon: <NextjsIcon />,     label: 'Next.js',     bg: '#111111', angle:  90  },
  { icon: <FramerIcon />,     label: 'Framer',      bg: '#0033cc', angle:  150 },
  { icon: <NodeIcon />,       label: 'Node.js',     bg: '#1a2e1a', angle: -150 },
]

/* ─── Responsive Orbit ────────────────────────────────── */
// Uses CSS custom property --orbit-r set by the wrapper,
// so the orbit scales with the container instead of being fixed pixels.
const OrbitSection = () => {
  // We'll use a viewBox-based SVG approach for the ring,
  // and absolute % positioning for chips so everything scales naturally.

  // Logical design space: 580×580 (desktop). On mobile we shrink the container.
  const SIZE = 580        // logical px square
  const CENTER = SIZE / 2 // 290
  const ORBIT_R = 210     // orbit radius in logical px
  const PHOTO_W = 200
  const PHOTO_H = 270

  return (
    <div
      className="orbit-responsive-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: SIZE,
        // Maintain square aspect so chips never overflow
        aspectRatio: '1 / 1',
        margin: '0 auto',
      }}
    >
      {/* Dashed ring — SVG scales with container */}
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.12,
          pointerEvents: 'none',
        }}
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r={ORBIT_R}
          fill="none"
          stroke="var(--text)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
      </svg>

      {/* Photo — centered via % */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        style={{
          position: 'absolute',
          left: `${((CENTER - PHOTO_W / 2) / SIZE) * 100}%`,
          top:  `${((CENTER - PHOTO_H / 2) / SIZE) * 100}%`,
          width: `${(PHOTO_W / SIZE) * 100}%`,
          // height via aspect ratio of photo
          aspectRatio: `${PHOTO_W} / ${PHOTO_H}`,
          borderRadius: 20,
          overflow: 'hidden',
          border: '2px solid var(--border)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          zIndex: 2,
        }}
      >
        <img
          src="/portfolio.jpeg"
          alt="Binyamin Ahmed"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { e.currentTarget.src = 'https://via.placeholder.com/200x270' }}
        />

        {/* Experience badge */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          style={{
            position: 'absolute',
            bottom: 12,
            left: 10,
            background: 'var(--text)',
            color: 'var(--bg)',
            borderRadius: 10,
            padding: '0.5rem 0.75rem',
            boxShadow: '0 10px 20px rgba(0,0,0,0.25)',
          }}
        >
          <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>0.5+</div>
          <div style={{ fontSize: '0.55rem', opacity: 0.7, marginTop: '0.15rem' }}>Years mastery</div>
        </motion.div>
      </motion.div>

      {/* Orbit Chips — positioned using % of SIZE */}
      {ORBIT_CHIPS.map((chip, i) => {
        const rad = (chip.angle * Math.PI) / 180
        const x = CENTER + ORBIT_R * Math.cos(rad)
        const y = CENTER + ORBIT_R * Math.sin(rad)

        return (
          <motion.div
            key={chip.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
            style={{
              position: 'absolute',
              left: `${(x / SIZE) * 100}%`,
              top: `${(y / SIZE) * 100}%`,
              transform: 'translate(-50%, -50%)',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '0.4rem 0.65rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              zIndex: 10,
              backdropFilter: 'blur(8px)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            <span style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              background: chip.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              {chip.icon}
            </span>
            <span className="chip-label" style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text)' }}>
              {chip.label}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Hero() {
  const handleContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  const handleDownloadCV = () => {
    const a = document.createElement('a')
    a.href = '/cv.pdf'
    a.download = 'Binyamin_Ahmed_CV.pdf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <section
      id="hero"
      style={{
        minHeight: `calc(100vh - ${NAVBAR_H}px)`,
        paddingTop: `${NAVBAR_H}px`,
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        position: 'relative',
        // KEY FIX: prevent horizontal overflow on mobile
        overflowX: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        className="hero-grid-responsive"
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '1.5rem 2rem',
          alignItems: 'center',
          boxSizing: 'border-box',
          width: '100%',
        }}
      >
        {/* ── LEFT COLUMN ─────────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '1rem',
            // KEY FIX: prevent text overflow
            minWidth: 0,
            overflow: 'hidden',
          }}
        >
          {/* Availability badge */}
          <motion.div variants={fadeUp} className="badge" style={{ marginBottom: '1.5rem', width: 'fit-content' }}>
            <span className="dot-live" />
            Open to new opportunities
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} style={{ marginBottom: '0.75rem', lineHeight: 1.1 }}>
            Frontend<br />
            <em>Developer</em><br />
            &amp; Craftsman.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
              fontStyle: 'italic',
              color: 'var(--text-muted)',
              marginBottom: '1rem',
            }}
          >
            Hi, I'm Binyamin Ahmed — I build experiences people love.
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            style={{
              maxWidth: '38ch',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              color: 'var(--text-muted)',
            }}
          >
            Specialising in React ecosystems and pixel-perfect interfaces.
            I bridge the gap between design and engineering to deliver
            fast, accessible, and beautiful products.
          </motion.p>

          {/* Tech Pills */}
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.8rem' }}
          >
            {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'].map((t, i) => (
              <span key={t} className={`pill ${i < 2 ? 'active' : ''}`}>{t}</span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="hero-btns"
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}
          >
            <button className="btn btn-primary" onClick={handleContact}>
              <Mail size={16} />
              Get in touch
            </button>
            <button className="btn btn-outline" onClick={handleDownloadCV}>
              <FileDown size={16} />
              Download CV
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}
          >
            {[
              { n: '0.5', sup: '+', label: 'Years exp.' },
              { n: '15', sup: '+', label: 'Projects' },
              { n: '98', sup: '%', label: 'Satisfaction' },
            ].map(({ n, sup, label }) => (
              <div key={label}>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, lineHeight: 1, marginBottom: '0.25rem' }}>
                  {n}<sup style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>{sup}</sup>
                </div>
                <div className="label">{label}</div>
              </div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '0.75rem' }}>
            {[
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                ),
                href: 'https://github.com/yamin22-0',
                label: 'GitHub',
              },
              { icon: <X size={16} />, href: 'https://twitter.com/binyamin_ahmed', label: 'X / Twitter' },
              { icon: <Mail size={16} />, href: 'mailto:binyaminahmed594@gmail.com', label: 'Email' },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  transition: 'all 0.22s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.color = 'var(--text)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {icon}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN ─────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            // KEY FIX: don't let this column overflow
            minWidth: 0,
            overflow: 'hidden',
          }}
        >
          {/* Responsive orbit */}
          <OrbitSection />

          {/* Core Skills Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="skills-card"
            style={{
              width: '100%',
              maxWidth: 280,
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              padding: '1.2rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              boxSizing: 'border-box',
            }}
          >
            <div className="label" style={{ marginBottom: '1rem', fontSize: '0.75rem', fontWeight: 600 }}>
              Core Skills
            </div>
            <SkillBar name="React / Next.js" pct={96} delay={0} />
            <SkillBar name="TypeScript" pct={92} delay={100} />
            <SkillBar name="Tailwind CSS" pct={95} delay={200} />
            <SkillBar name="UI / UX" pct={88} delay={300} />
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.3rem',
              color: 'var(--text-muted)',
            }}
          >
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowDown size={14} />
            </motion.div>
            <span style={{ fontSize: '0.6rem', writingMode: 'vertical-rl' }}>Scroll</span>
          </motion.div>
        </div>
      </div>

      {/* ── Global Styles ──────────────────────────────── */}
      <style>{`
        /* Reset box model globally in hero */
        #hero *, #hero *::before, #hero *::after {
          box-sizing: border-box;
        }

        .hero-grid-responsive {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        /* ── Tablet ── */
        @media (max-width: 1100px) {
          .hero-grid-responsive {
            grid-template-columns: 1fr !important;
            gap: 2rem;
            padding: 1rem 1.25rem !important;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .hero-grid-responsive {
            padding: 0.75rem 1rem !important;
          }

          /* Orbit wrapper: give it a sensible max on small phones */
          .orbit-responsive-wrapper {
            max-width: min(92vw, 360px) !important;
          }

          /* Hide chip labels on very small screens to prevent overflow */
          @media (max-width: 380px) {
            .chip-label {
              display: none;
            }
          }

          /* Buttons stack on mobile */
          .hero-btns {
            flex-direction: column !important;
          }
          .hero-btns .btn {
            width: 100% !important;
            justify-content: center;
          }

          .skills-card {
            max-width: 92vw !important;
          }
        }

        /* ── Mid (641–1100) ── */
        @media (min-width: 641px) and (max-width: 1100px) {
          .orbit-responsive-wrapper {
            max-width: 480px !important;
          }
        }

        /* ── Shared component styles ── */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 0.4rem 1rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text);
        }

        .dot-live {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          display: inline-block;
          animation: pulse 2s infinite;
          flex-shrink: 0;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        h1 {
          font-size: clamp(2rem, 8vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          word-break: break-word;
        }

        h1 em {
          font-style: italic;
          color: var(--accent);
          font-weight: 800;
        }

        .pill {
          padding: 0.25rem 0.75rem;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--text);
          white-space: nowrap;
        }

        .pill.active {
          border-color: var(--accent);
          background: var(--accent-dim);
          color: var(--accent);
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          font-family: var(--font-body);
        }

        .btn-primary {
          background: var(--accent);
          color: #fff;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          filter: brightness(1.05);
        }

        .btn-outline {
          background: transparent;
          border: 1px solid var(--border-strong);
          color: var(--text);
        }

        .btn-outline:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
        }

        .label {
          font-size: 0.65rem;
          font-weight: 500;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .skill-track {
          height: 4px;
          background: var(--border);
          border-radius: 4px;
          overflow: hidden;
        }

        .skill-fill {
          height: 100%;
          background: var(--accent);
          border-radius: 4px;
        }
      `}</style>
    </section>
  )
}