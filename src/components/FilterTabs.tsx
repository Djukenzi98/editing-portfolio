import { motion } from 'framer-motion'
import type { FilterOption } from '../types'

const filters: FilterOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Movie & TV Series Summaries', value: 'movie-tv' },
  { label: 'Nature Edits', value: 'nature' },
  { label: 'Anime', value: 'anime' },
  { label: 'Gaming', value: 'gaming' },
  { label: 'Logo Animation', value: 'logo-animation' },
]

interface FilterTabsProps {
  active: FilterOption['value']
  onChange: (value: FilterOption['value']) => void
}

export default function FilterTabs({ active, onChange }: FilterTabsProps) {
  return (
    <nav
      aria-label="Filter projects"
      className="scrollbar-none -mx-6 flex gap-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
    >
      {filters.map((filter) => {
        const isActive = filter.value === active
        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            aria-pressed={isActive}
            className={`relative shrink-0 rounded-sm border px-4 py-2 text-xs font-medium tracking-[0.14em] whitespace-nowrap uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              isActive
                ? 'border-transparent text-on-accent'
                : 'border-border text-zinc-400 hover:border-zinc-600 hover:text-zinc-100'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="active-filter-pill"
                className="absolute inset-0 rounded-sm bg-gradient-accent"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">{filter.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
