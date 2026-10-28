import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from './dropdown-menu'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

function linkClass({ isActive }: { isActive: boolean }) {
  return isActive
    ? 'rounded-full bg-yellow-300/15 px-3 py-2 text-sm font-medium text-yellow-100 ring-1 ring-yellow-300/40'
    : 'rounded-full px-3 py-2 text-sm font-medium text-violet-100 transition hover:bg-white/10 hover:text-yellow-200'
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 border-b border-violet-300/15 bg-[#190b2a]/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="text-lg font-semibold tracking-tight text-white">
          Micah Stovall
        </NavLink>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <DropdownMenu>
            <DropdownMenuTrigger>
              Menu
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => { navigate('/webdev'); setMobileOpen(false); }}>
                Web Development
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => { navigate('/music'); setMobileOpen(false); }}>
                Music
              </DropdownMenuItem>
              <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      Tools
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onSelect={() => { navigate('/racetimer'); setMobileOpen(false); }}>
                        Race Timer
                      </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => { navigate('/lightning'); setMobileOpen(false); }}>
                        Lightning
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-violet-300/20 bg-[#2a163c]/80 text-violet-50 transition hover:bg-[#341b4a] md:hidden"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            <span className="text-lg">{mobileOpen ? '✕' : '☰'}</span>
          </button>
        </div>

        <div className={`w-full md:hidden ${mobileOpen ? 'block' : 'hidden'}`}>
          <div className="mt-4 space-y-2 rounded-3xl border border-violet-300/15 bg-[#1d102a]/90 p-4 shadow-[0_20px_80px_-40px_rgba(168,85,247,0.35)]">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${linkClass({ isActive })} block w-full bg-transparent px-0 text-left`
                }
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
