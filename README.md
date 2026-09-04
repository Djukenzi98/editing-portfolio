# Portfolio – Video Editor & Motion Designer

React (Vite) + TypeScript + Tailwind CSS v4 + Framer Motion. No backend and no database — all work items live in `src/data/projects.json`.

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Editing content

- **Name, bio, contact, socials** → `src/components/Header.tsx` and `src/components/Footer.tsx`.
- **Work items** → `src/data/projects.json`. Each object has:
  - `id` – unique string
  - `title` – project title
  - `category` – one of: `"short-form"`, `"gaming"`, `"commercial"`, `"long-form"`
  - `embedUrl` – embed link (YouTube `https://www.youtube.com/embed/<ID>`, Vimeo `https://player.vimeo.com/video/<ID>`, or a Frame.io embed link)
  - `aspectRatio` – `"16:9"` or `"9:16"` (short-form work should always be `"9:16"`)
  - `description` – short description (1-2 sentences)
  - `tags` – array of strings (e.g. `["Color Grading", "Sound Design"]`)

The current data is placeholder (demo) footage — swap `embedUrl`, titles and descriptions for your own work.

## Browsing the reel

Work is displayed as a **carousel**: one project at a time, with its description alongside (or below, on smaller screens). Navigate with the arrow buttons, the dots, arrow keys, or by swiping/dragging the video. Switching a filter tab resets the carousel back to the first matching project.

## Deploying to Vercel

1. Push the repo to GitHub.
2. On [vercel.com](https://vercel.com), choose "Import Project" and select the repo.
3. Vercel auto-detects the Vite project (build command: `npm run build`, output: `dist`) — no extra configuration needed.
