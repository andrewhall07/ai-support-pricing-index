import { cn } from '@/lib/utils'

/** Soft ambient paper-field washes — no graph paper */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
    >
      <div className="absolute -left-[15%] -top-[25%] h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(circle,rgba(168,197,181,0.28)_0%,transparent_68%)] blur-3xl" />
      <div className="absolute -right-[8%] top-[5%] h-[50vh] w-[45vw] rounded-full bg-[radial-gradient(circle,rgba(225,243,254,0.42)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute bottom-[-15%] left-[20%] h-[42vh] w-[55vw] rounded-full bg-[radial-gradient(circle,rgba(251,243,219,0.32)_0%,transparent_70%)] blur-3xl" />
    </div>
  )
}
