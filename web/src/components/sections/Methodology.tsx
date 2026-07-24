import { costLayers, methodologySteps } from '@/data/platforms'
import { FadeIn } from '@/components/bits/FadeIn'
import { SpotlightCard } from '@/components/bits/SpotlightCard'
import { WarningCircle, Stack, Function } from '@phosphor-icons/react'

export function Methodology() {
  return (
    <section
      id="methodology"
      className="scroll-mt-28 border-y border-line bg-surface py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Header */}
        <FadeIn>
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
              How this index was built
            </p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
              Transparent method, mechanical tiers
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Vendor resolution numbers are not independently audited. Treat them as
              ceilings. Realistic ROAR is our conservative estimate for a mid-market
              deployment with average knowledge-base quality.
            </p>
          </div>
        </FadeIn>

        {/* Formula + warning row */}
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <FadeIn>
            <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-line bg-canvas p-6 md:p-7">
              <div>
                <div className="flex items-center gap-2 text-muted">
                  <Function weight="bold" className="h-4 w-4" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
                    Core formula
                  </span>
                </div>
                <p className="mt-4 font-serif text-2xl leading-snug tracking-tight text-ink md:text-[1.75rem]">
                  RTCI = Realistic ROAR ÷ True cost per resolution
                </p>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Higher RTCI means more tickets resolved per dollar. Feature checklists
                are deliberately ignored.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="flex h-full items-start gap-3 rounded-[1.25rem] border border-sand bg-sand/50 p-6 md:p-7">
              <WarningCircle
                weight="fill"
                className="mt-0.5 h-5 w-5 shrink-0 text-sand-ink"
              />
              <div>
                <p className="text-sm font-semibold text-sand-ink">
                  Reconcile before you buy
                </p>
                <p className="mt-2 text-sm leading-relaxed text-sand-ink/90">
                  Always check the vendor’s live pricing page before procurement.
                  Quote-only figures are directional estimates, not contractual
                  rates.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Process — asymmetric bento */}
        <div className="mt-12">
          <FadeIn>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
              Process
            </p>
          </FadeIn>
          <ol className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-[auto_auto_auto]">
            {methodologySteps.map((step, i) => {
              const bentoClass = [
                /* 01 Sources — large feature tile */
                'lg:col-span-3 lg:row-span-2 min-h-[200px] lg:min-h-[280px]',
                /* 02 Claimed rates */
                'lg:col-span-3',
                /* 03 Realistic ROAR */
                'lg:col-span-3',
                /* 04 True cost */
                'lg:col-span-2',
                /* 05 Mechanical tiers — wide footer tile */
                'lg:col-span-4',
              ][i]

              const isFeature = i === 0

              return (
                <FadeIn key={step.step} delay={i * 0.05} className={bentoClass}>
                  <li
                    className={[
                      'group flex h-full flex-col rounded-[1.25rem] border border-line bg-canvas p-5 transition-colors duration-300 hover:bg-white md:p-6',
                      isFeature ? 'justify-between' : '',
                    ].join(' ')}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface font-mono text-xs font-medium tabular-nums text-muted">
                        {step.step}
                      </span>
                      {isFeature ? (
                        <span className="rounded-full bg-sage px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-sage-ink">
                          Start here
                        </span>
                      ) : null}
                    </div>
                    <div className={isFeature ? 'mt-8 md:mt-auto md:pt-10' : 'mt-4'}>
                      <h3
                        className={[
                          'font-semibold tracking-tight text-ink',
                          isFeature
                            ? 'font-serif text-2xl md:text-3xl'
                            : 'text-[15px]',
                        ].join(' ')}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={[
                          'mt-2 leading-relaxed text-muted',
                          isFeature ? 'max-w-md text-[15px]' : 'text-sm',
                        ].join(' ')}
                      >
                        {step.body}
                      </p>
                    </div>
                  </li>
                </FadeIn>
              )
            })}
          </ol>
        </div>

        {/* Cost anatomy */}
        <FadeIn className="mt-20">
          <div className="mb-3 flex items-center gap-2">
            <Stack weight="bold" className="h-5 w-5 text-ink" />
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
              Cost stack
            </p>
          </div>
          <h3 className="font-serif text-3xl tracking-tight text-ink md:text-4xl">
            Anatomy of a true cost
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            Aggregate cost compounds three layers. The gap between the headline price
            and the real invoice is usually where budgets break.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {costLayers.map((layer, i) => (
              <SpotlightCard key={layer.layer} className="flex h-full flex-col p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {layer.layer}
                </p>
                <h4 className="mt-3 text-lg font-semibold tracking-tight text-ink">
                  {layer.title}
                </h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {layer.body}
                </p>
                <div
                  className="mt-6 h-1.5 overflow-hidden rounded-full bg-line"
                  aria-hidden
                >
                  <div
                    className="h-full rounded-full bg-ink/75"
                    style={{ width: `${40 + i * 22}%` }}
                  />
                </div>
              </SpotlightCard>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
