# El Houssin Razouki — Portfolio

A single-page portfolio built with **Vite + React + TypeScript** and plain CSS. The look is a notebook or scrapbook: lined paper, handwritten notes, washi tape, polaroids and folder-tab project cards.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build locally
```

## Edit content

All copy lives in **`src/data/content.ts`**: profile, about, projects, experience, skills, education and certifications. Components only handle layout.

### Add your images

1. Put files in `public/` (for example `public/me.jpg` or `public/projects/aevo-1.png`).
2. Reference them in `content.ts` with a leading slash:
   - `profile.photo = '/me.jpg'`
   - `profile.deskPhoto = '/desk.jpg'`
   - `projects[i].media.images = ['/projects/aevo-1.png', '/projects/aevo-2.png']`

Any slot left empty shows a striped placeholder with its label.

### To-dos
- Add the App Store links for Aevo and Study Time (`href` in `content.ts`). The "View project" link only appears when `href` is set.
- `public/El_Houssin_Razouki_Resume.pdf` powers the "Download CV" button. Replace it whenever the CV changes.

## Structure

```
src/
  data/content.ts          ← all text, links and image paths
  styles/global.css        ← design tokens (colors, fonts) and all styles
  hooks/useActiveSection.ts← highlights the current nav tab while scrolling
  components/
    Nav, Hero, About, Projects, ProjectCard,
    Experience, Skills, Education, Contact
    Decor.tsx              ← Tape, ImageSlot, Polaroid, SectionHeading
    Icons.tsx              ← inline SVG icons
```

## Design tokens

Colors and fonts are CSS variables at the top of `global.css` (`--yellow`, `--blue`, `--pink`, `--mint`, `--ink`, ...).
Fonts come from Google Fonts: **Silkscreen** (pixel display), **Gochi Hand** (handwriting), **Inter** (body) and **Space Mono** (labels).

## Deploy

It's a static site. On Vercel or Netlify, import the repo with the Vite preset: build command `npm run build`, output folder `dist`.
