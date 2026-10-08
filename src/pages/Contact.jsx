import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Reveal from '../components/Reveal'
import { useData, write } from '../data/store'

const EMPTY = { name: '', email: '', phone: '', service: '', budget: '', message: '' }

export default function Contact() {
  const services = useData('services')
  const messages = useData('messages')
  const s = useData('settings')
  const [form, setForm] = useState(EMPTY)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    const msg = { id: Date.now(), date: new Date().toISOString(), ...form, read: false }
    write('messages', [msg, ...messages])
    if (s.formEndpoint) {
      try {
        const res = await fetch(s.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(form) })
        if (!res.ok) throw new Error()
      } catch {
        setError('We saved your message, but the email service could not be reached. Please also email us directly.')
      }
    }
    setSent(true)
    setForm(EMPTY)
  }

  return (
    <>
      <div className="page-hero"><div className="container">
        <span className="section-label">Contact</span>
        <h1>Let's talk about your piece.</h1>
        <p>Tell Melanda what you have in mind — a custom design, a repair, or styling help — and she'll reply with next steps.</p>
      </div></div>
      <section>
        <div className="container contact-grid">
          <Reveal className="contact-info">
            <dl>
              {s.email && <><dt>EMAIL</dt><dd><a href={`mailto:${s.email}`}>{s.email}</a></dd></>}
              {s.phone && <><dt>PHONE</dt><dd><a href={`tel:${s.phone}`}>{s.phone}</a></dd></>}
              {s.location && <><dt>STUDIO</dt><dd>{s.location}</dd></>}
              {s.hours && <><dt>HOURS</dt><dd>{s.hours}</dd></>}
            </dl>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="form">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="ok" className="contact-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <svg className="check" viewBox="0 0 52 52" fill="none" stroke="#b65b6c" strokeWidth="3"><circle cx="26" cy="26" r="23" /><motion.path d="M15 27l8 8 14-17" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.2 }} /></svg>
                    <h3>Thank you — message received.</h3>
                    <p style={{ margin: '0.5rem auto 1rem' }}>Melanda will be in touch soon.</p>
                    {error && <p className="form-status err">{error}</p>}
                    <button className="btn btn-dark" onClick={() => setSent(false)}>Send another</button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="form-two">
                      <div className="form-row"><label htmlFor="name">NAME</label><input id="name" required value={form.name} onChange={set('name')} /></div>
                      <div className="form-row"><label htmlFor="email">EMAIL</label><input id="email" type="email" required value={form.email} onChange={set('email')} /></div>
                    </div>
                    <div className="form-two">
                      <div className="form-row"><label htmlFor="phone">PHONE (OPTIONAL)</label><input id="phone" type="tel" value={form.phone} onChange={set('phone')} /></div>
                      <div className="form-row"><label htmlFor="service">I'M INTERESTED IN</label>
                        <select id="service" value={form.service} onChange={set('service')}>
                          <option value="">Choose…</option>
                          {services.map((x) => <option key={x.name}>{x.name}</option>)}
                          <option>Repair / alteration</option><option>Something else</option>
                        </select></div>
                    </div>
                    <div className="form-row"><label htmlFor="budget">BUDGET (OPTIONAL)</label><input id="budget" value={form.budget} onChange={set('budget')} /></div>
                    <div className="form-row"><label htmlFor="message">MESSAGE</label><textarea id="message" required value={form.message} onChange={set('message')} /></div>
                    <motion.button whileTap={{ scale: 0.97 }} className="btn btn-primary" type="submit">Send message</motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
