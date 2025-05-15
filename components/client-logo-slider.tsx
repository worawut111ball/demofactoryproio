"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClientLogoSliderProps {
  clients: {
    name: string;
    logo: string;
    alt?: string;
  }[];
}

export default function ClientLogoSlider({ clients }: ClientLogoSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleLogos, setVisibleLogos] = useState(5);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateVisibleLogos = () => {
      if (window.innerWidth < 640) {
        setVisibleLogos(1);
      } else if (window.innerWidth < 768) {
        setVisibleLogos(2);
      } else if (window.innerWidth < 1024) {
        setVisibleLogos(3);
      } else if (window.innerWidth < 1280) {
        setVisibleLogos(4);
      } else {
        setVisibleLogos(5);
      }
    };

    updateVisibleLogos();
    window.addEventListener("resize", updateVisibleLogos);
    return () => window.removeEventListener("resize", updateVisibleLogos);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (clients.length - visibleLogos + 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? clients.length - visibleLogos : prevIndex - 1
    );
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (clients.length > visibleLogos) {
        nextSlide();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [clients.length, visibleLogos]);

  return (
    <div className="relative w-full overflow-hidden px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        {/* <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white shadow-md hover:bg-gray-100"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous</span>
        </Button> */}

        {/* <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white shadow-md hover:bg-gray-100"
          onClick={nextSlide}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next</span>
        </Button> */}
      </div>

      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          className="flex items-center"
          animate={{
            x:
              (-currentIndex * (containerRef.current?.clientWidth || 0)) /
              visibleLogos,
          }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          {clients.map((client, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-4"
              style={{ width: `${100 / visibleLogos}%` }}
            >
              <div className="bg-white rounded-lg p-4 h-24 flex items-center justify-center">
                <Image
                  src={
                    client.logo?.startsWith("/")
                      ? client.logo
                      : `/${client.logo}` || "/placeholder.svg"
                  }
                  alt={client.alt || client.name}
                  width={150}
                  height={75}
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({
          length: Math.min(clients.length - visibleLogos + 1, 9),
        }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
