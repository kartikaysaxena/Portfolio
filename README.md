# Kartikay Saxena — Portfolio

Personal portfolio website, served on **GitHub Pages** and pointed at **ksaxena.tech**.

## Stack
- Plain **HTML / CSS / JavaScript** — no framework, no build step. Fast and dependency-free.
- Content (experience, projects) lives in `app.js` as data.
- Resume PDF links to the live URL in `resume-vault`.

## Development
Open `index.html` in a browser, or run a local server:
```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy
Pushes to `main` auto-deploy via GitHub Pages (repo Settings → Pages → Source: main branch / root).

## Domain
`ksaxena.tech` (and `www`) point at this Pages site via CNAME + DNS records in Hostinger.
