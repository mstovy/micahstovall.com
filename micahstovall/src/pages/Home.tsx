import HomeCard from '../components/HomeCard'

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-violet-300/15 bg-[#1c0d2a]/75 p-8 shadow-[0_35px_120px_-30px_rgba(123,80,180,0.45)] backdrop-blur-xl sm:p-10">
        <div className="max-w-4xl space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-200/80">
              Photography / Music Production / Software Development
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Explore photos, music, and software projects by Micah Stovall
            </h1>
          </div>
          <p className="text-base leading-8 text-violet-100/80 sm:text-lg">
            Need to put something here
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-violet-300/15 bg-[#1c0d2a]/80 p-4 shadow-[0_20px_100px_-40px_rgba(168,85,247,0.35)] backdrop-blur-xl sm:p-6">
        <HomeCard />
      </section>
    </div>
  )
}
