# Whites Exterior Cleaning website

Static marketing site for `whitesexteriorcleaning.co.uk`.

## Structure

- `index.html` - homepage
- `privacy.html` - privacy page
- `styles.css` - shared styles
- `script.js` - shared interactions
- `assets/` - favicon and social preview assets
- `assets/logo.png` - main brand logo used in the site header/footer
- `robots.txt` and `sitemap.xml` - basic SEO files

## Local editing workflow

1. Edit content in `index.html` or `privacy.html`.
2. Edit design in `styles.css`.
3. Edit interactions in `script.js`.
4. Open `index.html` in a browser or serve the folder locally.

## Cloudflare Pages deployment

- Repository root: this folder
- Build command: none
- Build output directory: `/`

Because the site is plain static HTML, CSS and JS, Cloudflare Pages can deploy it directly with no build step.

## Recommended next steps

- Replace placeholder social preview SVG with a branded PNG when available.
- Add real project photos if you want a before-and-after gallery.
- Wire the contact form to a real backend or email API if you want server-side submission tracking.
