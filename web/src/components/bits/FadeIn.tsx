import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number
  y?: number
  once?: boolean
}

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 16,
  once = true,
  ...props
}: FadeInProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, margin: '-40px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
