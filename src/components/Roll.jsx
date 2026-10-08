/** Text that rolls up to reveal a duplicate on hover (parent needs the .roll-host class). */
export default function Roll({ children }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  )
}
