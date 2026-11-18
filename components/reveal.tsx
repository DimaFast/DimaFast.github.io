'use client'

import { useRef, type PropsWithChildren } from 'react'
import { useInView } from 'motion/react'

export function Reveal({ children, className }: PropsWithChildren<{ className?: string }>) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { once: true, margin: '0px 0px -32px 0px' })

  return (
    <div ref={ref} className={className} data-revealed={visible || undefined}>
      {children}
    </div>
  )
}
