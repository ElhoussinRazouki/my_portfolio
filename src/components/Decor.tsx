import type { CSSProperties, ReactNode } from 'react'

type TapeColor = 'blue' | 'yellow' | 'white' | 'clear'

/** A strip of washi tape. Position it with `style` (top/left/right + rotate). */
export function Tape({ color = 'clear', style }: { color?: TapeColor; style?: CSSProperties }) {
  return <span aria-hidden="true" className={`tape tape--${color}`} style={style} />
}

/** Image if `src` is set, otherwise a striped placeholder showing `label`. */
export function ImageSlot({
  src,
  label,
  tone = 'light',
  className = '',
}: {
  src?: string
  label: string
  tone?: 'light' | 'dark' | 'mint'
  className?: string
}) {
  if (src) return <img className={`image-slot ${className}`} src={src} alt={label} loading="lazy" />
  return (
    <div className={`image-slot image-slot--${tone} ${className}`} role="img" aria-label={`${label} (placeholder)`}>
      <span className="mono">[{label}]</span>
    </div>
  )
}

/** Handwritten kicker + boxed title, used to open most sections. */
export function SectionHeading({ kicker, title, id }: { kicker: string; title: string; id?: string }) {
  return (
    <div className="section-heading">
      <p className="hand section-heading__kicker">{kicker}</p>
      <h2 className="boxed-title" id={id}>
        {title}
      </h2>
    </div>
  )
}

export function Polaroid({
  src,
  label,
  caption,
  tone,
  className = '',
  children,
}: {
  src?: string
  label: string
  caption: string
  tone?: 'light' | 'dark'
  className?: string
  children?: ReactNode
}) {
  return (
    <figure className={`polaroid ${className}`}>
      <Tape color="blue" style={{ left: -10, top: -8, transform: 'rotate(-32deg)' }} />
      <Tape color="yellow" style={{ right: -10, top: -6, transform: 'rotate(30deg)' }} />
      <ImageSlot src={src} label={label} tone={tone} className="polaroid__img" />
      <figcaption className="hand polaroid__caption">{caption}</figcaption>
      {children}
    </figure>
  )
}
