import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'motion/react'
import Roll from './Roll'

const LINKS = [
  ['Home', '/'],
  ['Portfolio', '/portfolio'],
  ['Bio', '/bio'],
  ['Services & Prices', '/services'],
  ['Contact', '/contact'],
  ['Admin', '/admin'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <nav className="nav">
        <Link to="/" className="nav-mark">Melanda Alcius<span>FASHION DESIGN STUDIO</span></Link>
        <button className="nav-toggle" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen(!open)}><span></span></button>
        <ul className={`nav-links${open ? ' is-open' : ''}`}>
          {LINKS.map(([label, to]) => (
            <li key={to} className={to === '/admin' ? 'nav-admin' : undefined}>
              <NavLink to={to} end={to === '/'} className="roll-host" onClick={() => setOpen(false)}>
                {({ isActive }) => (
                  <>
                    <Roll>{label}</Roll>
                    {isActive && <motion.i layoutId="nav-dot" className="nav-dot" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
