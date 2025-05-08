"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, ZoomIn } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

interface ImageModalProps {
  src: string
  alt: string
  width?: number
  height?: number
}

export default function ImageModal({ src, alt, width = 800, height = 600 }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="relative group cursor-pointer overflow-hidden" onClick={() => setIsOpen(true)}>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
          <ZoomIn className="text-white h-10 w-10" />
        </div>
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-transparent border-none">
          <div className="relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 z-50 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="overflow-auto max-h-[85vh] flex items-center justify-center"
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={alt}
                width={1200}
                height={900}
                className="object-contain max-w-full max-h-[85vh]"
              />
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
