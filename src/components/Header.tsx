import { motion } from 'framer-motion'
import Portrait3D from './Portrait3D'
import {
  ArrowRightIcon,
  InstagramIcon,
  LinkedinIcon,
} from './icons'
import { EMAIL } from '../site'

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/djukenzi_', Icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/djukenzi_', Icon: LinkedinIcon },
]

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
})

export default function Header() {
  return (
    <header id="top">
      <section className="relative overflow-hidden">
        {/* gaslight glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/3 right-0 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-[140px]"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pt-16 pb-20 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
          <div>
            <motion.p
              {...fadeUp(0)}
              className="mb-6 inline-flex items-center gap-2 rounded-sm border border-border bg-surface/60 px-3 pt-1.5 pb-1 font-type text-xs tracking-[0.14em] text-zinc-300 uppercase"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Available for new projects
            </motion.p>

            <motion.h1
              {...fadeUp(0.05)}
              className="font-display text-5xl leading-[1.05] tracking-tight text-zinc-50 sm:text-6xl"
            >
              <span className="italic">This is your</span>
              <br />
              <span className="italic">video editor</span>
              <br />
              <span className="font-semibold text-accent">Djordje Stamenkovic</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.12)}
              className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
            >
              I've spent the last 5 years editing video and crafting motion
              design — from movie and TV series summaries to anime, gaming and
              nature edits, plus logo animation. I obsess over rhythm, sound, and visual
              identity that keeps viewers watching from the first second.
            </motion.p>

            <motion.div {...fadeUp(0.2)} className="mt-9 flex flex-wrap items-center gap-6">
              <a
                href={`mailto:${EMAIL}`}
                className="rounded-sm bg-gradient-accent px-6 py-3 text-xs font-semibold tracking-[0.16em] text-on-accent uppercase shadow-lg shadow-accent/20 transition-transform hover:scale-105"
              >
                Let's Work Together
              </a>
              <a
                href="#work"
                className="group inline-flex items-center gap-3 text-xs font-medium tracking-[0.16em] text-zinc-100 uppercase"
              >
                View Work
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.26)} className="mt-10 flex items-center gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-zinc-400 transition-colors hover:bg-accent hover:text-on-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <Portrait3D />
          </motion.div>
        </div>
      </section>
    </header>
  )
}
