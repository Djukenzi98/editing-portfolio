import { EMAIL } from '../site'

const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold text-zinc-50">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-accent text-xs font-bold text-on-accent">
            D
          </span>
          djukenzi
        </a>

        <ul className="hidden items-center gap-8 text-sm text-zinc-400 sm:flex">
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
          className="rounded-full bg-gradient-accent px-4 py-2 text-sm font-semibold text-on-accent shadow-lg shadow-accent/25 transition-transform hover:scale-105"
        >
          Let's Talk
        </a>
      </div>
    </nav>
  )
}
