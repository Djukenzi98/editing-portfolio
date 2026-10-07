import { MailIcon, InstagramIcon } from './icons'
import { EMAIL } from '../site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="font-display text-2xl font-semibold text-zinc-50 sm:text-3xl">
          Got a project <span className="text-accent">in mind?</span>
        </h2>
        <div aria-hidden className="rule-ornament mt-4">
          <span />
        </div>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">
          I'm always open to new collaborations — from short-form content
          to full-scale productions. Reach out and let's make something
          worth watching.
        </p>

        <a
          href={`mailto:${EMAIL}`}
          className="mt-8 inline-flex items-center gap-2 rounded-sm bg-gradient-accent px-6 py-3 text-xs font-semibold tracking-[0.16em] text-on-accent uppercase shadow-lg shadow-accent/20 transition-transform hover:scale-105"
        >
          Hire Me
        </a>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-border pt-8 text-sm text-zinc-500 sm:flex-row sm:justify-between">
          <p>© {year} Djordje Stamenkovic. All rights reserved.</p>
          <div className="flex gap-4">
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              title="Email"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-accent hover:text-accent"
            >
              <MailIcon className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com/djukenzi_"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-accent hover:text-accent"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
