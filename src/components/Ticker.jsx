import { useState } from 'react'
import { QUOTES } from '../data/content'

export default function Ticker() {
  const [paused, setPaused] = useState(false)
  // doubled so the 50%-translate loop is seamless
  const items = [...QUOTES, ...QUOTES]
  return (
    <div className="ticker" aria-label="Fashion quotes from designers around the world" data-paused={paused}>
      <div
        className="ticker-track"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {items.map((q, i) => (
          <span key={i} style={{ display: 'contents' }}>
            <span className="ticker-item">
              <span className="flag">{q.flag}</span>&ldquo;{q.quote}&rdquo; <b>{q.author} — {q.place}</b>
            </span>
            <span className="ticker-dot">&middot;</span>
          </span>
        ))}
      </div>
    </div>
  )
}
