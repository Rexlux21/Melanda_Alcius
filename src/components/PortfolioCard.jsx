import { motion } from 'motion/react'
import { Tilt } from './Fx'
import { imageSrc } from '../data/images'

export default function PortfolioCard({ item, onOpen }) {
  const src = imageSrc(item)
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}>
      <Tilt className="pcard-tilt">
        <button className={`pcard tone-${item.tone ?? 0}`} onClick={() => onOpen?.(item)} aria-label={`View ${item.title}`}>
          {src
            ? <img src={src} alt={item.title} loading="lazy" />
            : <span className="pcard-placeholder" aria-hidden="true"><span>{item.title.slice(0, 1)}</span></span>}
          <span className="pcard-cap">
            <small>{item.category}</small>
            <strong>{item.title}</strong>
          </span>
        </button>
      </Tilt>
    </motion.div>
  )
}
