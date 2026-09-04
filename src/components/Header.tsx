import { motion } from 'framer-motion'
import { MailIcon, InstagramIcon, YoutubeIcon, LinkedinIcon } from './icons'

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/yourhandle', Icon: InstagramIcon },
  { label: 'YouTube', href: 'https://youtube.com/@yourhandle', Icon: YoutubeIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/yourhandle', Icon: LinkedinIcon },
]

const skills = [
  'Premiere Pro',
  'After Effects',
  'DaVinci Resolve',
  'Color Grading',
  'Motion Graphics',
  'Sound Design',
]

export default function Header() {
  return (
    <header className="relative overflow-hidden border-b border-border">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-accent/25 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-accent-2/20 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-16 sm:pt-32 sm:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium tracking-wide text-zinc-300 uppercase backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Available for new projects
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-zinc-50 sm:text-7xl"
        >
          Djordje <span className="text-gradient">Stamenkovic</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mt-3 font-display text-xl text-zinc-400 sm:text-2xl"
        >
          Video Editor &amp; Motion Designer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          I've spent the last 5 years editing video and crafting motion
          design — from short-form social content to gaming montages and
          commercial spots. I obsess over rhythm, sound, and visual
          identity that keeps viewers watching from the first second.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="mailto:hello@djordjestamenkovic.com"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-accent px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-accent/20 transition-transform hover:scale-105"
          >
            <MailIcon className="h-4 w-4" />
            hello@djordjestamenkovic.com
          </a>

          <div className="flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-50"
              >
                <Icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* skills marquee */}
      <div className="relative border-t border-border bg-surface/60 py-4 backdrop-blur">
        <div className="flex overflow-hidden">
          <div className="flex w-max shrink-0 animate-marquee items-center gap-10 pr-10">
            {[...skills, ...skills].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="flex shrink-0 items-center gap-2 font-display text-sm tracking-wide text-zinc-500 uppercase"
              >
                <span className="h-1 w-1 rounded-full bg-accent" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
