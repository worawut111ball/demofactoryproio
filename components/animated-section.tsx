"use client"

import { type ReactNode, useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  once?: boolean
  duration?: number
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 50,
  once = true,
  duration = 0.5,
}: AnimatedSectionProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px 0px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  // กำหนดการเคลื่อนไหวตามทิศทาง
  const getDirectionalVariants = () => {
    if (direction === "none") {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    }

    const directionMap = {
      up: { y: distance },
      down: { y: -distance },
      left: { x: distance },
      right: { x: -distance },
    }

    return {
      hidden: { opacity: 0, ...directionMap[direction] },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: "easeOut",
        },
      },
    }
  }

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start("visible")
      setHasAnimated(true)
    }
  }, [isInView, controls, hasAnimated])

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={getDirectionalVariants()} className={className}>
      {children}
    </motion.div>
  )
}
