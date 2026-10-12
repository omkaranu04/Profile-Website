# Profile Website

Personal site of **Omkar Bhandare** — a single-page, data-driven profile built with React + Vite.

- **frontend/** — the site (deployed on Vercel)
- **backend/** — a Vercel serverless function (`/api/cp`) that serves live Codeforces, CodeChef and AtCoder ratings and rating history

## Updating content

All text lives in `frontend/src/data/`. You should rarely need to touch a component.

| File | What it controls |
| --- | --- |
| `profile.js` | Name, tagline, rotating roles, intro, About text, socials, writing blurb, résumé link |
| `experience.js` | Internships / jobs (newest first) |
| `projects.js` | Project and competition cards, filter categories, the featured card |
| `achievements.js` | CP handles + fallback ratings, entrance-exam honours |
| `sections.js` | Section order, numbering, nav labels and legacy URL aliases |

Text fields accept `**bold**` for emphasis.

**Add a project:** append an object to `projects` in `projects.js`. Set `featured: true` on one project to give it the wide lead card.

**Add a résumé button:** put the PDF in `frontend/public/` (e.g. `resume.pdf`) and set `resume: '/resume.pdf'` in `profile.js`. It then appears in the hero and the command menu.

## Features

- Light (“paper”) and dark (“ink”) themes — follows the OS, remembers a manual choice
- Command menu: <kbd>⌘K</kbd> / <kbd>Ctrl K</kbd> or <kbd>/</kbd> to jump to any section, project or link
- Live CP ratings with interactive rating-history charts; falls back to stored peak ratings if the API is unreachable
- Scroll-spy navigation, reading-progress bar, reveal-on-scroll (disabled under `prefers-reduced-motion`)
- Old URLs (`/about`, `/experience`, `/projects`, `/hackathons`, `/cp`) land on the matching section
- SEO: meta description, Open Graph / Twitter card (`public/og.png`), JSON-LD `Person` schema

## Development

```bash
npm install            # root: installs `concurrently`
npm install --prefix frontend
npm install --prefix backend
npm run dev --prefix frontend
```

Set `VITE_API_URL` (e.g. in `frontend/.env.local`) to the backend’s base URL to load live ratings locally.

```bash
npm run build --prefix frontend   # production build in frontend/dist
```
