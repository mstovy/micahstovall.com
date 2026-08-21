import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "../components/card"

import heroImg from "../assets/images/portraits/profile pic.jpg"
import type { ReactNode } from "react"
import type { JSX } from "react/jsx-runtime"

function InfoCard({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <Card className="w-full rounded-[1.75rem] border border-violet-300/15 bg-[#1c0d2a]/80 shadow-[0_20px_80px_-32px_rgba(168,85,247,0.35)] backdrop-blur-xl">
      <CardContent className="p-6 sm:p-8">
        <CardTitle className="text-lg font-semibold text-white">{title}</CardTitle>
        <div className="mt-3 text-sm leading-7 text-violet-100/80">{children}</div>
      </CardContent>
    </Card>
  )
}

export default function About(): JSX.Element {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.12),_transparent_32%),linear-gradient(135deg,_#14091f_0%,_#2b163b_50%,_#160d21_100%)] text-violet-50">
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative w-full overflow-hidden rounded-[2rem] border border-violet-300/15 bg-[#1b0d2d]/80 shadow-[0_35px_120px_-30px_rgba(168,85,247,0.35)]">
            <div className="absolute inset-0 bg-yellow-300/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem]">
              <img
                src={heroImg}
                alt="Featured"
                className="h-72 w-full object-cover sm:h-96 md:h-[420px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120914] via-[#120914]/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-100">Photographer | Developer | Producer/DJ</p>
              </div>
            </div>
          </div>

          <Card className="h-full rounded-[1.75rem] border border-violet-300/15 bg-[#1c0d2a]/80 shadow-[0_20px_100px_-36px_rgba(168,85,247,0.35)] backdrop-blur-xl">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <div className="inline-flex rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-yellow-100">
                About
              </div>
              <CardTitle className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Clear craft, thoughtful stories.
              </CardTitle>
              <CardDescription className="mt-4 space-y-4">
                <p className="text-base leading-8 text-violet-100/80">
                  Hi, I’m Micah. I shoot adventure style photography, love to produce electronic music that I DJ with and develop web applications.
                  This site showcases the variety of the projects I work on; reach out via the contact page for project inquiries or collaborations.
                </p>
                <p className="text-sm leading-7 text-violet-200/80">
                  Educated with a degree in Photography from the University of Colorado Denver.
                </p>
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <InfoCard title="Background">
            <span>
              Worked across commercial and personal photography projects, focusing on landscape and action sports.
              I value thoughtful composition and a restrained aesthetic.
            </span>
          </InfoCard>

          <InfoCard title="Approach">
            <span>
              I prioritize collaboration and clear communication. My process blends planning with flexibility to capture honest,
              impactful imagery.
            </span>
          </InfoCard>
        </div>
      </section>
    </main>
  )
}
