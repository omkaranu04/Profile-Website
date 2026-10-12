import { useEffect, useMemo, useRef, useState } from 'react'
import Icon from './Icon'
import { sections } from '../data/sections'
import { profile, socials } from '../data/profile'
import { projects } from '../data/projects'
import './CommandPalette.css'

function buildCommands({ onToggleTheme, theme, copyEmail }) {
  const go = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const open = (url) => () => window.open(url, '_blank', 'noopener,noreferrer')

  return [
    ...sections.map((s) => ({
      id: `go-${s.id}`, group: 'Navigate', label: s.title ?? s.label, hint: s.number, icon: 'hash', run: go(s.id)
    })),
    ...projects.map((p) => ({
      id: `p-${p.id}`, group: 'Projects', label: p.title, hint: p.context, icon: 'code',
      run: p.github ? open(p.github) : go('projects')
    })),
    ...(profile.resume
      ? [{ id: 'resume', group: 'Links', label: 'Open résumé', icon: 'file', run: open(profile.resume) }]
      : []),
    ...socials.map((s) => ({
      id: `s-${s.id}`, group: 'Links', label: s.label, hint: s.handle, icon: s.id, run: open(s.url)
    })),
    { id: 'email', group: 'Actions', label: 'Copy email address', hint: profile.email, icon: 'copy', run: copyEmail },
    {
      id: 'theme', group: 'Actions', label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
      icon: theme === 'dark' ? 'sun' : 'moon', run: onToggleTheme
    },
    {
      id: 'source', group: 'Actions', label: 'View this site’s source', icon: 'github',
      run: open('https://github.com/omkaranu04/Profile-Website')
    }
  ]
}

function matches(cmd, q) {
  if (!q) return true
  const hay = `${cmd.label} ${cmd.hint ?? ''} ${cmd.group}`.toLowerCase()
  return q.toLowerCase().split(/\s+/).every((t) => hay.includes(t))
}

export default function CommandPalette({ open, onClose, theme, onToggleTheme, onToast }) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const commands = useMemo(
    () =>
      buildCommands({
        theme,
        onToggleTheme,
        copyEmail: () => {
          navigator.clipboard?.writeText(profile.email).then(
            () => onToast('Email copied to clipboard'),
            () => onToast(profile.email)
          )
        }
      }),
    [theme, onToggleTheme, onToast]
  )

  const results = useMemo(() => commands.filter((c) => matches(c, query.trim())), [commands, query])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setIndex(0)
    const prev = document.activeElement
    const t = setTimeout(() => inputRef.current?.focus(), 10)
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
      prev?.focus?.()
    }
  }, [open])

  useEffect(() => setIndex(0), [query])

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [index])

  if (!open) return null

  const run = (cmd) => {
    onClose()
    // Let the dialog unmount (and body scroll unlock) before scrolling.
    setTimeout(() => cmd.run(), 30)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[index]) run(results[index])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'Tab') {
      e.preventDefault() // keep focus in the dialog
    }
  }

  let lastGroup = null

  return (
    <div className="kbar" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="kbar__panel" role="dialog" aria-modal="true" aria-label="Command menu" onKeyDown={onKeyDown}>
        <div className="kbar__search">
          <Icon name="search" size={18} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a section, project or link…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="kbar-list"
            aria-activedescendant={results[index] ? `kbar-${results[index].id}` : undefined}
            autoComplete="off"
            spellCheck="false"
          />
          <kbd>Esc</kbd>
        </div>

        <ul className="kbar__list" id="kbar-list" role="listbox" ref={listRef}>
          {results.length === 0 ? <li className="kbar__empty">No results for “{query}”</li> : null}
          {results.map((cmd, i) => {
            const header = cmd.group !== lastGroup ? cmd.group : null
            lastGroup = cmd.group
            return (
              <li key={cmd.id} role="presentation">
                {header ? <div className="kbar__group mono" role="presentation">{header}</div> : null}
                <div
                  id={`kbar-${cmd.id}`}
                  role="option"
                  aria-selected={i === index}
                  className="kbar__item"
                  onMouseMove={() => i !== index && setIndex(i)}
                  onClick={() => run(cmd)}
                >
                  <span className="kbar__icon"><Icon name={cmd.icon} size={16} /></span>
                  <span className="kbar__label">{cmd.label}</span>
                  {cmd.hint ? <span className="kbar__hint">{cmd.hint}</span> : null}
                  <Icon name="arrowRight" size={14} className="kbar__enter" />
                </div>
              </li>
            )
          })}
        </ul>

        <div className="kbar__foot mono">
          <span><kbd>↑</kbd> <kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>Esc</kbd> close</span>
        </div>
      </div>
    </div>
  )
}
