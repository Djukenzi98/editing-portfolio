import { useId } from 'react'
import { motion } from 'framer-motion'

// A strip of film being cut by a pair of scissors — the "video editor"
// flourish under the hero name. The strip is a solid accent band with
// sprocket holes and frame windows knocked out through a mask, so it reads
// correctly over any background.
export default function FilmStripCut({ className = '' }: { className?: string }) {
  // useId output contains characters that break `url(#…)` references
  const id = `film${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const holes = `${id}-holes`
  const frames = `${id}-frames`
  const mask = `${id}-mask`

  return (
    <span aria-hidden className={`flex items-center ${className}`}>
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        className="relative z-10 -mr-1.5 h-7 w-7 shrink-0 text-zinc-200"
        initial={{ opacity: 0, x: -14, rotate: -20 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
      >
        <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8.12 8.12 12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M21 3.5 8.12 15.88" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M14.8 14.8 21 20.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </motion.svg>

      <motion.svg
        width="100%"
        height="22"
        className="block min-w-0 flex-1 origin-left text-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <defs>
          <pattern id={holes} width="14" height="22" patternUnits="userSpaceOnUse">
            <rect x="4" y="2.5" width="6" height="3.5" rx="1" fill="black" />
            <rect x="4" y="16" width="6" height="3.5" rx="1" fill="black" />
          </pattern>
          <pattern id={frames} width="42" height="22" patternUnits="userSpaceOnUse">
            <rect x="2" y="8" width="38" height="6" rx="0.75" fill="black" fillOpacity="0.55" />
          </pattern>
          <mask id={mask}>
            {/* angled left edge: the end the scissors just cut */}
            <path d="M6 0H100000V22H0Z" fill="white" />
            <rect width="100%" height="22" fill={`url(#${holes})`} />
            <rect width="100%" height="22" fill={`url(#${frames})`} />
          </mask>
        </defs>
        <rect width="100%" height="22" fill="currentColor" mask={`url(#${mask})`} />
      </motion.svg>
    </span>
  )
}
