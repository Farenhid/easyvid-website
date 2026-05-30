# EasyVid Landing Page

Single-page marketing site for [easyvid.online](https://easyvid.online), built from the Google Stitch project **Easyvid.online ai Ads** (Cinematic Noir design system).

## Preview locally

```bash
python3 -m http.server 8080
```

Open http://localhost:8080

## Structure

| File | Purpose |
|------|---------|
| `index.html` | Full landing page (Tailwind CDN + Stitch design tokens) |
| `assets/main.js` | Scroll reveal, before/after slider, portfolio filters, FAQ, mobile nav |

## Deploy (Cloudflare Pages)

1. Connect this repo to Cloudflare Pages
2. Set build output directory to `/` (repo root)
3. Point `easyvid.online` DNS to Pages

## Contact CTAs

All primary buttons link to `mailto:fred.sommerfeld@easyvid.online`.
