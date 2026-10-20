'use client'

import { AnimatePresence, motion, type Transition } from 'motion/react'
import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { PEEL_DURATION, Tape } from './Decor'
import { CloseIcon } from './Icons'
import { useLenis } from './MotionProvider'
import { ease } from './motion'

/**
 * Opening: the sheet is set down onto the page. It starts held just above the surface (slightly
 * larger, wide soft shadow) and lowers into place in one smooth ease-out; the tape goes on once
 * it has landed.
 */
const PLACE = 0.6
const HELD_SHADOW = '0 60px 90px rgba(0, 0, 0, 0.16)'
const RESTING_SHADOW = '0 24px 60px rgba(0, 0, 0, 0.3)'

/**
 * Closing: the tape comes off in reverse order. The right strip (stuck last) peels first and the sheet
 * starts swinging down from the left strip still holding it. The swing keeps accelerating, without
 * a pause, while the left strip peels; the moment that strip lets go the sheet drops, still turning.
 */
const RIGHT_PEEL_AT = 0
const LEFT_PEEL_AT = 0.2
const SWING_AT = RIGHT_PEEL_AT + PEEL_DURATION * 0.75
const DROP_AT = LEFT_PEEL_AT + PEEL_DURATION * 0.75
const FALL = 0.5
const CLOSE = DROP_AT + FALL
const gravity: [number, number, number, number] = [0.45, 0, 0.8, 0.3]
/** One unbroken swing from the moment the first strip releases until the sheet is gone. */
const swing: Transition = {
  duration: CLOSE,
  times: [0, SWING_AT / CLOSE, 1],
  ease: ['linear', [0.3, 0, 0.75, 0.55]],
}
const drop: Transition = {
  duration: CLOSE,
  times: [0, DROP_AT / CLOSE, 1],
  ease: ['linear', gravity],
}

/** The left strip sits 32px in and is 84px wide; the sheet hangs from its middle. */
const LEFT_TAPE = { left: 32, width: 84 }
const PIVOT = `${LEFT_TAPE.left + LEFT_TAPE.width / 2}px 0px`

interface SheetProps {
  /** Handwritten line above the title */
  kicker: string
  title: string
  /** Buttons/links shown beside the close button */
  actions?: ReactNode
  closeLabel: string
  onClose: () => void
  /** Modifier class for the sheet, e.g. to size it for its content */
  className?: string
  /** What is pinned to the sheet */
  children: ReactNode
}

/**
 * A modal laid on the page like a sheet of paper held by two strips of tape.
 * Pass a `openKey` to show it (null hides it); changing the key swaps the sheet.
 */
export function TapedSheet({ openKey, ...props }: SheetProps & { openKey: string | null }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return createPortal(<AnimatePresence>{openKey && <Sheet key={openKey} {...props} />}</AnimatePresence>, document.body)
}

function Sheet({ kicker, title, actions, closeLabel, onClose, className = '', children }: SheetProps) {
  const lenis = useLenis()
  const titleId = useId()
  const sheetRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Freeze the page behind the dialog, focus it, and hand focus back to the trigger on close.
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null
    const html = document.documentElement
    const overflow = html.style.overflow
    lenis?.stop()
    html.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      lenis?.start()
      html.style.overflow = overflow
      trigger?.focus({ preventScroll: true })
    }
  }, [lenis])

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
      return
    }
    if (e.key !== 'Tab' || !sheetRef.current) return
    const focusable = sheetRef.current.querySelectorAll<HTMLElement>('a[href], button')
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <motion.div
      className="sheet-overlay"
      data-lenis-prevent
      onClick={onClose}
      onKeyDown={onKeyDown}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3, delay: CLOSE - 0.3 } }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        ref={sheetRef}
        className={`sheet-dialog ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        style={{ transformOrigin: PIVOT }}
        exit={{
          rotate: [0, 0, 16],
          y: [0, 0, window.innerHeight * 0.85],
          opacity: [1, 1, 0],
          transition: {
            rotate: swing,
            y: drop,
            opacity: { duration: CLOSE, times: [0, (DROP_AT + FALL * 0.55) / CLOSE, 1] },
          },
        }}
      >
        {/* Inner layer: set down from its centre. The outer layer swings from the tape on close. */}
        <motion.div
          className="sheet-dialog__paper"
          initial={{ opacity: 0, y: -14, rotate: -1.2, scale: 1.05, boxShadow: HELD_SHADOW }}
          animate={{
            opacity: 1,
            y: 0,
            rotate: 0,
            scale: 1,
            boxShadow: RESTING_SHADOW,
            transition: { duration: PLACE, ease, opacity: { duration: 0.2 } },
          }}
        >
          <Tape color="blue" rotate={-6} delay={PLACE * 0.75} peel={-1} peelDelay={LEFT_PEEL_AT} style={{ ...LEFT_TAPE, top: -10 }} />
          <Tape color="yellow" rotate={5} delay={PLACE * 0.75 + 0.12} peel={1} peelDelay={RIGHT_PEEL_AT} style={{ right: 32, top: -10, width: 84 }} />

          <div className="sheet-dialog__frame">{children}</div>

          <div className="sheet-dialog__footer">
            <div>
              <p className="hand sheet-dialog__kicker">{kicker}</p>
              <h3 className="sheet-dialog__title" id={titleId}>
                {title}
              </h3>
            </div>
            <div className="sheet-dialog__actions">
              {actions}
              <button ref={closeRef} type="button" className="sheet-dialog__close" onClick={onClose} aria-label={closeLabel}>
                <CloseIcon size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
