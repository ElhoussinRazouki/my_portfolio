'use client'

import { getImageProps } from 'next/image'
import type { CSSProperties } from 'react'
import { preload } from 'react-dom'
import type { Project } from '../data/content'
import { IMAGE_QUALITY, ImageSlot } from './Decor'
import { ArrowUpRightIcon, ExpandIcon } from './Icons'
import { TapedSheet } from './TapedSheet'

/** Invisible button laid over a project's media; opens the enlarged preview. */
export function PreviewTrigger({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button type="button" className="media-zoom" aria-haspopup="dialog" aria-label={`Enlarge ${project.name} preview`} onClick={onOpen}>
      <span className="media-zoom__hint mono" aria-hidden="true">
        <ExpandIcon size={12} /> Preview
      </span>
    </button>
  )
}

/** Rendered width of the enlarged media (see .sheet-dialog--browser and .preview-phones in global.css). */
const previewSizes = {
  browser: '(max-width: 1120px) 100vw, 1120px',
  phones: '(max-width: 600px) 50vw, 300px',
}

/** Fetches the enlarged images ahead of time, so the sheet never lands with an empty frame. */
export function preloadPreview({ media }: Project) {
  for (const src of media.images ?? []) {
    if (typeof src === 'string') continue
    const { props } = getImageProps({ src, alt: '', sizes: previewSizes[media.kind], quality: IMAGE_QUALITY })
    preload(props.src, { as: 'image', imageSrcSet: props.srcSet, imageSizes: props.sizes, fetchPriority: 'low' })
  }
}

/** The project's browser window or phones, pinned large on a taped sheet. */
export function ProjectPreview({ project, open, onClose }: { project: Project; open: boolean; onClose: () => void }) {
  const { media, theme } = project
  const light = theme === 'mint' || theme === 'yellow'

  return (
    <TapedSheet
      openKey={open ? project.id : null}
      kicker={project.meta}
      title={project.name}
      closeLabel={`Close ${project.name} preview`}
      onClose={onClose}
      className={`sheet-dialog--${media.kind}`}
      actions={
        project.href && (
          <a className="pill-btn pill-btn--yellow mono" href={project.href} target="_blank" rel="noreferrer">
            View project <ArrowUpRightIcon size={12} />
          </a>
        )
      }
    >
      {media.kind === 'browser' ? (
        <div className={`browser${light ? ' browser--light' : ''}`}>
          <div className="browser__bar" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <ImageSlot
            src={media.images?.[0]}
            label={media.labels[0]}
            tone={light ? 'mint' : 'dark'}
            sizes={previewSizes.browser}
            className="browser__screen"
          />
        </div>
      ) : (
        <div className="preview-phones" style={{ '--count': media.labels.length } as CSSProperties}>
          {media.labels.map((label, i) => (
            <div key={label} className="phone">
              <ImageSlot src={media.images?.[i]} label={label} tone="dark" sizes={previewSizes.phones} className="phone__screen" />
              <span className="phone__island" aria-hidden="true" />
            </div>
          ))}
        </div>
      )}
    </TapedSheet>
  )
}
