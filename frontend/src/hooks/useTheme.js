import { useCallback, useEffect, useState } from 'react'

const KEY = 'theme'

function readStored() {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

function systemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Resolved theme ('light' | 'dark'). An explicit choice is stored; otherwise
// the OS preference is followed live.
export default function useTheme() {
  const [theme, setTheme] = useState(() => readStored() ?? systemTheme())

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mq) return
    const onChange = () => {
      if (!readStored()) setTheme(mq.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0f0f0e' : '#f5f2ea')
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(KEY, next)
      } catch {
        /* storage unavailable — choice lasts for this visit only */
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
