# Validation — salairenet.lu

## Cas de test verifies contre les baremes officiels

### Cas 1 : Salarie 5 000 EUR brut, classe 1, sans enfants

**Entree :** Brut 5 000 EUR/mois, classe 1, pas d'enfants
**Calcul attendu :**
- Assurance maladie (2,8%) : 140,00 EUR
- Pension (8%) : 400,00 EUR
- Dependance (1,4%) : 70,00 EUR
- Total cotisations : 610,00 EUR
- Impot classe 1 (progressif) : ~822 EUR
- **Net : ~3 568 EUR**

**Source :** impotsdirects.public.lu, ccss.lu

### Cas 2 : Salarie 8 000 EUR brut, classe 2, 2 enfants

**Entree :** Brut 8 000 EUR/mois, classe 2 (marie), 2 enfants
**Calcul attendu :**
- Cotisations sociales : 976,00 EUR
- Impot classe 2 : nettement inferieur a classe 1
- CIS applique
- **Net classe 2 > net classe 1 au meme brut**

### Cas 3 : Frontalier France, 6 000 EUR brut

**Entree :** Brut 6 000 EUR/mois, frontalier France
**Verification :**
- Cotisations sociales luxembourgeoises identiques
- Imposition au Luxembourg (convention fiscale)
- Seuil teletravail : 34 jours/an

**Source :** impotsdirects.public.lu, guichet.public.lu

---

## Build status

- **Build:** 28 pages, 0 errors
- **Tests:** 14/14 passed
- **Sitemap:** auto-generated (sitemap-index.xml)

## Page inventory (28 pages)

| Category | Count | Details |
|---|---|---|
| Home + legal | 3 | index, mentions-legales, confidentialite |
| Tool pages | 1 | faq |
| Guides index | 1 | /guides/ |
| Guide articles | 8 | classes-impot-luxembourg, frontalier-france-luxembourg, frontalier-belgique-luxembourg, cotisations-sociales-luxembourg, credit-impot-salarie, treizieme-mois-luxembourg, salaire-minimum-luxembourg, optimiser-salaire-net-luxembourg |
| Salary pages | 12 | salaire-[brut]-net-luxembourg (3000 through 25000) |
| Frontalier pages | 3 | frontalier-[pays] (france, belgique, allemagne) |

## Components

- SalaryCalculator.tsx (Luxembourg gross-to-net calculator with class selection)

## Data files

- baremes-2026.ts — Luxembourg tax brackets, social contributions, CIS
- salaires-data.ts — 12 salary entries with pre-calculated examples
- frontalier-data.ts — 3 cross-border country entries

## Quality gates

- [x] Build passes (28 pages, 0 errors)
- [x] Tests pass (14/14)
- [x] Sitemap generated
- [x] Schema.org on every page (WebApplication, FAQPage, BreadcrumbList)
- [x] Analytics: Plausible + GA4 placeholder
- [x] robots.txt present
- [x] llms.txt present
- [x] All guide pages > 1500 words
- [x] Disclaimer in footer
- [x] Mobile-responsive navigation (hamburger menu)
- [x] Internal cross-linking between tools and guides
