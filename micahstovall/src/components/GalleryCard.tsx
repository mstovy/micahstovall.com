import { NavLink } from 'react-router-dom'

interface GalleryCardProps {
  to: string
  title: string
  subtitle?: string
  description?: string
  imageSrc: string
}

export default function GalleryCard({ to, title, description, imageSrc }: GalleryCardProps) {
  return (
    <NavLink
      to={to}
      className="group relative overflow-hidden rounded-[2rem] border border-violet-300/20 bg-[#1a0d2b]/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_70px_-20px_rgba(250,204,21,0.22)]"
      aria-label={`View ${title} gallery page`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120914]/90 via-[#1f0b2a]/35 to-transparent transition-opacity duration-300 group-hover:from-[#120914]/95" />
      </div>

      <div className="relative z-10 flex min-h-[260px] flex-col justify-end p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-100/80">Gallery</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-violet-100/80">{description}</p>
      </div>
    </NavLink>
  )
}
