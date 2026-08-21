import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

export default function Layout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.14),_transparent_32%),linear-gradient(135deg,_#14091f_0%,_#2b163b_52%,_#160d21_100%)] text-violet-50">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <Outlet />
      </main>
    </div>
  )
}
