import { Link } from 'react-router-dom'
import { useData } from '../data/store'

export default function Footer() {
  const s = useData('settings')
  const socials = [['Instagram', 'IG', s.instagram], ['Pinterest', 'PI', s.pinterest], ['TikTok', 'TT', s.tiktok]]
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-mark">Melanda Alcius</div>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/bio">Bio</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="social-row">
            {socials.map(([name, short, url]) => (
              url
                ? <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={name}>{short}</a>
                : <span key={name} className="social-off" aria-hidden="true">{short}</span>
            ))}
          </div>
        </div>
        <p className="footer-fine">&copy; 2026 Melanda Alcius Fashion Design Studio. All rights reserved. · <Link to="/admin">Admin</Link></p>
      </div>
    </footer>
  )
}
