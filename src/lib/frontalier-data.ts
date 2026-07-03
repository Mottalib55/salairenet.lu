/**
 * Données SEO pour les pages programmatiques frontaliers Luxembourg
 * Chaque entrée correspond à un pays frontalier avec du contenu éditorial
 * sur la fiscalité transfrontalière, le télétravail et la sécurité sociale.
 */

export interface FrontalierFAQ {
  question: string;
  answer: string;
}

export interface FrontalierEntry {
  slug: string;
  country: string;
  description: string;
  taxRules: string[];
  teleworkThreshold: number;
  faqs: FrontalierFAQ[];
}

export const frontalierData: FrontalierEntry[] = [
  {
    slug: 'france',
    country: 'France',
    description:
      "La France est de loin le premier pays d'origine des travailleurs frontaliers au Luxembourg, avec plus de 120 000 résidents français traversant la frontière chaque jour pour se rendre à leur poste de travail au Grand-Duché. Les principaux bassins de résidence se situent en Lorraine : Thionville, Metz, Longwy, Briey, Hayange et leurs environs. Le TGV relie Metz à Luxembourg-ville en 50 minutes, et de nombreuses lignes de bus et de covoiturage complètent l'offre de transport.\n\nLa convention fiscale franco-luxembourgeoise, révisée par l'avenant du 10 octobre 2019 (entré en vigueur le 1er janvier 2020), établit les règles de répartition du droit d'imposer entre les deux pays. Le principe fondamental est que les revenus d'emploi salarié sont imposables dans l'État où l'activité est exercée. Ainsi, un frontalier français travaillant physiquement au Luxembourg est imposé au Luxembourg selon le barème luxembourgeois. La France accorde un crédit d'impôt égal à l'impôt français calculé sur ces revenus, ce qui évite la double imposition tout en permettant à la France de prendre en compte les revenus luxembourgeois pour déterminer le taux d'imposition applicable aux autres revenus du ménage (méthode du taux effectif).\n\nLes frontaliers français sont affiliés à la sécurité sociale luxembourgeoise (CNS) et bénéficient de la couverture maladie du Grand-Duché. Ils peuvent se faire soigner au Luxembourg ou en France, avec prise en charge par la CNS. Leurs ayants droit (conjoint, enfants) bénéficient également de cette couverture. Les prestations familiales sont versées par le Luxembourg (allocations familiales de 300 €/mois par enfant), avec un éventuel différentiel versé par la France si les allocations françaises seraient plus élevées.\n\nL'accord bilatéral sur le télétravail fiscal, signé en 2023, fixe un seuil de tolérance de 34 jours par an de télétravail depuis la France sans impact sur l'imposition au Luxembourg. Au-delà de ces 34 jours, les revenus correspondant aux jours de télétravail en France deviennent imposables en France. Ce seuil est calculé en jours ouvrables et ne comprend que le télétravail proprement dit (pas les déplacements professionnels, les formations ou les congés maladie). En matière de sécurité sociale, un accord-cadre européen permet jusqu'à 49 % de télétravail sans changement d'affiliation, ce qui est nettement plus généreux que le seuil fiscal de 34 jours.\n\nLes frontaliers français peuvent bénéficier de la classe d'imposition 2 (splitting) au Luxembourg s'ils optent pour l'assimilation fiscale aux résidents. Cette option est accessible si plus de 90 % des revenus mondiaux du ménage proviennent du Luxembourg. Dans ce cas, le couple est imposé comme un résident luxembourgeois marié, ce qui peut réduire considérablement l'impôt pour les couples à revenus déséquilibrés.",
    taxRules: [
      "Imposition au Luxembourg pour l'activité exercée sur le territoire luxembourgeois",
      "Convention fiscale franco-luxembourgeoise (avenant 2019) : méthode du crédit d'impôt pour éviter la double imposition",
      "Les revenus luxembourgeois sont déclarés en France pour le calcul du taux effectif d'imposition",
      "Possibilité d'opter pour l'assimilation aux résidents (classe 2) si 90 %+ des revenus du ménage sont de source luxembourgeoise",
      "Les prestations familiales sont versées par le Luxembourg avec éventuel complément différentiel français",
      "Les cotisations sociales sont prélevées uniquement au Luxembourg (principe du pays d'emploi)",
    ],
    teleworkThreshold: 34,
    faqs: [
      {
        question: 'Un frontalier français paie-t-il des impôts en France et au Luxembourg ?',
        answer:
          "Non, un frontalier français ne paie pas d'impôt en double. Ses revenus d'emploi luxembourgeois sont imposés au Luxembourg. La France accorde un crédit d'impôt égal à l'impôt français correspondant, ce qui neutralise la double imposition. Toutefois, les revenus luxembourgeois sont pris en compte en France pour déterminer le taux d'imposition applicable aux autres revenus du ménage (revenus fonciers, revenus du conjoint travaillant en France, etc.).",
      },
      {
        question: 'Combien de jours un frontalier français peut-il télétravailler sans impact fiscal ?',
        answer:
          "Un frontalier français peut télétravailler jusqu'à 34 jours par an depuis la France sans que cela modifie son imposition au Luxembourg. Au-delà de 34 jours, les revenus correspondant aux jours de télétravail en France deviennent imposables en France. En matière de sécurité sociale, le seuil est plus élevé : jusqu'à 49 % du temps de travail en télétravail sans changement d'affiliation à la CNS luxembourgeoise.",
      },
      {
        question: 'Un frontalier français peut-il bénéficier de la classe 2 au Luxembourg ?',
        answer:
          "Oui, un frontalier français marié peut bénéficier de la classe 2 (splitting) au Luxembourg en optant pour l'assimilation fiscale aux résidents. La condition principale est que plus de 90 % des revenus mondiaux du ménage proviennent du Luxembourg. Cette option est particulièrement avantageuse pour les couples dont un seul conjoint travaille ou dont le conjoint a des revenus faibles.",
      },
    ],
  },
  {
    slug: 'belgique',
    country: 'Belgique',
    description:
      "La Belgique est le deuxième pays d'origine des travailleurs frontaliers au Luxembourg, avec environ 50 000 résidents belges employés au Grand-Duché. Les frontaliers belges résident principalement dans la province de Luxembourg (Arlon, Virton, Aubange, Messancy), dans la province de Liège (Bastogne et environs) et, dans une moindre mesure, dans la province de Namur. Arlon, à seulement 25 km de la ville de Luxembourg, est la ville belge la plus fortement liée économiquement au Grand-Duché.\n\nLa convention préventive de double imposition entre la Belgique et le Luxembourg, signée le 17 septembre 1970 et modifiée par plusieurs avenants, régit la répartition du droit d'imposer les revenus des frontaliers. Comme pour la France, le principe de base est l'imposition dans l'État d'exercice de l'activité. Les revenus d'emploi salarié exercé au Luxembourg sont donc imposés au Luxembourg. La Belgique exonère ces revenus de l'impôt belge mais les prend en compte pour déterminer le taux d'imposition applicable aux autres revenus du ménage (méthode de l'exemption avec réserve de progressivité).\n\nLa méthode belge diffère de la méthode française : la Belgique utilise l'exemption avec progressivité plutôt que le crédit d'impôt. Concrètement, les revenus luxembourgeois ne sont pas imposés en Belgique, mais ils sont ajoutés aux revenus belges pour calculer le taux moyen d'imposition qui s'applique ensuite aux seuls revenus de source belge. Cette méthode peut avoir un impact significatif si le conjoint du frontalier travaille en Belgique ou si le ménage perçoit des revenus fonciers belges.\n\nLes frontaliers belges sont affiliés à la sécurité sociale luxembourgeoise et bénéficient de la couverture CNS. Ils peuvent se faire soigner au Luxembourg ou en Belgique. Les prestations familiales sont versées par le Luxembourg avec un éventuel complément différentiel si les allocations familiales belges seraient plus élevées. Le système belge d'allocations familiales ayant été régionalisé (Wallonie, Flandre, Bruxelles), le calcul du différentiel dépend de la région de résidence du frontalier.\n\nLe seuil de tolérance pour le télétravail fiscal est de 34 jours par an, conformément à l'accord bilatéral belgo-luxembourgeois. Au-delà de 34 jours de télétravail depuis la Belgique, les revenus correspondants deviennent imposables en Belgique selon le barème belge, qui est généralement plus élevé que le barème luxembourgeois. En matière de sécurité sociale, l'accord-cadre européen sur le télétravail transfrontalier permet jusqu'à 49 % de télétravail sans changement d'affiliation.\n\nL'immobilier dans la province de Luxembourg belge a connu une hausse significative des prix, directement liée à la demande des frontaliers luxembourgeois. Les prix restent néanmoins nettement inférieurs à ceux pratiqués au Grand-Duché, ce qui permet aux frontaliers belges de bénéficier d'un pouvoir d'achat immobilier supérieur tout en percevant un salaire luxembourgeois.",
    taxRules: [
      "Imposition au Luxembourg pour l'activité exercée sur le territoire luxembourgeois",
      "Convention belgo-luxembourgeoise (1970, modifiée) : méthode de l'exemption avec réserve de progressivité",
      "La Belgique exonère les revenus luxembourgeois mais les prend en compte pour le taux d'imposition des revenus belges",
      "Les frontaliers belges mariés peuvent opter pour l'assimilation aux résidents (classe 2) si 90 %+ des revenus proviennent du Luxembourg",
      "Les allocations familiales sont versées par le Luxembourg avec complément différentiel éventuel selon la région belge",
      "L'impôt communal belge (additionnels communaux) ne s'applique pas aux revenus exonérés de source luxembourgeoise",
    ],
    teleworkThreshold: 34,
    faqs: [
      {
        question: 'Comment un frontalier belge est-il imposé sur ses revenus luxembourgeois ?',
        answer:
          "Un frontalier belge est imposé au Luxembourg sur ses revenus d'emploi luxembourgeois. La Belgique exonère ces revenus de l'impôt belge mais les prend en compte pour calculer le taux d'imposition applicable aux autres revenus belges (revenus fonciers, revenus du conjoint travaillant en Belgique). C'est la méthode de l'exemption avec réserve de progressivité.",
      },
      {
        question: 'Combien de jours de télétravail pour un frontalier belge ?',
        answer:
          "Un frontalier belge peut télétravailler jusqu'à 34 jours par an depuis la Belgique sans impact sur son imposition au Luxembourg. Au-delà, les revenus des jours de télétravail en Belgique sont imposables en Belgique, où le taux marginal d'imposition peut atteindre 50 % (plus les additionnels communaux), nettement plus élevé qu'au Luxembourg (42 % maximum).",
      },
      {
        question: 'Un frontalier belge bénéficie-t-il des allocations familiales luxembourgeoises ?',
        answer:
          "Oui, un frontalier belge reçoit les allocations familiales luxembourgeoises (300 €/mois par enfant). Si les allocations du système belge (wallon, flamand ou bruxellois) seraient plus élevées, un complément différentiel est versé par la Belgique pour atteindre le montant le plus favorable.",
      },
    ],
  },
  {
    slug: 'allemagne',
    country: 'Allemagne',
    description:
      "L'Allemagne est le troisième pays fournisseur de main-d'oeuvre frontalière au Luxembourg, avec environ 50 000 résidents allemands travaillant quotidiennement au Grand-Duché. Les frontaliers allemands résident principalement dans le Land de Rhénanie-Palatinat (Trier/Trèves et ses environs, Bitburg, Wittlich) et, dans une moindre mesure, dans le Land de Sarre. Trèves, ancienne capitale romaine située à seulement 50 km de Luxembourg-ville, est le principal pôle de résidence des frontaliers allemands.\n\nLa convention fiscale germano-luxembourgeoise du 23 avril 2012, entrée en vigueur le 1er janvier 2014, régit l'imposition des frontaliers. Le principe est identique aux autres conventions : les revenus d'emploi salarié sont imposables dans l'État où l'activité est exercée. Les frontaliers allemands travaillant au Luxembourg sont donc imposés au Luxembourg. L'Allemagne évite la double imposition par la méthode de l'exemption avec réserve de progressivité, similaire à la méthode belge : les revenus luxembourgeois sont exonérés de l'impôt allemand mais pris en compte pour déterminer le taux d'imposition applicable aux autres revenus.\n\nLe système fiscal allemand est caractérisé par un barème progressif avec un taux marginal maximal de 45 % (plus la surtaxe de solidarité de 5,5 % de l'impôt, partiellement supprimée depuis 2021), ce qui le rend comparable au barème luxembourgeois. Toutefois, le seuil d'entrée dans les tranches élevées est plus bas en Allemagne, ce qui rend le Luxembourg fiscalement plus avantageux pour les revenus moyens et élevés. Les frontaliers allemands bénéficient donc généralement d'un avantage fiscal en travaillant au Luxembourg plutôt qu'en Allemagne.\n\nLes frontaliers allemands sont affiliés à la sécurité sociale luxembourgeoise (CNS, pension, dépendance). Ils peuvent se faire soigner au Luxembourg ou en Allemagne, avec prise en charge par la CNS. Le système de santé allemand étant basé sur des caisses d'assurance maladie obligatoires (gesetzliche Krankenversicherung), les frontaliers affiliés au Luxembourg disposent d'une carte européenne d'assurance maladie (CEAM) leur permettant d'accéder aux soins en Allemagne aux conditions du système allemand.\n\nLe seuil de tolérance pour le télétravail fiscal est de 34 jours par an, conformément à l'accord bilatéral germano-luxembourgeois entré en vigueur. Au-delà de ce seuil, les revenus des jours de télétravail en Allemagne sont imposables en Allemagne. En matière de sécurité sociale, l'accord-cadre européen permet jusqu'à 49 % de télétravail transfrontalier sans changement d'affiliation.\n\nLes frontaliers allemands bénéficient d'un coût de la vie modéré dans la région de Trèves, avec des prix immobiliers nettement inférieurs à ceux du Luxembourg. Un appartement à Trèves coûte environ 2 500 à 3 500 €/m², contre 8 000 à 12 000 €/m² dans la ville de Luxembourg. Le trajet Trèves-Luxembourg est d'environ 45 minutes en voiture et une liaison ferroviaire régionale dessert cette ligne. Les frontaliers allemands peuvent également opter pour la classe 2 au Luxembourg s'ils remplissent les conditions d'assimilation aux résidents (90 % des revenus de source luxembourgeoise).",
    taxRules: [
      "Imposition au Luxembourg pour l'activité exercée sur le territoire luxembourgeois",
      "Convention germano-luxembourgeoise (2012) : méthode de l'exemption avec réserve de progressivité",
      "L'Allemagne exonère les revenus luxembourgeois mais les prend en compte pour le taux applicable aux revenus allemands",
      "La surtaxe de solidarité allemande (Solidaritätszuschlag) ne s'applique pas aux revenus exonérés de source luxembourgeoise",
      "Possibilité d'opter pour l'assimilation aux résidents luxembourgeois (classe 2) si 90 %+ des revenus proviennent du Luxembourg",
      "L'impôt ecclésiastique allemand (Kirchensteuer) ne s'applique pas aux revenus de source luxembourgeoise",
    ],
    teleworkThreshold: 34,
    faqs: [
      {
        question: 'Un frontalier allemand est-il imposé en Allemagne ou au Luxembourg ?',
        answer:
          "Un frontalier allemand travaillant au Luxembourg est imposé au Luxembourg sur ses revenus d'emploi luxembourgeois. L'Allemagne exonère ces revenus mais les prend en compte pour déterminer le taux d'imposition applicable aux autres revenus (Progressionsvorbehalt). Les cotisations sociales sont prélevées uniquement au Luxembourg.",
      },
      {
        question: 'Quel est le seuil de télétravail pour un frontalier allemand ?',
        answer:
          "Le seuil de tolérance fiscale pour le télétravail est de 34 jours par an. En dessous de ce seuil, les revenus du télétravail depuis l'Allemagne restent imposés au Luxembourg. Au-delà, les revenus correspondants sont imposables en Allemagne selon le barème allemand (taux marginal jusqu'à 45 %).",
      },
      {
        question: 'Un frontalier allemand bénéficie-t-il de la retraite luxembourgeoise ?',
        answer:
          "Oui, un frontalier allemand cotise au régime de pension luxembourgeois pendant toute la durée de son emploi au Grand-Duché. À la retraite, il percevra une pension luxembourgeoise proportionnelle à ses années de cotisation au Luxembourg, en plus de sa pension allemande pour les années travaillées en Allemagne. Les périodes sont coordonnées au niveau européen.",
      },
    ],
  },
];

export default frontalierData;
