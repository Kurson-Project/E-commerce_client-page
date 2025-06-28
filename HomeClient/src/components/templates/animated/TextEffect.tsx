"use client"

import * as React from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'

export function TypingEffect({
  texts,
  className,
  duration = 0.02,
  pauseBeforeFadeOut = 3000
}: {
  texts: string[]
  className?: string
  duration?: number
  pauseBeforeFadeOut?: number
}) {
  const controls = useAnimationControls()
  const [textIndex, setTextIndex] = React.useState(0)

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  React.useEffect(() => {
    let isMounted = true

    const sequence = async () => {
      while (isMounted) {
        const currentText = texts[textIndex]

        // Fade in per karakter
        for (let i = 0; i < currentText.length; i++) {
          if (!isMounted) return
          await controls.start((j) =>
            j === i ? { opacity: 1, transition: { duration: duration } } : {}
          )
          await sleep(50)
        }

        // ✅ Tambahkan jeda sebelum mulai fade out
        await sleep(pauseBeforeFadeOut)

        // Fade out per karakter
        for (let i = currentText.length - 1; i >= 0; i--) {
          if (!isMounted) return
          await controls.start((j) =>
            j === i ? { opacity: 0, transition: { duration: duration } } : {}
          )
          await sleep(50)
        }

        // Ganti ke teks selanjutnya
        setTextIndex((prev) => (prev + 1) % texts.length)
        await sleep(500)
      }
    }

    sequence()

    return () => {
      isMounted = false
    }
  }, [textIndex, texts, controls, duration, pauseBeforeFadeOut])

  const currentText = texts[textIndex]

  return (
    <>
      {[...currentText].map((letter, index) => (
        <motion.span
          key={index}
          custom={index}
          initial={{ opacity: 0 }}
          animate={controls}
          style={{ display: 'inline-block' }}
          className={className}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </>
  )
}


export function SlidingText({ className, texts }: { className?: string, texts: string[] }) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={texts[index]}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`inline-block pl-2 ${className}`}
      >
        {texts[index]}
      </motion.span>
    </AnimatePresence>
  );
}


export function NeonText({ text, className }: { text: string, className?: string }) {
  const neonColors = ["#00ff", "#ff00ff", "#ffff00", "#00ff00", "#ff6600", "#ff0066"];

  return (
    <h1>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className={`inline-block ${className}`}
          style={{
            textShadow: `
              0 0 2px ${neonColors[index % neonColors.length]}
            `,
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1,
          }}
        >
          {char}
        </motion.span>
      ))}
    </h1>
  );
}