import HomeCard from '../components/HomeCard'

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-10 shadow-sm shadow-slate-200/60">
        <div className="max-w-4xl space-y-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
              Welcome back
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Explore the homepage gallery with parallax scrolling
            </h1>
          </div>
          <p className="text-base leading-8 text-slate-600 sm:text-lg">
            Each image section is built to feel smooth, modern, and responsive. Add or replace
            files under <code className="rounded-lg bg-slate-100 px-2 py-1 text-sm text-slate-700">src/assets/images</code> to update the gallery automatically.
          </p>
        </div>
      </section>

      <HomeCard />
    </div>
  )
}
