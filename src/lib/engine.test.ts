import { describe, it, expect } from 'vitest';
import { calculerSalaire, calculerBrutDepuisNet } from './engine';

const DEFAULT_INPUT = {
  frontalier: false,
  moisParAn: 12,
};

describe('cotisations sociales', () => {
  it('calcule les cotisations pour un salaire standard', () => {
    const result = calculerSalaire({
      brutMensuel: 5_000,
      classe: '1',
      enfants: 0,
      ...DEFAULT_INPUT,
    });

    // CNS 2.8% de 5000 = 140/mois
    expect(result.cotisationCNS).toBeCloseTo(140, 0);
    // Pension 8% de 5000 = 400/mois
    expect(result.cotisationPension).toBeCloseTo(400, 0);
    // Dépendance 1.4% de 5000 = 70/mois
    expect(result.cotisationDependance).toBeCloseTo(70, 0);
    // Total = 610/mois
    expect(result.totalCotisationsMensuelles).toBeCloseTo(610, 0);
  });

  it('plafonne les cotisations CNS et pension au plafond SSM×5', () => {
    const result = calculerSalaire({
      brutMensuel: 15_000, // > plafond mensuel 13_311.69
      classe: '1',
      enfants: 0,
      ...DEFAULT_INPUT,
    });

    // CNS plafonnée : 13_311.69 × 0.028 = 372.73/mois
    expect(result.cotisationCNS).toBeCloseTo(372.73, 0);
    // Pension plafonnée : 13_311.69 × 0.08 = 1_064.94/mois
    expect(result.cotisationPension).toBeCloseTo(1_064.94, 0);
    // Dépendance NON plafonnée : 15_000 × 0.014 = 210/mois
    expect(result.cotisationDependance).toBeCloseTo(210, 0);
  });
});

describe('impôt sur le revenu', () => {
  it('ne prélève pas d\'impôt pour un revenu sous le seuil d\'exonération', () => {
    const result = calculerSalaire({
      brutMensuel: 800,
      classe: '1',
      enfants: 0,
      ...DEFAULT_INPUT,
    });

    expect(result.impotNetAnnuel).toBe(0);
  });

  it('calcule l\'impôt classe 1 pour un revenu moyen', () => {
    const result = calculerSalaire({
      brutMensuel: 4_500,
      classe: '1',
      enfants: 0,
      ...DEFAULT_INPUT,
    });

    // Brut annuel = 54_000
    // Cotis ≈ 54000 × 0.122 = 6588
    // RI ≈ 54000 - 6588 - 540 - 480 = 46_392
    // Impôt > 0
    expect(result.impotNetAnnuel).toBeGreaterThan(0);
    expect(result.impotMensuel).toBeGreaterThan(0);
    expect(result.netMensuel).toBeLessThan(4_500);
  });

  it('applique le splitting en classe 2', () => {
    const resultC1 = calculerSalaire({
      brutMensuel: 8_000,
      classe: '1',
      enfants: 0,
      ...DEFAULT_INPUT,
    });
    const resultC2 = calculerSalaire({
      brutMensuel: 8_000,
      classe: '2',
      enfants: 0,
      ...DEFAULT_INPUT,
    });

    // Classe 2 devrait payer moins d'impôt grâce au splitting
    expect(resultC2.impotNetAnnuel).toBeLessThan(resultC1.impotNetAnnuel);
    expect(resultC2.netMensuel).toBeGreaterThan(resultC1.netMensuel);
  });

  it('applique l\'abattement monoparental en classe 1a', () => {
    const resultC1 = calculerSalaire({
      brutMensuel: 6_000,
      classe: '1',
      enfants: 1,
      ...DEFAULT_INPUT,
    });
    const resultC1a = calculerSalaire({
      brutMensuel: 6_000,
      classe: '1a',
      enfants: 1,
      ...DEFAULT_INPUT,
    });

    // Classe 1a devrait payer moins d'impôt grâce à l'abattement monoparental
    expect(resultC1a.impotNetAnnuel).toBeLessThan(resultC1.impotNetAnnuel);
  });

  it('applique la modération pour enfants', () => {
    const sans = calculerSalaire({
      brutMensuel: 6_000,
      classe: '2',
      enfants: 0,
      ...DEFAULT_INPUT,
    });
    const avec = calculerSalaire({
      brutMensuel: 6_000,
      classe: '2',
      enfants: 2,
      ...DEFAULT_INPUT,
    });

    expect(avec.moderationEnfants).toBeCloseTo(922.50 * 2, 0);
    expect(avec.impotNetAnnuel).toBeLessThan(sans.impotNetAnnuel);
  });
});

