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
import portraitBg from '../assets/portrait-bg.webp'
import portraitPerson from '../assets/portrait-person.webp'

const BADGE_TEXT = '5+ years in video editing • motion design • '

/**
 * Two-layer portrait built from one photo. The room behind (desk, monitors,
 * lamp) is a static, blurred backdrop whose edges dissolve into the page, so
 * there's no box. The person is cut out of the same photo and sits in a
 * `preserve-3d` layer that tilts toward the cursor; the decorations ride on
 * that layer at deeper translateZ values, so they parallax at different
 * speeds while the room stays put.
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
      <div className="relative aspect-[4/5]">
        {/* static backdrop: blurred, darkened, edges fading into the page */}
        <img
          src={portraitBg}
          alt=""
          width={800}
          height={1000}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover sepia-[.2] select-none [mask-image:radial-gradient(closest-side,black_68%,transparent_100%)]"
        />

        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="absolute inset-0"
        >
          {/* the person: same framing as the backdrop, so it lines up at rest */}
          <motion.img
            src={portraitPerson}
            alt="Đorđe Stamenković"
            width={800}
            height={1000}
            draggable={false}
            style={{ z: 40 }}
            className="absolute inset-0 h-full w-full object-cover sepia-[.2] drop-shadow-[0_0_28px_var(--color-accent-soft)] select-none [mask-image:radial-gradient(ellipse_58%_68%_at_50%_34%,black_72%,transparent_100%)]"
          />

          {/* front decorations: furthest forward, so they drift the most */}
          <motion.div
            style={{ z: 110 }}
            className="absolute top-[4%] right-[4%] text-accent"
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
    </div>
  )
}
