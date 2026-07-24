import {
  ShieldCheck,
  LinkBreak,
  UserCircleDashed,
  Eye,
} from '@phosphor-icons/react'
import { FadeIn } from '@/components/bits/FadeIn'
import { SpotlightCard } from '@/components/bits/SpotlightCard'

const points = [
  {
    icon: ShieldCheck,
    title: 'No paid placement',
    body: 'No platform paid for inclusion, tier assignment, or ranking position. Tiers are mechanical, not brand preference.',
  },
  {
    icon: LinkBreak,
    title: 'No affiliate links',
    body: 'Links point to vendors’ primary marketing and pricing pages, or to independent third-party research.',
  },
  {
    icon: UserCircleDashed,
    title: 'Author is not a vendor',
    body: 'This index was not produced by, and is not affiliated with, any platform it evaluates.',
  },
  {
    icon: Eye,
    title: 'Open & checkable',
    body: 'Built from public sources, released under CC BY 4.0. Corrections and new platforms are welcome via GitHub.',
  },
]

export function Independence() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
            Editorial independence
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl tracking-tight text-ink md:text-5xl">
            Built to be trusted, not sold
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {points.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.06}>
              <SpotlightCard className="h-full p-6 md:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-canvas">
                  <p.icon weight="bold" className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-medium text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
