import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring } from 'motion/react'

/** Gold progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div className="scroll-progress" style={{ scaleX }} />
}

/** Soft rose glow that trails the pointer (fine pointers only). */
export function CursorGlow() {
  const [enabled] = useState(() => window.matchMedia('(pointer: fine)').matches)
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 })
  useEffect(() => {
    if (!enabled) return
    const move = (e) => { x.set(e.clientX - 200); y.set(e.clientY - 200) }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [enabled, x, y])
  if (!enabled) return null
  return <motion.div className="cursor-glow" aria-hidden="true" style={{ x: sx, y: sy }} />
}

/** Pulls its child toward the pointer. */
export function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 15 })
  const sy = useSpring(y, { stiffness: 220, damping: 15 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  return (
    <motion.span ref={ref} className="magnetic" style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </motion.span>
  )
}

/** Counts up to `to` when scrolled into view. */
export function CountUp({ to, duration = 1.8 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!inView) return
    if (reduce) { ref.current.textContent = to; return }
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 0.61, 0.36, 1],
      onUpdate: (v) => { ref.current.textContent = Math.round(v) },
    })
    return () => controls.stop()
  }, [inView, to, duration, reduce])
  return <span ref={ref}>{to}</span>
}

/** Word-by-word masked headline reveal. words: [{t, em?} | {br:true}] */
export function Headline({ words, delay = 0.2 }) {
  let i = 0
  return (
    <>
      {words.map((w, idx) => {
        if (w.br) return <br key={idx} />
        const n = i++
        const inner = w.em ? <em>{w.t}</em> : w.t
        return (
          <span className="word" key={idx}>
            <motion.span
              className="word-inner"
              initial={{ y: '115%', rotate: 4 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ duration: 1, delay: delay + n * 0.09, ease: [0.22, 0.61, 0.36, 1] }}
            >{inner}</motion.span>
          </span>
        )
      })}
    </>
  )
}

/** 3D hover tilt wrapper. */
export function Tilt({ children, className = '', max = 8, ...rest }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 18 })
  const sry = useSpring(ry, { stiffness: 200, damping: 18 })
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2)
  }
  const onLeave = () => { rx.set(0); ry.set(0) }
  return (
    <motion.div
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >{children}</motion.div>
  )
}
