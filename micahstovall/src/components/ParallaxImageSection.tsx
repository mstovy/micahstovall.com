import { useEffect, useRef } from 'react'

interface ParallaxImageSectionProps {
  src: string
  alt: string
  title: string
  description?: string
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export default function ParallaxImageSection({ src, alt, title, description }: ParallaxImageSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const updateTransform = () => {
      if (!containerRef.current || !imageRef.current) {
        frameRef.current = null
        return
      }

      const rect = containerRef.current.getBoundingClientRect()
      const viewportCenter = window.innerHeight * 0.5
      const distanceFromCenter = rect.top + rect.height * 0.5 - viewportCenter
      const translateY = clamp(distanceFromCenter * 0.12, -80, 80)

      imageRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`
      frameRef.current = null
    }

    const handleScroll = () => {
      if (frameRef.current !== null) {
        return
      }
      frameRef.current = requestAnimationFrame(updateTransform)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <section ref={containerRef} className="relative overflow-hidden rounded-[2rem] border border-violet-300/15 bg-[#170d25]/75 py-16 shadow-[0_20px_80px_-40px_rgba(168,85,247,0.35)] sm:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120914]/85 via-[#220d2f]/40 to-transparent" aria-hidden="true" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-6 text-white sm:px-10">
        <div className="max-w-sm rounded-2xl border border-violet-200/15 bg-[#1d102a]/60 p-4 backdrop-blur-md">

  <p className="text-[10px] uppercase tracking-[0.24em] text-yellow-100/80">
    Featured image
  </p>

  <h2 className="mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
    {title}
  </h2>

  {description ? (
    <p className="mt-2 text-sm leading-6 text-violet-100/80">
      {description}
    </p>
  ) : null}

</div>
      </div>
    </section>
  )
}
