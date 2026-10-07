import { SparkleIcon } from './icons'

const skills = [
  'Premiere Pro',
  'After Effects',
  'DaVinci Resolve',
  'Color Grading',
  'Motion Graphics',
  'Sound Design',
]

/**
 * Infinite ticker. Two identical tracks sit side by side, each at least as
 * wide as the viewport, and both slide by exactly their own width — so when
 * the animation loops, the second track is precisely where the first began
 * and there's no visible jump or gap, at any screen width.
 */
export default function SkillsMarquee() {
  return (
    <div className="border-y border-border bg-surface/60 py-2.5">
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-8 pr-8 will-change-transform"
          >
            {[...skills, ...skills].map((skill, i) => (
              <li
                key={`${skill}-${i}`}
                className="flex shrink-0 items-center gap-8 font-type text-xs tracking-[0.18em] whitespace-nowrap text-zinc-400 uppercase"
              >
                {skill}
                <SparkleIcon className="h-2.5 w-2.5 text-accent" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
