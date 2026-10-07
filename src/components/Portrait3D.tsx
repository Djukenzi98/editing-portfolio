import { useRef } from 'react'
import type { MouseEvent } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { SparkleIcon } from './icons'
import portrait from '../assets/portrait.webp'

const BADGE_TEXT = '5+ years in video editing • motion design • '

/**
 * Cut-out portrait that "pops" out of a card: the photo is taller than the
 * card behind it, so the head breaks over its top edge. The whole scene tilts
 * toward the cursor, and each layer sits at a different translateZ depth, so
 * the card, person and decorations move at different speeds (parallax).
 */
export default function Portrait3D() {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  // cursor position within the scene, normalized to -0.5 … 0.5
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const spring = { stiffness: 120, damping: 18, mass: 0.6 }
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), spring)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), spring)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative mx-auto w-full max-w-[26rem] [perspective:1200px]"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative aspect-[4/5]"
      >
        {/* back layer: card the portrait stands in */}
        <div className="absolute inset-x-0 top-[26%] bottom-0 overflow-hidden rounded-md border border-border bg-surface">
          <div className="bg-pinstripe absolute inset-0 opacity-50 [mask-image:radial-gradient(circle_at_50%_40%,black,transparent_80%)]" />
          <div className="absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/30 blur-[90px]" />
        </div>

        {/* hatched disc behind the head */}
        <motion.div
          style={{ z: -40 }}
          className="bg-hatch absolute top-[4%] left-[8%] h-16 w-16 rounded-full text-zinc-600/60"
        />

        {/* the person — closest main layer */}
        <motion.img
          src={portrait}
          alt="Djordje Stamenkovic"
          width={643}
          height={959}
          draggable={false}
          style={{ z: 60 }}
          className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 sepia-[.35] drop-shadow-[0_0_28px_var(--color-accent-soft)] select-none [mask-image:linear-gradient(to_bottom,black_82%,transparent_97%)]"
        />

        {/* front decorations: furthest forward, so they drift the most */}
        <motion.div
          style={{ z: 110 }}
          className="absolute top-[10%] right-[4%] text-accent"
        >
          <SparkleIcon className="h-9 w-9 -rotate-12 drop-shadow-[0_0_14px_var(--color-accent)]" />
        </motion.div>

        <motion.div
          style={{ z: 90 }}
          className="bg-hatch absolute bottom-[14%] left-[-4%] h-14 w-14 rounded-full text-accent-2"
        />

        <motion.div
          style={{ z: 130 }}
          className="absolute right-0 bottom-[22%] sm:right-[-4%] h-28 w-28 sm:h-32 sm:w-32"
        >
          <div className="relative h-full w-full rounded-full border border-accent-2/70 bg-bg/70 backdrop-blur-sm">
            <svg
              viewBox="0 0 100 100"
              className="animate-spin-slow absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="badge-circle"
                  d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
                />
              </defs>
              <text className="fill-zinc-200 font-type text-[8.4px] tracking-[0.16em] uppercase">
                <textPath href="#badge-circle" textLength="228" lengthAdjust="spacing">{BADGE_TEXT}</textPath>
              </text>
            </svg>
            <SparkleIcon className="absolute top-1/2 left-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-zinc-50" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
