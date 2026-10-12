// Renders a string with **bold** spans and [label](https://url) links. Kept
// intentionally tiny: content lives in src/data and only needs these two.

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g

export default function RichText({ text }) {
  return String(text)
    .split(TOKEN)
    .map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
      const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/)
      if (link) {
        return (
          <a key={i} className="link" href={link[2]} target="_blank" rel="noopener noreferrer">
            {link[1]}
          </a>
        )
      }
      return part
    })
}
