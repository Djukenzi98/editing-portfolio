# Portfolio – Video Editor & Motion Designer

React (Vite) + TypeScript + Tailwind CSS v4 + Framer Motion. Bez backenda i baze — svi radovi se čuvaju u `src/data/projects.json`.

## Pokretanje

```bash
npm install
npm run dev
```

Otvori `http://localhost:5173`.

## Izmena sadržaja

- **Ime, opis, kontakt, socijalne mreže** → `src/components/Header.tsx` i `src/components/Footer.tsx`.
- **Radovi (portfolio stavke)** → `src/data/projects.json`. Svaki objekat ima:
  - `id` – jedinstveni string
  - `title` – naslov rada
  - `category` – jedna od: `"short-form"`, `"gaming"`, `"commercial"`, `"long-form"`
  - `embedUrl` – embed link (YouTube `https://www.youtube.com/embed/<ID>`, Vimeo `https://player.vimeo.com/video/<ID>`, ili Frame.io embed link)
  - `aspectRatio` – `"16:9"` ili `"9:16"` (za `short-form` radove uvek `"9:16"`)
  - `description` – kratak opis (1-2 rečenice)
  - `tags` – niz stringova (npr. `["Color Grading", "Sound Design"]`)

Trenutni podaci u fajlu su placeholder (demo) video zapisi — zameni `embedUrl`, naslove i opise svojim pravim radovima.

## Deploy na Vercel

1. Push-uj repo na GitHub.
2. Na [vercel.com](https://vercel.com) izaberi "Import Project" i selektuj repo.
3. Vercel automatski prepoznaje Vite projekat (build command: `npm run build`, output: `dist`) — nije potrebna dodatna konfiguracija.
