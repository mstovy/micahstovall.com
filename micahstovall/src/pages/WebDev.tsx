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

export default function WebDev(): JSX.Element {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="order-1 w-full overflow-hidden rounded-[2rem] border border-violet-300/15 bg-[#170d25]/75 shadow-[0_35px_120px_-30px_rgba(168,85,247,0.35)]">
          <img
            src={heroImg}
            alt="Studio and web development workspace"
            className="h-72 w-full object-cover sm:h-96 md:h-[420px]"
            loading="lazy"
          />
        </div>

        <div className="order-2">
          <Card className="h-full rounded-[1.75rem] border border-violet-300/15 bg-[#1c0d2a]/80 shadow-[0_20px_100px_-36px_rgba(168,85,247,0.35)] backdrop-blur-xl">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-200/80">
                Web Development
              </p>
              <CardTitle className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                User Experience Focused Design 
              </CardTitle>
              <CardDescription className="mt-4 space-y-4 text-base leading-8 text-violet-100/80">
                <p>
                  Built and maintained full-stack application features across frontend interfaces, backend services, and relational databases while supporting production releases and continuous improvements.
                </p>
                <p>
                  My personal projects combine React, TypeScript, and polished UI systems to create experiences that are both elegant and functional. Professionally, I develop effective solutions for enterprise applications while balancing technical requirements with stakeholder needs.
                </p>
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <InfoCard title="Experience">
          <span>
            4+ Years as a professional Full Stack developer, working mainly in C# & ASP.NET on enterprise applications.
          </span>
        </InfoCard>

        <InfoCard title="This Website">
          <span>
            Designed entirely by Micah with a Vite React frontend utilizing Tailwind for styling. The tools included on this site are experimental projects created for prototyping ideas!
          </span>
        </InfoCard>
      </div>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <InfoCard title="GitHub">
          <span>
            <a
              href="https://github.com/mstovy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-200/80 hover:underline"
            >
              View my GitHub
            </a>
          </span>
        </InfoCard>

        <InfoCard title="LinkedIn">
          <span>
            <a
              href="https://www.linkedin.com/in/micah-stovall/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-200/80 hover:underline"
            >
              View my LinkedIn
            </a>
          </span>
        </InfoCard>
      </div>
    </section>
  )
}
