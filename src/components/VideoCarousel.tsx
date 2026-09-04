import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../types'
import { ChevronLeftIcon, ChevronRightIcon } from './icons'

const categoryLabels: Record<Project['category'], string> = {
  'short-form': 'Short Form',
  gaming: 'Gaming',
  commercial: 'Commercial',
  'long-form': 'Long Form',
}

interface VideoCarouselProps {
  projects: Project[]
}

const stageVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction >= 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction >= 0 ? -40 : 40 }),
}

export default function VideoCarousel({ projects }: VideoCarouselProps) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const railRef = useRef<HTMLDivElement>(null)

  if (projects.length === 0) {
    return (
      <div className="py-24 text-center text-zinc-500">
        No work in this category yet.
      </div>
    )
  }

  const total = projects.length
  const current = projects[index]
  const isVertical = current.aspectRatio === '9:16'

  const select = (i: number) => {
    if (i === index) return
    setDirection(i > index ? 1 : -1)
    setIndex(i)
  }

  const scrollRail = (dir: number) => {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({ left: dir * rail.clientWidth * 0.7, behavior: 'smooth' })
  }

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') select((index + 1) % total)
        if (e.key === 'ArrowLeft') select((index - 1 + total) % total)
      }}
      className="outline-none"
    >
      {/* featured clip: selected video + description side by side */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
        <div
          className={`relative mx-auto w-full lg:mx-0 ${
            isVertical
              ? 'max-w-[320px] lg:w-[320px] lg:shrink-0'
              : 'max-w-xl lg:max-w-none lg:flex-[3]'
          }`}
        >
          <div
            className="relative w-full overflow-hidden rounded-3xl border border-border bg-black shadow-2xl shadow-black/40"
            style={{ aspectRatio: isVertical ? '9 / 16' : '16 / 9' }}
          >
            <AnimatePresence custom={direction} mode="wait" initial={false}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={stageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <iframe
                  src={current.embedUrl}
                  title={current.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-8 lg:min-w-[280px] lg:flex-[2]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="flex h-full flex-col justify-center"
            >
              <span className="w-fit rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold tracking-wide text-accent uppercase">
                {categoryLabels[current.category]}
              </span>

              <h3 className="mt-4 font-display text-2xl font-semibold text-zinc-50 sm:text-3xl">
                {current.title}
              </h3>

              <p className="mt-4 text-base leading-relaxed text-zinc-400">
                {current.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-surface-2 px-2.5 py-1 text-xs font-medium text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* clip carousel: pick which clip is featured above */}
      {total > 1 && (
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-display text-sm tabular-nums text-zinc-500">
              Clip {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollRail(-1)}
                aria-label="Scroll clips left"
                className="rounded-full border border-border p-1.5 text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-100"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollRail(1)}
                aria-label="Scroll clips right"
                className="rounded-full border border-border p-1.5 text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-100"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={railRef}
            className="scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth py-1"
          >
            {projects.map((project, i) => (
              <ClipThumb
                key={project.id}
                project={project}
                active={i === index}
                onClick={() => select(i)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface ClipThumbProps {
  project: Project
  active: boolean
  onClick: () => void
}

function ClipThumb({ project, active, onClick }: ClipThumbProps) {
  const isVertical = project.aspectRatio === '9:16'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={`Show ${project.title}`}
      className={`group relative h-24 shrink-0 snap-start overflow-hidden rounded-xl border bg-black transition-all sm:h-28 ${
        active
          ? 'border-accent ring-2 ring-accent/50'
          : 'border-border opacity-70 hover:opacity-100 hover:border-zinc-500'
      }`}
      style={{ aspectRatio: isVertical ? '9 / 16' : '16 / 9' }}
    >
      <iframe
        src={project.embedUrl}
        title={project.title}
        loading="lazy"
        tabIndex={-1}
        className="pointer-events-none h-full w-full border-0"
      />
      <span
        className={`pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/90 via-black/10 to-transparent p-2 text-left transition-opacity ${
          active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <span className="line-clamp-1 text-[11px] font-medium text-zinc-100">
          {project.title}
        </span>
      </span>
      {active && (
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
      )}
    </button>
  )
}
