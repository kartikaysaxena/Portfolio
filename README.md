# Kartikay Saxena — Portfolio

Personal site, served from **GitHub Pages** at **[ksaxena.tech](https://ksaxena.tech)**.

Minimal and text-first, in the spirit of [antfu.me](https://antfu.me): a single
prose column, no cards or hero images, links that reveal themselves on hover, a
light/dark toggle that wipes across the page, and a generative fractal-branch
canvas drifting in behind it all.

## Stack

Plain **HTML / CSS / JavaScript**. No framework, no bundler, no build step —
open a file and it runs.

- Icons are inlined as CSS mask data-URIs, so they inherit `currentColor` and
  cost no extra requests.
- Colour scheme is applied before first paint by a small inline script, so there
  is no flash on load.
- The theme toggle uses the View Transitions API for a circular wipe, degrading
  to an instant swap where that's unavailable or where the visitor has asked for
  reduced motion.

## Layout

```
index.html          Home — bio and links
projects.html       Projects, grouped by open source / personal
experience.html     Roles, toolbox, education, odds and ends
404.html            Not-found page (uses absolute asset paths on purpose)
styles/main.css     The whole design system
scripts/app.js      Colour scheme toggle, scroll-to-top
scripts/plum.js     Generative canvas backdrop
favicon.svg
serve.mjs           Zero-dependency dev server
CNAME               ksaxena.tech
```

The **Resume** nav link points straight at the PDF published by
[resume-vault](https://github.com/kartikaysaxena/resume-vault), where a GitHub
Action recompiles it from LaTeX on every push:

```
https://kartikaysaxena.github.io/resume-vault/software_engineer/software-engineer.pdf
```

Nothing to sync — there's no copy of the PDF in this repo.

## Development

```bash
node serve.mjs          # → http://localhost:8000
# or, if you'd rather:
python -m http.server 8000
```

## Deploy

Pushes to `main` auto-deploy via GitHub Pages (Settings → Pages → Source: `main`
/ root). `ksaxena.tech` and `www` point at the Pages site through the `CNAME`
file plus DNS records in Hostinger.
