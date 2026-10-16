import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Header from './components/Header'
import SkillsMarquee from './components/SkillsMarquee'
import FilterTabs from './components/FilterTabs'
import VideoCarousel from './components/VideoCarousel'
import About from './components/About'
import Footer from './components/Footer'
import { LockIcon } from './components/icons'
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
        className="mx-auto w-full max-w-6xl flex-1 scroll-mt-16 px-6 pt-10 pb-20"
      >
        <div className="mb-10 text-center">
          <p className="mb-3 font-type text-xs tracking-[0.2em] text-accent uppercase">
            Portfolio
          </p>
          <h2 className="font-display text-3xl text-zinc-50 sm:text-4xl">
            Selected <span className="font-semibold text-accent">Work</span>
          </h2>
          <div aria-hidden className="rule-ornament mt-4">
            <span />
          </div>
          <p className="mt-4 text-zinc-400">
            Browse through the reel — filter by category, then flip through
            the projects.
          </p>
          <p className="mx-auto mt-6 flex max-w-2xl items-start gap-3 rounded-md border border-border bg-surface/60 px-4 py-3 text-left text-sm leading-relaxed text-zinc-400">
            <LockIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>
              Most of my client work is protected under NDA (Non-Disclosure Agreement),
              so what you see on this site are my personal projects and some client
              pieces that aren't covered by one and that I can share publicly.
            </span>
          </p>
        </div>

        <FilterTabs active={activeFilter} onChange={setActiveFilter} />

        <div className="mt-10">
          {/* key resets the carousel position whenever the filter changes */}
          <VideoCarousel key={activeFilter} projects={filteredProjects} />
        </div>
      </main>

      <About />
      <Footer />
    </div>
  )
}

export default App
