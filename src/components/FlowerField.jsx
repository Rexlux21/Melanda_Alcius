import { motion, useScroll, useTransform } from 'motion/react'
import Hibiscus from './Hibiscus'

const FLOWERS = [
  { top: '6%', left: '-8%', size: 460, rot: 12, depth: 120, color: 'var(--rose)' },
  { top: '38%', right: '-10%', size: 520, rot: -20, depth: -160, color: 'var(--gold)' },
  { top: '72%', left: '-6%', size: 380, rot: 30, depth: 90, color: 'var(--rose-soft)' },
]

/** Tiled hibiscus wallpaper (CSS) plus a few large flowers that sway and drift with scroll. */
export default function FlowerField() {
  const { scrollYProgress } = useScroll()
  const y0 = useTransform(scrollYProgress, [0, 1], [0, FLOWERS[0].depth])
  const y1 = useTransform(scrollYProgress, [0, 1], [0, FLOWERS[1].depth])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, FLOWERS[2].depth])
  const ys = [y0, y1, y2]
  return (
    <div className="flower-field" aria-hidden="true">
      <div className="flower-tiles" />
      {FLOWERS.map((f, i) => (
        <motion.div key={i} className="flower-big" style={{ top: f.top, left: f.left, right: f.right, width: f.size, height: f.size, y: ys[i], color: f.color }}>
          <motion.div animate={{ rotate: [f.rot, f.rot + 14, f.rot] }} transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'easeInOut' }} style={{ width: '100%', height: '100%' }}>
            <Hibiscus />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
