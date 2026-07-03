/**
 * Données SEO pour les pages programmatiques salaire brut → net Luxembourg
 * Chaque entrée correspond à un niveau de salaire avec des valeurs pré-calculées
 * (classe 1, 0 enfants, 12 mois) et du contenu éditorial optimisé SEO.
 */

import { calculerSalaire } from './engine';
import type { ClasseImpot } from './baremes-2026';

// --- Types ---

export interface SalaireFAQ {
  question: string;
  answer: string;
}

export interface SalaireClassResult {
  netMensuel: number;
  netFormatted: string;
  cotisationsMensuelles: number;
  cotisationsFormatted: string;
  impotMensuel: number;
  impotFormatted: string;
  tauxChargesTotal: number;
}

export interface SalaireEntry {
  slug: string;
  brut: number;
  brutFormatted: string;
  /** Résultat pré-calculé classe 1, 0 enfants */
  classe1: SalaireClassResult;
  /** Résultat pré-calculé classe 1a, 0 enfants */
  classe1a: SalaireClassResult;
  /** Résultat pré-calculé classe 2, 0 enfants */
  classe2: SalaireClassResult;
  description: string;
  faqs: SalaireFAQ[];
}

// --- Helpers ---

const fmtEuro = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const fmtEuro2 = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const fmtNumber = new Intl.NumberFormat('fr-FR');

function computeClass(brut: number, classe: ClasseImpot): SalaireClassResult {
  const r = calculerSalaire({
    brutMensuel: brut,
    classe,
    enfants: 0,
    frontalier: false,
    moisParAn: 12,
  });
  return {
    netMensuel: r.netMensuel,
    netFormatted: fmtEuro2.format(r.netMensuel),
    cotisationsMensuelles: r.totalCotisationsMensuelles,
    cotisationsFormatted: fmtEuro2.format(r.totalCotisationsMensuelles),
    impotMensuel: r.impotMensuel,
    impotFormatted: fmtEuro2.format(r.impotMensuel),
    tauxChargesTotal: r.tauxChargesTotal,
  };
}

// --- Data ---

