/**
 * Moteur de calcul salaire brut → net Luxembourg
 * Gère les 3 classes d'impôt, les cotisations sociales et les crédits d'impôt.
 */

import {
  type ClasseImpot,
  TAUX_CNS_MALADIE,
  TAUX_PENSION,
  TAUX_DEPENDANCE,
  TAUX_CNS_MALADIE_EMPLOYEUR,
  TAUX_PENSION_EMPLOYEUR,
  TAUX_ACCIDENT_EMPLOYEUR,
  PLAFOND_COTISATION_ANNUEL,
  TRANCHES_CLASSE_1,
  CIS_MAX_ANNUEL,
  CIS_SEUIL_DEGRESSIVITE,
  CIS_SEUIL_MAX,
  FORFAIT_FO,
  DS_FORFAIT,
  ABATTEMENT_AC,
  ABATTEMENT_MONOPARENTAL,
  TAUX_SOLIDARITE_BAS,
  TAUX_SOLIDARITE_HAUT,
  SEUIL_SOLIDARITE,
  MODERATION_PAR_ENFANT,
} from './baremes-2026';

// --- Types ---

export interface SalaryInput {
  /** Salaire brut mensuel en € */
  brutMensuel: number;
  /** Classe d'impôt (1, 1a, 2) */
  classe: ClasseImpot;
  /** Nombre d'enfants à charge */
  enfants: number;
  /** true si frontalier (FR, BE, DE) */
  frontalier: boolean;
  /** Nombre de mois de salaire par an (12, 13, etc.) */
  moisParAn: number;
}

export interface SalaryResult {
  // Montants mensuels
  brutMensuel: number;
  cotisationCNS: number;
  cotisationPension: number;
  cotisationDependance: number;
  totalCotisationsMensuelles: number;
  impotMensuel: number;
  netMensuel: number;

  // Montants annuels
  brutAnnuel: number;
  totalCotisationsAnnuelles: number;
  revenuImposable: number;
  impotBrutAnnuel: number;
  surtaxeSolidarite: number;
  creditImpotSalarie: number;
  moderationEnfants: number;
  impotNetAnnuel: number;
  netAnnuel: number;

  // Taux effectifs
  tauxCotisations: number;
  tauxImposition: number;
  tauxChargesTotal: number;

  // Coût employeur
  coutEmployeurMensuel: number;
  coutEmployeurAnnuel: number;

  // Infos
  classe: ClasseImpot;
  enfants: number;
}

// --- Calcul des cotisations ---

function calculerCotisationsAnnuelles(brutAnnuel: number): {
  cns: number;
  pension: number;
  dependance: number;
  total: number;
} {
  const assiette = Math.min(brutAnnuel, PLAFOND_COTISATION_ANNUEL);

  const cns = Math.round(assiette * TAUX_CNS_MALADIE * 100) / 100;
  const pension = Math.round(assiette * TAUX_PENSION * 100) / 100;
  // La dépendance s'applique sur le revenu total (pas de plafond pour la dépendance)
  const dependance = Math.round(brutAnnuel * TAUX_DEPENDANCE * 100) / 100;
  const total = cns + pension + dependance;

  return { cns, pension, dependance, total };
}

// --- Calcul de l'impôt ---

function calculerImpotBareme(revenuImposable: number): number {
  let impot = 0;
  let precedent = 0;

  for (const tranche of TRANCHES_CLASSE_1) {
    const plafond = Math.min(revenuImposable, tranche.max);
    if (plafond > precedent) {
      impot += (plafond - precedent) * tranche.taux;
    }
    if (revenuImposable <= tranche.max) break;
    precedent = tranche.max;
  }

  return Math.round(impot * 100) / 100;
}

