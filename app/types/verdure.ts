import type { ComputedRef, InjectionKey } from 'vue'
import type { SiteContent, SiteContentFaqItem, SiteContentService } from './SiteContent'

/** Hero de la one-page (titre sur deux lignes, accroche, CTA). */
export interface VerdureHero {
  titleLine1: string
  titleLine2: string
  lead: string
  ctaLabel: string
  image: string
}

/** Une prestation de la grille services. */
export interface VerdureService {
  title: string
  description: string
  image: string
}

/** Bloc « à propos » (texte, points forts, chiffres clés). */
export interface VerdureAbout {
  heading: string
  text: string
  checks: string[]
  image: string
}

/** Une étape de la méthode. */
export interface VerdureStep {
  step: string
  title: string
  description: string
}

/** Une réalisation du portfolio. */
export interface VerdurePortfolioItem {
  category: string
  title: string
  image: string
  accent: boolean
}

/** Coordonnées affichées dans la section contact et le footer. */
export interface VerdureContact {
  phone: string
  email: string
  city: string
  area: string
  openingHours: { day: string; hours: string }[]
  zones: string[]
}

/** Lien réseau social du footer. */
export interface VerdureSocialLink {
  network: string
  label: string
  url: string
}

/** Un chiffre clé du bandeau de stats (repris des repères de confiance). */
export interface VerdureStat {
  label: string
  value: string
}

/** Contenu complet consommé par les sections de la template. */
export interface VerdurePageContent {
  businessName: string
  hero: VerdureHero
  servicesHeading: { eyebrow: string; title: string; lead: string }
  services: VerdureService[]
  about: VerdureAbout
  howHeading: { eyebrow: string; title: string }
  how: VerdureStep[]
  portfolioHeading: { eyebrow: string; title: string }
  portfolio: VerdurePortfolioItem[]
  faqHeading: { eyebrow: string; title: string }
  faqs: SiteContentFaqItem[]
  cta: { title: string; lead: string; label: string }
  stats: VerdureStat[]
  contactHeading: { eyebrow: string; title: string; lead: string }
  contact: VerdureContact
  footerServices: string[]
  social: VerdureSocialLink[]
  theme: { primary: string; secondary: string; accent: string }
}

/** Clé d'injection du contenu construit, fourni par la racine à toutes les sections. */
export const VERDURE_CONTENT_KEY: InjectionKey<ComputedRef<VerdurePageContent>> =
  Symbol('verdure-content')

/** Images de la maquette réutilisées comme défauts (embarquées dans le layer). */
const SERVICE_IMAGES: string[] = [
  '/images/verdure/image-import-4.jpg',
  '/images/verdure/image-import-38.jpg',
  '/images/verdure/image-import.jpg',
  '/images/verdure/image-import-6.jpg',
]

const PORTFOLIO_IMAGES: string[] = [
  '/images/verdure/image-import-12.jpg',
  '/images/verdure/image-import.jpg',
]

/** Prestations par défaut quand le scraping n'a rien remonté. */
const DEFAULT_SERVICES: VerdureService[] = [
  {
    title: 'Création de jardins',
    description:
      'Conception et plantation d’un jardin qui vous ressemble, pensé pour durer au fil des saisons.',
    image: SERVICE_IMAGES[0] ?? '',
  },
  {
    title: 'Entretien & tonte',
    description:
      'Tonte, taille, désherbage et soins réguliers pour une pelouse dense et des massifs impeccables.',
    image: SERVICE_IMAGES[1] ?? '',
  },
  {
    title: 'Terrasses & allées',
    description:
      'Terrasses, allées et murets : des aménagements minéraux propres qui structurent votre extérieur.',
    image: SERVICE_IMAGES[2] ?? '',
  },
  {
    title: 'Arrosage & clôtures',
    description:
      'Arrosage automatique, clôtures et portails posés dans les règles, sans mauvaise surprise.',
    image: SERVICE_IMAGES[3] ?? '',
  },
]

