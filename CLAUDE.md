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

**Category/filter is the central piece of state.** `App.tsx` holds `activeFilter` (`FilterOption['value']`: `'all' | 'movie-tv' | 'nature' | 'anime' | 'gaming' | 'logo-animation' | 'assets-social'`) and derives `filteredProjects` via `useMemo`. It passes `key={activeFilter}` to `VideoCarousel`, which is a deliberate remount trick: it forces the carousel's internal `index` state back to 0 whenever the filter changes, instead of syncing that via an effect.

**`VideoCarousel.tsx` is the most complex component** and has two coupled parts:
1. A "featured" stage (selected clip's embedded iframe + its title/description/tags shown alongside it) — layout ratio differs by `aspectRatio`: vertical (`9:16`) clips get a fixed-width column (`lg:w-[320px]`), horizontal (`16:9`) clips get a flexed, wider column (`lg:flex-[3]`) with the description panel taking `lg:flex-[2]`. This split exists to prevent the description panel from getting squeezed unreadably narrow next to wide 16:9 players — don't reintroduce a height-driven/aspect-ratio-only width for the stage without re-checking that panel width stays usable.
2. A filmstrip carousel below it (all clips in the current filter, horizontally scrollable with CSS scroll-snap, native `scrollBy` for the arrow buttons — no drag library) that lets the user pick which clip becomes "featured". Clicking a `ClipThumb` calls `select(i)`, which also sets a `direction` value consumed by the Framer Motion `variants` on the featured stage so the crossfade slides the correct way.

Thumbnails and the featured player show a clean poster image instead of the provider's embed, so no Vimeo/YouTube player chrome (play button, progress bar, logo) sits on top of the artwork. `src/hooks/usePoster.ts` derives the poster from `Project.embedUrl` — Vimeo via its public oEmbed endpoint (fetched once per video and cached in a module-level map), YouTube via its static thumbnail URL. `FeaturedPlayer` renders that poster with our own accent play button and only mounts the real `iframe` (with `autoplay=1`) once pressed; the Vimeo account is on the free plan, so the chrome can't be hidden with embed parameters like `controls=0` — don't try to go back to a bare iframe. When no poster is available (`usePoster` returns `null`, e.g. Frame.io or a failed fetch) both fall back to the raw embed `iframe`; in `ClipThumb` that iframe is `pointer-events-none`, and the whole thumb is a button, so clicking a filmstrip thumbnail always *selects* it rather than playing it inline.

**Hero/top of page** is `Navbar` (sticky, rendered at the page root so it sticks for the whole page) → `Header` (two-column hero, portrait on the left so the off-camera gaze faces the text) → `SkillsMarquee`. The portrait column is `Portrait3D`: the photo exactly as delivered (`src/assets/portrait.webp`, a 4:5 crop of the untouched source `src/assets/pic-original.png`, no blur or colour tint), with only its outer edges faded into the page via a radial `mask-image` so there's no visible box. The user explicitly wants the photo's original colours kept, so don't add sepia/blur/filters to it. The portrait is deliberately static: the user asked for no cursor tilt/parallax on the photo or its decorations (sparkle, hatched disc, slowly spinning badge), so don't reintroduce mouse-driven motion there. Elsewhere, note that Framer Motion owns the `transform` of `motion.*` elements, so Tailwind `translate-*` classes on them are silently overridden — pass `x`/`y` via `style` instead. `SkillsMarquee` loops seamlessly by rendering two identical `min-w-full` tracks that each translate by `-100%` of their own width — don't go back to a single track translating `-50%`, which leaves a visible gap/jump on wide screens.

**Theming is centralized in `src/index.css`** via a Tailwind v4 `@theme` block (`--color-accent`, `--color-accent-2`, `--color-bg`, `--color-surface`, etc., plus `--font-sans`/`--font-display`). Components reference these only through Tailwind utility classes (`bg-accent`, `text-accent`, `bg-gradient-accent`, `border-border`, …) or the custom `.text-gradient`/`.bg-gradient-accent`/`.scrollbar-none` classes defined in that same file — there are no hardcoded color hex values in component files. To re-theme the site, change the CSS variables in `src/index.css`; do not add per-component colors.

The current look is a dark "edit suite" theme taken from the portrait's own lighting: near-black neutral surfaces (no blue or brown cast — the user rejected a blue-tinted version) with a warm lamp-amber accent, Sora headings (`font-display`), Inter body text (`font-sans`), and JetBrains Mono timecode-style lettering (`font-type`) for small uppercase labels, tags and counters. Components still use Tailwind's `text-zinc-*`/`border-zinc-*` utilities for neutrals, but the `@theme` block overrides the whole `--color-zinc-*` scale with its own neutral greys — so re-tint neutrals there rather than swapping utility classes. Atmosphere details also live in `index.css`: the subtle film grain (`body::before`), the light vignette (`body::after`), the `.rule-ornament` diamond divider under section headings, and the `.bg-pinstripe` cloth pattern on the portrait card. Buttons, tabs and cards use small radii (`rounded-sm`/`rounded-md`) and uppercase letter-spaced labels; only genuinely circular elements (icon buttons, badge, discs) are `rounded-full`.

## Content model (`src/types.ts` / `src/data/projects.json`)

```ts
interface Project {
  id: string
  title: string
  category: 'movie-tv' | 'nature' | 'anime' | 'gaming' | 'logo-animation' | 'assets-social'
  embedUrl: string        // YouTube `.../embed/<id>`, Vimeo `player.vimeo.com/video/<id>`, or Frame.io embed link
  aspectRatio: '16:9' | '9:16'   // match the source video — vertical clips are '9:16'
  description: string
  tags: string[]
}
```

`FilterTabs` derives its seven buttons from a hardcoded `FilterOption[]` list (`'all'` plus the six `category` values) — adding a new category value to the data model means also adding it to that list and to the `categoryLabels` map in `VideoCarousel.tsx`.
