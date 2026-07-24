import { snapshots } from '@/data/platforms'
import { FadeIn } from '@/components/bits/FadeIn'
import { SpotlightCard } from '@/components/bits/SpotlightCard'

export function Snapshot() {
  return (
    <section id="snapshot" className="scroll-mt-28 border-t border-line py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
            Index snapshot
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl tracking-tight text-ink md:text-5xl">
            Numbers at a glance
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            A living cross-section of the AI customer support market — priced,
            discounted for realism, and free of paid placement.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {snapshots.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.06}>
              <SpotlightCard className="h-full p-6 md:p-7">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                  {item.label}
                </p>
                <p className="mt-4 font-serif text-3xl tracking-tight text-ink md:text-4xl">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-muted">{item.detail}</p>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
