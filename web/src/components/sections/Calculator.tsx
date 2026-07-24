import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Calculator as CalcIcon,
  ArrowUpRight,
  PencilSimple,
} from '@phosphor-icons/react'
import { FadeIn } from '@/components/bits/FadeIn'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const TICKET_MIN = 500
const TICKET_MAX = 100_000
const TICKET_STEP = 100

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function parseNum(raw: string, fallback = 0) {
  const n = Number(String(raw).replace(/,/g, ''))
  return Number.isFinite(n) ? n : fallback
}

function formatMoney(n: number) {
  if (!Number.isFinite(n)) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: n >= 100 ? 0 : 2,
  }).format(n)
}

function formatNumber(n: number) {
  if (!Number.isFinite(n)) return '—'
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n)
}

function Field({
  id,
  label,
  hint,
  value,
  onChange,
  suffix,
  min,
  max,
  step,
}: {
  id: string
  label: string
  hint?: string
  value: string
  onChange: (v: string) => void
  suffix?: string
  min?: number
  max?: number
  step?: string
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-[13px] font-medium text-ink">{label}</span>
      {hint ? (
        <span className="mt-0.5 block text-xs leading-relaxed text-muted">{hint}</span>
      ) : null}
      <div className="relative mt-2">
        <Input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step ?? 'any'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn('bg-canvas tabular-nums', suffix && 'pr-12')}
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-xs text-muted">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  )
}

/** Drag slider + click-to-edit number for ticket volume */
function TicketVolumeControl({
  value,
  onChange,
}: {
  value: number
  onChange: (n: number) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(String(value))
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!editing) setDraft(String(value))
  }, [value, editing])

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  const pct =
    ((clamp(value, TICKET_MIN, TICKET_MAX) - TICKET_MIN) /
      (TICKET_MAX - TICKET_MIN)) *
    100

  function commitDraft() {
    const n = clamp(
      Math.round(parseNum(draft, value) / TICKET_STEP) * TICKET_STEP,
      TICKET_MIN,
      TICKET_MAX,
    )
    onChange(n)
    setEditing(false)
  }

  return (
    <div className="rounded-2xl border border-line bg-canvas p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[13px] font-medium text-ink">Monthly support tickets</p>
          <p className="mt-0.5 text-xs text-muted">
            Drag the slider, or click the number to type
          </p>
        </div>
        {!editing ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="group inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-3 py-2 transition-colors hover:border-line-strong"
            aria-label="Edit monthly ticket volume"
          >
            <span className="font-serif text-2xl tabular-nums tracking-tight text-ink">
              {formatNumber(value)}
            </span>
            <PencilSimple
              weight="bold"
              className="h-3.5 w-3.5 text-muted opacity-60 transition-opacity group-hover:opacity-100"
            />
          </button>
        ) : (
          <input
            ref={inputRef}
            type="number"
            inputMode="numeric"
            min={TICKET_MIN}
            max={TICKET_MAX}
            step={TICKET_STEP}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitDraft}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitDraft()
              if (e.key === 'Escape') {
                setDraft(String(value))
                setEditing(false)
              }
            }}
            className="w-32 rounded-xl border border-ink bg-surface px-3 py-2 text-right font-serif text-2xl tabular-nums tracking-tight text-ink outline-none focus-visible:ring-2 focus-visible:ring-ink/15"
          />
        )}
      </div>

      <div className="relative mt-6">
        <input
          type="range"
          min={TICKET_MIN}
          max={TICKET_MAX}
          step={TICKET_STEP}
          value={clamp(value, TICKET_MIN, TICKET_MAX)}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label="Monthly support tickets"
          className="ticket-slider w-full"
          style={{
            background: `linear-gradient(to right, #111 ${pct}%, #EAEAEA ${pct}%)`,
          }}
        />
        <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
          <span>{formatNumber(TICKET_MIN)}</span>
          <span>{formatNumber(TICKET_MAX)}</span>
        </div>
      </div>
    </div>
  )
}

