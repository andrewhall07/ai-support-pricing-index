import {
  Copyright,
  ArrowUpRight,
  FileText,
  GithubLogo,
} from '@phosphor-icons/react'
import { FadeIn } from '@/components/bits/FadeIn'
import { Button } from '@/components/ui/button'
import { licenseUrl, repoUrl } from '@/data/platforms'

export function LicenseSection() {
  return (
    <section id="license" className="scroll-mt-28 pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn>
          <div className="overflow-hidden rounded-[2rem] border border-line bg-ink text-canvas">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-8 md:p-12 lg:p-14">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
                  <Copyright weight="bold" className="h-3.5 w-3.5" />
                  CC BY 4.0
                </div>
                <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tight md:text-5xl">
                  Free to share, adapt, and reuse
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-white/65">
                  This index — its text, tables, and machine-readable summary — is
                  released under the Creative Commons Attribution 4.0 International
                  License. Credit the source and note any changes you make.
                </p>
                <ul className="mt-8 space-y-3 text-sm text-white/65">
                  <li className="flex gap-2">
                    <FileText weight="bold" className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                    Pricing figures are informational — always verify with vendors
                    before procurement.
                  </li>
                  <li className="flex gap-2">
                    <FileText weight="bold" className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                    Product names and trademarks belong to their respective owners.
                  </li>
                </ul>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="group bg-canvas text-ink hover:bg-white"
                  >
                    <a href={licenseUrl} target="_blank" rel="noreferrer">
                      View license
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/8 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRight weight="bold" className="h-4 w-4" />
                      </span>
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/20 bg-transparent text-canvas hover:bg-white/10 hover:text-canvas"
                  >
                    <a href={repoUrl} target="_blank" rel="noreferrer">
                      <GithubLogo weight="bold" className="h-4 w-4" />
                      Contribute on GitHub
                    </a>
                  </Button>
                </div>
              </div>

              <div className="relative border-t border-white/10 lg:border-l lg:border-t-0">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 30% 20%, rgba(168,197,181,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(225,243,254,0.25), transparent 40%)',
                  }}
                />
                <div className="relative flex h-full flex-col justify-between gap-10 p-8 md:p-12">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
                      You are free to
                    </p>
                    <div className="mt-6 space-y-5">
                      {[
                        { t: 'Share', d: 'Copy and redistribute in any medium' },
                        { t: 'Adapt', d: 'Remix, transform, and build upon' },
                        { t: 'Commercialize', d: 'Use for any purpose, even commercially' },
                      ].map((item) => (
                        <div key={item.t} className="border-b border-white/10 pb-4 last:border-0">
                          <p className="font-serif text-2xl text-canvas">{item.t}</p>
                          <p className="mt-1 text-sm text-white/55">{item.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-white/40">
                    Attribution required. No additional restrictions beyond CC BY 4.0.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
