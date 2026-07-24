import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

/** React Bits–style word blur reveal */
export function BlurText({
  text,
  className,
  delay = 0,
  as: Tag = 'h1',
}: BlurTextProps) {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  return (
    <Tag className={cn('flex flex-wrap', className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="mr-[0.28em] inline-block will-change-transform"
          initial={
            reduce
              ? false
              : { opacity: 0, filter: 'blur(8px)', y: 12 }
          }
          animate={
            reduce
              ? undefined
              : { opacity: 1, filter: 'blur(0px)', y: 0 }
          }
          transition={{
            duration: 0.65,
            delay: delay + i * 0.055,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}
