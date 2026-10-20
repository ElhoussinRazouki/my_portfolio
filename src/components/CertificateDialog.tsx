'use client'

import { DownloadIcon } from './Icons'
import { TapedSheet } from './TapedSheet'

export interface Certificate {
  name: string
  image: string
  pdf: string
}

/** A certificate laid on the page like a taped-down sheet of paper. */
export function CertificateDialog({
  cert,
  issuer,
  onClose,
}: {
  cert: Certificate | null
  issuer: string
  onClose: () => void
}) {
  return (
    <TapedSheet
      openKey={cert?.pdf ?? null}
      kicker={issuer}
      title={cert?.name ?? ''}
      closeLabel="Close certificate"
      onClose={onClose}
      className="sheet-dialog--cert"
      actions={
        cert && (
          <a className="pill-btn pill-btn--yellow mono" href={cert.pdf} download>
            <DownloadIcon size={14} /> Download PDF
          </a>
        )
      }
    >
      {cert && <img className="sheet-dialog__img" src={cert.image} alt={`${cert.name} certificate from ${issuer}`} />}
    </TapedSheet>
  )
}
