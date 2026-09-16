import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default function Overlay() {
  const overlayRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return

      // --- HERO ENTRANCE SEQUENCE ---
      const tl = gsap.timeline({ delay: 1.3 }) // Delay to allow 3D load and camera fade

      // Reveal words in hero
      tl.to('.hero-word-inner', {
        y: '0%',
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
      })
      
      tl.fromTo('.hero-fade-in', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out' },
        '-=0.8'
      )

      // --- SCROLL ANIMATIONS ---
      
      // Section 03 Reveal
      gsap.fromTo('.sect-03-reveal',
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: '#s03',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Section 04 Glass Panel
      gsap.fromTo('.sect-04-panel',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '#s04',
            start: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Section 05 Data Grid
      gsap.fromTo('.data-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: {
            trigger: '#s05',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, overlayRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={overlayRef} aria-label="Aetheria Quantum Core Presentation">
      
      {/* GLOBAL HEADER */}
      <header className="global-header hero-fade-in">
        <div className="brand">AETHERIA</div>
        <nav className="nav-links">
          <span>TECHNOLOGY</span>
          <span>SYSTEM</span>
          <span>ABOUT</span>
        </nav>
      </header>

      {/* SECTION 01: HERO */}
      <section className="section hero" id="s01" aria-labelledby="hero-title">
        <div className="hero-grid">
          <div className="hero-content">
            <span className="eyebrow hero-fade-in">Aetheria / Quantum Energy System</span>
            
            <h1 id="hero-title" aria-label="POWER REIMAGINED">
              <span className="hero-word"><span className="hero-word-inner">POWER</span></span><br/>
              <span className="hero-word"><span className="hero-word-inner">REIMAGINED</span></span>
            </h1>
            
            <p className="hero-fade-in">
              The Aetheria Quantum Core provides silent, infinite energy in a beautiful zero-emission reactor designed for your home.
            </p>
            
            <button className="btn hero-fade-in" aria-label="Explore the core">
              Explore The Core &rarr;
            </button>
          </div>
          {/* Right side is intentionally empty for the 3D core */}
          <div></div>
        </div>

        <div className="floating-ui ui-bottom-left tech-label hero-fade-in">01 / 06</div>
        <div className="floating-ui ui-bottom-right tech-label hero-fade-in">SYSTEM ONLINE<br/>SCROLL TO EXPLORE</div>
      </section>

      {/* SECTION 02: THE CORE (Camera close-up) */}
      <section className="section core-section" id="s02">
        <div className="core-content">
          <span className="eyebrow">MACRO VIEW</span>
          <p>Precision-milled containment rings stabilize the zero-point energy field, rendering the core cool to the touch.</p>
        </div>
        <div className="floating-ui ui-top-left tech-label">02 / 06</div>
      </section>

      {/* SECTION 03: ENGINEERED FOR TOMORROW */}
      <section className="section engineered-section" id="s03">
        <div>
          <span className="eyebrow sect-03-reveal">ARCHITECTURE</span>
          <h2 className="sect-03-reveal">ENGINEERED FOR<br/>TOMORROW</h2>
          <p className="sect-03-reveal" style={{ maxWidth: '400px', marginTop: '1rem' }}>
            A total reimagining of personal energy infrastructure. Unprecedented power density meets architectural grace.
          </p>
        </div>
        <div className="floating-ui ui-bottom-right tech-label">03 / 06</div>
      </section>

      {/* SECTION 04: HOW IT WORKS */}
      <section className="section how-it-works" id="s04">
        <div className="glass-panel sect-04-panel">
          <span className="eyebrow">MECHANICS</span>
          <h3>Zero-Point Extraction</h3>
          <p>
            By tapping into localized quantum fluctuations, the Aetheria core generates sustainable, high-yield electrical output without conventional fuel sources or thermal waste.
          </p>
        </div>
      </section>

      {/* SECTION 05: PRECISION */}
      <section className="section precision-section" id="s05">
        <div style={{ width: '100%' }}>
          <span className="eyebrow">TELEMETRY</span>
          <div className="data-grid">
            <div className="data-item">
              <span className="tech-label">CORE STABILITY</span>
              <div className="data-value">99.98%</div>
            </div>
            <div className="data-item">
              <span className="tech-label">LIFESPAN</span>
              <div className="data-value">&infin; YRS</div>
            </div>
            <div className="data-item">
              <span className="tech-label">THERMAL EMISSION</span>
              <div className="data-value">0.0&deg;C</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 06: FINAL PRODUCT MOMENT */}
      <section className="section conclusion" id="s06">
        <div>
          <span className="eyebrow">AETHERIA Q-01</span>
          <h2>READY FOR THE FUTURE?</h2>
          <button className="btn" aria-label="Reserve your Aetheria Quantum Core">
            Reserve Yours &rarr;
          </button>
        </div>
      </section>
    </main>
  )
}
