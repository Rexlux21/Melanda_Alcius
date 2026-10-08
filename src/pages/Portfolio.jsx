import { useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import PortfolioCard from '../components/PortfolioCard'
import { imageSrc } from '../data/images'
import { useData } from '../data/store'

export default function Portfolio() {
  const items = useData('portfolio')
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(null)
  const cats = ['All', ...new Set(items.map((i) => i.category).filter(Boolean))]
  const shown = filter === 'All' ? items : items.filter((i) => i.category === filter)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const src = open && imageSrc(open)
  return (
    <>
      <div className="page-hero"><div className="container">
        <span className="section-label">Portfolio</span>
        <h1>Work, cut and sewn.</h1>
        <p>Runway pieces, custom commissions, bridal studies and editorial styling.</p>
      </div></div>
      <section>
        <div className="container">
          <LayoutGroup>
            <div className="chips">
              {cats.map((c) => (
                <button key={c} className={`chip${filter === c ? ' is-active' : ''}`} onClick={() => setFilter(c)}>
                  {filter === c && <motion.span layoutId="chip-bg" className="chip-bg" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  {c}
                </button>
              ))}
            </div>
            <motion.div layout className="pgrid">
              <AnimatePresence mode="popLayout">
                {shown.map((p) => <PortfolioCard key={p.id} item={p} onOpen={setOpen} />)}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>
      </section>
      <AnimatePresence>
        {open && (
          <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={open.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div className="lightbox-card" initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} transition={{ type: 'spring', stiffness: 260, damping: 26 }} onClick={(e) => e.stopPropagation()}>
              {src ? <img src={src} alt={open.title} /> : <div className={`pcard-placeholder tone-${open.tone ?? 0}`}><span>{open.title.slice(0, 1)}</span></div>}
              <div className="lightbox-text">
                <button className="lightbox-close" aria-label="Close" onClick={() => setOpen(null)}>✕</button>
                <span className="section-label">{open.category}</span>
                <h3>{open.title}</h3>
                <p>{open.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
