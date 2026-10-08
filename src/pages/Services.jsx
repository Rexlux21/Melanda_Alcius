import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import ServiceRow from '../components/ServiceRow'
import Reveal from '../components/Reveal'
import { useData } from '../data/store'
import { formatPrice } from '../data/content'

export default function Services() {
  const services = useData('services')
  const repairs = useData('repairs')
  const { hash } = useLocation()
  useEffect(() => {
    if (hash) setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 500)
  }, [hash])
  return (
    <>
      <div className="page-hero"><div className="container">
        <span className="section-label">Services &amp; Prices</span>
        <h1>Clear prices, no surprises.</h1>
        <p>Custom design and styling, plus a full repair and alterations menu. Final quotes are confirmed before any work begins.</p>
      </div></div>
      <section>
        <div className="container">
          <div className="section-head"><Reveal><span className="section-label">Design &amp; styling</span><h2>Services</h2></Reveal></div>
          <div className="service-list">{services.map((s, i) => <ServiceRow key={s.name + i} service={s} index={i} />)}</div>
        </div>
      </section>
      <section className="section-alt" id="repairs">
        <div className="container">
          <div className="section-head"><Reveal><span className="section-label">Repairs &amp; alterations</span><h2>Repair price list</h2></Reveal></div>
          <div className="repair-list">
            {repairs.map((r, i) => (
              <Reveal key={r.item + i} delay={(i % 5) * 0.05} y={16}>
                <motion.div className="repair-row" whileHover={{ x: 8 }}>
                  <span className="repair-item">{r.item}</span>
                  <span className="repair-price">{formatPrice(r.price)}</span>
                  {r.note && <span className="repair-note">{r.note}</span>}
                </motion.div>
              </Reveal>
            ))}
          </div>
          <Reveal><p className="callout">Typical turnaround is 48–72 hours. Rush service (24 hours) is available for an additional 50%. Prices are starting points — exact quotes are given after seeing the garment.</p></Reveal>
        </div>
      </section>
      <section>
        <Reveal className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', maxWidth: '20ch', margin: '0 auto 1.6rem' }}>Ready to get started?</h2>
          <Link to="/contact" className="btn btn-primary">Request a quote</Link>
        </Reveal>
      </section>
    </>
  )
}
