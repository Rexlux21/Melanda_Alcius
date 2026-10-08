/** Line-art hibiscus — Haiti's national flower. Colors come from currentColor. */
export default function Hibiscus({ className = '', ...props }) {
  const petal = 'M0 0 C-16 -8 -24 -34 -4 -52 C4 -56 12 -54 16 -46 C26 -30 14 -8 0 0Z'
  return (
    <svg className={className} viewBox="-70 -70 140 140" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true" {...props}>
      {[0, 72, 144, 216, 288].map((r) => (
        <g key={r} transform={`rotate(${r})`}>
          <path d={petal} />
          <path d="M0 -4 C-3 -18 -2 -30 0 -42 M3 -4 C6 -16 9 -28 8 -38" opacity=".55" />
        </g>
      ))}
      <circle r="5" />
      <path d="M0 0 C2 -14 10 -24 20 -32" />
      {[[20, -32], [24, -30], [17, -36], [22, -36]].map(([x, y]) => <circle key={x + y} cx={x} cy={y} r="2" fill="currentColor" />)}
      {[0, 72, 144, 216, 288].map((r) => <line key={r} x1="0" y1="-5" x2="0" y2="-12" transform={`rotate(${r + 36})`} opacity=".7" />)}
    </svg>
  )
}