describe('crédit d\'impôt salarié (CIS)', () => {
  it('accorde le CIS max pour un revenu modéré', () => {
    const result = calculerSalaire({
      brutMensuel: 3_000,
      classe: '1',
      enfants: 0,
      ...DEFAULT_INPUT,
    });

    expect(result.creditImpotSalarie).toBeCloseTo(696, 0);
  });

  it('réduit le CIS pour un haut revenu', () => {
    const result = calculerSalaire({
      brutMensuel: 6_000,
      classe: '1',
      enfants: 0,
      ...DEFAULT_INPUT,
    });

    // RI ≈ 65000 → au-dessus du seuil de dégressivité
    expect(result.creditImpotSalarie).toBeLessThan(696);
  });
});

describe('calcul complet', () => {
  it('calcule un net cohérent pour 5000€ brut classe 1', () => {
    const result = calculerSalaire({
      brutMensuel: 5_000,
      classe: '1',
      enfants: 0,
      ...DEFAULT_INPUT,
    });

    // Net doit être entre 55% et 85% du brut
    expect(result.netMensuel).toBeGreaterThan(5_000 * 0.55);
    expect(result.netMensuel).toBeLessThan(5_000 * 0.85);
    expect(result.tauxChargesTotal).toBeGreaterThan(0.15);
    expect(result.tauxChargesTotal).toBeLessThan(0.45);
  });

  it('gère le 13ème mois', () => {
    const result12 = calculerSalaire({
      brutMensuel: 5_000,
      classe: '1',
      enfants: 0,
      frontalier: false,
      moisParAn: 12,
    });
    const result13 = calculerSalaire({
      brutMensuel: 5_000,
      classe: '1',
      enfants: 0,
      frontalier: false,
      moisParAn: 13,
    });

    // 13 mois → brut annuel plus élevé → net annuel plus élevé
    expect(result13.brutAnnuel).toBe(65_000);
    expect(result13.netAnnuel).toBeGreaterThan(result12.netAnnuel);
  });

  it('calcule le coût employeur', () => {
    const result = calculerSalaire({
      brutMensuel: 5_000,
      classe: '1',
      enfants: 0,
      ...DEFAULT_INPUT,
    });

    // Coût employeur > brut
    expect(result.coutEmployeurMensuel).toBeGreaterThan(5_000);
    // Cotis employeur ≈ 11.8% (2.8 + 8 + 1)
    expect(result.coutEmployeurMensuel).toBeLessThan(5_000 * 1.15);
  });

  it('gère un salaire à 0', () => {
    const result = calculerSalaire({
      brutMensuel: 0,
      classe: '1',
      enfants: 0,
      ...DEFAULT_INPUT,
    });

    expect(result.netMensuel).toBe(0);
    expect(result.impotNetAnnuel).toBe(0);
    expect(result.tauxChargesTotal).toBe(0);
  });
});

describe('calcul inverse', () => {
  it('retrouve le brut à partir du net', () => {
    const brut = calculerBrutDepuisNet(3_500, '1', 0, false, 12);
    const result = calculerSalaire({
      brutMensuel: brut,
      classe: '1',
      enfants: 0,
      ...DEFAULT_INPUT,
    });

    expect(result.netMensuel).toBeCloseTo(3_500, 0);
  });
});
