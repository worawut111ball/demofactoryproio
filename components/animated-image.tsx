"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useAnimation, useInView } from "framer-motion"

interface AnimatedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  animation?: "fade" | "zoom" | "slide" | "rotate" | "bounce"
  delay?: number
  duration?: number
  once?: boolean
}

export default function AnimatedImage({
  src,
  alt,
  width,
  height,
  className = "",
  animation = "fade",
  delay = 0,
  duration = 0.5,
  once = true,
}: AnimatedImageProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px 0px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  // กำหนดการเคลื่อนไหวตามประเภทการเคลื่อนไหว
  const getAnimationVariants = () => {
    switch (animation) {
      case "zoom":
        return {
          hidden: { scale: 0.8, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              duration,
              delay,
              ease: "easeOut",
            },
          },
        }
      case "slide":
        return {
          hidden: { x: -50, opacity: 0 },
          visible: {
            x: 0,
            opacity: 1,
            transition: {
              duration,
              delay,
              ease: "easeOut",
            },
          },
        }
      case "rotate":
        return {
          hidden: { rotate: -10, opacity: 0 },
          visible: {
            rotate: 0,
            opacity: 1,
            transition: {
              duration,
              delay,
              ease: "easeOut",
            },
          },
        }
      case "bounce":
        return {
          hidden: { y: 50, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay,
            },
          },
        }
      case "fade":
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration,
              delay,
              ease: "easeOut",
            },
          },
        }
    }
  }

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start("visible")
      setHasAnimated(true)
    }
  }, [isInView, controls, hasAnimated])

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={getAnimationVariants()} className={className}>
      <Image src={src || "/placeholder.svg"} alt={alt} width={width} height={height} className="w-full h-auto" />
    </motion.div>
  )
}
