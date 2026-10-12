import { useEffect, useState } from 'react'

// Returns the id of the section currently under the header line.
export default function useScrollSpy(ids, offset = 120) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      let current = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id
      }
      // At the very bottom, the last section wins even if it is short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1]
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ids, offset])

  return active
}
