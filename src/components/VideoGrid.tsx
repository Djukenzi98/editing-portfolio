import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../types'
import VideoCard from './VideoCard'

interface VideoGridProps {
  projects: Project[]
}

export default function VideoGrid({ projects }: VideoGridProps) {
  if (projects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-24 text-center text-zinc-500"
      >
        Trenutno nema radova u ovoj kategoriji.
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-6 sm:grid-cols-2"
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <VideoCard key={project.id} project={project} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
