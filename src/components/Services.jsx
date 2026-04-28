// Services.jsx - With Enhanced Interactivity & Mobile Responsiveness
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Code2, Palette, Video, Megaphone, Shield, Zap, Sparkles, Star } from 'lucide-react'

/* ─── Animation Variants ──────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.1 },
  }),
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

/* ─── Service Card Component with Enhanced Interactivity ──────────── */
const ServiceCard = ({ icon: Icon, title, description, imageType, delay, index, inView }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const cardRef = useRef(null)

  // Different image URLs based on service type
  const getImageUrl = () => {
    const images = {
      abstract: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
      illustration: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&q=80',
      photography: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
      design: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
      default: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
    }
    return images[imageType] || images.default
  }

  // Tech stack tags based on service
  const getTechTags = () => {
    const tags = {
      'Web Development': ['React', 'Node.js', 'Python'],
      'UI/UX Design': ['Figma', 'Adobe XD', 'Prototyping'],
      'Motion Design': ['After Effects', 'Lottie', 'CSS'],
      'Digital Marketing': ['SEO', 'Analytics', 'Social Media'],
      'Security Optimization': ['SSL', 'Encryption', 'Firewall'],
      'Performance Tuning': ['Lighthouse', 'Web Vitals', 'Caching'],
    }
    return tags[title] || ['Innovation', 'Quality', 'Support']
  }

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      style={{
        background: 'var(--card)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(20px, 4vw, 28px)',
        border: isHovered ? '2px solid var(--accent-border)' : '1px solid var(--border)',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 2px var(--accent-dim)' 
          : '0 4px 20px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Glow on Hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isHovered ? 0.1 : 0,
          scale: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          borderRadius: '50%',
        }}
      />

      {/* Image Section */}
      <motion.div
        style={{
          height: 'clamp(140px, 25vw, 180px)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          marginBottom: '20px',
          background: 'var(--bg-secondary)',
          position: 'relative',
        }}
      >
        {!isImageLoaded && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, var(--border) 25%, transparent 50%, var(--border) 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
            }}
          />
        )}
        <motion.img
          src={getImageUrl()}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: isImageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
          onLoad={() => setIsImageLoaded(true)}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
        />
        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)',
            pointerEvents: 'none',
            opacity: isHovered ? 0.5 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      </motion.div>

      {/* Service Icon with Pulse Animation on Hover */}
      <motion.div
        animate={isHovered ? { scale: 1.1, rotate: [0, -5, 5, 0] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          width: 56,
          height: 56,
          borderRadius: 'var(--radius-md)',
          background: 'var(--accent-dim)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          border: '2px solid var(--accent-border)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Icon size={26} color="var(--accent)" strokeWidth={1.5} />
      </motion.div>

      {/* Title */}
      <motion.h3
        animate={{ color: isHovered ? 'var(--accent)' : 'var(--text)' }}
        style={{
          fontSize: 'clamp(1.1rem, 3vw, 1.25rem)',
          fontWeight: 700,
          marginBottom: '12px',
          lineHeight: 1.3,
          transition: 'color 0.2s ease',
        }}
      >
        {title}
      </motion.h3>

      {/* Description */}
      <p
        style={{
          fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          marginBottom: '16px',
          flex: 1,
        }}
      >
        {description}
      </p>

      {/* Tech Tags */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '16px',
        }}
      >
        {getTechTags().map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            style={{
              fontSize: '0.65rem',
              padding: '0.2rem 0.6rem',
              background: 'var(--bg-secondary)',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
            }}
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>

      {/* CTA Link */}
      <motion.button
        onClick={() => {
          const contactSection = document.getElementById('contact')
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }}
        style={{
          fontSize: '0.85rem',
          fontWeight: 600,
          background: 'transparent',
          border: 'none',
          color: isHovered ? 'var(--accent)' : 'var(--text)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          padding: '8px 0',
          width: 'fit-content',
          transition: 'gap 0.2s ease, color 0.2s ease',
        }}
        whileHover={{ gap: '12px' }}
      >
        Learn more
        <motion.div
          animate={{ x: isHovered ? [0, 5, 0] : 0 }}
          transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
        >
          <ArrowRight size={14} />
        </motion.div>
      </motion.button>
    </motion.div>
  )
}

