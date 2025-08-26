"use client"

import { useEffect, useState, useRef } from "react"

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
}

export function AnimatedCounter({ end, duration = 2500, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)

          const startTime = Date.now()
          const startValue = 0

          const animate = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / duration, 1)

            // Smoother easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3)
            const currentValue = Math.floor(startValue + (end - startValue) * easeOutCubic)

            setCount(currentValue)

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [end, duration, hasStarted])

  return (
    <span ref={ref}>
      {count.toLocaleString("cs-CZ")}
      {suffix}
    </span>
  )
}
