import { useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { cn } from '@/lib/utils'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
}

/** React Bits–style mouse-follow spotlight card */
export function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(52, 101, 56, 0.12)',
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn(
        'relative overflow-hidden rounded-[1.25rem] border border-line bg-surface transition-shadow duration-300',
        className,
      )}
      style={{
        backgroundImage: active
          ? `radial-gradient(480px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 55%)`
          : undefined,
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  )
}
