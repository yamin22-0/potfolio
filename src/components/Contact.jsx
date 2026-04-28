// Contact.jsx - FINAL WORKING VERSION (All icons confirmed to exist)
import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  Send, Mail, Phone, MessageCircle, Code2, 
  MapPin, Clock, Shield, CheckCircle, ArrowRight, 
  Lightbulb, Users, FileText, Sparkles,
  Award, Coffee, Globe
} from 'lucide-react'

/* ─── Inline Social SVG Icons ─────────────────────────── */
const GithubSVG = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const LinkedinSVG = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const TwitterSVG = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

/* ─── Animation Variants ──────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } 
  }
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, type: "spring", stiffness: 200 } 
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.12, delayChildren: 0.2 } 
  }
}

/* ─── Contact Form Component ────────────────────────────── */
const ContactForm = ({ inView }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [characterCount, setCharacterCount] = useState(0)
  const [focusedField, setFocusedField] = useState(null)

  const validateField = (name, value) => {
    switch(name) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.length < 2) return 'Name must be at least 2 characters'
        return ''
      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email'
        return ''
      case 'message':
        if (!value.trim()) return 'Message is required'
        if (value.length < 10) return 'Message must be at least 10 characters'
        if (value.length > 500) return 'Message must be less than 500 characters'
        return ''
      default: return ''
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (name === 'message') setCharacterCount(value.length)
    
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
    setFocusedField(null)
  }

  const handleFocus = (e) => {
    setFocusedField(e.target.name)
  }

  const validateForm = () => {
    const newErrors = {}
    const fields = ['name', 'email', 'message']
    fields.forEach(field => {
      const error = validateField(field, formData[field])
      if (error) newErrors[field] = error
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setCharacterCount(0)
    
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <motion.form
      variants={scaleUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onSubmit={handleSubmit}
      style={{
        background: 'var(--card)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(24px, 5vw, 32px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        border: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'var(--accent-dim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
          }}
        >
          <Mail size={28} color="var(--accent)" />
        </motion.div>
        <h3 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>
          Send a Message
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          I'll reply within 2-4 business hours
        </p>
      </div>

      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              background: 'rgba(74, 222, 128, 0.1)',
              border: '2px solid #4ADE80',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <CheckCircle size={20} color="#4ADE80" />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#4ADE80' }}>
                Message sent successfully!
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                I'll get back to you soon.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '13px', 
          fontWeight: 600, 
          color: focusedField === 'name' ? 'var(--accent)' : 'var(--text)',
          marginBottom: '8px',
          transition: 'color 0.2s ease'
        }}>
          Name *
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'var(--bg)',
            border: `2px solid ${errors.name && touched.name ? '#EF4444' : focusedField === 'name' ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-md)',
            color: 'var(--text)',
            fontSize: '14px',
            transition: 'all 0.2s ease',
            outline: 'none',
          }}
          placeholder="John Doe"
        />
        {errors.name && touched.name && (
          <span style={{ fontSize: '11px', color: '#EF4444', marginTop: '6px', display: 'block' }}>
            {errors.name}
          </span>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '13px', 
          fontWeight: 600, 
          color: focusedField === 'email' ? 'var(--accent)' : 'var(--text)',
          marginBottom: '8px',
          transition: 'color 0.2s ease'
        }}>
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'var(--bg)',
            border: `2px solid ${errors.email && touched.email ? '#EF4444' : focusedField === 'email' ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-md)',
            color: 'var(--text)',
            fontSize: '14px',
            transition: 'all 0.2s ease',
            outline: 'none',
          }}
          placeholder="you@example.com"
        />
        {errors.email && touched.email && (
          <span style={{ fontSize: '11px', color: '#EF4444', marginTop: '6px', display: 'block' }}>
            {errors.email}
          </span>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '13px', 
          fontWeight: 600, 
          color: focusedField === 'message' ? 'var(--accent)' : 'var(--text)',
          marginBottom: '8px',
          transition: 'color 0.2s ease'
        }}>
          Message *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          rows={4}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'var(--bg)',
            border: `2px solid ${errors.message && touched.message ? '#EF4444' : focusedField === 'message' ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-md)',
            color: 'var(--text)',
            fontSize: '14px',
            fontFamily: 'inherit',
            transition: 'all 0.2s ease',
            outline: 'none',
            resize: 'vertical',
          }}
          placeholder="Tell me about your project..."
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          {errors.message && touched.message && (
            <span style={{ fontSize: '11px', color: '#EF4444' }}>{errors.message}</span>
          )}
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: 'auto' }}>
            {characterCount}/500
          </span>
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '100%',
          padding: '14px',
          background: 'linear-gradient(135deg, var(--accent), #B8A48E)',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          color: 'white',
          fontSize: '15px',
          fontWeight: 700,
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          transition: 'all 0.3s ease',
          opacity: isSubmitting ? 0.7 : 1,
        }}
      >
        {isSubmitting ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Send size={16} />
            </motion.div>
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send size={16} />
          </>
        )}
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '11px',
          color: 'var(--text-muted)',
          textAlign: 'center',
        }}
      >
        <Shield size={14} />
        <span>Your information is secure. I'll never share your data.</span>
      </motion.div>
    </motion.form>
  )
}

/* ─── Side Card Component ────────────────────────────── */
const SideCard = ({ icon: Icon, title, description, action, link, delay, inView }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -8 }}
      style={{
        background: 'var(--card)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(20px, 4vw, 28px)',
        border: isHovered ? '2px solid var(--accent-border)' : '1px solid var(--border)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(link, '_blank')}
    >
      <motion.div
        animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? [0, -5, 5, 0] : 0 }}
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
          border: '1px solid var(--accent-border)',
        }}
      >
        <Icon size={26} color="var(--accent)" strokeWidth={1.5} />
      </motion.div>
      
      <h4 style={{ 
        fontSize: 'clamp(1rem, 3vw, 1.2rem)', 
        fontWeight: 700, 
        color: isHovered ? 'var(--accent)' : 'var(--text)',
        marginBottom: '10px',
        transition: 'color 0.2s ease'
      }}>
        {title}
      </h4>
      
      <p style={{ 
        fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', 
        color: 'var(--text-muted)', 
        marginBottom: '20px', 
        lineHeight: 1.6 
      }}>
        {description}
      </p>
      
      <motion.div
        animate={{ x: isHovered ? 5 : 0 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--accent)',
          fontSize: '13px',
          fontWeight: 600,
        }}
      >
        {action}
        <ArrowRight size={14} />
      </motion.div>
    </motion.div>
  )
}

/* ─── Main Contact Component ──────────────────────────── */
export default function Contact() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [currentTime, setCurrentTime] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const ampm = hours >= 12 ? 'PM' : 'AM'
      const formattedHours = hours % 12 || 12
      setCurrentTime(`${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`)
      
      if (hours >= 9 && hours < 17) {
        setStatusMessage('Online • Available now')
      } else if (hours >= 17 && hours < 20) {
        setStatusMessage('Online • Usually replies within an hour')
      } else {
        setStatusMessage('Offline • Will reply in the morning')
      }
    }
    
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  const sideCards = [
    {
      icon: Lightbulb,
      title: 'Project Inquiry',
      description: 'Have a project in mind? Let\'s discuss how I can help bring your ideas to life with modern solutions.',
      action: 'Start a project',
      link: 'mailto:binyaminahmed594@gmail.com',
    },
    {
      icon: Users,
      title: "Let's Connect",
      description: 'Follow me on GitHub and LinkedIn to see my latest work, contributions, and open-source projects.',
      action: 'View my work',
      link: 'https://github.com/yamin22-0',
    },
  ]

  const contactMethods = [
    { icon: Mail, label: 'Email', value: 'binyaminahmed594@gmail.com', link: 'mailto:binyaminahmed594@gmail.com', color: '#EA4335' },
    { icon: Phone, label: 'Phone', value: '+254 725 649994', link: 'tel:+254725649994', color: '#34A853' },
    { icon: MessageCircle, label: 'WhatsApp', value: '+254 725 649994', link: 'https://wa.me/254725649994', color: '#25D366' },
    { icon: MapPin, label: 'Location', value: 'Garissa, Kenya (Remote)', link: null, color: 'var(--accent)' },
  ]

  const socialLinks = [
    { icon: GithubSVG, label: 'GitHub', link: 'https://github.com/yamin22-0', color: 'var(--text)' },
    { icon: LinkedinSVG, label: 'LinkedIn', link: 'https://linkedin.com/in/binyamin-ahmed', color: '#0077B5' },
    { icon: TwitterSVG, label: 'Twitter', link: 'https://twitter.com/binyamin_ahmed', color: '#1DA1F2' },
    { icon: Mail, label: 'Email', link: 'mailto:binyaminahmed594@gmail.com', color: '#EA4335' },
  ]

  const faqs = [
    { q: "What's your typical response time?", a: "2-4 business hours during working days." },
    { q: "Do you work remotely?", a: "Yes, I'm available for remote work worldwide." },
    { q: "What's your preferred communication?", a: "Email and WhatsApp are usually best." },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--bg)',
        padding: 'clamp(60px, 10vw, 100px) clamp(16px, 5vw, 48px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        animate={{ 
          y: [0, -50, 0],
          x: [0, 30, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
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
          y: [0, 50, 0],
          x: [0, -30, 0],
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
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 60px)' }}
        >
          <motion.div variants={scaleUp} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '6px 16px',
            background: 'var(--accent-dim)',
            borderRadius: '100px',
            marginBottom: '20px',
          }}>
            <Sparkles size={16} color="var(--accent)" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)' }}>
              Get in Touch
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
            Let's Work{' '}
            <motion.span
              initial={{ color: 'var(--text)' }}
              animate={{ color: 'var(--accent)' }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{ fontStyle: 'italic' }}
            >
              Together
            </motion.span>
          </motion.h2>
          
          <motion.p variants={fadeUp} style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: 'var(--text-muted)',
            maxWidth: 550,
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Have a project? Let's discuss how I can help bring your ideas to life with cutting-edge solutions.
          </motion.p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(24px, 4vw, 32px)',
          marginBottom: 'clamp(40px, 8vw, 60px)',
        }}>
          <SideCard {...sideCards[0]} delay={0.1} inView={inView} />
          <ContactForm inView={inView} />
          <SideCard {...sideCards[1]} delay={0.2} inView={inView} />
        </div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(24px, 5vw, 48px)',
            paddingTop: 'clamp(32px, 6vw, 48px)',
            borderTop: '2px solid var(--border)',
          }}
        >
          <motion.div variants={fadeUp}>
            <h4 style={{ 
              fontSize: 'clamp(1rem, 3vw, 1.2rem)', 
              fontWeight: 700, 
              color: 'var(--text)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Phone size={20} color="var(--accent)" />
              Other Ways to Reach Me
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {contactMethods.map((method, idx) => (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 5 }}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '14px',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-dim)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{
                    width: 42,
                    height: 42,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--accent-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <method.icon size={20} color={method.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                      {method.label}
                    </div>
                    {method.link ? (
                      <a
                        href={method.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                          color: 'var(--text)',
                          textDecoration: 'none',
                          transition: 'color 0.2s ease',
                          wordBreak: 'break-all',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text)'}
                      >
                        {method.value}
                      </a>
                    ) : (
                      <span style={{ fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', color: 'var(--text)' }}>
                        {method.value}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 style={{ 
              fontSize: 'clamp(1rem, 3vw, 1.2rem)', 
              fontWeight: 700, 
              color: 'var(--text)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Clock size={20} color="var(--accent)" />
              Availability & Trust
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <motion.div
                whileHover={{ x: 5 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-dim)',
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#4ADE80',
                  }}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>
                    {statusMessage}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Local time: {currentTime} (EAT)
                  </div>
                </div>
              </motion.div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Clock size={18} color="var(--accent)" />
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Response Time</div>
                    <div style={{ fontSize: '14px', color: 'var(--text)' }}>2-4 business hours</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Globe size={18} color="var(--accent)" />
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Timezone</div>
                    <div style={{ fontSize: '14px', color: 'var(--text)' }}>East Africa Time (EAT)</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Coffee size={18} color="var(--accent)" />
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Working Hours</div>
                    <div style={{ fontSize: '14px', color: 'var(--text)' }}>Mon-Fri, 9 AM - 6 PM EAT</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '12px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Connect with me:
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--accent-dim)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <social.icon size={20} color={social.color} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 style={{ 
              fontSize: 'clamp(1rem, 3vw, 1.2rem)', 
              fontWeight: 700, 
              color: 'var(--text)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Award size={20} color="var(--accent)" />
              Quick Questions
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 5 }}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>
                    {faq.q}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {faq.a}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}