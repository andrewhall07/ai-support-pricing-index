import {
  GithubLogo,
  Copyright,
  Heart,
} from '@phosphor-icons/react'
import { licenseUrl, lastVerified, repoUrl } from '@/data/platforms'

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 md:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md space-y-4">
          <p className="font-serif text-2xl text-ink">Resolution-to-Cost Index</p>
          <p className="text-sm leading-relaxed text-muted">
            An independent, community-maintained benchmark of AI customer support
            platforms. Last verified {lastVerified}. No paid placement. No affiliate links.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 text-sm">
          <div className="space-y-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
              Explore
            </p>
            <div className="flex flex-col gap-2 text-ink-soft">
              <a href="#index" className="hover:text-ink">
                Master comparison
              </a>
              <a href="#methodology" className="hover:text-ink">
                Methodology
              </a>
              <a href="#calculator" className="hover:text-ink">
                RTCI calculator
              </a>
              <a href="#tiers" className="hover:text-ink">
                Tier rankings
              </a>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
              Open source
            </p>
            <div className="flex flex-col gap-2 text-ink-soft">
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-ink"
              >
                <GithubLogo weight="bold" className="h-4 w-4" />
                GitHub repository
              </a>
              <a
                href={licenseUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-ink"
              >
                <Copyright weight="bold" className="h-4 w-4" />
                CC BY 4.0 License
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-muted md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()}{' '}
            <a
              href="https://github.com/andrewhall07"
              className="text-ink-soft hover:text-ink"
              target="_blank"
              rel="noreferrer"
            >
              andrewhall07
            </a>
            . Shared under Creative Commons Attribution 4.0.
          </p>
          <p className="inline-flex items-center gap-1.5">
            Built for operators who care about outcomes
            <Heart weight="fill" className="h-3.5 w-3.5 text-rose-ink" />
          </p>
        </div>
      </div>
    </footer>
  )
}