/* ─── Main Services Section ───────────────────────────── */
export default function Services() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const sectionInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  const services = [
    {
      icon: Code2,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies for optimal performance and scalability.',
      imageType: 'abstract',
      category: 'development',
      features: ['React/Next.js', 'Node.js', 'TypeScript', 'Database'],
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces designed with user psychology and business goals to maximize engagement.',
      imageType: 'design',
      category: 'design',
      features: ['User Research', 'Prototyping', 'Usability Testing', 'Design Systems'],
    },
    {
      icon: Video,
      title: 'Motion Design',
      description: 'Engaging animations and motion graphics that bring your brand story to life and captivate audiences.',
      imageType: 'photography',
      category: 'creative',
      features: ['2D/3D Animation', 'Lottie Files', 'Video Editing', 'Interactive Elements'],
    },
    {
      icon: Megaphone,
      title: 'Digital Marketing',
      description: 'Data-driven strategies to increase visibility, engagement, and conversions across all digital channels.',
      imageType: 'illustration',
      category: 'marketing',
      features: ['SEO/SEM', 'Social Media', 'Email Marketing', 'Analytics'],
    },
    {
      icon: Shield,
      title: 'Security Optimization',
      description: 'Protect your digital assets with enterprise-grade security best practices and proactive monitoring.',
      imageType: 'abstract',
      category: 'security',
      features: ['SSL/TLS', 'Firewall Setup', 'Malware Protection', 'Security Audits'],
    },
    {
      icon: Zap,
      title: 'Performance Tuning',
      description: 'Lightning-fast load times and smooth interactions for better user retention and search rankings.',
      imageType: 'illustration',
      category: 'performance',
      features: ['Code Optimization', 'Caching', 'CDN Setup', 'Core Web Vitals'],
    },
  ]

  const categories = [
    { id: 'all', label: 'All Services', icon: Star },
    { id: 'development', label: 'Development', icon: Code2 },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'creative', label: 'Creative', icon: Video },
    { id: 'marketing', label: 'Marketing', icon: Megaphone },
  ]

  const filteredServices = activeFilter === 'all' 
    ? services 
    : services.filter(service => service.category === activeFilter)

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--bg)',
        padding: 'clamp(60px, 10vw, 100px) clamp(16px, 5vw, 32px)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Animated Background Pattern */}
      <motion.div
        aria-hidden="true"
        animate={{ 
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--text) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Accent Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1400,
          marginInline: 'auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Header Section */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 60px)' }}>
          {/* Label */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={headerInView ? 'visible' : 'hidden'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: 'clamp(11px, 2vw, 13px)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '16px',
              padding: '4px 12px',
              background: 'var(--accent-dim)',
              borderRadius: '100px',
              width: 'fit-content',
              marginInline: 'auto',
            }}
          >
            <Sparkles size={14} />
            <span>What I Do</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={headerInView ? 'visible' : 'hidden'}
            style={{
              fontSize: 'clamp(32px, 6vw, 48px)',
              fontWeight: 800,
              color: 'var(--text)',
              marginBottom: '16px',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            Services I{' '}
            <motion.span
              initial={{ color: 'var(--text)' }}
              animate={{ color: 'var(--accent)' }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{ fontStyle: 'italic' }}
            >
              Offer
            </motion.span>
          </motion.h2>

          {/* Description */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={headerInView ? 'visible' : 'hidden'}
            style={{
              maxWidth: 600,
              marginInline: 'auto',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              lineHeight: 1.6,
              color: 'var(--text-muted)',
            }}
          >
            Comprehensive solutions tailored to elevate your digital presence 
            and achieve your business goals with cutting-edge technology.
          </motion.p>
        </div>

        {/* Category Filters - New Interactive Feature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: 'clamp(32px, 5vw, 48px)',
          }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                borderRadius: '100px',
                fontSize: '0.85rem',
                fontWeight: 600,
                background: activeFilter === category.id ? 'var(--accent)' : 'var(--card)',
                color: activeFilter === category.id ? 'white' : 'var(--text)',
                border: activeFilter === category.id ? 'none' : '1px solid var(--border)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <category.icon size={16} />
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={sectionInView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(20px, 3vw, 30px)',
          }}
        >
          {filteredServices.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              imageType={service.imageType}
              delay={index * 0.1}
              index={index}
              inView={sectionInView}
            />
          ))}
        </motion.div>

        {/* View More CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{
            textAlign: 'center',
            marginTop: 'clamp(40px, 8vw, 60px)',
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05, gap: '12px' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const contactSection = document.getElementById('contact')
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            style={{
              background: 'transparent',
              border: '2px solid var(--accent-border)',
              borderRadius: '100px',
              padding: 'clamp(10px, 2vw, 14px) clamp(24px, 5vw, 32px)',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              fontWeight: 600,
              color: 'var(--text)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
            }}
          >
            Have a project in mind?
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            >
              <ArrowRight size={18} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Keyframes for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @media (max-width: 768px) {
          .services-grid {
            gap: 20px;
          }
        }
        
        /* Custom scrollbar for the section */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: var(--bg-secondary);
        }
        
        ::-webkit-scrollbar-thumb {
          background: var(--accent);
          border-radius: 4px;
        }
      `}</style>
    </section>
  )
}