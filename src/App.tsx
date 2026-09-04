import { useMemo, useState } from 'react'
import Header from './components/Header'
import FilterTabs from './components/FilterTabs'
import VideoGrid from './components/VideoGrid'
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
        <FilterTabs active={activeFilter} onChange={setActiveFilter} />

        <div className="mt-10">
          <VideoGrid projects={filteredProjects} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
