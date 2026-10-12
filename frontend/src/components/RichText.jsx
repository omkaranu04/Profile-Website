// Renders a string with **bold** spans. Kept intentionally tiny: content lives
// in src/data and only ever needs emphasis.

export default function RichText({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part
  )
}
