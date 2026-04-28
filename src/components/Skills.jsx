// Skills.jsx - With Enhanced Interactivity & Mobile Responsiveness
import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  Code2, Server, Layout, Globe, 
  GitBranch, Terminal, Database, Sparkles, 
  Award, Briefcase, Clock, Users, CheckCircle, 
  Layers, Zap, Cpu, Palette, Shield, 
  TrendingUp, Star, Rocket
} from 'lucide-react'

/* ─── Animation Variants ──────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } 
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
  }
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
}

/* ─── Skill Card Component with Progress Bar ────────────── */
const SkillCard = ({ skill, index, inView }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [progress, setProgress] = useState(0)
  const cardRef = useRef(null)
  
  const getLevelColor = (level) => {
    switch(level.toLowerCase()) {
      case 'expert': return '#4ADE80'
      case 'advanced': return '#60A5FA'
      case 'intermediate': return '#FBBF24'
      default: return 'var(--accent)'
    }
  }

  const getProgressPercentage = (level) => {
    switch(level.toLowerCase()) {
      case 'expert': return 95
      case 'advanced': return 85
      case 'intermediate': return 70
      default: return 80
    }
  }

  useEffect(() => {
    if (inView && progress === 0) {
      setTimeout(() => {
        setProgress(getProgressPercentage(skill.level))
      }, index * 100)
    }
  }, [inView, index, skill.level])

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{
        background: 'var(--card)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        border: isHovered ? '2px solid var(--accent-border)' : '1px solid var(--border)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.08 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 0% 0%, var(--accent) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
        <motion.div
          animate={isHovered ? { rotate: [0, -5, 5, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            width: 48,
            height: 48,
            borderRadius: 'var(--radius-md)',
            background: 'var(--accent-dim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--accent-border)',
            flexShrink: 0,
          }}
        >
          <skill.icon size={22} color="var(--accent)" strokeWidth={1.5} />
        </motion.div>
        
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
            <h4 style={{ 
              fontSize: 'clamp(0.9rem, 2vw, 1rem)', 
              fontWeight: 700, 
              color: 'var(--text)',
              transition: 'color 0.2s ease',
            }}>
              {skill.name}
            </h4>
            <span style={{ 
              fontSize: '11px', 
              color: getLevelColor(skill.level),
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '12px',
              background: `${getLevelColor(skill.level)}20`,
            }}>
              {skill.level}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div style={{
            width: '100%',
            height: '4px',
            background: 'var(--border)',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '8px',
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                height: '100%',
                background: getLevelColor(skill.level),
                borderRadius: '4px',
              }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {skill.proof}
            </span>
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ fontSize: '10px', color: 'var(--accent)' }}
              >
                ✓ Verified
              </motion.span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Metric Card with Counter Animation ───────────────── */
const MetricCard = ({ icon: Icon, value, label, color, delay, inView }) => {
  const [count, setCount] = useState(0)
  const targetValue = parseInt(value) || 0

  useEffect(() => {
    if (inView && count === 0) {
      let startTime = null
      const duration = 1500
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOutCubic = 1 - Math.pow(1 - progress, 3)
        const currentCount = Math.floor(easeOutCubic * targetValue)
        setCount(currentCount)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }
  }, [inView, targetValue])

  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      whileHover={{ y: -6, scale: 1.02 }}
      style={{
        background: 'var(--card)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(16px, 3vw, 24px)',
        border: '1px solid var(--border)',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <Icon size={32} color={color} style={{ marginBottom: '12px', display: 'inline-block' }} />
      </motion.div>
      <div style={{
        fontSize: 'clamp(28px, 5vw, 36px)',
        fontWeight: 800,
        color: 'var(--text)',
        marginBottom: '6px',
        letterSpacing: '-0.02em',
      }}>
        {value.includes('+') ? `${count}+` : value.includes('%') ? `${count}%` : count}
      </div>
      <div style={{
        fontSize: 'clamp(11px, 2vw, 13px)',
        color: 'var(--text-muted)',
        fontWeight: 500,
      }}>
        {label}
      </div>
    </motion.div>
  )
}

/* ─── Main Skills Component ───────────────────────────── */
export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend')
  const [hoveredTab, setHoveredTab] = useState(null)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const tabs = [
    { id: 'frontend', label: 'Frontend', icon: Code2, description: 'UI & Interaction' },
    { id: 'backend', label: 'Backend', icon: Server, description: 'Server & Database' },
    { id: 'tools', label: 'Tools & Workflow', icon: Terminal, description: 'DevOps & Tools' },
  ]

  const skillsData = {
    frontend: [
      { name: 'React', level: 'Expert', proof: '15+ apps built | 3+ years', icon: Code2 },
      { name: 'Next.js', level: 'Advanced', proof: '8+ projects | SSR/SSG', icon: Layout },
      { name: 'TypeScript', level: 'Advanced', proof: '10+ apps | Type Safety', icon: Database },
      { name: 'Tailwind CSS', level: 'Expert', proof: '25+ websites | Custom designs', icon: Palette },
      { name: 'Framer Motion', level: 'Advanced', proof: '12+ animations | Interactive', icon: Sparkles },
      { name: 'Redux/Zustand', level: 'Intermediate', proof: '8+ apps | State management', icon: Layers },
    ],
    backend: [
      { name: 'Node.js', level: 'Advanced', proof: '12+ APIs | Microservices', icon: Server },
      { name: 'Express', level: 'Advanced', proof: '10+ backends | REST APIs', icon: Code2 },
      { name: 'PostgreSQL', level: 'Intermediate', proof: '8+ databases | Complex queries', icon: Database },
      { name: 'MongoDB', level: 'Intermediate', proof: '6+ projects | NoSQL', icon: Database },
      { name: 'REST APIs', level: 'Expert', proof: '20+ integrations | Design', icon: Globe },
      { name: 'GraphQL', level: 'Intermediate', proof: '4+ APIs | Apollo', icon: Code2 },
    ],
    tools: [
      { name: 'Git & GitHub', level: 'Advanced', proof: 'Daily use | CI/CD', icon: GitBranch },
      { name: 'Docker', level: 'Intermediate', proof: '5+ containers | Deployment', icon: Server },
      { name: 'VS Code', level: 'Expert', proof: '5+ years | Custom setup', icon: Terminal },
      { name: 'Vercel/Netlify', level: 'Advanced', proof: '20+ deploys | Hosting', icon: Globe },
      { name: 'GitHub Actions', level: 'Intermediate', proof: 'CI/CD pipelines', icon: GitBranch },
      { name: 'Postman/Insomnia', level: 'Advanced', proof: 'API testing | Documentation', icon: Server },
    ],
  }

  const metrics = [
    { icon: Briefcase, value: '15+', label: 'Projects Completed', color: '#4ADE80' },
    { icon: Clock, value: '3+', label: 'Years Experience', color: '#60A5FA' },
    { icon: Users, value: '12+', label: 'Happy Clients', color: '#FBBF24' },
    { icon: Award, value: '98%', label: 'Success Rate', color: 'var(--accent)' },
  ]

  const certifications = [
    'Meta Frontend Developer',
    'AWS Cloud Practitioner',
    'Google UX Design',
  ]

  const toolsStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Tailwind', icon: '🎨' },
    { name: 'Git', icon: '📊' },
    { name: 'Docker', icon: '🐳' },
  ]

  const featuredProject = {
    title: "E-Commerce Platform",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    description: "Full-stack e-commerce solution with real-time inventory"
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--bg)',
        padding: 'clamp(60px, 10vw, 100px) clamp(16px, 5vw, 48px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Elements */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          x: [0, 20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: 'clamp(200px, 30vw, 400px)',
          height: 'clamp(200px, 30vw, 400px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }}
      />
      
      <motion.div
        animate={{ 
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: 'clamp(250px, 35vw, 500px)',
          height: 'clamp(250px, 35vw, 500px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(50px)',
        }}
      />

      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Header with Enhanced Animation */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 60px)' }}
        >
          <motion.div variants={scaleUp} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: 'var(--accent-dim)',
            borderRadius: '100px',
            marginBottom: '20px',
          }}>
            <Rocket size={16} color="var(--accent)" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)' }}>
              My Expertise
            </span>
          </motion.div>
          
          <motion.h2 variants={fadeUp} style={{
            fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: 800,
            color: 'var(--text)',
            marginBottom: '16px',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}>
            Technical{' '}
            <motion.span
              initial={{ color: 'var(--text)' }}
              animate={{ color: 'var(--accent)' }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{ fontStyle: 'italic' }}
            >
              Skills
            </motion.span>
          </motion.h2>
          
          <motion.p variants={fadeUp} style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: 'var(--text-muted)',
            maxWidth: 550,
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Frontend-focused developer with full-stack capabilities and a passion for creating exceptional digital experiences
          </motion.p>
        </motion.div>

        {/* Responsive Grid Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(24px, 5vw, 48px)',
        }}>
          
          {/* LEFT SIDE - Skills */}
          <div style={{ minWidth: 0 }}>
            {/* Enhanced Tabs */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '32px',
                borderBottom: '2px solid var(--border)',
                paddingBottom: '16px',
              }}
            >
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 24px',
                    background: activeTab === tab.id ? 'var(--accent-dim)' : 'transparent',
                    border: activeTab === tab.id ? '2px solid var(--accent-border)' : '2px solid transparent',
                    borderRadius: '100px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-muted)',
                    position: 'relative',
                  }}
                >
                  <tab.icon size={18} />
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>{tab.label}</span>
                  {hoveredTab === tab.id && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      style={{
                        fontSize: '11px',
                        color: 'var(--accent)',
                        marginLeft: '4px',
                      }}
                    >
                      {tab.description}
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Animated Skills Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                  gap: '16px',
                }}
              >
                {skillsData[activeTab].map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} inView={inView} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE - Stats & Info */}
          <div>
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={staggerContainer}
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              {/* Profile Summary with Gradient Border */}
              <motion.div 
                variants={scaleUp}
                whileHover={{ y: -4 }}
                style={{
                  background: 'var(--card)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'clamp(20px, 4vw, 28px)',
                  border: '1px solid var(--border)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, var(--accent), #4ADE80, var(--accent))',
                }} />
                
                <h3 style={{
                  fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <Zap size={20} color="var(--accent)" />
                  About My Work
                </h3>
                <p style={{
                  fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                  lineHeight: 1.7,
                  color: 'var(--text-muted)',
                  marginBottom: '20px',
                }}>
                  Frontend developer specializing in React, modern JavaScript, and creating 
                  lightning-fast web experiences with clean, maintainable code. I focus on 
                  performance, accessibility, and pixel-perfect implementations.
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border)',
                }}>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle size={18} color="#4ADE80" />
                  </motion.div>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)' }}>
                    Available for freelance & full-time opportunities
                  </span>
                </div>
              </motion.div>

              {/* Key Metrics Grid with Hover Effects */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
                gap: '16px',
              }}>
                {metrics.map((metric, idx) => (
                  <MetricCard 
                    key={metric.label} 
                    {...metric} 
                    delay={idx}
                    inView={inView}
                  />
                ))}
              </div>

              {/* Certifications Section */}
              <motion.div 
                variants={fadeUp}
                whileHover={{ y: -4 }}
                style={{
                  background: 'linear-gradient(135deg, var(--card) 0%, var(--bg-secondary) 100%)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'clamp(16px, 3vw, 24px)',
                  border: '1px solid var(--border)',
                }}
              >
                <h3 style={{
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <Award size={18} color="var(--accent)" />
                  Certifications
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {certifications.map((cert, idx) => (
                    <motion.div
                      key={cert}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ x: 5 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        color: 'var(--text-muted)',
                      }}
                    >
                      <CheckCircle size={14} color="var(--accent)" />
                      {cert}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Tech Stack with Icons */}
              <motion.div 
                variants={fadeUp}
                whileHover={{ y: -4 }}
                style={{
                  background: 'var(--card)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'clamp(16px, 3vw, 24px)',
                  border: '1px solid var(--border)',
                }}
              >
                <h3 style={{
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <Cpu size={18} color="var(--accent)" />
                  Core Tech Stack
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}>
                  {toolsStack.map((tool) => (
                    <motion.span
                      key={tool.name}
                      whileHover={{ 
                        scale: 1.08,
                        y: -2,
                        background: 'var(--accent)',
                        color: 'white',
                      }}
                      style={{
                        padding: '8px 16px',
                        background: 'var(--accent-dim)',
                        borderRadius: '100px',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: 'var(--text)',
                        border: '1px solid var(--accent-border)',
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      <span>{tool.icon}</span>
                      {tool.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Featured Project Spotlight */}
              <motion.div 
                variants={fadeUp}
                whileHover={{ y: -4 }}
                style={{
                  background: 'linear-gradient(135deg, var(--accent-dim) 0%, var(--card) 100%)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'clamp(16px, 3vw, 20px)',
                  border: '1px solid var(--accent-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <TrendingUp size={18} color="var(--accent)" />
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>
                    Featured Project
                  </h3>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>
                  {featuredProject.title}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.5 }}>
                  {featuredProject.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {featuredProject.tech.map(tech => (
                    <span key={tech} style={{
                      fontSize: '0.7rem',
                      padding: '2px 8px',
                      background: 'var(--bg)',
                      borderRadius: '12px',
                      color: 'var(--text-muted)',
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .skills-grid {
            gap: 20px;
          }
          
          button {
            padding: 8px 16px !important;
          }
          
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 480px) {
          .metrics-grid {
            grid-template-columns: 1fr !important;
          }
        }
        
        /* Smooth animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .floating {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}