const DEFAULT_FAQS: SiteContentFaqItem[] = [
  {
    question: 'À quelle fréquence intervenez-vous pour l’entretien ?',
    answer:
      'Selon vos besoins : au contrat à l’année (passages réguliers planifiés ensemble) ou à la demande. En pleine saison de pousse, un passage toutes les une à deux semaines garde un jardin impeccable.',
  },
  {
    question: 'Le devis est-il vraiment gratuit ?',
    answer:
      'Oui. Nous nous déplaçons, écoutons votre projet et vous remettons un devis écrit, détaillé et sans engagement, avant tout début de chantier.',
  },
  {
    question: 'Travaillez-vous avec des produits respectueux de l’environnement ?',
    answer:
      'Absolument. Nous privilégions les traitements naturels, le paillage, des végétaux adaptés au climat local et l’évacuation responsable des déchets verts.',
  },
  {
    question: 'Puis-je bénéficier du crédit d’impôt pour l’entretien de jardin ?',
    answer:
      'Oui, les prestations d’entretien courant (tonte, taille de haies…) ouvrent droit au crédit d’impôt services à la personne de 50 % dans la limite du plafond en vigueur. Nous vous fournissons l’attestation.',
  },
]

const DEFAULT_HOW: VerdureStep[] = [
  {
    step: 'Étape 1',
    title: 'Visite & écoute',
    description:
      'Nous venons voir votre terrain, écoutons vos envies et vos contraintes, et prenons les mesures nécessaires.',
  },
  {
    step: 'Étape 2',
    title: 'Devis détaillé',
    description:
      'Vous recevez une proposition claire : prestations, végétaux ou matériaux, délais et budget — sans surprise.',
  },
  {
    step: 'Étape 3',
    title: 'Réalisation soignée',
    description:
      'De la préparation du sol aux finitions, nous réalisons le chantier avec soin et laissons un extérieur propre.',
  },
]

/**
 * Retourne la première valeur non vide.
 * @param values - Candidats dans l'ordre de priorité.
 * @returns La première chaîne renseignée, ou une chaîne vide.
 */
function firstFilled(...values: (string | undefined)[]): string {
  for (const value of values) {
    if (typeof value === 'string' && value.trim().length > 0) return value.trim()
  }
  return ''
}

/**
 * Construit le contenu complet de la one-page paysagiste : les données réelles du
 * prospect (SiteContent) par-dessus la copie éditoriale française par défaut.
 * @param content - Contenu prospect (toutes clés optionnelles).
 * @returns Le contenu prêt à rendre pour chaque section.
 */
