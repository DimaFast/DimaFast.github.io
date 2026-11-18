'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './contact-map.module.css'

export function ContactMap({
  embedUrl,
  directionsUrl,
}: {
  embedUrl: string
  directionsUrl: string
}) {
  const [open, setOpen] = useState(false)
  const iframe = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (open) iframe.current?.focus({ preventScroll: true })
  }, [open])

  return (
    <div className={styles.map}>
      {open ? (
        <iframe
          ref={iframe}
          src={embedUrl}
          title="Медичний центр «Вербена» на карті"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className={styles.mapActions}>
          <button type="button" className="button button-green" onClick={() => setOpen(true)}>
            Відкрити карту
          </button>
          <a href={directionsUrl}>Прокласти маршрут</a>
        </div>
      )}
    </div>
  )
}
