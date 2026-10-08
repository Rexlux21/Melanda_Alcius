import { motion } from 'motion/react'
import Reveal from './Reveal'
import { formatPrice } from '../data/content'

export default function ServiceRow({ service, index }) {
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <motion.div className="service-row" whileHover={{ x: 10 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
        <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <h3 className="service-name">{service.name}</h3>
          <p className="service-desc">{service.desc}</p>
          <div className="service-meta">
            {service.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
        <div className="service-price">{formatPrice(service.price)}<small>{service.unit}</small></div>
      </motion.div>
    </Reveal>
  )
}
