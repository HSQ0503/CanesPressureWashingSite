# Canes Pressure Washing — Website

Static website for [canespressurewashing.com](https://canespressurewashing.com), taken over from the previous developer (built with the Uplift site builder) and redeployed by Urso on Vercel. 53 pre-rendered HTML pages: home, services (14), service areas (21), tips/blog (4), projects (2), reviews, about, contact, privacy, terms, sitemap, 404, thanks.

## Deploy (Vercel)

Pure static site — no build step. Import the repo, framework preset **Other**, leave build command and output directory empty.

- `vercel.json` sets `cleanUrls: true` + `trailingSlash: false`, which reproduces the old host's `.htaccess` rewrites (all internal links are extensionless, e.g. `/about-us` → `about-us.html`).
- `404.html` at the root is picked up automatically as the custom 404 page.
- `.vercelignore` keeps the Uplift theme's PHP source (never executed — kept for reference only) out of the deployment.
- After deploy, point the `canespressurewashing.com` + `www` domains at Vercel. **The old host (InMotion) already serves a "Default Server Page", i.e. the site is currently offline — DNS cutover is urgent.**

## Local preview

```
npx serve -l 3311 .
```

## What changed from the original export

Added: `vercel.json` (replaces `.htaccess`), `robots.txt`, `sitemap.xml` (49 URLs, extensionless, excludes 404/thanks/demo-banner/verification), this README, `.gitignore`/`.vercelignore`.

Excluded from the repo: `error_log` and `uplift-data/logs/` (server logs — leak an Uplift control-panel API key), `.htaccess` (Apache-only, translated to `vercel.json`).

Kept as-is: `google0074db803279751b.html` (Search Console verification), `736076fe98dc4dcea6204eb231134a0b.txt` (IndexNow key), the Uplift theme under `uplift-data/themes/` (CSS/JS/fonts are live dependencies; PHP is dead source).

## Verified before first deploy (2026-07-17)

- All 53 pages serve 200 on their clean URLs; custom 404 works; correct MIME types.
- Zero broken internal links; all 95 referenced local assets exist; all sitemap URLs resolve.
- Privacy + Terms carry the full SMS/A2P compliance language (consent, STOP/HELP, frequency, message & data rates, no-sharing clause) — do not edit these without checking the A2P campaign implications.
- No secrets or PII in the tree.

## Known issues (inherited from the live site — fix later, deliberately not changed for the initial like-for-like deploy)

1. **Lead forms**: the contact page embeds a GoHighLevel form (`link.servicedrip.com`) and a leftover Jobber work-request script (the Jobber account is dead). Replacing lead intake with the platform's own `/request` endpoint is the planned follow-up step.
2. **Old-brand (Root2Roof Exteriors) leftovers**: contact email/website in the privacy + terms contact blocks; Nextdoor link in header/footer of every page; Google Maps embeds on contact-us and near-me pinned to the old Orlando location; `root2roof-banner.jpg` as the concrete-cleaning page's og:image; three customer reviews naming the old brand.
3. Minor: `/demo-banner` template leftover page (linked from `/sitemap`), malformed meta description on the Clermont page, typos in terms ("only is explicitly opted in", "Reponsibility"), no `rel=canonical` tags.
