// About.jsx - With Enhanced Interactivity & Mobile Responsiveness
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check, Code, Sparkles, Zap } from 'lucide-react'

/* ─── Animation Variants ──────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 },
  }),
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
}

/* ─── Animated Counter ────────────────────────────────── */
const Counter = ({ target, suffix = '' }) => {
  const ref = useRef(null)
  const numRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let startTime = null
    const duration = 1400
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(easeOutCubic * target)
      setCount(currentCount)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

/* ─── Floating Image Card with Hover Effect ───────────── */
const FloatingImage = ({ src, alt, style, delay, inView }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
      animate={inView ? { 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
        y: [0, -8, 0],
      } : {}}
      transition={{ 
        duration: 0.5, 
        ease: [0.25, 0.1, 0.25, 1], 
        delay,
        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 }
      }}
      style={{
        position: 'absolute',
        width: 'clamp(60px, 8vw, 76px)',
        height: 'clamp(60px, 8vw, 76px)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '2px solid var(--card)',
        boxShadow: isHovered ? 'var(--shadow-lg)' : 'var(--shadow-md)',
        zIndex: 3,
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease',
        ...style,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.2 } }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.8 : 0 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Zap size={20} color="white" />
      </motion.div>
    </motion.div>
  )
}

/* ─── Orbit Images Configuration ──────────────────────── */
const ORBIT_IMGS = [
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&q=80",
    alt: 'Code on screen',
    style: { top: '-44px', left: '50%', transform: 'translateX(-50%)' },
    delay: 0.3,
  },
  {
    src: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=200&q=80",
    alt: 'Developer at work',
    style: { top: '50%', right: '-48px', transform: 'translateY(-50%)' },
    delay: 0.4,
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&q=80",
    alt: 'Coding terminal',
    style: { bottom: '-44px', left: '50%', transform: 'translateX(-50%)' },
    delay: 0.5,
  },
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&q=80",
    alt: 'Laptop setup',
    style: { top: '50%', left: '-48px', transform: 'translateY(-50%)' },
    delay: 0.6,
  },
]

const BELIEFS = [
  { text: 'Clean, accessible & performant interfaces', icon: Code },
  { text: 'Pixel-perfect design-to-code precision', icon: Sparkles },
  { text: 'Scalable architecture that grows with you', icon: Zap },
]