const rawEntries: Omit<SalaireEntry, 'classe1' | 'classe1a' | 'classe2'>[] = [
  {
    slug: '3000',
    brut: 3000,
    brutFormatted: fmtNumber.format(3000) + ' €',
    description:
      "Un salaire brut de 3 000 € par mois au Luxembourg correspond à un niveau légèrement supérieur au salaire social minimum qualifié (SSM qualifié), fixé à 3 194,81 € en 2026. Ce niveau de rémunération est courant dans les secteurs de l'hôtellerie-restauration, du commerce de détail, de la logistique et des services à la personne. Après déduction des cotisations sociales (assurance maladie CNS à 2,8 %, pension à 8 % et dépendance à 1,4 %) et de l'impôt sur le revenu selon la classe 1, le salarié perçoit un net mensuel d'environ 2 449 €. Ce montant reste compétitif comparé aux pays voisins, notamment la France où un salaire brut équivalent génère un net inférieur en raison de cotisations plus élevées. Au Luxembourg, le coût de la vie est toutefois significatif, particulièrement le logement dans la ville de Luxembourg où les loyers moyens pour un appartement d'une chambre dépassent 1 500 € par mois. Les frontaliers résidant en France, en Belgique ou en Allemagne peuvent bénéficier d'un pouvoir d'achat supérieur grâce à des coûts de logement plus faibles dans les régions frontalières tout en conservant le même salaire net luxembourgeois.",
    faqs: [
      {
        question: 'Quel est le salaire net pour 3 000 € brut au Luxembourg en classe 1 ?',
        answer:
          "Pour un salaire brut mensuel de 3 000 € au Luxembourg en classe d'impôt 1, sans enfants, le salaire net est d'environ 2 449 € après déduction des cotisations sociales (366 €) et de l'impôt sur le revenu (185 €). Ce calcul est basé sur les barèmes 2026.",
      },
      {
        question: '3 000 € brut au Luxembourg, est-ce un bon salaire ?',
        answer:
          "Un salaire de 3 000 € brut est proche du salaire social minimum qualifié au Luxembourg (3 195 €). C'est un salaire d'entrée dans de nombreux secteurs. Il permet de vivre correctement si l'on réside en zone frontalière, mais peut être insuffisant pour couvrir le loyer élevé dans la ville de Luxembourg.",
      },
      {
        question: 'Quelles sont les cotisations sociales sur 3 000 € brut au Luxembourg ?',
        answer:
          'Sur un salaire brut de 3 000 €, les cotisations sociales salariales sont de 366 € par mois : 84 € pour l\'assurance maladie (CNS), 240 € pour la pension et 42 € pour l\'assurance dépendance, soit un taux total de 12,2 %.',
      },
    ],
  },
  {
    slug: '4000',
    brut: 4000,
    brutFormatted: fmtNumber.format(4000) + ' €',
    description:
      "Un salaire brut de 4 000 € par mois au Luxembourg représente un niveau de rémunération fréquent pour les employés qualifiés dans l'administration, la comptabilité, les ressources humaines ou le secteur bancaire junior. Ce montant place le salarié nettement au-dessus du salaire social minimum et constitue souvent le salaire d'embauche pour les jeunes diplômés dans les métiers de bureau. En classe 1 sans enfants, le salaire net mensuel s'établit à environ 3 056 € après prélèvement de 488 € de cotisations sociales et 456 € d'impôt sur le revenu. Le taux de charges total avoisine 23,6 %. En classe 2 (couple marié, un seul revenu), le net augmente significativement à environ 3 452 € grâce au mécanisme du splitting fiscal. La différence entre classe 1 et classe 2 est particulièrement marquée à ce niveau de salaire car le splitting permet de bénéficier de tranches d'imposition plus basses. Les frontaliers français à ce niveau de salaire peuvent résider dans des villes comme Thionville, Metz ou Longwy tout en bénéficiant d'un pouvoir d'achat supérieur. Le trajet domicile-travail est facilité par des liaisons ferroviaires et routières denses entre la Lorraine et le Luxembourg.",
    faqs: [
      {
        question: 'Combien reste-t-il net sur 4 000 € brut au Luxembourg ?',
        answer:
          "Sur un salaire brut de 4 000 € au Luxembourg, il reste environ 3 056 € net en classe 1, 3 184 € en classe 1a et 3 452 € en classe 2. La différence entre les classes s'explique par le barème progressif de l'impôt et le mécanisme du splitting pour la classe 2.",
      },
      {
        question: "Quel est le taux d'imposition pour 4 000 € brut au Luxembourg ?",
        answer:
          "Pour un salaire brut de 4 000 € en classe 1, le taux d'imposition effectif est d'environ 11,4 %, soit 456 € par mois d'impôt. En classe 2, ce taux tombe à environ 1,5 % grâce au splitting fiscal, soit seulement 60 € d'impôt mensuel.",
      },
      {
        question: '4 000 € brut au Luxembourg correspond à quel salaire en France ?',
        answer:
          "Un salaire brut de 4 000 € au Luxembourg est plus avantageux qu'un même brut en France : le net luxembourgeois est d'environ 3 056 € (classe 1) contre environ 3 040 € en France, mais les prestations sociales luxembourgeoises (couverture maladie, pension) sont généralement plus favorables.",
      },
    ],
  },
  {
    slug: '5000',
    brut: 5000,
    brutFormatted: fmtNumber.format(5000) + ' €',
    description:
      "Un salaire brut de 5 000 € par mois au Luxembourg est un niveau de rémunération représentatif des profils confirmés dans le secteur tertiaire : consultants, chefs de projet, analystes financiers, informaticiens avec quelques années d'expérience. Le salaire médian au Luxembourg étant d'environ 4 900 € brut, ce montant se situe légèrement au-dessus de la médiane nationale. En classe 1 sans enfants, le net mensuel est d'environ 3 568 € après déduction de 610 € de cotisations sociales et 822 € d'impôt sur le revenu. Le taux effectif de charges total atteint 28,6 %. En classe 2, le net bondit à 4 202 € grâce à l'avantage du splitting, soit une différence de plus de 630 € par mois. Ce différentiel illustre l'importance considérable de la situation familiale dans le calcul du salaire net au Luxembourg. Les salariés de la place financière de Luxembourg, qui emploie plus de 50 000 personnes, sont souvent rémunérés à ce niveau ou au-dessus. Le secteur des fonds d'investissement, pour lequel le Luxembourg est le premier centre européen, offre régulièrement ce type de rémunération pour les postes de middle office et de compliance.",
    faqs: [
      {
        question: 'Quel salaire net pour 5 000 € brut au Luxembourg en 2026 ?',
        answer:
          "Pour 5 000 € brut mensuel au Luxembourg en 2026, le salaire net est de 3 568 € en classe 1, 3 731 € en classe 1a et 4 202 € en classe 2, hors enfants à charge. Chaque enfant à charge réduit l'impôt d'environ 77 € par mois.",
      },
      {
        question: '5 000 € brut est-il un salaire médian au Luxembourg ?',
        answer:
          "Oui, 5 000 € brut est très proche du salaire médian au Luxembourg qui se situe aux alentours de 4 900 € brut. Cela signifie que la moitié des salariés gagnent moins et l'autre moitié gagnent plus. C'est un salaire courant dans les services financiers et les métiers qualifiés.",
      },
      {
        question: 'Combien de cotisations sociales sur 5 000 € brut au Luxembourg ?',
        answer:
          "Les cotisations sociales sur 5 000 € brut s'élèvent à 610 € par mois : 140 € d'assurance maladie (CNS), 400 € de pension et 70 € de dépendance. Le taux total est de 12,2 % du brut. L'employeur verse des cotisations similaires en supplément.",
      },
    ],
  },
  {
    slug: '6000',
    brut: 6000,
    brutFormatted: fmtNumber.format(6000) + ' €',
    description:
      "Un salaire brut de 6 000 € par mois au Luxembourg correspond à un profil expérimenté dans les secteurs à forte valeur ajoutée : finance, audit, conseil en gestion, ingénierie ou technologies de l'information. Ce niveau de rémunération est supérieur au salaire médian et situe le salarié dans le tiers supérieur de la distribution des salaires au Grand-Duché. En classe 1 sans enfants, le net mensuel est d'environ 4 064 € après prélèvement de 732 € de cotisations sociales et 1 204 € d'impôt sur le revenu. Le taux marginal d'imposition à ce niveau de revenu imposable se situe dans les tranches à 28-30 %, ce qui signifie que chaque euro supplémentaire est taxé à ce taux. La différence entre la classe 1 et la classe 2 est d'environ 826 € par mois, un écart considérable qui souligne l'avantage fiscal du splitting pour les couples. Les institutions européennes basées à Luxembourg-Kirchberg (Cour de justice, Cour des comptes, BEI) offrent régulièrement ce niveau de rémunération pour leurs agents contractuels et fonctionnaires. Le secteur des Big Four (Deloitte, PwC, EY, KPMG), fortement implanté au Luxembourg, propose également ce type de salaire pour les managers.",
    faqs: [
      {
        question: 'Quel est le net pour 6 000 € brut au Luxembourg ?',
        answer:
          "Sur 6 000 € brut au Luxembourg, le salaire net mensuel est de 4 064 € en classe 1, 4 227 € en classe 1a et 4 890 € en classe 2, sans enfants. Les cotisations sociales représentent 732 € et l'impôt varie de 378 € (classe 2) à 1 204 € (classe 1).",
      },
      {
        question: 'Comment optimiser son impôt sur 6 000 € brut au Luxembourg ?',
        answer:
          "Pour optimiser l'impôt sur 6 000 € brut, les leviers principaux sont : l'imposition en classe 2 si éligible (économie de 826 €/mois), la déduction des frais réels de déplacement au lieu du forfait, les versements en prévoyance-vieillesse (art. 111bis, jusqu'à 3 200 €/an déductibles) et les intérêts d'emprunt immobilier.",
      },
      {
        question: 'Un frontalier gagnant 6 000 € brut au Luxembourg paie-t-il des impôts dans son pays ?',
        answer:
          "Non, un frontalier est imposé uniquement au Luxembourg sur ses revenus luxembourgeois. La convention fiscale bilatérale évite la double imposition. Les revenus sont déclarés dans le pays de résidence mais un crédit d'impôt est accordé pour l'impôt déjà payé au Luxembourg.",
      },
    ],
  },
  {
    slug: '7000',
    brut: 7000,
    brutFormatted: fmtNumber.format(7000) + ' €',
    description:
      "Un salaire brut de 7 000 € par mois au Luxembourg représente une rémunération de cadre confirmé ou de spécialiste senior. Ce niveau est fréquent dans la gestion de patrimoine, la conformité réglementaire, l'informatique spécialisée (cybersécurité, data science) et le management intermédiaire dans le secteur financier. En classe 1 sans enfants, le salaire net mensuel s'établit à environ 4 560 € après des retenues totales de 2 440 € comprenant 854 € de cotisations sociales et 1 586 € d'impôt. Le taux de charges total atteint 34,9 %, marquant une progression notable de la pression fiscale par rapport aux salaires inférieurs. La tranche marginale d'imposition pour ce revenu se situe autour de 34-36 %. En classe 2, le net mensuel monte à 5 526 €, soit un gain de 966 € par mois par rapport à la classe 1, illustrant l'avantage croissant du splitting à mesure que le revenu augmente. Le Luxembourg attire de nombreux talents internationaux à ce niveau de salaire, notamment dans les domaines de la fintech, de l'intelligence artificielle et de la gestion de fonds alternatifs. La qualité de vie offerte par le Grand-Duché, combinée à des salaires élevés et à une fiscalité plus modérée que dans les grands centres financiers (Londres, Paris), en fait une destination attractive pour les professionnels qualifiés.",
    faqs: [
      {
        question: 'Quel impôt sur 7 000 € brut au Luxembourg en classe 1 ?',
        answer:
          "Pour 7 000 € brut en classe 1 au Luxembourg, l'impôt mensuel sur le revenu (incluant la surtaxe de solidarité) est d'environ 1 586 €. Le taux effectif d'imposition est de 22,6 %. En ajoutant les cotisations sociales de 854 €, le total des charges représente 34,9 % du brut.",
      },
      {
        question: 'Combien gagne un cadre au Luxembourg avec 7 000 € brut ?',
        answer:
          "Un cadre au Luxembourg gagnant 7 000 € brut perçoit entre 4 560 € net (classe 1, célibataire) et 5 526 € net (classe 2, marié). Avec des enfants, le net augmente d'environ 77 € par enfant grâce à la modération d'impôt.",
      },
      {
        question: 'Est-ce que 7 000 € brut est un bon salaire au Luxembourg ?',
        answer:
          "Oui, 7 000 € brut est un très bon salaire au Luxembourg, supérieur au salaire médian d'environ 40 %. Ce niveau de rémunération permet de vivre confortablement même dans la ville de Luxembourg où le coût de la vie est élevé, avec un loyer moyen de 1 800 € pour un deux pièces.",
      },
    ],
  },
  {
    slug: '8000',
    brut: 8000,
    brutFormatted: fmtNumber.format(8000) + ' €',
    description:
      "Un salaire brut de 8 000 € par mois au Luxembourg est caractéristique des postes de direction intermédiaire, des experts techniques de haut niveau et des professions libérales. Dans le secteur financier, ce salaire est courant pour les vice-présidents, les responsables d'équipe et les spécialistes en gestion des risques. En classe 1, le salaire net s'élève à environ 5 057 € après déduction de 976 € de cotisations sociales et 1 967 € d'impôt sur le revenu. Le taux effectif total de charges atteint 36,8 %. En classe 2, le net passe à 6 109 €, soit un avantage de plus de 1 050 € par mois lié au splitting. Ce différentiel classe 1/classe 2 augmente progressivement avec le revenu car le splitting permet de « rester » dans des tranches marginales plus basses. À ce niveau de salaire, le crédit d'impôt salarié (CIS) commence à être réduit par le mécanisme de dégressivité, puisque le revenu imposable annuel se rapproche du seuil de 45 000 €. Le Luxembourg offre pour ces profils un environnement multilingue et multiculturel stimulant, avec plus de 170 nationalités représentées et un marché de l'emploi particulièrement dynamique dans la finance, les technologies et les services aux entreprises.",
    faqs: [
      {
        question: 'Combien reste net sur 8 000 € brut au Luxembourg ?',
        answer:
          "Sur 8 000 € brut au Luxembourg, le net mensuel est de 5 057 € en classe 1, 5 220 € en classe 1a et 6 109 € en classe 2, sans enfants. Les cotisations sociales sont de 976 € et l'impôt varie de 915 € (classe 2) à 1 967 € (classe 1).",
      },
      {
        question: "Le CIS est-il réduit à 8 000 € brut au Luxembourg ?",
        answer:
          "Pour 8 000 € brut (soit 96 000 € brut annuel), le revenu imposable annuel est d'environ 83 600 €, proche du seuil de dégressivité du CIS (45 000 €). Le CIS est donc fortement réduit à ce niveau de salaire et peut être quasi nul, contre 696 € annuels au maximum pour les bas salaires.",
      },
      {
        question: "Quel est le coût employeur pour un salaire de 8 000 € brut au Luxembourg ?",
        answer:
          "Pour un salaire brut de 8 000 €, le coût employeur total est d'environ 8 944 € par mois, incluant les cotisations patronales : 224 € de CNS employeur (2,8 %), 640 € de pension employeur (8 %) et 80 € d'assurance accident (~1 %), soit 944 € de charges patronales.",
      },
    ],
  },
  {
    slug: '9000',
    brut: 9000,
    brutFormatted: fmtNumber.format(9000) + ' €',
    description:
      "Un salaire brut de 9 000 € par mois au Luxembourg positionne le salarié dans les tranches supérieures de rémunération, typiques des directeurs adjoints, des avocats d'affaires expérimentés, des architectes IT ou des responsables de départements dans les grandes entreprises. Ce niveau de salaire est également courant dans les sociétés de gestion de fonds et les cabinets de conseil en stratégie opérant depuis le Grand-Duché. En classe 1, le net mensuel est d'environ 5 566 € après retenues de 1 098 € de cotisations sociales et 2 336 € d'impôt. Le taux de charges total s'élève à 38,2 %, reflétant la progressivité marquée du barème luxembourgeois dans ces tranches. En classe 2, le net atteint 6 647 €, soit un avantage de 1 081 € par mois. À ce niveau de revenu, la tranche marginale d'imposition se situe autour de 38-39 % en classe 1, ce qui signifie qu'une augmentation de salaire brut de 100 € ne génère qu'environ 50 € de net supplémentaire. Les salariés à ce niveau de rémunération ont tout intérêt à explorer les possibilités d'optimisation fiscale : déduction des frais réels de déplacement, versements en prévoyance complémentaire et, pour les propriétaires, déduction des intérêts d'emprunt immobilier.",
    faqs: [
      {
        question: 'Quel est le salaire net pour 9 000 € brut au Luxembourg ?',
        answer:
          "Pour 9 000 € brut au Luxembourg, le net mensuel est de 5 566 € en classe 1, 5 722 € en classe 1a et 6 647 € en classe 2, sans enfants à charge. Le total des prélèvements (cotisations + impôt) représente environ 38,2 % du brut en classe 1.",
      },
      {
        question: 'Quelle est la tranche marginale d\'imposition pour 9 000 € brut ?',
        answer:
          "Pour un salaire brut de 9 000 € par mois (108 000 € annuel), le revenu imposable annuel est d'environ 95 800 € en classe 1. La tranche marginale d'imposition est de 39 %, ce qui signifie que tout euro brut supplémentaire est imposé à 39 % plus la surtaxe de solidarité.",
      },
      {
        question: 'Un frontalier à 9 000 € brut bénéficie-t-il de la sécurité sociale luxembourgeoise ?',
        answer:
          "Oui, un frontalier travaillant au Luxembourg est affilié au système de sécurité sociale luxembourgeois (CNS, pension, dépendance) quel que soit son pays de résidence. Il bénéficie de la couverture maladie luxembourgeoise pour lui et sa famille, même pour des soins dans son pays de résidence.",
      },
    ],
  },
  {
    slug: '10000',
    brut: 10000,
    brutFormatted: fmtNumber.format(10000) + ' €',
    description:
      "Un salaire brut de 10 000 € par mois au Luxembourg est une rémunération de cadre supérieur, caractéristique des directeurs de département, des partners junior en cabinet d'audit ou de conseil, des responsables IT senior et des cadres dirigeants de PME. Ce seuil symbolique de 10 000 € brut est souvent un objectif de carrière pour les professionnels ambitieux de la place financière. En classe 1 sans enfants, le salaire net s'établit à environ 6 074 € après déduction de 1 220 € de cotisations sociales et 2 706 € d'impôt. Le taux de charges total atteint 39,3 %. En classe 2, le net monte à 7 160 €, soit un avantage de 1 086 € par mois. À ce niveau, le crédit d'impôt salarié (CIS) est pratiquement nul en raison de la dégressivité. Le salaire annuel brut de 120 000 € place le contribuable dans la tranche à 39-40 % du barème. La pression fiscale reste néanmoins inférieure à celle observée en France, en Belgique ou en Allemagne pour des niveaux de revenu équivalents. Le Luxembourg offre une combinaison unique de fiscalité modérée, de stabilité politique, de qualité des services publics et de dynamisme économique, ce qui en fait une destination prisée pour les hauts profils internationaux.",
    faqs: [
      {
        question: 'Combien reste-t-il net sur 10 000 € brut au Luxembourg ?',
        answer:
          "Sur 10 000 € brut au Luxembourg, le salaire net est de 6 074 € en classe 1, 6 234 € en classe 1a et 7 160 € en classe 2, sans enfants. Les cotisations sociales sont de 1 220 € et l'impôt varie de 1 620 € (classe 2) à 2 706 € (classe 1).",
      },
      {
        question: '10 000 € brut au Luxembourg est-il imposé à 42 % ?',
        answer:
          "Non, le taux marginal de 42 % ne s'applique qu'au-delà de 200 004 € de revenu imposable annuel. Pour 10 000 € brut (120 000 €/an), le revenu imposable est d'environ 107 500 € et la tranche marginale est de 40 %. Le taux effectif moyen d'imposition est d'environ 27 %.",
      },
      {
        question: 'Quel est le plafond de cotisations pour 10 000 € brut au Luxembourg ?',
        answer:
          "Le plafond de cotisation est de 13 311,69 € brut par mois en 2026. À 10 000 € brut, les cotisations maladie (CNS) et pension sont calculées sur l'intégralité du salaire. Seuls les salaires supérieurs à 13 312 € voient leurs cotisations plafonnées.",
      },
    ],
  },
  {
    slug: '12000',
    brut: 12000,
    brutFormatted: fmtNumber.format(12000) + ' €',
    description:
      "Un salaire brut de 12 000 € par mois au Luxembourg correspond aux postes de direction confirmée dans les grandes entreprises, aux partners dans les cabinets d'audit ou de conseil juridique, aux directeurs financiers de sociétés de taille intermédiaire et aux experts techniques de très haut niveau. Ce niveau de rémunération est courant dans les institutions financières internationales installées au Luxembourg, dans les sociétés de gestion de fonds d'investissement et dans les sièges européens de multinationales. En classe 1 sans enfants, le net mensuel est d'environ 7 078 € après des retenues totales de 4 922 € comprenant 1 464 € de cotisations sociales et 3 458 € d'impôt sur le revenu. Le taux de charges total atteint 41 %. En classe 2, le net est de 8 183 €, soit un avantage de 1 105 € par mois. À ce niveau de salaire brut, les cotisations maladie et pension ne sont plus très loin du plafond de cotisation (13 312 €/mois). La tranche marginale d'imposition est de 40 % en classe 1. Ce type de rémunération permet un train de vie confortable même dans le centre-ville de Luxembourg, avec un pouvoir d'achat nettement supérieur pour les frontaliers résidant dans la Grande Région.",
    faqs: [
      {
        question: 'Quel salaire net pour 12 000 € brut au Luxembourg ?',
        answer:
          "Pour 12 000 € brut au Luxembourg, le salaire net mensuel est de 7 078 € en classe 1, 7 239 € en classe 1a et 8 183 € en classe 2, sans enfants. Le taux de charges total (cotisations + impôt) représente environ 41 % du brut en classe 1.",
      },
      {
        question: 'Les cotisations sont-elles plafonnées à 12 000 € brut ?',
        answer:
          "À 12 000 € brut, les cotisations maladie (CNS) et pension sont calculées sur l'intégralité du salaire car le plafond est de 13 312 €/mois. Seule l'assurance dépendance (1,4 %) n'a pas de plafond. Au-delà de 13 312 € brut, les cotisations CNS et pension sont plafonnées.",
      },
      {
        question: 'Quelle différence de net entre classe 1 et classe 2 pour 12 000 € brut ?',
        answer:
          "La différence de salaire net entre la classe 1 et la classe 2 pour 12 000 € brut est de 1 105 € par mois, soit 13 260 € par an. Cette différence provient exclusivement de l'impôt, les cotisations sociales étant identiques quelle que soit la classe d'imposition.",
      },
    ],
  },
  {
    slug: '15000',
    brut: 15000,
    brutFormatted: fmtNumber.format(15000) + ' €',
    description:
      "Un salaire brut de 15 000 € par mois au Luxembourg place le salarié dans les plus hauts niveaux de rémunération, caractéristiques des postes de direction générale, des managing directors dans les banques d'investissement, des associés senior dans les cabinets internationaux et des dirigeants d'entreprises technologiques. Ce montant est supérieur au plafond de cotisation mensuel de 13 312 €, ce qui signifie que les cotisations maladie et pension sont calculées sur le plafond et non sur le salaire réel, réduisant le taux effectif de cotisations. En classe 1 sans enfants, le net mensuel est d'environ 8 594 € après des cotisations de 1 648 € (plafonnées) et un impôt de 4 759 €. Le taux de charges total est d'environ 42,7 %. En classe 2, le net atteint 9 758 €, soit un avantage de 1 165 € par mois. Le revenu imposable annuel dépasse les 150 000 €, ce qui déclenche le taux de surtaxe de solidarité majoré à 9 % au lieu de 7 %. La tranche marginale d'imposition est de 40-41 %. Ce niveau de rémunération est souvent accompagné d'avantages en nature (voiture de société, assurance complémentaire, plan de pension complémentaire) qui ne sont pas reflétés dans ce calcul mais qui ajoutent à la rémunération globale.",
    faqs: [
      {
        question: 'Quel est le net pour 15 000 € brut au Luxembourg ?',
        answer:
          "Pour 15 000 € brut au Luxembourg, le salaire net est d'environ 8 594 € en classe 1, 8 761 € en classe 1a et 9 758 € en classe 2, sans enfants. Le plafonnement des cotisations réduit le taux effectif de cotisations de 12,2 % à environ 11 %.",
      },
      {
        question: 'Les cotisations sont-elles plafonnées à 15 000 € brut ?',
        answer:
          "Oui, à 15 000 € brut le plafond de cotisation est dépassé (13 312 €/mois en 2026). Les cotisations CNS (2,8 %) et pension (8 %) sont calculées sur 13 312 € et non sur 15 000 €. Seule la cotisation dépendance (1,4 %) s'applique sur l'intégralité des 15 000 €.",
      },
      {
        question: 'Quel est le taux marginal pour 15 000 € brut au Luxembourg ?',
        answer:
          "Pour 15 000 € brut (180 000 €/an), le revenu imposable dépasse 150 000 €, ce qui active la tranche marginale à 40-41 %. La surtaxe de solidarité passe également à 9 % au lieu de 7 % au-delà de 150 000 € de revenu imposable.",
      },
    ],
  },
  {
    slug: '20000',
    brut: 20000,
    brutFormatted: fmtNumber.format(20000) + ' €',
    description:
      "Un salaire brut de 20 000 € par mois au Luxembourg est réservé aux postes de très haute responsabilité : directeurs généraux, chief officers (CFO, CTO, COO), associés principaux dans les grands cabinets internationaux, ou entrepreneurs à la tête d'entreprises prospères. Ce niveau de rémunération place le salarié dans le top 1 % des revenus du Grand-Duché. Le salaire dépasse largement le plafond de cotisation de 13 312 €/mois, ce qui réduit le taux effectif de cotisations sociales à environ 8,6 % au lieu de 12,2 %. En classe 1 sans enfants, le net mensuel est d'environ 11 304 € après des cotisations de 1 718 € et un impôt de 6 979 €. Le taux de charges total atteint 43,5 %. En classe 2, le net est de 12 580 €, soit un avantage de 1 276 € par mois. La tranche marginale d'imposition est de 41-42 %, auxquels s'ajoute la surtaxe de solidarité de 9 %. Le taux marginal effectif dépasse donc 45 %. Malgré cette pression fiscale élevée, le Luxembourg reste compétitif par rapport à ses voisins : pour un même brut de 20 000 €, le net serait inférieur en France et en Belgique. La stabilité économique, politique et fiscale du Luxembourg, combinée à son environnement international et à sa position de premier centre européen pour les fonds d'investissement, continue d'attirer les hauts dirigeants.",
    faqs: [
      {
        question: 'Combien reste net sur 20 000 € brut au Luxembourg ?',
        answer:
          "Sur 20 000 € brut au Luxembourg, le salaire net est de 11 304 € en classe 1, 11 475 € en classe 1a et 12 580 € en classe 2, sans enfants. Le plafonnement des cotisations sociales réduit leur poids relatif à 8,6 % du brut.",
      },
      {
        question: 'Quel est le taux marginal d\'imposition à 20 000 € brut au Luxembourg ?',
        answer:
          "Pour 20 000 € brut (240 000 €/an), le revenu imposable annuel est d'environ 226 200 € en classe 1, soit au-delà du seuil de 200 004 € déclenchant le taux marginal maximal de 42 %. Avec la surtaxe de solidarité de 9 %, le taux marginal effectif est d'environ 45,8 %.",
      },
      {
        question: '20 000 € brut au Luxembourg vs France : quelle différence ?',
        answer:
          "Pour 20 000 € brut, le net au Luxembourg (11 304 € en classe 1) est supérieur au net en France (environ 10 500 € avant impôt sur le revenu). De plus, les cotisations sociales françaises sont plus élevées (environ 22 % vs 8,6 % au-dessus du plafond luxembourgeois).",
      },
    ],
  },
  {
    slug: '25000',
    brut: 25000,
    brutFormatted: fmtNumber.format(25000) + ' €',
    description:
      "Un salaire brut de 25 000 € par mois au Luxembourg est un niveau de rémunération exceptionnel, réservé aux dirigeants de haut niveau des plus grandes entreprises, aux partners des cabinets d'avocats et d'audit de premier plan, et aux responsables d'entités régionales de multinationales. Ce montant annuel de 300 000 € brut place le salarié dans le top 0,5 % des revenus au Luxembourg. Le salaire dépasse très largement le plafond de cotisation de 13 312 €/mois, ce qui réduit le taux effectif de cotisations sociales à seulement 7,2 %. En classe 1 sans enfants, le net mensuel est d'environ 13 977 € après des cotisations de 1 788 € et un impôt de 9 236 €. Le taux de charges total atteint 44,1 %. En classe 2, le net est de 15 361 €, soit un avantage de 1 384 € par mois. La quasi-totalité du salaire au-delà du plafond est soumise au taux marginal maximal de 42 % plus la surtaxe de solidarité de 9 %, portant le taux marginal effectif à 45,8 %. À ce niveau de revenu, l'optimisation fiscale passe principalement par des mécanismes de rémunération variable (stock-options, plans d'intéressement) et par la structuration patrimoniale. Le Luxembourg dispose d'un cadre juridique et fiscal attractif pour les hauts dirigeants, notamment grâce au régime d'impatrié qui offre des avantages fiscaux temporaires aux cadres recrutés à l'étranger.",
    faqs: [
      {
        question: 'Quel est le salaire net pour 25 000 € brut au Luxembourg ?',
        answer:
          "Pour 25 000 € brut au Luxembourg, le salaire net est de 13 977 € en classe 1, 14 148 € en classe 1a et 15 361 € en classe 2, sans enfants. Le taux de charges total (cotisations + impôt) représente environ 44,1 % du brut en classe 1.",
      },
      {
        question: 'Le taux marginal maximal de 42 % s\'applique-t-il à 25 000 € brut ?',
        answer:
          "Oui, pour 25 000 € brut (300 000 €/an), le revenu imposable annuel dépasse largement le seuil de 200 004 € qui déclenche le taux marginal maximal de 42 %. Avec la surtaxe de solidarité de 9 %, le taux marginal effectif est de 45,78 % sur la portion la plus élevée du revenu.",
      },
      {
        question: 'Un dirigeant à 25 000 € brut peut-il bénéficier du régime d\'impatrié au Luxembourg ?',
        answer:
          "Oui, le régime d'impatrié luxembourgeois permet aux cadres recrutés à l'étranger de bénéficier d'une exonération partielle de certaines primes (prime d'impatriation jusqu'à 30 % du salaire, frais de déménagement, voyages de retour) pendant une durée maximale de 5 ans, sous conditions strictes.",
      },
    ],
  },
];

// --- Build final entries with computed values ---

export const salairesData: SalaireEntry[] = rawEntries.map((entry) => ({
  ...entry,
  classe1: computeClass(entry.brut, '1'),
  classe1a: computeClass(entry.brut, '1a'),
  classe2: computeClass(entry.brut, '2'),
}));

export default salairesData;
