/**
 * Barèmes fiscaux et cotisations sociales Luxembourg 2026
 * Sources : Administration des contributions directes (ACD), Centre commun de la sécurité sociale (CCSS)
 * Dernière mise à jour : janvier 2026
 */

// --- Cotisations sociales salarié ---

/** Assurance maladie-maternité (CNS) — part salariale */
export const TAUX_CNS_MALADIE = 0.028; // 2,8 %

/** Assurance pension — part salariale */
export const TAUX_PENSION = 0.08; // 8 %

/** Assurance dépendance */
export const TAUX_DEPENDANCE = 0.014; // 1,4 %

/** Cotisation santé au travail (anciennement mutualité) */
// Incluse dans les cotisations CNS

// --- Cotisations employeur ---

export const TAUX_CNS_MALADIE_EMPLOYEUR = 0.028; // 2,8 %
export const TAUX_PENSION_EMPLOYEUR = 0.08; // 8 %
export const TAUX_ACCIDENT_EMPLOYEUR = 0.01; // ~1 % (variable par secteur)
export const TAUX_MUTUALITE_EMPLOYEUR = 0.0; // supprimée en 2024 (intégrée budget État)

/** Plafond de cotisation mensuel (SSM × 5) */
export const PLAFOND_COTISATION_MENSUEL = 13_311.69; // 5 × SSM 2026
export const PLAFOND_COTISATION_ANNUEL = PLAFOND_COTISATION_MENSUEL * 12;

/** Salaire social minimum (SSM) mensuel non qualifié 2026 */
export const SSM_NON_QUALIFIE = 2_662.34;
/** SSM qualifié (+20%) */
export const SSM_QUALIFIE = 3_194.81;

// --- Impôt sur le revenu ---

/** Classe d'impôt */
export type ClasseImpot = '1' | '1a' | '2';

/**
 * Barème de l'impôt sur le revenu 2026 (par an)
 * Classe 1 — taux progressif
 * Source : Art. 118 L.I.R., ACD
 */
export interface TrancheFiscale {
  /** Limite supérieure de la tranche (incluse) */
  max: number;
  /** Taux marginal */
  taux: number;
}

export const TRANCHES_CLASSE_1: TrancheFiscale[] = [
  { max: 11_265, taux: 0.00 },
  { max: 13_173, taux: 0.08 },
  { max: 15_081, taux: 0.09 },
  { max: 16_989, taux: 0.10 },
  { max: 18_897, taux: 0.11 },
  { max: 20_805, taux: 0.12 },
  { max: 22_713, taux: 0.14 },
  { max: 24_621, taux: 0.16 },
  { max: 26_529, taux: 0.18 },
  { max: 28_437, taux: 0.20 },
  { max: 30_345, taux: 0.22 },
  { max: 32_253, taux: 0.24 },
  { max: 34_161, taux: 0.26 },
  { max: 36_069, taux: 0.28 },
  { max: 37_977, taux: 0.30 },
  { max: 39_885, taux: 0.32 },
  { max: 41_793, taux: 0.34 },
  { max: 43_701, taux: 0.36 },
  { max: 45_609, taux: 0.38 },
  { max: 100_002, taux: 0.39 },
  { max: 150_000, taux: 0.40 },
  { max: 200_004, taux: 0.41 },
  { max: Infinity, taux: 0.42 },
];

/**
 * Pour la classe 2, le barème s'applique sur le revenu divisé par 2,
 * puis l'impôt est multiplié par 2.
 *
 * Pour la classe 1a, on utilise le barème classe 1 avec un ajustement
 * (abattement monoparental).
 */

// --- Crédits d'impôt ---

/** Crédit d'impôt pour salariés (CIS) — annuel */
export const CIS_MAX_ANNUEL = 696;
/** Seuil de début de dégressivité du CIS */
export const CIS_SEUIL_DEGRESSIVITE = 45_000;
/** Le CIS est nul au-delà de ce revenu */
export const CIS_SEUIL_MAX = 85_000;

/** Crédit d'impôt pour pensionnés (CIP) — annuel */
export const CIP_MAX_ANNUEL = 696;

// --- Abattements et déductions ---

/** Frais d'obtention (forfait minimum annuel) */
export const FORFAIT_FO = 540;
/** Déduction pour frais de déplacement (forfait annuel max) */
export const FORFAIT_DEPLACEMENT = 2_970;
/** Abattement extra-professionnel (AC) pour classe 2 */
export const ABATTEMENT_AC = 4_500;
/** Minimum pour le conjoint classe 2 */

/** Dépenses spéciales forfaitaires (DS minimum) */
export const DS_FORFAIT = 480;

/** Abattement monoparental (classe 1a) */
export const ABATTEMENT_MONOPARENTAL = 4_500;

// --- Contribution au fonds pour l'emploi ---

/** Surtaxe de solidarité : 7 % de l'impôt pour revenus < 150 000 */
export const TAUX_SOLIDARITE_BAS = 0.07;
/** Surtaxe de solidarité : 9 % de l'impôt pour revenus >= 150 000 */
export const TAUX_SOLIDARITE_HAUT = 0.09;
/** Seuil de basculement */
export const SEUIL_SOLIDARITE = 150_000;

// --- Bonus enfant ---

/** Modération d'impôt par enfant à charge (annuel) */
export const MODERATION_PAR_ENFANT = 922.50;
