import React from 'react'
import { ArrowRight, Mail, MapPin, Clock, Send } from 'lucide-react'

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const LinkedinIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const TwitterIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)



function BannerFooter() {
  const [email, setEmail] = React.useState('')

  const companyLinks = [
    { label: 'Pricing', href: '#' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Hire Me ↗', href: '#contact' },
    { label: 'Projects ↗', href: '#projects' },
  ]

  const socialLinks = [
    { label: 'GitHub ↗', href: 'https://github.com/yamin22-0', icon: GithubIcon },
    { label: 'LinkedIn ↗', href: 'https://linkedin.com/in/binyamin-ahmed', icon: LinkedinIcon },
    { label: 'Twitter/X ↗', href: 'https://twitter.com/binyamin_ahmed', icon: TwitterIcon },
    { label: 'Email ↗', href: 'mailto:binyaminahmed594@gmail.com', icon: Mail },
  ]

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .footer-link {
          font-size: 13px;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .footer-link:hover { color: var(--text); }
        .email-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-size: 13px;
          color: var(--text);
          font-family: var(--font-body);
          padding: 0;
        }
        .email-input::placeholder { color: var(--text-faint); }
        .banner-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 3rem 3rem;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          min-height: 220px;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .banner-card {
            grid-template-columns: 1fr !important;
            padding: 2rem 1.5rem !important;
            min-height: unset !important;
          }
          .banner-avatars {
            display: none !important;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            gap: 0.75rem !important;
            text-align: center !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-section-wrap {
            padding: 0 1rem !important;
          }
        }
      `}</style>

      <section
        style={{
          backgroundColor: 'var(--bg)',
          paddingTop: 'clamp(3rem, 6vw, 6rem)',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 clamp(1rem, 4vw, 3rem)',
          }}
        >

          {/* ── BANNER CARD ── */}
          <div className="banner-card">

            {/* Left content */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: '1rem',
                }}
              >
                <span
                  style={{
                    width: '6px', height: '6px',
                    borderRadius: '50%',
                    background: '#4ADE80',
                    display: 'inline-block',
                  }}
                />
                Available for work
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                  fontWeight: 900,
                  color: 'var(--text)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  marginBottom: '0.75rem',
                }}
              >
                Let's build something{' '}
                <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>great</em>{' '}
                together
              </h2>

              <p
                style={{
                  fontSize: '13.5px',
                  color: 'var(--text-muted)',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                  maxWidth: '360px',
                  fontWeight: 300,
                }}
              >
                Earn up to <strong style={{ color: 'var(--text)' }}>$200</strong> with my{' '}
                <strong style={{ color: 'var(--text)' }}>40% commission</strong> referral
                program — or just reach out for your next project.
              </p>

              <a
                href="#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--text)',
                  color: 'var(--bg)',
                  borderRadius: '9999px',
                  padding: '0.7rem 1.5rem',
                  fontSize: '13px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  transition: 'opacity 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.opacity = '0.8'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Get in touch <ArrowRight size={14} />
              </a>
            </div>

            {/* Right — floating tech stack icons */}
            <div
              className="banner-avatars"
              style={{ position: 'relative', height: '200px' }}
            >
              {/* React */}
              <div style={{ position: 'absolute', top: '5%', left: '18%', animation: 'float 4s ease-in-out infinite', animationDelay: '0s' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#20232A', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="2.5" fill="#61DAFB"/>
                    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
                    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
                    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
                  </svg>
                </div>
                <div style={{ textAlign: 'center', fontSize: '9px', color: 'var(--text-faint)', marginTop: '4px', fontWeight: 500 }}>React</div>
              </div>

              {/* TypeScript */}
              <div style={{ position: 'absolute', top: '0%', left: '52%', animation: 'float 4s ease-in-out infinite', animationDelay: '0.5s' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#3178C6', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(49,120,198,0.35)' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                    <path d="M3 3h18v18H3V3zm10.5 13.5v-1.2c.4.2.9.4 1.5.4.5 0 .8-.2.8-.5 0-.3-.2-.5-.9-.7-1.1-.4-1.6-.9-1.6-1.7 0-1 .8-1.8 2.2-1.8.6 0 1.1.1 1.4.3v1.2c-.4-.2-.8-.3-1.3-.3-.5 0-.7.2-.7.4 0 .3.2.4.9.7 1.1.4 1.6.9 1.6 1.8 0 1-.8 1.8-2.3 1.8-.6 0-1.2-.1-1.6-.4zM9 14.3H7.5V13H12v1.3h-1.5V18H9v-3.7z"/>
                  </svg>
                </div>
                <div style={{ textAlign: 'center', fontSize: '9px', color: 'var(--text-faint)', marginTop: '4px', fontWeight: 500 }}>TypeScript</div>
              </div>

              {/* Node.js */}
              <div style={{ position: 'absolute', top: '42%', left: '68%', animation: 'float 4s ease-in-out infinite', animationDelay: '1s' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="#539E43">
                    <path d="M12 1.85c-.27 0-.55.07-.76.22L3.33 6.5c-.46.26-.74.77-.74 1.3v8.4c0 .53.27 1.03.74 1.3l7.91 4.43c.46.27 1.06.27 1.52 0l7.91-4.43c.46-.27.74-.77.74-1.3V7.8c0-.53-.27-1.03-.74-1.3L12.76 2.07c-.21-.15-.49-.22-.76-.22zm0 2.1l7 3.93v7.84l-7 3.93-7-3.93V7.88l7-3.93z"/>
                  </svg>
                </div>
                <div style={{ textAlign: 'center', fontSize: '9px', color: 'var(--text-faint)', marginTop: '4px', fontWeight: 500 }}>Node.js</div>
              </div>

              {/* Tailwind */}
              <div style={{ position: 'absolute', top: '58%', left: '25%', animation: 'float 4s ease-in-out infinite', animationDelay: '1.5s' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
                  <svg width="26" height="16" viewBox="0 0 54 33" fill="#38BDF8">
                    <path fillRule="evenodd" clipRule="evenodd" d="M27 0C19.8 0 15.3 3.6 13.5 10.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"/>
                  </svg>
                </div>
                <div style={{ textAlign: 'center', fontSize: '9px', color: 'var(--text-faint)', marginTop: '4px', fontWeight: 500 }}>Tailwind</div>
              </div>

              {/* Next.js */}
              <div style={{ position: 'absolute', top: '28%', left: '40%', animation: 'float 4s ease-in-out infinite', animationDelay: '0.8s' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747C21.766 5.818 18.556 2.03 14.206.632a13.07 13.07 0 00-2.535-.525c-.169-.019-1.453-.034-1.599-.007z"/>
                  </svg>
                </div>
                <div style={{ textAlign: 'center', fontSize: '9px', color: 'var(--text-faint)', marginTop: '4px', fontWeight: 500 }}>Next.js</div>
              </div>

              {/* Docker */}
              <div style={{ position: 'absolute', top: '65%', left: '58%', animation: 'float 4s ease-in-out infinite', animationDelay: '1.8s' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#1D63ED', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(29,99,237,0.35)' }}>
                  <svg width="26" height="20" viewBox="0 0 640 512" fill="white">
                    <path d="M349.9 236.3h-66.1v-59.4h66.1v59.4zm0-204.3h-66.1v60.7h66.1V32zm78.2 144.8H362v59.4h66.1v-59.4zm-156.3-72.1h-66.1v60.1h66.1v-60.1zm78.1 0h-66.1v60.1h66.1v-60.1zm276.8 100c-14.4-9.7-47.6-13.2-73.1-8.4-3.3-24-16.7-44.9-41.1-63.7l-14-9.3-9.3 14c-18.4 27.8-23.4 73.6-3.7 103.8-8.7 4.7-25.8 11.1-48.4 10.7H2.4c-8.7 50.8 5.8 116.8 44 162.1 37.1 43.9 92.7 66.2 165.4 66.2 157.4 0 273.9-72.5 328.4-204.2 21.4.4 67.6.1 91.3-45.2 1.5-2.5 6.6-13.2 8.5-17.1l-13.3-8.9z"/>
                  </svg>
                </div>
                <div style={{ textAlign: 'center', fontSize: '9px', color: 'var(--text-faint)', marginTop: '4px', fontWeight: 500 }}>Docker</div>
              </div>

              {/* Connecting dots */}
              {[
                { top: '20%', left: '35%' },
                { top: '15%', left: '48%' },
                { top: '38%', left: '60%' },
                { top: '52%', left: '44%' },
                { top: '48%', left: '32%' },
              ].map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '4px', height: '4px',
                    borderRadius: '50%',
                    background: 'var(--accent-border)',
                    ...pos,
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── FOOTER ── */}
          <footer
            style={{
              marginTop: '4rem',
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div
              className="footer-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1.4fr 1fr 1fr 1.4fr',
                gap: '3rem',
                marginBottom: '2.5rem',
              }}
            >

              {/* Brand */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    fontStyle: 'italic',
                    color: 'var(--text)',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.6rem',
                  }}
                >
                  Binyamin Ahmed
                </div>
                <p
                  style={{
                    fontSize: '12.5px',
                    color: 'var(--text-muted)',
                    lineHeight: 1.65,
                    fontWeight: 300,
                    maxWidth: '200px',
                    marginBottom: '1rem',
                  }}
                >
                  Frontend Developer & Craftsman building fast, beautiful digital experiences.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <MapPin size={12} style={{ color: 'var(--accent)' }} />
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Garissa, Kenya (Remote)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={12} style={{ color: 'var(--accent)' }} />
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Mon–Fri, 9AM–6PM EAT</span>
                </div>
              </div>

              {/* Company */}
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text)',
                    marginBottom: '1rem',
                  }}
                >
                  Quick Links
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {companyLinks.map(link => (
                    <a key={link.label} href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Socials */}
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text)',
                    marginBottom: '1rem',
                  }}
                >
                  Socials
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link"
                    >
                      <Icon size={12} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Newsletter
                </div>
                <p
                  style={{
                    fontSize: '12.5px',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    fontWeight: 300,
                    marginBottom: '1rem',
                  }}
                >
                  Receive project updates, news, exclusive discounts and early access.
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1px solid var(--border-strong)',
                    borderRadius: '9999px',
                    padding: '0.5rem 0.5rem 0.5rem 1rem',
                    backgroundColor: 'var(--bg-secondary)',
                  }}
                >
                  <input
                    className="email-input"
                    type="email"
                    placeholder="Enter your email..."
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <button
                    style={{
                      width: '30px', height: '30px',
                      borderRadius: '50%',
                      background: 'var(--text)',
                      border: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'var(--bg)',
                      flexShrink: 0,
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    <Send size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              className="footer-bottom"
              style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '1.25rem',
                paddingBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '12px', color: 'var(--text-faint)' }}>
                © 2025 Binyamin Ahmed · All rights reserved
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-faint)' }}>
                  Built with React & ❤️
                </span>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {[
                    { href: 'https://github.com/yamin22-0', Icon: GithubIcon },
                    { href: 'https://linkedin.com/in/binyamin-ahmed', Icon: LinkedinIcon },
                    { href: 'https://twitter.com/binyamin_ahmed', Icon: TwitterIcon },
                  ].map(({ href, Icon }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: 'var(--text-faint)',
                        transition: 'color 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </>
  )
}

export default BannerFooter