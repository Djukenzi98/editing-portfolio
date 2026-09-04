export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="font-display text-2xl font-semibold text-zinc-50 sm:text-3xl">
          Imate projekat na umu?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-zinc-400">
          Uvek sam otvoren za saradnju — od kratkih formata do dugih
          produkcija. Javite se i napravimo nešto vredno gledanja.
        </p>

        <a
          href="mailto:hello@markopetrovic.com"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-zinc-950 transition-transform hover:scale-105"
        >
          Angažuj me
        </a>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-border pt-8 text-sm text-zinc-500 sm:flex-row sm:justify-between">
          <p>© {year} Marko Petrović. Sva prava zadržana.</p>
          <div className="flex gap-5">
            <a href="mailto:hello@markopetrovic.com" className="hover:text-zinc-200">
              Email
            </a>
            <a
              href="https://instagram.com/yourhandle"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-200"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com/@yourhandle"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-200"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
