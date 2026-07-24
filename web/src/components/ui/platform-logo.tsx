import { useState } from 'react'
import { cn } from '@/lib/utils'

interface PlatformLogoProps {
  name: string
  domain: string
  className?: string
  size?: 'sm' | 'md'
}

function initialsFrom(name: string) {
  return name
    .replace(/[^A-Za-z0-9 ]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

/** Favicon logo tile — Google 128px with Clearbit fallback chain handled via onError. */
export function PlatformLogo({
  name,
  domain,
  className,
  size = 'md',
}: PlatformLogoProps) {
  // Google 128px first; DuckDuckGo icons as fallback (Clearbit logo API is deprecated)
  const [source, setSource] = useState<'google' | 'ddg' | 'none'>('google')
  const initials = initialsFrom(name)

  const dim = size === 'sm' ? 'h-8 w-8 rounded-lg' : 'h-10 w-10 rounded-xl'
  const img = size === 'sm' ? 'h-5 w-5' : 'h-6 w-6'

  const src =
    source === 'google'
      ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`
      : source === 'ddg'
        ? `https://icons.duckduckgo.com/ip3/${encodeURIComponent(domain)}.ico`
        : null

  return (
    <span
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden border border-line bg-canvas shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]',
        dim,
        className,
      )}
      aria-hidden
    >
      {src ? (
        <img
          src={src}
          alt=""
          width={size === 'sm' ? 20 : 24}
          height={size === 'sm' ? 20 : 24}
          className={cn('object-contain', img)}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => {
            if (source === 'google') setSource('ddg')
            else setSource('none')
          }}
        />
      ) : (
        <span className="font-mono text-[10px] font-semibold tracking-wide text-muted">
          {initials}
        </span>
      )}
    </span>
  )
}