export function Calculator() {
  const [ticketCount, setTicketCount] = useState(10_000)
  const [roar, setRoar] = useState('55')
  const [costPerRes, setCostPerRes] = useState('0.99')
  const [humanCost, setHumanCost] = useState('8')

  const result = useMemo(() => {
    const monthlyTickets = clamp(ticketCount, 0, 10_000_000)
    const roarPct = clamp(parseNum(roar, 0), 0, 100)
    const cpr = clamp(parseNum(costPerRes, 0), 0, 10_000)
    const human = clamp(parseNum(humanCost, 0), 0, 10_000)

    const roarRate = roarPct / 100
    const aiResolved = monthlyTickets * roarRate
    const handoff = monthlyTickets - aiResolved
    const aiSpend = aiResolved * cpr
    const handoffSpend = handoff * human
    const totalWithAi = aiSpend + handoffSpend
    const allHuman = monthlyTickets * human
    const savings = allHuman - totalWithAi
    const savingsPct = allHuman > 0 ? (savings / allHuman) * 100 : 0
    const rtci = cpr > 0 ? roarPct / cpr : 0
    const aiShare = monthlyTickets > 0 ? (aiResolved / monthlyTickets) * 100 : 0

    return {
      monthlyTickets,
      roarPct,
      cpr,
      human,
      aiResolved,
      handoff,
      aiSpend,
      handoffSpend,
      totalWithAi,
      allHuman,
      savings,
      savingsPct,
      rtci,
      aiShare,
    }
  }, [ticketCount, roar, costPerRes, humanCost])

  const maxBar = Math.max(result.allHuman, result.totalWithAi, 1)
  const humanBar = (result.allHuman / maxBar) * 100
  const aiBar = (result.totalWithAi / maxBar) * 100

  return (
    <section
      id="calculator"
      className="scroll-mt-28 border-t border-line bg-surface py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 text-muted">
                <CalcIcon weight="bold" className="h-4 w-4" />
                <p className="text-[11px] font-medium uppercase tracking-[0.18em]">
                  RTCI calculator
                </p>
              </div>
              <h2 className="font-serif text-4xl tracking-tight text-ink md:text-5xl">
                Estimate resolution value
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Set ticket volume, realistic ROAR, and all-in cost per AI resolution.
                See an indicative RTCI score and monthly savings versus fully human
                handling.
              </p>
            </div>
            <Button asChild variant="secondary" size="sm" className="group">
              <a href="#index">
                Compare platforms
                <ArrowUpRight
                  weight="bold"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-12">
          <div className="overflow-hidden rounded-[1.75rem] border border-line bg-canvas shadow-[0_1px_0_rgba(17,17,17,0.02)]">
            <div className="grid lg:grid-cols-[0.95fr_1.15fr]">
              {/* Inputs */}
              <div className="border-b border-line p-6 md:p-8 lg:border-b-0 lg:border-r">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
                  Inputs
                </p>
                <div className="mt-6 space-y-5">
                  <TicketVolumeControl
                    value={ticketCount}
                    onChange={setTicketCount}
                  />
                  <Field
                    id="roar"
                    label="Realistic ROAR"
                    hint="Share of tickets AI closes end-to-end with no handoff"
                    value={roar}
                    onChange={setRoar}
                    suffix="%"
                    min={0}
                    max={100}
                    step="1"
                  />
                  <Field
                    id="cpr"
                    label="True cost per AI resolution"
                    hint="All-in: usage + amortized seats, floors, and overage"
                    value={costPerRes}
                    onChange={setCostPerRes}
                    suffix="USD"
                    min={0}
                    step="0.01"
                  />
                  <Field
                    id="human"
                    label="Human cost per ticket"
                    hint="Fully loaded agent cost for a comparable ticket"
                    value={humanCost}
                    onChange={setHumanCost}
                    suffix="USD"
                    min={0}
                    step="0.5"
                  />
                </div>
                <p className="mt-6 text-xs leading-relaxed text-muted">
                  Directional model only — not a quote. Align ROAR and cost with the
                  index before procurement.
                </p>
              </div>

              {/* Results — improved */}
              <div className="flex flex-col bg-surface p-6 md:p-8">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
                    Results
                  </p>
                  <p className="text-xs text-muted">Updates live</p>
                </div>

                {/* Hero metrics */}
                <div className="mt-5 overflow-hidden rounded-[1.35rem] border border-ink bg-ink text-canvas">
                  <div className="grid sm:grid-cols-2">
                    <div className="border-b border-white/10 p-5 sm:border-b-0 sm:border-r sm:p-6">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
                        Indicative RTCI
                      </p>
                      <p className="mt-2 font-serif text-5xl tracking-tight tabular-nums">
                        {result.cpr > 0
                          ? result.rtci.toLocaleString('en-US', {
                              maximumFractionDigits: 0,
                            })
                          : '—'}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-white/50">
                        ROAR % ÷ cost per resolution · higher is better
                      </p>
                    </div>
                    <div className="p-5 sm:p-6">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
                        Est. monthly savings
                      </p>
                      <p
                        className={cn(
                          'mt-2 font-serif text-5xl tracking-tight tabular-nums',
                          result.savings < 0 && 'text-rose',
                        )}
                      >
                        {formatMoney(result.savings)}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-white/50">
                        {result.allHuman > 0
                          ? `${result.savingsPct.toFixed(0)}% vs all-human handling`
                          : 'Set human cost to estimate savings'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cost comparison bars */}
                <div className="mt-5 rounded-[1.25rem] border border-line bg-canvas p-5">
                  <p className="text-[13px] font-semibold text-ink">
                    Monthly cost comparison
                  </p>
                  <div className="mt-5 space-y-4">
                    <div>
                      <div className="mb-1.5 flex items-baseline justify-between gap-3">
                        <span className="text-xs text-muted">All-human baseline</span>
                        <span className="font-mono text-sm font-medium tabular-nums text-ink">
                          {formatMoney(result.allHuman)}
                        </span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-line">
                        <div
                          className="h-full rounded-full bg-ink/25 transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                          style={{ width: `${humanBar}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="mb-1.5 flex items-baseline justify-between gap-3">
                        <span className="text-xs text-muted">With AI assist</span>
                        <span className="font-mono text-sm font-medium tabular-nums text-ink">
                          {formatMoney(result.totalWithAi)}
                        </span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-line">
                        <div
                          className="h-full rounded-full bg-ink transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                          style={{ width: `${aiBar}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <p
                    className={cn(
                      'mt-4 text-sm font-medium tabular-nums',
                      result.savings >= 0 ? 'text-sage-ink' : 'text-rose-ink',
                    )}
                  >
                    {result.savings >= 0 ? 'You keep ' : 'You spend '}
                    {formatMoney(Math.abs(result.savings))}
                    {result.savings >= 0 ? ' more in the bank each month' : ' extra vs human-only'}
                  </p>
                </div>

                {/* Ticket mix */}
                <div className="mt-4 rounded-[1.25rem] border border-line bg-canvas p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[13px] font-semibold text-ink">Ticket mix</p>
                    <p className="font-mono text-[11px] tabular-nums text-muted">
                      {formatNumber(result.monthlyTickets)} / mo
                    </p>
                  </div>
                  <div className="mt-4 flex h-3 overflow-hidden rounded-full">
                    <div
                      className="bg-sage-ink/80 transition-[width] duration-500"
                      style={{ width: `${result.aiShare}%` }}
                      title="AI resolved"
                    />
                    <div
                      className="bg-line-strong transition-[width] duration-500"
                      style={{ width: `${100 - result.aiShare}%` }}
                      title="Human handoff"
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.1em] text-muted">
                        AI-resolved
                      </p>
                      <p className="mt-1 font-serif text-xl tabular-nums text-ink">
                        {formatNumber(result.aiResolved)}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        {formatMoney(result.aiSpend)} @ {formatMoney(result.cpr)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.1em] text-muted">
                        Human handoff
                      </p>
                      <p className="mt-1 font-serif text-xl tabular-nums text-ink">
                        {formatNumber(result.handoff)}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        {formatMoney(result.handoffSpend)} @ {formatMoney(result.human)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <style>{`
        .ticket-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 999px;
          outline: none;
          cursor: pointer;
        }
        .ticket-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: #111;
          border: 3px solid #F7F6F3;
          box-shadow: 0 1px 4px rgba(17,17,17,0.2);
          cursor: grab;
        }
        .ticket-slider::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: #111;
          border: 3px solid #F7F6F3;
          box-shadow: 0 1px 4px rgba(17,17,17,0.2);
          cursor: grab;
        }
        .ticket-slider:active::-webkit-slider-thumb { cursor: grabbing; }
        .ticket-slider:active::-moz-range-thumb { cursor: grabbing; }
        .ticket-slider:focus-visible::-webkit-slider-thumb {
          outline: 2px solid #111;
          outline-offset: 2px;
        }
      `}</style>
    </section>
  )
}
