import { useMemo, useState } from 'react'
import Header from './components/Header'
import FilterTabs from './components/FilterTabs'
import VideoCarousel from './components/VideoCarousel'
import Footer from './components/Footer'
import projectsData from './data/projects.json'
import type { FilterOption, Project } from './types'

const projects = projectsData as Project[]

function App() {
  const [activeFilter, setActiveFilter] = useState<FilterOption['value']>(
    'all',
  )

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter((project) => project.category === activeFilter)
  }, [activeFilter])

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-14">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-semibold text-zinc-50 sm:text-4xl">
            Selected Work
          </h2>
          <p className="mt-2 text-zinc-400">
            Browse through the reel — filter by category, then flip through
            the projects.
          </p>
        </div>

        <FilterTabs active={activeFilter} onChange={setActiveFilter} />

        <div className="mt-10">
          {/* key resets the carousel position whenever the filter changes */}
          <VideoCarousel key={activeFilter} projects={filteredProjects} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