export function buildVerdureContent(content: SiteContent): VerdurePageContent {
  const businessName: string = firstFilled(content.businessName, 'Votre paysagiste')
  const city: string = firstFilled(content.city)
  const area: string = firstFilled(content.area, city ? `${city} et ses environs` : 'votre secteur')

  const scrapedServices: VerdureService[] = (content.services ?? [])
    .filter((service: SiteContentService): boolean => firstFilled(service.title).length > 0)
    .slice(0, 4)
    .map((service: SiteContentService, index: number): VerdureService => ({
      title: firstFilled(service.title),
      description: firstFilled(
        service.description,
        'Une prestation menée avec soin, du premier échange aux finitions.',
      ),
      image: SERVICE_IMAGES[index % SERVICE_IMAGES.length] ?? '',
    }))
  const services: VerdureService[] =
    scrapedServices.length >= 3 ? scrapedServices : DEFAULT_SERVICES

  const galleryPortfolio: VerdurePortfolioItem[] = (content.gallery ?? [])
    .filter((image: { url?: string }): boolean => firstFilled(image.url).length > 0)
    .slice(0, 2)
    .map((image: { url?: string; alt?: string }, index: number): VerdurePortfolioItem => ({
      category: 'Réalisation',
      title: firstFilled(image.alt, 'Aménagement complet d’un jardin — avant, pendant, après'),
      image: firstFilled(image.url),
      accent: index === 0,
    }))
  const portfolio: VerdurePortfolioItem[] =
    galleryPortfolio.length > 0
      ? galleryPortfolio
      : [
          {
            category: 'Création',
            title: 'Transformation complète d’un jardin : terrasse, massifs et éclairage',
            image: PORTFOLIO_IMAGES[0] ?? '',
            accent: true,
          },
          {
            category: 'Entretien',
            title: 'Remise en état d’un extérieur : pelouse, haies et allées rafraîchies',
            image: PORTFOLIO_IMAGES[1] ?? '',
            accent: false,
          },
        ]

  const faqs: SiteContentFaqItem[] =
    (content.faq ?? []).length > 0 ? (content.faq ?? []) : DEFAULT_FAQS

  return {
    businessName,
    hero: {
      titleLine1: 'Des extérieurs pensés,',
      titleLine2: 'plantés et entretenus',
      lead: firstFilled(
        content.subtitle,
        `${businessName} conçoit, aménage et entretient vos espaces verts${city ? ` à ${city}` : ''} — avec des pratiques durables et un vrai souci du détail.`,
      ),
      ctaLabel: firstFilled(content.ctaQuoteLabel, 'Demander un devis gratuit'),
      image: firstFilled(content.heroImage, '/images/verdure/image-import-27.jpg'),
    },
    servicesHeading: {
      eyebrow: 'Nos prestations',
      title: firstFilled(content.servicesHeading, 'Un seul artisan pour tout votre extérieur'),
      lead: 'Du dessin du jardin à son entretien régulier : un interlocuteur unique, un matériel adapté et des végétaux choisis pour votre terrain.',
    },
    services,
    about: {
      heading: firstFilled(content.aboutHeading, `Qui est ${businessName} ?`),
      text: firstFilled(
        content.about,
        `Paysagiste ${city ? `à ${city}` : 'local'}, nous accompagnons particuliers et professionnels dans la création et l'entretien de leurs espaces verts. Chaque projet commence par une visite et un devis gratuit — et se termine par un extérieur dont on prend plaisir à profiter.`,
      ),
      checks: [
        'Devis gratuit et sans engagement',
        'Entreprise assurée — travail garanti',
        'Pratiques durables et éco-responsables',
      ],
      image: firstFilled(content.aboutImage, '/images/verdure/image-import-19.jpg'),
    },
    howHeading: { eyebrow: 'Notre méthode', title: 'Comment ça se passe ?' },
    how: DEFAULT_HOW,
    portfolioHeading: {
      eyebrow: 'Réalisations',
      title: firstFilled(content.galleryHeading, 'Nos derniers chantiers'),
    },
    portfolio,
    faqHeading: {
      eyebrow: 'FAQ',
      title: firstFilled(content.faqHeading, 'Vos questions, nos réponses'),
    },
    faqs,
    stats: (content.trustItems ?? []).some(
      (item: { value?: string; label?: string }): boolean =>
        firstFilled(item.value, item.label).length > 0,
    )
      ? (content.trustItems ?? [])
          .filter(
            (item: { value?: string; label?: string }): boolean =>
              firstFilled(item.value, item.label).length > 0,
          )
          .slice(0, 3)
          .map((item: { value?: string; label?: string }): VerdureStat => ({
            value: firstFilled(item.value),
            label: firstFilled(item.label),
          }))
      : [
          { label: 'Jardins entretenus', value: '180+' },
          { label: 'Clients satisfaits', value: '100+' },
          { label: 'Années d’expérience', value: '10 ans' },
        ],
    contactHeading: {
      eyebrow: 'Contact',
      title: firstFilled(content.contactHeading, 'Demandez votre devis gratuit'),
      lead: 'Appelez-nous, écrivez-nous ou laissez vos coordonnées : nous revenons vers vous sous 48 h avec un premier avis et un rendez-vous de visite.',
    },
    cta: {
      title: 'Parlons de votre jardin',
      lead: `Un projet d'aménagement ou besoin d'un entretien régulier${city ? ` à ${city}` : ''} ? Décrivez-nous votre extérieur, nous revenons vers vous sous 48 h.`,
      label: firstFilled(content.ctaCallLabel, 'Être rappelé'),
    },
    contact: {
      phone: firstFilled(content.phone),
      email: firstFilled(content.email),
      city,
      area,
      openingHours: (content.openingHours ?? []).map(
        (slot: { day?: string; hours?: string }): { day: string; hours: string } => ({
          day: firstFilled(slot.day),
          hours: firstFilled(slot.hours),
        }),
      ),
      zones: (content.zones ?? []).filter((zone: string): boolean => zone.trim().length > 0),
    },
    footerServices: services.map((service: VerdureService): string => service.title),
    social: (content.social ?? [])
      .filter(
        (link: { network?: string; url?: string }): boolean =>
          firstFilled(link.network, link.url).length > 0,
      )
      .map((link: { network?: string; url?: string }): VerdureSocialLink => ({
        network: firstFilled(link.network),
        label: firstFilled(link.network),
        url: firstFilled(link.url),
      })),
    theme: {
      primary: firstFilled(content.palette?.primary, '#2d746d'),
      secondary: firstFilled(content.palette?.secondary, '#003f2e'),
      accent: firstFilled(content.palette?.accent, '#bcff83'),
    },
  }
}
