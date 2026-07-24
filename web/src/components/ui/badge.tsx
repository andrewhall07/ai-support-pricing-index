import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.06em] transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-ink text-canvas',
        secondary: 'border-line bg-surface text-muted',
        elite: 'border-transparent bg-sage text-sage-ink',
        strong: 'border-transparent bg-sky text-sky-ink',
        moderate: 'border-transparent bg-sand text-sand-ink',
        muted: 'border-transparent bg-lavender text-lavender-ink',
        danger: 'border-transparent bg-rose text-rose-ink',
        outline: 'border-line bg-transparent text-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
