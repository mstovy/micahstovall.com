import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

type ImageMap = Record<string, string>

export default function Portraits() {
  // Load all images in the portraits folder using Vite import.meta.glob
  const modules = import.meta.glob("../../assets/images/portraits/*.{jpg,jpeg,png,webp}", {
    eager: true,
    as: "url",
  }) as ImageMap

  const images = useMemo(() => Object.values(modules), [modules])

  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const overlayRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // prevent background scroll when modal is open
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  const openAt = useCallback((i: number) => {
    setIndex(i)
    setOpen(true)
  }, [])

  const close = useCallback(() => setOpen(false), [])

  const showPrev = useCallback(() => {
    setIndex((v) => (v - 1 + images.length) % images.length)
  }, [images.length])

  const showNext = useCallback(() => {
    setIndex((v) => (v + 1) % images.length)
  }, [images.length])

  // keyboard handling
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowLeft") showPrev()
      if (e.key === "ArrowRight") showNext()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, close, showPrev, showNext])

  const onOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) close()
  }

  const handleDownload = useCallback(async () => {
      try {
        const url = images[index]
        const res = await fetch(url)
        if (!res.ok) throw new Error('Network response was not ok')
        const blob = await res.blob()
        const blobUrl = URL.createObjectURL(blob)
  
        const link = document.createElement('a')
        link.href = blobUrl
        link.download = url.split('/').pop() || 'image.jpg'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
  
        // Revoke the object URL after a short delay to ensure the download starts
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Download failed', err)
      }
    }, [images, index])

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-semibold text-slate-900 dark:text-slate-100">Portraits Gallery</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length === 0 && (
          <div className="col-span-full rounded-lg border border-dashed border-slate-200 p-8 text-center text-sm text-slate-600">
            No images found in <span className="font-mono">src/assets/images/portraits</span>
          </div>
        )}

        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => openAt(i)}
            className="relative block overflow-hidden rounded-lg bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label={`Open image ${i + 1} of ${images.length}`}
          >
            <img src={src} alt={`Portraits ${i + 1}`} className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105" />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" aria-hidden />
          </button>
        ))}
      </div>

      {open && (
        <div
          ref={overlayRef}
          onClick={onOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8"
        >
          <div className="relative max-h-[90vh] w-full max-w-4xl">
            <button
              onClick={close}
              className="absolute right-2 top-2 z-20 inline-flex items-center justify-center rounded-md bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20"
              aria-label="Close"
            >
              ✕
            </button>

            <button
              onClick={showPrev}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20"
              aria-label="Previous"
            >
              ‹
            </button>

            <div className="flex items-center justify-center overflow-hidden rounded">
              <img
                src={images[index]}
                alt={`Portraits ${index + 1}`}
                className="max-h-[80vh] w-auto max-w-full object-contain transition-all duration-300"
              />
            </div>

            <button
              onClick={showNext}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20"
              aria-label="Next"
            >
              ›
            </button>

            <div className="mt-3 flex justify-between text-sm text-white/90">
              <button
                type="button"
                onClick={handleDownload}
                className="rounded-md bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
              >
                Download Image
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between text-sm text-white/90">
              <div>Image {index + 1} / {images.length}</div>
              <div className="text-right text-xs">Click outside or press Esc to close</div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
