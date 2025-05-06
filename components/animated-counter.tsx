"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, motion, useAnimation } from "framer-motion"

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  delay?: number
  className?: string
  formatter?: (value: number) => string
  once?: boolean
}

export default function AnimatedCounter({
  from,
  to,
  duration = 2,
  delay = 0,
  className = "",
  formatter = (value) => value.toString(),
  once = true,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from)
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px 0px" })
  const controls = useAnimation()
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      let startTime: number
      let animationFrame: number

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        const currentCount = Math.floor(from + progress * (to - from))
        setCount(currentCount)

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step)
        } else {
          setCount(to)
          setHasAnimated(true)
        }
      }

      const startAnimation = () => {
        animationFrame = requestAnimationFrame(step)
      }

      const timeoutId = setTimeout(startAnimation, delay * 1000)

      return () => {
        clearTimeout(timeoutId)
        if (animationFrame) cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, from, to, duration, delay, hasAnimated])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {formatter(count)}
    </motion.div>
  )
}
