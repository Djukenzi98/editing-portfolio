import { SparkleIcon } from './icons'
import portraitBg from '../assets/portrait-bg.webp'
import portraitPerson from '../assets/portrait-person.webp'

const BADGE_TEXT = '5+ years in video editing • motion design • '

/**
 * Two-layer portrait built from one photo: the room behind (desk, monitors,
 * lamp) is a blurred backdrop whose edges dissolve into the page, so there's
 * no box, and the person, cut out of the same photo, sits sharp on top for a
 * shallow depth-of-field look. Static decorations (sparkle, hatched disc,
 * badge) frame it.
 */
export default function Portrait3D() {
  return (
    <div className="relative mx-auto w-full max-w-[26rem]">
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

        {/* the person: same framing as the backdrop, so the two line up */}
        <img
          src={portraitPerson}
          alt="Đorđe Stamenković"
          width={800}
          height={1000}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover sepia-[.2] drop-shadow-[0_0_28px_var(--color-accent-soft)] select-none [mask-image:radial-gradient(ellipse_58%_68%_at_50%_34%,black_72%,transparent_100%)]"
        />

        {/* decorations */}
        <div className="absolute top-[4%] right-[4%] text-accent">
          <SparkleIcon className="h-9 w-9 -rotate-12 drop-shadow-[0_0_14px_var(--color-accent)]" />
        </div>

        <div className="bg-hatch absolute bottom-[14%] left-[-4%] h-14 w-14 rounded-full text-accent-2" />

        <div className="absolute right-0 bottom-[22%] sm:right-[-4%] h-28 w-28 sm:h-32 sm:w-32">
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
        </div>
      </div>
    </div>
  )
}
