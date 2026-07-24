import { useMemo, useState } from 'react'
import { MagnifyingGlass, Star, ArrowUpRight } from '@phosphor-icons/react'
import { platforms, type Platform } from '@/data/platforms'
import { FadeIn } from '@/components/bits/FadeIn'
import { Input } from '@/components/ui/input'
import { PlatformLogo } from '@/components/ui/platform-logo'
import { cn } from '@/lib/utils'

const gridCols =
  'md:grid-cols-[3rem_minmax(15rem,1.5fr)_minmax(7.5rem,0.95fr)_minmax(9rem,1.1fr)_minmax(7.5rem,0.85fr)]'

const RATING_MAX = 5

/** Parse "50–70%" style ranges into a 0–100 midpoint for the sparklike bar. */
function roarMidpoint(value: string): number | null {
  const nums = value.match(/(\d+(?:\.\d+)?)/g)
  if (!nums?.length) return null
  const vals = nums.map(Number)
  if (vals.length === 1) return Math.min(100, vals[0])
  return Math.min(100, (vals[0] + vals[1]) / 2)
}

function RatingStars({ n }: { n: number }) {
  const score = Math.max(0, Math.min(RATING_MAX, n))
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`${score} of ${RATING_MAX} independence rating`}
      title={`${score} / ${RATING_MAX}`}
    >
      {Array.from({ length: RATING_MAX }).map((_, i) => (
        <Star
          key={i}
          weight={i < score ? 'fill' : 'regular'}
          className={cn(
            'h-3.5 w-3.5',
            i < score ? 'text-sand-ink' : 'text-line-strong',
          )}
        />
      ))}
    </span>
  )
}

function RoarBar({ value }: { value: string }) {
  const mid = roarMidpoint(value)
  if (mid == null) return null
  return (
    <div
      className="mt-2 h-1 w-full max-w-[7.5rem] overflow-hidden rounded-full bg-line"
      aria-hidden
    >
      <div
        className="h-full rounded-full bg-ink/70 transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ width: `${mid}%` }}
      />
    </div>
  )
}

function PlatformRow({ p, index }: { p: Platform; index: number }) {
  return (
    <article
      className={cn(
        'group relative grid gap-4 border-b border-line px-4 py-4 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] last:border-b-0',
        'hover:bg-canvas md:items-center md:gap-5 md:px-5',
        gridCols,
        index % 2 === 1 && 'bg-canvas/35',
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-2 left-0 w-0.5 rounded-full bg-sage-ink/0 transition-colors duration-300 group-hover:bg-sage-ink/50"
      />

      <div className="flex items-center gap-3 md:contents">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-canvas font-mono text-[11px] font-medium tabular-nums text-muted">
          {String(p.rank).padStart(2, '0')}
        </span>

        <div className="flex min-w-0 items-center gap-3">
          <a
            href={p.website}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-xl outline-none transition-transform duration-300 hover:scale-[1.04] focus-visible:ring-2 focus-visible:ring-ink/20"
            aria-label={`Open ${p.name} website`}
          >
            <PlatformLogo name={p.name} domain={p.domain} />
          </a>
          <div className="min-w-0">
            <a
              href={p.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex max-w-full items-center gap-1.5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
            >
              <h3 className="truncate text-[15px] font-semibold tracking-tight text-ink transition-colors group-hover/link:text-ink-soft">
                {p.name}
              </h3>
              <ArrowUpRight
                weight="bold"
                className="h-3.5 w-3.5 shrink-0 text-muted opacity-0 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:opacity-100"
                aria-hidden
              />
            </a>
            <p className="mt-0.5 truncate text-[13px] text-muted">{p.bestFor}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3 md:contents">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted md:hidden">
            Realistic ROAR
          </p>
          <p className="text-[15px] font-semibold tabular-nums tracking-tight text-ink">
            {p.realisticRoar}
          </p>
          <p className="mt-0.5 text-xs text-muted">Claimed {p.claimedRate}</p>
          <RoarBar value={p.realisticRoar} />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted md:hidden">
            Cost / resolution
          </p>
          <p className="text-[15px] font-semibold tabular-nums tracking-tight text-ink">
            {p.costPerResolution}
          </p>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted">{p.pricingModel}</p>
        </div>

        <div className="col-span-2 flex flex-col items-start gap-1 sm:col-span-1 md:items-end">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted md:hidden">
            Independence
          </p>
          <RatingStars n={p.trust} />
          <p className="font-mono text-[11px] tabular-nums text-muted">
            {Math.min(RATING_MAX, p.trust)}/{RATING_MAX}
          </p>
        </div>
      </div>
    </article>
  )
}

export function Comparison() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return platforms
    return platforms.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.bestFor.toLowerCase().includes(q) ||
        p.pricingModel.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q) ||
        p.costPerResolution.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <section id="index" className="scroll-mt-28 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                Master comparison
              </p>
              <h2 className="mt-3 max-w-2xl font-serif text-4xl tracking-tight text-ink md:text-5xl">
                The RTCI Top 20
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                Search the full index by platform, use case, or pricing model. Star
                ratings reflect editorial independence and source transparency — not
                product quality.
              </p>
            </div>
            <p className="font-mono text-xs tabular-nums text-muted">
              Showing{' '}
              <span className="font-medium text-ink">{filtered.length}</span> of{' '}
              {platforms.length}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10">
          <div className="overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-[0_1px_0_rgba(17,17,17,0.02)]">
            <div className="sticky top-0 z-10 border-b border-line bg-surface/95 backdrop-blur-xl">
              <div className="p-4 md:px-5">
                <div className="relative w-full md:max-w-md">
                  <MagnifyingGlass
                    weight="bold"
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                  />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search platforms, use cases, pricing…"
                    className="border-line bg-canvas pl-10"
                    aria-label="Search platforms"
                  />
                </div>
              </div>

              <div
                className={cn(
                  'hidden gap-5 border-t border-line bg-canvas/50 px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted md:grid',
                  gridCols,
                )}
              >
                <span>#</span>
                <span>Platform</span>
                <span>Realistic ROAR</span>
                <span>Cost / resolution</span>
                <span className="text-right">Independence</span>
              </div>
            </div>

            <div>
              {filtered.length === 0 ? (
                <p className="px-6 py-16 text-center text-sm text-muted">
                  No platforms match that search.
                </p>
              ) : (
                filtered.map((p, i) => (
                  <PlatformRow key={p.name} p={p} index={i} />
                ))
              )}
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-muted">
            Independence is a 1–5 editorial score for pricing transparency and
            source clarity. Figures marked “est.” are public third-party or
            directional estimates — reconcile with the vendor before procurement.
            Platform names and logos link to each vendor’s official site; trademarks
            belong to their owners.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
