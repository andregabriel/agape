"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface EntranceAnimationProps {
  onComplete: () => void
}

export default function EntranceAnimation({ onComplete }: EntranceAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Start animation after mount
    setIsVisible(true)

    // Complete animation after 3 seconds
    const timer = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div
        className={`transition-all duration-1000 transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          {/* Logo with animation */}
          <div className="relative">
            <Image
              src="/images/agape-logo.svg"
              alt="Agape"
              width={280}
              height={70}
              priority
              className="animate-pulse"
            />
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-white/20 rounded-lg blur-md animate-pulse" />
          </div>
          
          {/* Loading indicator */}
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    </div>
  )
}