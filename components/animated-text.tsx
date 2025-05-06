"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  duration?: number
  type?: "words" | "chars" | "lines"
  animation?: "fade" | "slide" | "bounce" | "scale"
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
}

export default function AnimatedText({
  text,
  className = "",
  once = true,
  delay = 0,
  duration = 0.05,
  type = "words",
  animation = "fade",
  tag = "div",
}: AnimatedTextProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className={className}>{text}</div>

  // แยกข้อความตามประเภท
  const getItems = () => {
    if (type === "chars") return text.split("")
    if (type === "words") return text.split(" ")
    return [text] // lines
  }

  const items = getItems()

  // กำหนดการเคลื่อนไหวตามประเภทการเคลื่อนไหว
  const getAnimationVariants = () => {
    switch (animation) {
      case "slide":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
              delay: delay + i * duration,
              duration: 0.5,
              ease: "easeOut",
            },
          }),
        }
      case "bounce":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
              delay: delay + i * duration,
              type: "spring",
              stiffness: 200,
              damping: 10,
            },
          }),
        }
      case "scale":
        return {
          hidden: { scale: 0.5, opacity: 0 },
          visible: (i: number) => ({
            scale: 1,
            opacity: 1,
            transition: {
              delay: delay + i * duration,
              duration: 0.5,
              ease: "easeOut",
            },
          }),
        }
      case "fade":
      default:
        return {
          hidden: { opacity: 0 },
          visible: (i: number) => ({
            opacity: 1,
            transition: {
              delay: delay + i * duration,
              duration: 0.5,
              ease: "easeOut",
            },
          }),
        }
    }
  }

  const variants = getAnimationVariants()
  const Tag = tag

  return (
    <Tag className={`${className} break-words`}>
      {type === "lines" ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          custom={0}
          style={{ display: "inline-block" }}
        >
          {text}
        </motion.div>
      ) : (
        <motion.div initial="hidden" animate="visible">
          {items.map((item, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={variants}
              style={{
                display: "inline-block",
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                maxWidth: "100%",
              }}
            >
              {item}
              {type === "words" && i !== items.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </motion.div>
      )}
    </Tag>
  )
}
