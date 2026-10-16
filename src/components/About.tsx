const facts = [
  { value: '5+ years', label: 'Professional video editing' },
  { value: "Bachelor's", label: 'Faculty of Electronic Engineering, University of Niš' },
  { value: 'Worldwide', label: 'YouTube creators, real estate firms & news agencies' },
]

export default function About() {
  return (
    <section id="about" className="scroll-mt-16 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="mb-3 font-type text-xs tracking-[0.2em] text-accent uppercase">
            About
          </p>
          <h2 className="font-display text-3xl text-zinc-50 sm:text-4xl">
            The Editor <span className="font-semibold text-accent">Behind the Cut</span>
          </h2>
          <div aria-hidden className="rule-ornament mt-4">
            <span />
          </div>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
            <p>
              Video editing is my passion, and for more than half a decade it
              has also been my profession. I hold a Bachelor's degree from the
              Faculty of Electronic Engineering, University of Niš, and that
              technical background shapes how I work: I know my tools inside out and
              build workflows that keep projects moving.
            </p>
            <p>
              I've worked with international clients and companies, including{' '}
              <span className="text-zinc-200">Caylus</span> and his channels{' '}
              <span className="text-zinc-200">Infinite</span> and{' '}
              <span className="text-zinc-200">CaylusBlox</span>, as well as real
              estate firms and news agencies, delivering everything from
              fast-paced short-form edits to long-form videos. Most of that
              work is under NDA, so what you see on this site are my personal
              projects and client pieces that aren't covered by one.
            </p>
            <p>
              Alongside client work, I'm developing ways to connect AI with
              video editing software on a deeper level than has been possible
              so far, so that the technical side of editing gets faster and
              more time goes into the creative decisions that make a video
              work.
            </p>
          </div>

          <ul className="grid gap-4">
            {facts.map((fact) => (
              <li
                key={fact.value}
                className="rounded-md border border-border bg-surface/60 px-6 py-5"
              >
                <p className="font-display text-2xl font-semibold text-accent">
                  {fact.value}
                </p>
                <p className="mt-1 font-type text-xs tracking-[0.14em] text-zinc-400 uppercase">
                  {fact.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
