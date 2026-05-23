import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "../components/card"

import heroImg from "../assets/images/portraits/profile pic.jpg"
import type { ReactNode } from "react";
import type { JSX } from "react/jsx-runtime";

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Card className="w-full rounded-[2rem] border border-slate-200/90 bg-white shadow-sm">
      
      <CardContent className="p-6">
        
        <CardTitle className="text-lg font-semibold text-slate-900">
          {title}
        </CardTitle>

        <div className="mt-3 text-sm leading-6 text-slate-600">
          {children}
        </div>

      </CardContent>
    </Card>
  );
}

export default function About(): JSX.Element {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero: split layout */}
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div className="order-1 w-full overflow-hidden rounded-2xl md:order-1">
          <img
            src={heroImg}
            alt="Featured"
            className="h-72 w-full object-cover sm:h-96 md:h-[420px]"
            loading="lazy"
          />
        </div>

        <div className="order-2">
          <Card className="h-full">
            <CardContent>
              <CardTitle>About</CardTitle>
              <CardDescription>
                <p className="mb-4 text-slate-700">
                  Hi — I’m Micah. I create clean, minimal photography and web experiences focused
                  on clarity and craft. This site showcases project work and galleries; reach out
                  via the contact page for project inquiries or collaborations.
                </p>
                <p className="text-sm text-slate-600">
                  Educated with a degree in Photography from the University of Colorado Denver.
                </p>
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lower content: two info cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <InfoCard title="Background">
          <span>
            Worked across commercial and personal photography projects, focusing on
            landscape and action sports. I value thoughtful composition and a restrained
            aesthetic.
          </span>
        </InfoCard>

        <InfoCard title="Approach">
          <span>
            I prioritize collaboration and clear communication. My process blends planning
            with flexibility to capture honest, impactful imagery.
          </span>
        </InfoCard>
      </div>
    </section>
  )
}
