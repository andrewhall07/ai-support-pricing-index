import { useEffect, useState } from 'react'
import { List, X, ArrowUpRight, ChartLineUp, GithubLogo } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { repoUrl } from '@/data/platforms'

/** Primary nav only — three destinations */
const links = [
  { href: '#index', label: 'Index' },
  { href: '#methodology', label: 'Method' },
  { href: '#calculator', label: 'Calculator' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 md:px-6 md:pt-5">
        <nav
          className={cn(
            'flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border px-3 py-2 pl-4 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            scrolled
              ? 'border-line/80 bg-canvas/80 shadow-[0_8px_30px_rgba(17,17,17,0.04)] backdrop-blur-xl'
              : 'border-transparent bg-transparent',
          )}
        >
          <a href="#top" className="flex items-center gap-2.5 text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-canvas">
              <ChartLineUp weight="bold" className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold tracking-tight">RTCI</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-1.5 text-[13px] text-muted transition-colors duration-200 hover:bg-ink/[0.04] hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="secondary" size="sm" className="hidden sm:inline-flex">
              <a href={repoUrl} target="_blank" rel="noreferrer">
                <GithubLogo weight="bold" className="h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button asChild size="sm" className="hidden group sm:inline-flex">
              <a href="#index">
                Explore index
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-canvas/15 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
                </span>
              </a>
            </Button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X weight="bold" className="h-5 w-5" />
              ) : (
                <List weight="bold" className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-30 bg-canvas/95 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden',
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      >
        <div className="flex h-full flex-col justify-center gap-2 px-8">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                'font-serif text-4xl text-ink transition-all duration-500',
                open ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
              )}
              style={{ transitionDelay: open ? `${100 + i * 50}ms` : '0ms' }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center gap-2 text-sm text-muted"
          >
            <GithubLogo weight="bold" className="h-4 w-4" />
            View on GitHub
          </a>
        </div>
      </div>
    </>
  )
}
