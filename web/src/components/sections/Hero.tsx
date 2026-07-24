import {
  ArrowUpRight,
  SealCheck,
  ChartLineUp,
  CurrencyDollar,
  Handshake,
} from '@phosphor-icons/react'
import { BlurText } from '@/components/bits/BlurText'
import { Aurora } from '@/components/bits/Aurora'
import { FadeIn } from '@/components/bits/FadeIn'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { lastVerified } from '@/data/platforms'
import { art } from '@/lib/assets'

const proofs = [
  { value: '20', label: 'Platforms indexed' },
  { value: 'Independent', label: 'Research status' },
  { value: 'CC BY 4.0', label: 'Open license' },
]

const pillars = [
  {
    icon: ChartLineUp,
    title: 'Real resolution',
    body: 'ROAR only — closed end-to-end, no handoff, no re-contact in 72h.',
  },
  {
    icon: CurrencyDollar,
    title: 'True cost',
    body: 'Full invoice stack: seats, AI fees, floors, onboarding, overage.',
  },
  {
    icon: SealCheck,
    title: 'Independent',
    body: 'No affiliates. No paid ranks. Sources anyone can check.',
  },
]

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24"
    >
      <Aurora />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        aria-hidden
      >
        <img
          src={art.atmosphere}
          alt=""
          className="h-full w-full object-cover object-center"
          width={960}
          height={540}
          decoding="async"
        />
      </div>
      {/* Soft bottom fade into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-canvas to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 xl:gap-16">
          {/* Copy column */}
          <div className="max-w-2xl">
            <FadeIn>
              <div className="mb-7">
                <Badge variant="outline">Pricing verified {lastVerified}</Badge>
              </div>
            </FadeIn>

            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
              AI customer support benchmark
            </p>

            <BlurText
              text="Resolution-to-Cost Index"
              className="font-serif text-[clamp(2.85rem,6.5vw,4.85rem)] leading-[0.96] tracking-[-0.03em] text-ink"
            />

            <FadeIn delay={0.32}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted md:text-[1.2rem] md:leading-[1.55]">
                Independent ranking of AI support platforms on the only two metrics
                that matter:{' '}
                <span className="text-ink-soft">real resolution rate</span> vs.{' '}
                <span className="text-ink-soft">real cost per resolution</span>.
              </p>
            </FadeIn>

            <FadeIn delay={0.42}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="group h-12 px-6">
                  <a href="#index">
                    Browse the Top 20
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-canvas/15 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight weight="bold" className="h-4 w-4" />
                    </span>
                  </a>
                </Button>
                <Button asChild variant="secondary" size="lg" className="h-12 px-6">
                  <a href="#methodology">How we score</a>
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-line/80 pt-8">
                {proofs.map((item) => (
                  <div key={item.label}>
                    <p className="font-serif text-2xl tracking-tight text-ink md:text-[1.75rem]">
                      {item.value}
                    </p>
                    <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Visual / formula card */}
          <FadeIn delay={0.28} className="w-full lg:justify-self-end">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              {/* Soft ambient glow behind card */}
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,rgba(168,197,181,0.22),transparent_70%)] blur-2xl"
              />

              <div className="relative rounded-[1.75rem] border border-line bg-ink/[0.025] p-1.5 shadow-[0_24px_80px_-40px_rgba(17,17,17,0.35)]">
                <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] border border-line bg-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                  <div className="relative aspect-[5/3.2] overflow-hidden bg-canvas">
                    <img
                      src={art.hero}
                      alt=""
                      className="h-full w-full object-cover object-[center_40%]"
                      width={1280}
                      height={720}
                      fetchPriority="high"
                      decoding="async"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface/90 to-transparent" />
                  </div>

                  <div className="space-y-5 p-5 md:p-6">
                    <div className="rounded-2xl border border-line bg-canvas/80 px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <Handshake weight="bold" className="h-3.5 w-3.5 text-muted" />
                        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
                          Core formula
                        </p>
                      </div>
                      <p className="mt-2 font-serif text-[1.35rem] leading-snug tracking-tight text-ink md:text-[1.5rem]">
                        RTCI ={' '}
                        <span className="italic text-ink-soft">Realistic ROAR</span>
                        <span className="mx-1.5 text-muted">÷</span>
                        <span className="italic text-ink-soft">True cost</span>
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">
                        Higher score = more tickets resolved per dollar spent.
                      </p>
                    </div>

                    <ul className="space-y-3.5">
                      {pillars.map((item) => (
                        <li key={item.title} className="flex gap-3">
                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sage text-sage-ink">
                            <item.icon weight="bold" className="h-4 w-4" />
                          </span>
                          <div className="min-w-0 pt-0.5">
                            <p className="text-sm font-semibold tracking-tight text-ink">
                              {item.title}
                            </p>
                            <p className="mt-0.5 text-[13px] leading-relaxed text-muted">
                              {item.body}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
