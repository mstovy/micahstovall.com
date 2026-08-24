import {
  Card,
  CardContent,
  CardTitle,
} from "../components/card"

import heroImg from "../assets/images/music/Drift.png"
import type { ReactNode } from "react"
import type { JSX } from "react/jsx-runtime"

type Highlight = {
  value: string
  label: string
}

type TimelineItem = {
  year: string
  title: string
  description: string
}

const highlights: Highlight[] = [
  { value: "14+", label: "Years performing" },
  { value: "8", label: "Original releases" },
  { value: "Yearly", label: "Live sets" },
  { value: "10k+", label: "Global plays" },
]

const sonicTags = [
  "Dubstep",
  "Riddim",
  "Trap",
  "Deep Dub",
  "Bass Trance"
]

const timeline: TimelineItem[] = [
  {
    year: "2012",
    title: "Began making Dubstep",
    description: "Inspired by UKF Dubstep and Circus Records Storvy began producing his own tracks and performing locally.",
  },
  {
    year: "2017",
    title: "Diving into Riddim",
    description: "Stovy followed the early riddim scene with artists like Help7 & 50Carrot but didn't get fully into it until 2017 where he was inspired by Subfiltronik, Bommer and the inital Monsters crew.",
  },
  {
    year: "2020",
    title: "Breakout album: Velociraptor",
    description: "Featuring art by the acclaimed album artist Monsta, Velociraptor was a breakout album that solidifed Stovy's sound and style in the bass music scene.",
  },
  {
    year: "2026",
    title: "Current focus",
    description: "Playing small local shows while also working on new music and collaborations with other artists. Stovy is currently focused on creating a unique sound that blends elements of dubstep, riddim, and trap.",
  },
]

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-200/80">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      <p className="max-w-2xl text-sm leading-7 text-violet-100/80 sm:text-base">{description}</p>
    </div>
  )
}

function InfoCard({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <Card className="rounded-[1.75rem] border border-violet-300/15 bg-[#1c0d2a]/80 shadow-[0_20px_80px_-32px_rgba(168,85,247,0.35)] backdrop-blur-xl">
      <CardContent className="p-6 sm:p-8">
        <CardTitle className="text-lg font-semibold text-white">{title}</CardTitle>
        <div className="mt-3 text-sm leading-7 text-violet-100/80">{children}</div>
      </CardContent>
    </Card>
  )
}

export default function Music(): JSX.Element {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.12),_transparent_32%),linear-gradient(135deg,_#14091f_0%,_#2b163b_50%,_#160d21_100%)] text-violet-50">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <header className="overflow-hidden rounded-[2rem] border border-violet-300/15 bg-[#1b0d2d]/75 p-6 shadow-[0_35px_120px_-30px_rgba(168,85,247,0.35)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="inline-flex rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-yellow-100">
                Producer | DJ
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Stovy
                </h1>
                <p className="max-w-2xl text-base leading-8 text-violet-100/80 sm:text-lg">
                  A producer and DJ with a focus on deep, hypnotic grooves and expansive melodies. Stovy blends performance energy with a deeply considered studio process to create a unique sound that moves the room.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://soundcloud.com/stovymusic"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Listen Now
                </a>
                <a
                  href="https://stovy.bandcamp.com/"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  View Releases
                </a>
                <a
                  href="mailto:stovymusic@gmail.com"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Contact / Bookings
                </a>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 text-sm text-violet-200/80">
                <span className="rounded-full border border-violet-300/20 bg-white/5 px-3 py-1">
                  Available for bookings
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Based in Birmingham, AL
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[2rem] bg-yellow-300/15 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-violet-300/15">
                <img
                  src={heroImg}
                  alt="Stovy performing in a cinematic live setting"
                  className="h-[320px] w-full object-cover sm:h-[420px]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-100">
                    Current release
                  </p>
                  <p className="mt-2 text-xl font-semibold text-white">Drift - EP</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-[1.75rem] border border-violet-300/15 bg-[#1c0d2a]/80 shadow-[0_20px_100px_-36px_rgba(168,85,247,0.35)] backdrop-blur-xl">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <SectionHeader
                eyebrow="About"
                title="Built for movement, shaped with intention"
                description="The sound moves between hypnotic grooves and expansive melodies, blending performance energy with a deeply considered studio process."
              />
              <div className="mt-6 space-y-4 text-base leading-8 text-violet-100/80">
                <p>
                  Inspired by the pulse of late-night city lights and the vast presence of the mountains, Stovy develops sets that take the audience on a journey. Each performance is designed to guide the room from tension to release.
                </p>
                <p>
                  Production-wise, the focus stays on unique sound design and rhythm.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.5rem] border border-violet-300/15 bg-[#1d102a]/80 p-6 shadow-[0_20px_80px_-40px_rgba(168,85,247,0.35)] backdrop-blur-xl"
              >
                <p className="text-3xl font-semibold text-white">{item.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.3em] text-violet-200/80">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <InfoCard title="Sound & Style">
            <p>
              Stovy's work spans Dubstep, Riddim and Trap. The sound is meant to hold the listener in a trance.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {sonicTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-yellow-300/25 bg-yellow-300/10 px-3 py-1 text-sm text-yellow-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </InfoCard>

          <InfoCard title="Studio Philosophy">
            <p className="mt-3">
              Favorite tools for creating the signature sound are NI Razor and the Logic native Space Designeer reverb.
            </p>
          </InfoCard>
        </section>

        <section className="rounded-[2rem] border border-violet-300/15 bg-[#1c0d2a]/80 p-6 shadow-[0_20px_100px_-40px_rgba(168,85,247,0.35)] backdrop-blur-xl sm:p-8 lg:p-10">
          <SectionHeader
            eyebrow="Journey"
            title="A steady rise through club culture and beyond"
            description="From early local sets to current international bookings, the path has stayed rooted in authenticity and momentum."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {timeline.map((item) => (
              <div key={item.year} className="rounded-[1.25rem] border border-violet-300/15 bg-[#120914]/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-yellow-300/40">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-200">
                  {item.year}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-violet-200/75">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#1c0d2a]/80 to-[#120914]/90 p-6 shadow-[0_20px_100px_-36px_rgba(250,204,21,0.18)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-100">
                Bookings & Social
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                Available for artist support sets, intimate events & sound system showcases
              </h2>
              <p className="mt-3 text-sm leading-7 text-violet-100/80 sm:text-base">
                Reach out for live bookings or collaborations
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:stovymusic@gmail.com"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Book a Set
              </a>
              <a
                href="https://soundcloud.com/stovymusic"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                SoundCloud
              </a>
              <a
                href="https://instagram.com/stovybass"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Instagram
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}
