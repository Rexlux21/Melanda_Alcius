import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Reveal from '../components/Reveal'
import { useData } from '../data/store'
import heroImg from '../assets/hero.jpg'

export default function Bio() {
  const { bio } = useData('settings')
  const paras = bio.split(/\n\s*\n/).filter(Boolean)
  return (
    <>
      <div className="page-hero"><div className="container">
        <span className="section-label">Bio</span>
        <h1>The designer behind the work.</h1>
      </div></div>
      <section>
        <div className="container split">
          <Reveal className="split-media">
            <motion.div className="split-media-frame" initial={{ clipPath: 'inset(0 0 100% 0)' }} whileInView={{ clipPath: 'inset(0 0 0% 0)' }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}>
              <img src={heroImg} alt="Melanda Alcius on the runway." />
            </motion.div>
          </Reveal>
          <div className="bio-text">
            {paras.map((p, i) => <Reveal key={i} delay={i * 0.1}><p>{p}</p></Reveal>)}
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1rem' }}>Work with Melanda</Link>
          </div>
        </div>
      </section>
    </>
  )
}
