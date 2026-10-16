import { ArrowRightIcon } from './icons'
import caykeeks from '../assets/channels/caykeeks.webp'
import caylus from '../assets/channels/caylus.webp'
import caylusblox from '../assets/channels/caylusblox.webp'
import cayluscraft from '../assets/channels/cayluscraft.webp'
import dangmattsmith from '../assets/channels/dangmattsmith.webp'
import infinite from '../assets/channels/infinite.webp'
import kreativekyle from '../assets/channels/kreativekyle.webp'
import kreekcraft from '../assets/channels/kreekcraft.webp'
import mitchsummers from '../assets/channels/mitchsummers.webp'
import reactiontime from '../assets/channels/reactiontime.webp'
import sssniperwolf from '../assets/channels/sssniperwolf.webp'
import theprincefamily from '../assets/channels/theprincefamily.webp'

const channels = [
  { name: 'SSSniperWolf', href: 'https://www.youtube.com/@SSSniperWolf', avatar: sssniperwolf },
  { name: 'Infinite', href: 'https://www.youtube.com/@infinite', avatar: infinite },
  { name: 'Reaction Time', href: 'https://www.youtube.com/@reactiontime', avatar: reactiontime },
  { name: 'DangMattSmith', href: 'https://www.youtube.com/@dangmattsmith', avatar: dangmattsmith },
  { name: 'Caylus', href: 'https://www.youtube.com/channel/UCVAYy7_zddIx6USjXscV9Vg', avatar: caylus },
  { name: 'KreekCraft', href: 'https://www.youtube.com/@KreekCraft', avatar: kreekcraft },
  { name: 'The Prince Family', href: 'https://www.youtube.com/@TheOfficialPrinceFamily', avatar: theprincefamily },
  { name: 'Kreative Kyle', href: 'https://www.youtube.com/@KreativeKyle', avatar: kreativekyle },
  { name: 'Mitch Summers', href: 'https://www.youtube.com/@MitchSummers', avatar: mitchsummers },
  { name: 'CaylusBlox', href: 'https://www.youtube.com/@caylusblox', avatar: caylusblox },
  { name: 'CaylusCraft', href: 'https://www.youtube.com/channel/UC2vQdergcFuZIZ5ufQiPnbg', avatar: cayluscraft },
  { name: 'cay & keeks', href: 'https://www.youtube.com/@caykeeks', avatar: caykeeks },
]

const facts = [
  { value: '5+ years', label: 'Professional video editing' },
  { value: 'Worldwide', label: 'YouTube creators, real estate firms & news agencies' },
  { value: "Bachelor's", label: 'Faculty of Electronic Engineering, University of Niš' },
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
              I've worked with international clients and companies, editing
              for a range of influencers across their YouTube channels,
              Instagram accounts and other social platforms (you can see the
              YouTube channels I've edited for below), as well as for real
              estate firms and news agencies, delivering everything from
              fast-paced short-form edits to long-form videos.
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

        <div className="mt-16">
          <p className="mb-6 text-center font-type text-xs tracking-[0.2em] text-zinc-400 uppercase">
            Channels I've edited for
          </p>
          <ul className="flex flex-wrap justify-center gap-4">
            {channels.map((channel) => (
              <li
                key={channel.name}
                className="w-[calc(50%-0.5rem)] sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-5rem)/6)]"
              >
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col items-center gap-3 rounded-md border border-border bg-surface/60 px-4 py-6 text-center transition-all hover:-translate-y-1 hover:border-accent/60 hover:bg-surface"
                >
                  <img
                    src={channel.avatar}
                    alt=""
                    width={80}
                    height={80}
                    loading="lazy"
                    className="h-20 w-20 rounded-full object-cover ring-2 ring-border transition-[box-shadow] group-hover:ring-accent"
                  />
                  <span className="font-display text-base font-semibold text-zinc-50 sm:text-lg lg:text-base">
                    {channel.name}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-type text-[0.7rem] tracking-[0.14em] text-zinc-400 uppercase transition-colors group-hover:text-accent">
                    YouTube
                    <ArrowRightIcon className="h-3.5 w-3.5 -rotate-45" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
