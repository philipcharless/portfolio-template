# Philip Bumanglag | Portfolio

Portfolio site for Philip Charles Bumanglag, Systems Integrator & Automation Specialist and partner at [Source Systems](https://sourcesystems.ai). GoHighLevel systems, automations, and AI appointment setters for real estate teams and service businesses.

Stack: Vite 6, React 19, TypeScript, plain CSS custom properties, Three.js, GSAP, Lenis, React Router 7, Phosphor icons, Poppins.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
npm run lint       # ESLint with the TypeScript parser and the React hooks rules
```

## Where the content lives

| What | Where |
|---|---|
| Name, handle, photo, email, booking link, socials, Home headline, phone stats | `src/data/profile.ts` |
| Projects (all eight, grouped) | `src/data/ai-stack.ts` |
| Project case studies (opened from the Projects cards) | `public/case-study.html` (`?p=<project id>`) |
| Clients shown on Testimonials and Home | `src/data/clients.ts` |
| FAQs | `src/data/faqs.ts` |
| Page headlines and copy | the top of `ProjectsGrid`, `ServicesGrid`, `TestimonialsGrid`, `AboutGrid`, `ContactGrid` in `src/components/` |
| Home cards | `src/components/HomeBento.tsx` (desktop), `src/components/HomeMobile.tsx` (phone) |
| Tools marquee | `src/components/ToolsMarquee.tsx` (logos in `public/icons/`) |
| Testimonial videos | `public/testimonials/`, then set `src` in `TestimonialsGrid.tsx` |
| Contact form | `src/lib/contact.ts` (opens the visitor's email app by default; set `VITE_CONTACT_ENDPOINT` to post to a backend) |
| SEO, share image, favicon | `index.html`, `public/favicon.svg` |
| Phone headline size | `--headline-em` in `src/styles/mobile-pass.css` (retune it if the headline changes) |

Open items are marked `[[TODO: ...]]` in the code and on the page.

## Notes

- The background shader measures the visitor's frame rate and steps down on slow machines (`src/lib/perf.ts`).
- From 1100px down the site switches to the phone layout (`src/styles/mobile-app.css`, `src/styles/mobile-pass.css`). Everything respects `prefers-reduced-motion` and the site's own Reduce motion switch.
- Anything new added above the fold on Home must join the intro hold-back list in `src/styles/boot.css`.

## Credits

- Built on the portfolio template by BrewedOps.
- Contour background technique inspired by the landonorris.com site by OFF+BRAND. The simplex noise is Ashima Arts / Ian McEwan (MIT).
- Icons: [Phosphor](https://phosphoricons.com) (MIT) and [Simple Icons](https://simpleicons.org) (CC0). Tool logos in `public/icons/` are trademarks of their owners.
- Font: Poppins (SIL Open Font License).

## License

[PolyForm Noncommercial 1.0.0](LICENSE), with the template's extra permission to use it for your own portfolio, even if that portfolio promotes your paid services. For a commercial license, email brewedops@gmail.com.
