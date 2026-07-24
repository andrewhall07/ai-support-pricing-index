import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface CountUpProps {
  value: string
  className?: string
}

/** Animates pure numeric prefixes; leaves units/suffixes intact */
export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  const reduce = useReducedMotion()
  const match = value.match(/^(\$?)([\d.]+)(.*)$/)
  const prefix = match?.[1] ?? ''
  const num = match ? Number(match[2]) : NaN
  const suffix = match?.[3] ?? value
  const [display, setDisplay] = useState(reduce || Number.isNaN(num) ? value : `${prefix}0${suffix}`)

  useEffect(() => {
    if (!inView || reduce || Number.isNaN(num)) {
      setDisplay(value)
      return
    }
    const duration = 900
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = num * eased
      const decimals = String(match?.[2] ?? '').includes('.') ? 2 : 0
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`)
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, num, prefix, reduce, suffix, value, match])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
