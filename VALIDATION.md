# Validation — salairenet.lu

## Cas de test vérifiés contre les barèmes officiels

### Cas 1 : Salarié 5 000 € brut, classe 1, sans enfants

- **Entrée** : 5 000 € brut/mois, classe 1, 0 enfants, 12 mois
- **Cotisations mensuelles** : CNS 140 € (2,8 %), pension 400 € (8 %), dépendance 70 € (1,4 %) = 610 €
- **Brut annuel** : 60 000 €, cotisations annuelles : 7 320 €
- **Revenu imposable** : 60 000 - 7 320 - 540 - 480 = 51 660 €
- **Source** : CCSS taux 2026, ACD barème 2026

### Cas 2 : Couple classe 2, 8 000 € brut, 2 enfants

- **Entrée** : 8 000 € brut/mois, classe 2, 2 enfants, 12 mois
- **Splitting** : revenu imposable divisé par 2 → taux marginal réduit
- **Modération enfants** : 2 × 922,50 = 1 845 €/an
- **Vérification** : impôt classe 2 < impôt classe 1 (splitting + enfants)
- **Source** : ACD barème 2026, art. 119 L.I.R.

### Cas 3 : Haut salaire au-dessus du plafond de cotisations

- **Entrée** : 15 000 € brut/mois, classe 1, 0 enfants
- **Cotisations plafonnées** : CNS et pension calculées sur 13 311,69 €, dépendance sur 15 000 €
- **CNS mensuelle** : 13 311,69 × 2,8 % = 372,73 €
- **Pension mensuelle** : 13 311,69 × 8 % = 1 064,94 €
- **Dépendance mensuelle** : 15 000 × 1,4 % = 210 €
- **Source** : CCSS plafond SSM × 5 = 13 311,69 €/mois en 2026

## Sources

- [ACD — Barème impôt](https://impotsdirects.public.lu/fr/baremes.html)
- [CCSS — Taux de cotisation](https://ccss.lu/cotisations/)
- [Guichet.lu — SSM](https://guichet.public.lu/fr/entreprises/ressources-humaines/remuneration/salaire-social-minimum.html)
