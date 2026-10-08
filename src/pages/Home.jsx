import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Ticker from '../components/Ticker'
import ServiceRow from '../components/ServiceRow'
import PortfolioCard from '../components/PortfolioCard'
import Reveal from '../components/Reveal'
import Roll from '../components/Roll'
import { CountUp, Headline, Magnetic } from '../components/Fx'
import { useData } from '../data/store'
import { formatPrice } from '../data/content'
import heroImg from '../assets/hero.jpg'

const STEPS = [
  ['i.', 'Consultation', 'We talk through your goals, budget, and timeline — in person or by video.'],
  ['ii.', 'Design & sourcing', 'Sketches, fabric selection, and a fixed quote before any cutting begins.'],
  ['iii.', 'Fittings', 'One or more fittings to refine fit, movement, and finish.'],
  ['iv.', 'Delivery', 'Final pressing, garment care notes, and handoff.'],
]
const MARQUEE = ['Custom design', 'Tailoring', 'Styling', 'Repairs', 'Bridal', 'Editorial']

export default function Home() {
  const services = useData('services')
  const repairs = useData('repairs')
  const portfolio = useData('portfolio')
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])

  return (
    <>
      <section className="hero" ref={heroRef}>
        <div className="hero-orb" aria-hidden="true" />
        <motion.div className="hero-copy" style={{ y: copyY }}>
          <motion.span className="hero-eyebrow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            Class of 2026 <em>&nbsp;·&nbsp; Now booking clients</em>
          </motion.span>
          <h1>
            <Headline words={[{ t: 'Fashion' }, { t: 'is' }, { br: true }, { t: 'the', em: true }, { t: 'body,', em: true }, { t: 'spoken.' }]} />
          </h1>
          <motion.p className="hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}>
            Melanda Alcius designs, tailors, repairs, and styles garments that move the way people do — from first sketch to final fitting.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}>
            <Magnetic><Link to="/contact" className="btn btn-primary roll-host"><Roll>Book a consultation</Roll><span className="btn-arrow">→</span></Link></Magnetic>
            <Magnetic><Link to="/portfolio" className="btn btn-ghost roll-host"><Roll>View portfolio</Roll><span className="btn-arrow">→</span></Link></Magnetic>
          </motion.div>
          <span className="scroll-cue"><i /> SCROLL</span>
        </motion.div>
        <div className="hero-media">
          <motion.img src={heroImg} alt="Melanda Alcius on the runway in a mauve velvet gown with a flowing rose silk wrap, gold heels, mid-turn."
            style={{ y: imgY }} initial={{ scale: 1.25, opacity: 0 }} animate={{ scale: 1.08, opacity: 1 }} transition={{ duration: 1.8, ease: [0.22, 0.61, 0.36, 1] }} />
          <span className="hero-caption">Runway presentation, graduate collection</span>
        </div>
      </section>

      <Ticker />

      <div className="big-marquee" aria-hidden="true">
        <div className="big-marquee-track">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => <span key={i}>{w} ✦</span>)}
        </div>
      </div>

      <section>
        <div className="container split">
          <Reveal className="split-media">
            <motion.div className="split-media-frame" initial={{ clipPath: 'inset(0 0 100% 0)' }} whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}>
              <img src={heroImg} alt="Melanda Alcius mid-gesture on the runway." />
            </motion.div>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="section-label">The designer</span>
            <h2>Trained on paper, finished on the runway.</h2>
            <p>Melanda Alcius just graduated with a degree in fashion design, and is now taking on private clients — from custom garments to full wardrobe consulting. Every project starts the same way: understanding how you actually want to move through your life, then building toward that.</p>
            <Link to="/bio" className="btn btn-dark" style={{ marginTop: '1rem' }}>Read her full bio</Link>
          </Reveal>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <div className="facts">
            <Reveal className="fact"><div className="fact-num"><CountUp to={2026} /></div><div className="fact-label">Graduating class</div></Reveal>
            <Reveal className="fact" delay={0.1}><div className="fact-num"><CountUp to={services.length} /></div><div className="fact-label">Core services offered</div></Reveal>
            <Reveal className="fact" delay={0.2}><div className="fact-num">1:1</div><div className="fact-label">Every client, personally fitted</div></Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <Reveal><span className="section-label">Portfolio</span><h2>Selected work</h2></Reveal>
            <Link to="/portfolio" className="btn btn-ghost">See all work</Link>
          </div>
          <div className="pgrid">
            {portfolio.slice(0, 3).map((p) => <PortfolioCard key={p.id} item={p} />)}
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <div className="section-head">
            <Reveal><span className="section-label">Services</span><h2>What she offers</h2></Reveal>
            <Link to="/services" className="btn btn-dark">Full price list</Link>
          </div>
          <div className="service-list light">
            {services.slice(0, 3).map((s, i) => <ServiceRow key={s.name} service={s} index={i} />)}
          </div>
        </div>
      </section>

      <section>
        <div className="container split reverse">
          <Reveal>
            <span className="section-label">Repairs &amp; alterations</span>
            <h2>Keep what you love, wearing right.</h2>
            <p>Hems, zippers, resizing and mends — fast turnaround, priced upfront.</p>
            <Link to="/services#repairs" className="btn btn-ghost">All repair prices</Link>
          </Reveal>
          <div className="split-media">
            {repairs.slice(0, 4).map((r, i) => (
              <Reveal key={r.item} delay={i * 0.08}>
                <div className="repair-row dark"><span className="repair-item">{r.item}</span><span className="repair-price" style={{ color: 'var(--gold)' }}>{formatPrice(r.price)}</span></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-plum">
        <Reveal className="container pull-quote">
          <blockquote>&ldquo;Clothes mean nothing until someone lives in them.&rdquo;</blockquote>
          <cite>Marc Jacobs</cite>
        </Reveal>
      </section>

      <section className="section-alt">
        <div className="container">
          <div className="section-head"><Reveal><span className="section-label">How it works</span><h2>From first sketch to final fitting</h2></Reveal></div>
          <div className="process">
            <motion.div className="process-line" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.22, 0.61, 0.36, 1] }} />
            {STEPS.map(([num, title, text], i) => (
              <Reveal key={num} className="process-step" delay={i * 0.12}>
                <span className="step-num">{num}</span><h3>{title}</h3><p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <Reveal className="container" style={{ textAlign: 'center' }}>
          <span className="section-label" style={{ display: 'block' }}>Let's work together</span>
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', maxWidth: '20ch', margin: '0 auto 1.6rem' }}>Have a piece in mind? Let's build it.</h2>
          <Magnetic><Link to="/contact" className="btn btn-primary">Get in touch</Link></Magnetic>
        </Reveal>
      </section>
    </>
  )
}