/* ─── Main About Component ────────────────────────────── */
export default function About() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeStat, setActiveStat] = useState(null)

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const glowElement = document.querySelector('.about-glow')
      if (glowElement) {
        glowElement.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.05}px))`
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        padding: 'clamp(4rem, 9vw, 8rem) clamp(1.2rem, 6vw, 5rem)',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Glow */}
      <div
        className="about-glow"
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 'clamp(300px, 60vw, 600px)',
          height: 'clamp(300px, 60vw, 600px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)',
          top: '50%',
          left: '28%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: inView ? 0.6 : 0,
          transition: 'opacity 0.8s ease',
        }}
      />

      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1200,
          marginInline: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(2rem, 6vw, 6rem)',
          alignItems: 'center',
        }}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
      >

        {/* LEFT — Image Cluster (Desktop) */}
        <div className="hidden md:block">
          <motion.div
            variants={fadeUp}
            custom={0}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(30px, 8vw, 56px)',
            }}
          >
            {/* Rotating Orbit Ring */}
            <motion.div
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '1.5px dashed var(--accent-border)',
                pointerEvents: 'none',
              }}
            />

            {/* Centre Main Image */}
            <motion.div
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                maxWidth: 'clamp(200px, 25vw, 280px)',
                aspectRatio: '3 / 4',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-lg)',
                background: 'var(--bg-secondary)',
                flexShrink: 0,
              }}
            >
              <img
                src="./About.png"
                alt="Developer coding"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/280x373' }}
              />

              {/* Available Badge with Pulse Animation */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  position: 'absolute',
                  bottom: 14,
                  left: 14,
                  background: 'var(--card)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.45rem 0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--border)',
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ADE80', flexShrink: 0 }}
                />
                <span style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--text)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Available for work
                </span>
              </motion.div>
            </motion.div>

            {/* 4 Orbit Thumbnails with Interactivity */}
            {ORBIT_IMGS.map((img) => (
              <FloatingImage key={img.alt} {...img} inView={inView} />
            ))}
          </motion.div>
        </div>

        {/* Mobile Image Carousel */}
        <div className="md:hidden">
          <motion.div
            variants={fadeUp}
            custom={0}
            style={{ position: 'relative' }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{
                width: '100%',
                maxWidth: 220,
                aspectRatio: '3 / 4',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-lg)',
                background: 'var(--bg-secondary)',
                margin: '0 auto',
                position: 'relative',
              }}
            >
              <img
                src="./About.png"
                alt="Developer coding"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/220x293' }}
              />
              
              {/* Mobile Available Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                style={{
                  position: 'absolute',
                  bottom: 10,
                  left: 10,
                  background: 'var(--card)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.35rem 0.7rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80' }} />
                <span style={{ fontSize: '0.55rem', fontWeight: 600 }}>Available</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT — Text Content */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {/* Badge */}
          <motion.div
            variants={fadeUp}
            custom={1}
            style={{
              marginBottom: '1.4rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              width: 'fit-content',
            }}
            className="badge"
            whileHover={{ scale: 1.05, x: 5 }}
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="dot-live"
            />
            <span>About Me</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            custom={2}
            style={{ marginBottom: 'clamp(1rem, 3vw, 1.25rem)', lineHeight: 1.1 }}
          >
            I craft digital<br />
            experiences that<br />
            <motion.em
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{ color: 'var(--accent)', fontStyle: 'italic' }}
            >
              leave a mark.
            </motion.em>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            custom={3}
            style={{ 
              maxWidth: '42ch', 
              marginBottom: '1.75rem', 
              fontWeight: 300, 
              lineHeight: 1.7, 
              fontSize: 'clamp(0.85rem, 2vw, 0.92rem)',
              color: 'var(--text-muted)'
            }}
          >
            I'm a frontend developer who obsesses over the intersection of
            design and engineering. Every pixel, transition, and interaction
            is intentional — built to feel as good as it looks.
          </motion.p>

          {/* Beliefs Checklist with Hover Effects */}
          <motion.ul
            variants={staggerContainer}
            style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}
          >
            {BELIEFS.map((belief, i) => (
              <motion.li
                key={belief.text}
                variants={fadeUp}
                custom={4 + i * 0.3}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}
              >
                <motion.span
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'var(--accent-dim)',
                    border: '1px solid var(--accent-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Check size={12} color="var(--accent)" strokeWidth={2.5} />
                </motion.span>
                <span style={{ fontSize: 'clamp(0.8rem, 2vw, 0.875rem)', color: 'var(--text-muted)', fontWeight: 400 }}>
                  {belief.text}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Stats Row with Interactive Hover */}
          <motion.div
            variants={fadeUp}
            custom={7}
            style={{
              display: 'flex',
              gap: 'clamp(1rem, 5vw, 2rem)',
              paddingBlock: '1.5rem',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {[
              { target: 1, suffix: '+', label: 'Years Experience' },
              { target: 7, suffix: '+', label: 'Projects Shipped' },
              { target: 98, suffix: '%', label: 'Satisfaction Rate' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -3 }}
                onHoverStart={() => setActiveStat(idx)}
                onHoverEnd={() => setActiveStat(null)}
                style={{ 
                  cursor: 'pointer',
                  textAlign: 'center',
                  flex: '1',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    marginBottom: '0.2rem',
                    color: 'var(--text)',
                  }}
                >
                  <Counter target={stat.target} suffix={stat.suffix} />
                </div>
                <motion.div 
                  className="label"
                  animate={{ color: activeStat === idx ? 'var(--accent)' : 'var(--text-muted)' }}
                  style={{ fontSize: 'clamp(0.55rem, 2vw, 0.65rem)' }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button with Enhanced Interactivity */}
          <motion.div
            variants={fadeUp}
            custom={8}
          >
            <motion.button
              className="btn btn-primary"
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                width: 'auto',
              }}
              whileHover={{ 
                gap: '0.85rem',
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
            >
              Let's Work Together
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                <ArrowRight size={15} />
              </motion.div>
            </motion.button>
          </motion.div>

        </div>
      </motion.div>

      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .about-glow {
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
          }
          
          h2 {
            font-size: clamp(1.8rem, 6vw, 2.5rem);
            text-align: center;
          }
          
          .badge {
            margin-left: auto;
            margin-right: auto;
          }
          
          p {
            text-align: center;
            margin-left: auto;
            margin-right: auto;
          }
          
          ul {
            align-items: center;
          }
          
          .btn-primary {
            margin: 0 auto;
          }
        }
        
        @media (max-width: 480px) {
          .stats-container {
            gap: 1rem;
          }
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  )
}