import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Header from './components/Header'
import SkillsMarquee from './components/SkillsMarquee'
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
      <Navbar />
      <Header />
      <SkillsMarquee />

      <main
        id="work"
        className="mx-auto w-full max-w-6xl flex-1 scroll-mt-16 px-6 py-20"
      >
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            Portfolio
          </p>
          <h2 className="font-display text-3xl font-light text-zinc-50 sm:text-4xl">
            Selected <span className="font-semibold text-accent">Work</span>
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