function calculerImpotAnnuel(
  brutAnnuel: number,
  cotisationsAnnuelles: number,
  classe: ClasseImpot,
  enfants: number,
): {
  revenuImposable: number;
  impotBrut: number;
  surtaxe: number;
  cis: number;
  moderationEnfants: number;
  impotNet: number;
} {
  // Revenu imposable = brut - cotisations - frais d'obtention - dépenses spéciales
  let revenuImposable = brutAnnuel - cotisationsAnnuelles - FORFAIT_FO - DS_FORFAIT;

  // Abattement classe 2 (conjoint)
  if (classe === '2') {
    revenuImposable -= ABATTEMENT_AC;
  }

  // Abattement monoparental (classe 1a)
  if (classe === '1a') {
    revenuImposable -= ABATTEMENT_MONOPARENTAL;
  }

  revenuImposable = Math.max(0, revenuImposable);

  let impotBrut: number;

  if (classe === '2') {
    // Classe 2 : splitting (division par 2, puis × 2)
    impotBrut = calculerImpotBareme(revenuImposable / 2) * 2;
  } else {
    impotBrut = calculerImpotBareme(revenuImposable);
  }

  // Surtaxe de solidarité (contribution au fonds pour l'emploi)
  const tauxSolidarite = revenuImposable >= SEUIL_SOLIDARITE
    ? TAUX_SOLIDARITE_HAUT
    : TAUX_SOLIDARITE_BAS;
  const surtaxe = Math.round(impotBrut * tauxSolidarite * 100) / 100;

  // Crédit d'impôt salarié (CIS)
  let cis = CIS_MAX_ANNUEL;
  if (revenuImposable > CIS_SEUIL_DEGRESSIVITE) {
    const degressivite = (revenuImposable - CIS_SEUIL_DEGRESSIVITE) /
      (CIS_SEUIL_MAX - CIS_SEUIL_DEGRESSIVITE);
    cis = Math.max(0, CIS_MAX_ANNUEL * (1 - degressivite));
  }
  cis = Math.round(cis * 100) / 100;

  // Modération pour enfants
  const moderationEnfants = enfants * MODERATION_PAR_ENFANT;

  // Impôt net
  const impotNet = Math.max(0, impotBrut + surtaxe - cis - moderationEnfants);

  return {
    revenuImposable: Math.round(revenuImposable * 100) / 100,
    impotBrut: Math.round(impotBrut * 100) / 100,
    surtaxe,
    cis,
    moderationEnfants,
    impotNet: Math.round(impotNet * 100) / 100,
  };
}

// --- Fonction principale ---

export function calculerSalaire(input: SalaryInput): SalaryResult {
  const { brutMensuel, classe, enfants, moisParAn } = input;
  const brutAnnuel = brutMensuel * moisParAn;

  // Cotisations
  const cotis = calculerCotisationsAnnuelles(brutAnnuel);

  // Impôt
  const impot = calculerImpotAnnuel(brutAnnuel, cotis.total, classe, enfants);

  // Net annuel et mensuel
  const netAnnuel = brutAnnuel - cotis.total - impot.impotNet;
  const netMensuel = Math.round(netAnnuel / moisParAn * 100) / 100;

  // Coût employeur
  const assietteEmployeur = Math.min(brutAnnuel, PLAFOND_COTISATION_ANNUEL);
  const cotisEmployeurAnnuel = Math.round(
    (assietteEmployeur * (TAUX_CNS_MALADIE_EMPLOYEUR + TAUX_PENSION_EMPLOYEUR + TAUX_ACCIDENT_EMPLOYEUR))
    * 100
  ) / 100;
  const coutEmployeurAnnuel = brutAnnuel + cotisEmployeurAnnuel;

  return {
    brutMensuel,
    cotisationCNS: Math.round(cotis.cns / moisParAn * 100) / 100,
    cotisationPension: Math.round(cotis.pension / moisParAn * 100) / 100,
    cotisationDependance: Math.round(cotis.dependance / moisParAn * 100) / 100,
    totalCotisationsMensuelles: Math.round(cotis.total / moisParAn * 100) / 100,
    impotMensuel: Math.round(impot.impotNet / moisParAn * 100) / 100,
    netMensuel,

    brutAnnuel,
    totalCotisationsAnnuelles: Math.round(cotis.total * 100) / 100,
    revenuImposable: impot.revenuImposable,
    impotBrutAnnuel: impot.impotBrut,
    surtaxeSolidarite: impot.surtaxe,
    creditImpotSalarie: impot.cis,
    moderationEnfants: impot.moderationEnfants,
    impotNetAnnuel: impot.impotNet,
    netAnnuel: Math.round(netAnnuel * 100) / 100,

    tauxCotisations: brutAnnuel > 0 ? Math.round(cotis.total / brutAnnuel * 10000) / 10000 : 0,
    tauxImposition: brutAnnuel > 0 ? Math.round(impot.impotNet / brutAnnuel * 10000) / 10000 : 0,
    tauxChargesTotal: brutAnnuel > 0
      ? Math.round((cotis.total + impot.impotNet) / brutAnnuel * 10000) / 10000
      : 0,

    coutEmployeurMensuel: Math.round(coutEmployeurAnnuel / moisParAn * 100) / 100,
    coutEmployeurAnnuel: Math.round(coutEmployeurAnnuel * 100) / 100,

    classe,
    enfants,
  };
}

/**
 * Calcul inverse : à partir d'un net mensuel souhaité, retrouver le brut.
 */
export function calculerBrutDepuisNet(
  netSouhaite: number,
  classe: ClasseImpot,
  enfants: number,
  frontalier: boolean,
  moisParAn: number,
): number {
  // Approximation itérative (Newton simplifié)
  let brut = netSouhaite * 1.5; // estimation initiale

  for (let i = 0; i < 50; i++) {
    const result = calculerSalaire({ brutMensuel: brut, classe, enfants, frontalier, moisParAn });
    const ecart = result.netMensuel - netSouhaite;

    if (Math.abs(ecart) < 0.5) break;

    // Ajuster proportionnellement
    brut -= ecart * 0.7;
    brut = Math.max(0, brut);
  }

  return Math.round(brut * 100) / 100;
}
