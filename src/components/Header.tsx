import { motion } from 'framer-motion'

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/yourhandle' },
  { label: 'YouTube', href: 'https://youtube.com/@yourhandle' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/yourhandle' },
]

export default function Header() {
  return (
    <header className="relative overflow-hidden border-b border-border">
      {/* subtle background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 flex items-center gap-2 text-sm font-medium tracking-wide text-accent uppercase"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Dostupan za nove projekte
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-50 sm:text-6xl"
        >
          Marko Petrović
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mt-2 font-display text-xl text-zinc-400 sm:text-2xl"
        >
          Video Editor &amp; Motion Designer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          Bavim se video montažom i motion dizajnom već 5 godina — od kratkih
          formata za društvene mreže do gaming montaža i reklamnih spotova.
          Fokus mi je na ritmu, zvuku i vizuelnom identitetu koji drži pažnju
          gledaoca od prve sekunde.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="mailto:hello@markopetrovic.com"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-transform hover:scale-105"
          >
            hello@markopetrovic.com
          </a>

          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-zinc-400 underline-offset-4 transition-colors hover:text-zinc-50 hover:underline"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  )
}
