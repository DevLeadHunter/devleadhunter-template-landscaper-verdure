# Eco Landscaping — `landscaper-verdure`

Template site web **paysagiste / fleuriste / aménagement extérieur** pour DevLeadHunter.

Intégration pixel-faithful de la maquette Pencil `landscape.pen` (Eco Landscaping) :
Homepage, About, Services (+ détail), Portfolio (+ détail), Contact.

## Preview

```bash
npm install
npm run dev
```

Ouvre ensuite l’URL locale affichée par Nuxt (souvent `http://localhost:3000`).

## Pages

| Route              | Maquette         |
| ------------------ | ---------------- |
| `/`                | Homepage         |
| `/about`           | About            |
| `/services`        | Services         |
| `/services/:slug`  | Single services  |
| `/portfolio`       | Portfolio        |
| `/portfolio/:slug` | Single portfolio |
| `/contact`         | Contact          |

## Notes

- Contenu, couleurs (`#2d746d`, `#003f2e`, `#bcff83`, `#f5f6ef`), typo Inter et images reprises depuis le `.pen`.
- Pas encore branché sur `SiteContent` / demo-host — intentional pour valider la DA d’abord.
- Root layer futur : `LandscaperVerdureRoot.vue`.
