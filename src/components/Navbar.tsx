import { EMAIL } from '../site'
import { ProjectorIcon } from './icons'

const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          aria-label="Đorđe Stamenković, back to top"
          className="flex items-center gap-2 font-display text-base font-semibold whitespace-nowrap text-zinc-50 sm:text-lg sm:tracking-wide"
        >
          <ProjectorIcon className="h-8 w-8 shrink-0 text-accent" />
          Đorđe Stamenković
        </a>

        <ul className="hidden items-center gap-8 text-xs tracking-[0.18em] text-zinc-400 uppercase sm:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-zinc-50">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${EMAIL}`}
          className="rounded-sm bg-gradient-accent px-4 py-2 text-xs font-semibold tracking-[0.16em] text-on-accent uppercase shadow-lg shadow-accent/20 transition-transform hover:scale-105"
        >
          Let's Talk
        </a>
      </div>
    </nav>
  )
}
