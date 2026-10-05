# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server (http://localhost:5173)
npm run build     # tsc -b (type-check via project references) + vite build
npm run preview   # preview the production build locally
npm run lint      # oxlint (rules: react, typescript, oxc — see .oxlintrc.json)
```

There is no test suite/framework configured in this project.

`npm run build` runs `tsc -b` first, so a type error anywhere fails the build even if Vite itself would have bundled fine — always run `npm run build` (not just `npm run dev`) before considering a change done.

## Git workflow

This repo is the only record of the work — commit and push after every meaningful change so nothing is ever left uncommitted only on disk:

- After finishing a change (a feature, fix, redesign, content edit — anything a user would recognize as "done"), run `git add -A`, commit, and `git push` in the same turn. Don't batch multiple unrelated changes into one commit, and don't leave working-tree changes uncommitted at the end of a turn.
- Write clean, descriptive commit messages: a short imperative summary line (e.g. `Add clip filmstrip carousel and switch theme to yellow/black`), plus a body describing *what* changed and *why* when the change isn't self-evident from the summary alone. Avoid vague messages like `update` or `fixes`.
- Verify `npm run build` passes before committing — don't push a broken build.
- If `git push` fails because Git Credential Manager hangs waiting for interactive auth (this has happened before in this environment), use the `gh` CLI's stored credentials instead: `git -c credential.helper= -c "credential.helper=!gh auth git-credential" push`.
- Confirm destructive/history-rewriting git operations (force-push, reset --hard, rebase) with the user first — everything else (add, commit, regular push) should happen proactively as part of finishing the work, not only when asked.

## Architecture

Single-page React 19 + TypeScript app scaffolded with Vite, styled with Tailwind CSS v4 (via the `@tailwindcss/vite` plugin, no separate `tailwind.config.js`/PostCSS config — theme tokens live in `src/index.css`), animated with Framer Motion. No backend, no database, no router — it's a static portfolio site meant to deploy to Vercel as-is.

**Content is data-driven from a single JSON file.** `src/data/projects.json` is the only source of portfolio content (work items). `src/App.tsx` imports it, casts it to `Project[]` (`src/types.ts`), and filters it in memory — there is no fetch/API layer. When adding or editing portfolio work, edit this JSON file rather than touching component code.

**Category/filter is the central piece of state.** `App.tsx` holds `activeFilter` (`FilterOption['value']`: `'all' | 'movie-tv' | 'nature' | 'anime' | 'gaming' | 'logo-animation'`) and derives `filteredProjects` via `useMemo`. It passes `key={activeFilter}` to `VideoCarousel`, which is a deliberate remount trick: it forces the carousel's internal `index` state back to 0 whenever the filter changes, instead of syncing that via an effect.

**`VideoCarousel.tsx` is the most complex component** and has two coupled parts:
1. A "featured" stage (selected clip's embedded iframe + its title/description/tags shown alongside it) — layout ratio differs by `aspectRatio`: vertical (`9:16`) clips get a fixed-width column (`lg:w-[320px]`), horizontal (`16:9`) clips get a flexed, wider column (`lg:flex-[3]`) with the description panel taking `lg:flex-[2]`. This split exists to prevent the description panel from getting squeezed unreadably narrow next to wide 16:9 players — don't reintroduce a height-driven/aspect-ratio-only width for the stage without re-checking that panel width stays usable.
2. A filmstrip carousel below it (all clips in the current filter, horizontally scrollable with CSS scroll-snap, native `scrollBy` for the arrow buttons — no drag library) that lets the user pick which clip becomes "featured". Clicking a `ClipThumb` calls `select(i)`, which also sets a `direction` value consumed by the Framer Motion `variants` on the featured stage so the crossfade slides the correct way.

Thumbnails and the featured player both render the *real* embed `iframe` (YouTube/Vimeo/etc., from `Project.embedUrl`) at small size rather than a fetched thumbnail image — this works because unautoplayed embeds just show their native poster/play-button and stay lightweight until pressed. `ClipThumb` iframes are `pointer-events-none` and a transparent overlay button captures the click instead, so clicking a filmstrip thumbnail always *selects* it rather than playing it inline.

**Hero/top of page** is `Navbar` (sticky, rendered at the page root so it sticks for the whole page) → `Header` (two-column hero) → `SkillsMarquee`. The hero's right column is `Portrait3D`: a background-removed, grayscale cut-out (`src/assets/portrait.webp`, generated from the untouched source photo `src/assets/pic-original.png`) that is taller than the card behind it so the head breaks over the card's top edge. Depth comes from a `preserve-3d` scene that tilts toward the cursor, with each layer at a different Framer Motion `z` (translateZ) so layers parallax at different speeds. `SkillsMarquee` loops seamlessly by rendering two identical `min-w-full` tracks that each translate by `-100%` of their own width — don't go back to a single track translating `-50%`, which leaves a visible gap/jump on wide screens.

**Theming is centralized in `src/index.css`** via a Tailwind v4 `@theme` block (`--color-accent`, `--color-accent-2`, `--color-bg`, `--color-surface`, etc., plus `--font-sans`/`--font-display`). Components reference these only through Tailwind utility classes (`bg-accent`, `text-accent`, `bg-gradient-accent`, `border-border`, …) or the custom `.text-gradient`/`.bg-gradient-accent`/`.scrollbar-none` classes defined in that same file — there are no hardcoded color hex values in component files. To re-theme the site, change the CSS variables in `src/index.css`; do not add per-component colors.

## Content model (`src/types.ts` / `src/data/projects.json`)

```ts
interface Project {
  id: string
  title: string
  category: 'movie-tv' | 'nature' | 'anime' | 'gaming' | 'logo-animation'
  embedUrl: string        // YouTube `.../embed/<id>`, Vimeo `player.vimeo.com/video/<id>`, or Frame.io embed link
  aspectRatio: '16:9' | '9:16'   // match the source video — vertical clips are '9:16'
  description: string
  tags: string[]
}
```

`FilterTabs` derives its six buttons from a hardcoded `FilterOption[]` list (`'all'` plus the five `category` values) — adding a new category value to the data model means also adding it to that list and to the `categoryLabels` map in `VideoCarousel.tsx`.
