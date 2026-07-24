import { Fire, CheckCircle, Scales } from '@phosphor-icons/react'
import { tierScores } from '@/data/platforms'
import { FadeIn } from '@/components/bits/FadeIn'
import { SpotlightCard } from '@/components/bits/SpotlightCard'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const groups = [
  {
    id: 'elite',
    title: 'Elite',
    range: '100+ RTCI pts / $',
    icon: Fire,
    accent: 'bg-sage text-sage-ink',
    items: tierScores.filter((t) => t.tier === 'elite'),
  },
  {
    id: 'strong',
    title: 'Strong',
    range: '40–99 RTCI pts / $',
    icon: CheckCircle,
    accent: 'bg-sky text-sky-ink',
    items: tierScores.filter((t) => t.tier === 'strong'),
  },
  {
    id: 'moderate',
    title: 'Moderate',
    range: 'Below 40 RTCI pts / $',
    icon: Scales,
    accent: 'bg-sand text-sand-ink',
    items: tierScores.filter((t) => t.tier === 'moderate'),
  },
]

export function Tiers() {
  return (
    <section id="tiers" className="scroll-mt-28 border-y border-line bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
            RTCI tier rankings
          </p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl tracking-tight text-ink md:text-5xl">
            Efficiency tiers, not brand popularity
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Midpoint ROAR ÷ midpoint aggregate cost. Platforms without a comparable
            per-resolution cost are not scored — that is a comparability limit, not a
            quality judgment.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {groups.map((group, gi) => (
            <FadeIn key={group.id} delay={gi * 0.08}>
              <SpotlightCard
                className="h-full p-6"
                spotlightColor={
                  group.id === 'elite'
                    ? 'rgba(52,101,56,0.14)'
                    : group.id === 'strong'
                      ? 'rgba(31,108,159,0.12)'
                      : 'rgba(149,100,0,0.1)'
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Badge
                      variant={
                        group.id === 'elite'
                          ? 'elite'
                          : group.id === 'strong'
                            ? 'strong'
                            : 'moderate'
                      }
                    >
                      {group.title}
                    </Badge>
                    <p className="mt-3 font-mono text-xs text-muted">{group.range}</p>
                  </div>
                  <span
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-xl',
                      group.accent,
                    )}
                  >
                    <group.icon weight="bold" className="h-5 w-5" />
                  </span>
                </div>

                <ul className="mt-8 space-y-4">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-end justify-between gap-3 border-b border-line pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-ink">
                          <span className="mr-2 font-mono text-xs text-muted">
                            #{item.rank}
                          </span>
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs text-muted">
                          {item.midpointRoar} · {item.midpointCost}
                        </p>
                      </div>
                      <p className="font-serif text-2xl tabular-nums text-ink">
                        {item.rtci}
                      </p>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.15} className="mt-8 rounded-2xl border border-line bg-canvas p-6">
          <p className="text-sm leading-relaxed text-muted">
            <span className="font-medium text-ink">Not scored:</span> HubSpot Breeze,
            Kustomer AI, Tidio Lyro, Lorikeet, Crescendo (fixed costs need volume),
            Kore.ai, Freshdesk Freddy, Salesforce Agentforce (non-resolution units),
            and quote-only enterprise vendors including Pylon, Sierra, Decagon, Ada,
            Forethought, and Cognigy.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
