import * as React from "react";
import { NavLink } from "react-router-dom";

export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function CardContent({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={className}>{children}</div>;
}

export function CardTitle({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <h3 className={className}>{children}</h3>;
}

export function CardDescription({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <p className={className}>{children}</p>;
}

interface CardProps {
  to: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageSrc: string;
}

export default function GalleryCard({
  to,
  title,
  description,
  imageSrc,
}: CardProps) {
  return (
    <NavLink to={to} aria-label={`View ${title} gallery page`}>
      <Card className="group relative overflow-hidden rounded-[2rem] border border-slate-200/90 bg-slate-950/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(15,23,42,0.65)]">

        <div className="absolute inset-0 overflow-hidden">
          <img
            src={imageSrc}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent transition-opacity duration-300 group-hover:from-slate-950/90" />
        </div>

        <CardContent className="relative z-10 flex min-h-[260px] flex-col justify-end p-6 sm:p-8">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-200/80">
            Gallery
          </p>

          <CardTitle className="mt-3 text-2xl font-semibold text-white">
            {title}
          </CardTitle>

          {description ? (
            <CardDescription className="mt-3 text-sm leading-6 text-slate-200/80">
              {description}
            </CardDescription>
          ) : null}
        </CardContent>
      </Card>
    </NavLink>
  );
}