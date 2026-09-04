import { motion } from 'framer-motion'
import type { Project } from '../types'

const categoryLabels: Record<Project['category'], string> = {
  'short-form': 'Short Form',
  gaming: 'Gaming',
  commercial: 'Commercial',
  'long-form': 'Long Form',
}

interface VideoCardProps {
  project: Project
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function VideoCard({ project }: VideoCardProps) {
  const isVertical = project.aspectRatio === '9:16'

  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-zinc-600 ${
        isVertical ? 'sm:col-span-1' : 'sm:col-span-2'
      }`}
    >
      <div
        className={`relative w-full overflow-hidden bg-black ${
          isVertical ? 'mx-auto max-w-[320px] aspect-[9/16]' : 'aspect-video'
        }`}
      >
        <iframe
          src={project.embedUrl}
          title={project.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-accent uppercase">
            {categoryLabels[project.category]}
          </span>
        </div>

        <h3 className="font-display text-lg font-semibold text-zinc-50">
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed text-zinc-400">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-surface-2 px-2 py-1 text-xs font-medium text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
