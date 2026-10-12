import './Section.css'

// Editorial section frame: numbered, sticky heading column + content column.
export default function Section({ id, number, title, kicker, children, wide = false }) {
  return (
    <section id={id} className={`section ${wide ? 'section--wide' : ''}`} aria-labelledby={`${id}-heading`}>
      <div className="container section__grid">
        <header className="section__head reveal">
          <div className="section__label mono">
            <span className="section__num">{number}</span>
            <span className="section__rule" aria-hidden />
          </div>
          <h2 id={`${id}-heading`} className="section__title">{title}</h2>
          {kicker ? <p className="section__kicker">{kicker}</p> : null}
        </header>
        <div className="section__body">{children}</div>
      </div>
    </section>
  )
}
