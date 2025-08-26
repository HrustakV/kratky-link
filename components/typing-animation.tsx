"use client"

import { useEffect, useState } from "react"

interface TypingAnimationProps {
  words: string[]
  baseText: string
  className?: string
}

export function TypingAnimation({ words, baseText, className = "" }: TypingAnimationProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const currentWord = words[currentWordIndex]
    const typingSpeed = isDeleting ? 75 : 150 // Pomalejší typing
    const pauseTime = isDeleting ? 1000 : 3000 // Delší pauzy

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1))
        } else {
          // Finished typing, start deleting after pause
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words])

  // Cursor blinking effect - pomalejší
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 800) // Pomalejší blikání

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span className={className}>
      {baseText}{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        {currentText}
        <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}>|</span>
      </span>
    </span>
  )
}
