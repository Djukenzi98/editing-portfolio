import { MailIcon, InstagramIcon, YoutubeIcon } from './icons'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="font-display text-2xl font-semibold text-zinc-50 sm:text-3xl">
          Got a project in mind?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-zinc-400">
          I'm always open to new collaborations — from short-form content
          to full-scale productions. Reach out and let's make something
          worth watching.
        </p>

        <a
          href="mailto:hello@djordjestamenkovic.com"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-accent/20 transition-transform hover:scale-105"
        >
          Hire Me
        </a>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-border pt-8 text-sm text-zinc-500 sm:flex-row sm:justify-between">
          <p>© {year} Djordje Stamenkovic. All rights reserved.</p>
          <div className="flex gap-4">
            <a
              href="mailto:hello@djordjestamenkovic.com"
              aria-label="Email"
              title="Email"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-zinc-500 hover:text-zinc-200"
            >
              <MailIcon className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com/yourhandle"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-zinc-500 hover:text-zinc-200"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com/@yourhandle"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              title="YouTube"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-zinc-500 hover:text-zinc-200"
            >
              <YoutubeIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
