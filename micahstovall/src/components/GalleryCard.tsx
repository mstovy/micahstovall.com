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
      className="group relative overflow-hidden rounded-[2rem] border border-slate-200/90 bg-slate-950/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(15,23,42,0.65)]"
      aria-label={`View ${title} gallery page`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent transition-opacity duration-300 group-hover:from-slate-950/90" />
      </div>

      <div className="relative z-10 flex min-h-[260px] flex-col justify-end p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-200/80">Gallery</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">{title}</h2>
        {description ? (
          <p className="mt-3 text-sm leading-6 text-slate-200/80">{description}</p>
        ) : null}
      </div>
    </NavLink>
  )
}
