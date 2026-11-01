import type { ComputedRef, InjectionKey } from 'vue'
import type {
  SiteContent,
  SiteContentFaqItem,
  SiteContentPortfolioItem,
  SiteContentService,
  SiteContentStrength,
} from './SiteContent'
import { professionalLicenseLine, regionalLabel } from '@devleadhunter/website-content'

/** Hero de la one-page (titre, accroche, CTA). */
export interface VerdureHero {
  title: string
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

/** Section « crédit d'impôt » (services à la personne) ; masquée tant que le titre est vide. */
export interface VerdureTaxCredit {
  heading: string
  lead: string
  points: string[]
  note: string
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

/** Un avis client affiché dans la section avis. */
export interface VerdureReview {
  author: string
  rating: number
  text: string
}

/** Contenu complet consommé par les sections de la template. */
export interface VerdurePageContent {
  businessName: string
  logo: string
  country: string
  navigation: { label: string; to: string }[]
  hero: VerdureHero
  servicesHeading: { eyebrow: string; title: string; lead: string }
  services: VerdureService[]
  taxCredit: VerdureTaxCredit
  about: VerdureAbout
  howHeading: { eyebrow: string; title: string }
  how: VerdureStep[]
  portfolioHeading: { eyebrow: string; title: string; lead: string }
  portfolio: VerdurePortfolioItem[]
  faqHeading: { eyebrow: string; title: string }
  faqs: SiteContentFaqItem[]
  reviewsHeading: { eyebrow: string; title: string }
  reviews: VerdureReview[]
  cta: { title: string; lead: string; label: string; background: string }
  stats: VerdureStat[]
  contactHeading: { eyebrow: string; title: string; lead: string }
  contact: VerdureContact
  footerServices: string[]
  professionalLicense: string
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

const BUNDLED_IMAGE_FOLDER: string = '/images/verdure/'

const SEEDED_EXAMPLE_PORTFOLIO_TITLES: string[] = [
  "Transformation complète d'un jardin : terrasse, massifs et éclairage",
  "Remise en état d'un extérieur : pelouse, haies et allées rafraîchies",
]

const CITY_ARTICLE_CONTRACTED_AFTER_A: RegExp = /^(les?)\s+(?=\S)/i

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
    description: 'Arrosage automatique, clôtures et portails, posés avec soin.',
    image: SERVICE_IMAGES[3] ?? '',
  },
]

const DEFAULT_FAQS: Required<SiteContentFaqItem>[] = [
  {
    question: 'Quels travaux de jardin sont proposés ?',
    answer:
      'Ceux présentés dans la section prestations. Pour un autre besoin, il suffit de demander.',
  },
  {
    question: 'Que préciser lors d’une première demande ?',
    answer:
      'L’adresse du jardin, les travaux souhaités et, si possible, quelques photos de votre extérieur.',
  },
  {
    question: 'Faut-il une visite avant les travaux ?',
    answer:
      'Selon le chantier, une visite permet de voir le terrain et de prendre les mesures avant de chiffrer les travaux.',
  },
]

const DEFAULT_HOW: VerdureStep[] = [
  {
    step: 'Étape 1',
    title: 'Visite & écoute',
    description:
      'Un premier rendez-vous sur le terrain pour écouter vos envies, repérer les contraintes et prendre les mesures.',
  },
  {
    step: 'Étape 2',
    title: 'Devis détaillé',
    description: 'Une proposition claire : prestations, végétaux ou matériaux, délais et budget.',
  },
  {
    step: 'Étape 3',
    title: 'Réalisation soignée',
    description: 'De la préparation du sol aux finitions, le chantier est mené avec soin.',
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
 * Écrit une ville derrière « à », contracté devant l'article Le ou Les (« au Locle », « aux Abymes »).
 * @param city - Ville telle qu'écrite dans le contenu.
 * @returns La ville précédée de sa préposition.
 */
export function cityWithPreposition(city: string): string {
  const article: RegExpExecArray | null = CITY_ARTICLE_CONTRACTED_AFTER_A.exec(city)
  if (!article) {
    return `à ${city}`
  }
  const preposition: string = article[1]?.toLowerCase() === 'le' ? 'au' : 'aux'
  return `${preposition} ${city.slice(article[0].length)}`
}

/**
 * Dit si une réalisation montre un chantier du prospect : ni photo du layer, ni exemple semé avant (reconnu à son titre inventé, même quand sa photo a été recopiée ailleurs).
 * @param item - Réalisation du contenu.
 * @returns Vrai quand la réalisation a une photo qui ne vient pas du layer et un titre qui n'est pas celui d'un exemple.
 */
function isProspectPortfolioItem(item: SiteContentPortfolioItem): boolean {
  const image: string = firstFilled(item.image)
  const title: string = firstFilled(item.title).replaceAll('’', "'")
  return (
    image.length > 0 &&
    !image.includes(BUNDLED_IMAGE_FOLDER) &&
    !SEEDED_EXAMPLE_PORTFOLIO_TITLES.includes(title)
  )
}

/**
 * Construit le contenu complet de la one-page paysagiste : les données réelles du
 * prospect (SiteContent) par-dessus la copie éditoriale française par défaut.
 * @param content - Contenu prospect (toutes clés optionnelles).
 * @returns Le contenu prêt à rendre pour chaque section.
 */
export function buildVerdureContent(content: SiteContent): VerdurePageContent {
  const businessName: string = firstFilled(content.businessName, 'Votre paysagiste')
  const logo: string = typeof content.logo === 'string' ? content.logo.trim() : ''
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
      image: firstFilled(service.image, SERVICE_IMAGES[index % SERVICE_IMAGES.length] ?? ''),
    }))
  const services: VerdureService[] =
    scrapedServices.length >= 3 ? scrapedServices : DEFAULT_SERVICES

  const portfolio: VerdurePortfolioItem[] = (content.portfolio ?? [])
    .filter(isProspectPortfolioItem)
    .slice(0, 2)
    .map((item: SiteContentPortfolioItem, index: number): VerdurePortfolioItem => ({
      category: firstFilled(item.category, 'Réalisation'),
      title: firstFilled(item.title, businessName),
      image: firstFilled(item.image),
      accent: index === 0,
    }))

  const faqs: SiteContentFaqItem[] =
    (content.faq ?? []).length > 0
      ? (content.faq ?? [])
      : DEFAULT_FAQS.map((item: Required<SiteContentFaqItem>): SiteContentFaqItem => ({
          question: regionalLabel(content, item.question),
          answer: regionalLabel(content, item.answer),
        }))

  const editableSteps: VerdureStep[] = (content.steps ?? [])
    .filter((step: { title?: string }): boolean => firstFilled(step.title).length > 0)
    .map((step: { title?: string; description?: string }, index: number): VerdureStep => ({
      step: `Étape ${index + 1}`,
      title: firstFilled(step.title),
      description: firstFilled(step.description),
    }))
  const how: VerdureStep[] =
    editableSteps.length > 0
      ? editableSteps
      : DEFAULT_HOW.map((step: VerdureStep): VerdureStep => ({
          step: step.step,
          title: regionalLabel(content, step.title),
          description: regionalLabel(content, step.description),
        }))

  const cityWithItsPreposition: string = city ? cityWithPreposition(city) : ''

  const reviews: VerdureReview[] = (content.reviews ?? [])
    .filter((review: { text?: string }): boolean => firstFilled(review.text).length > 0)
    .slice(0, 6)
    .map((review: { author?: string; rating?: number; text?: string }): VerdureReview => ({
      author: firstFilled(review.author, 'Client'),
      rating: typeof review.rating === 'number' && review.rating > 0 ? review.rating : 5,
      text: firstFilled(review.text),
    }))

  return {
    businessName,
    logo,
    country: firstFilled(content.country),
    navigation: [
      { label: 'Prestations', to: '#services' },
      { label: 'À propos', to: '#about' },
      ...(portfolio.length > 0 ? [{ label: 'Réalisations', to: '#portfolio' }] : []),
      { label: 'Contact', to: '#contact' },
    ],
    hero: {
      title: firstFilled(content.heroTitle, 'Des extérieurs pensés, plantés et entretenus'),
      lead: firstFilled(
        content.subtitle,
        `${businessName} conçoit, aménage et entretient vos espaces verts${city ? ` ${cityWithItsPreposition}` : ''}.`,
      ),
      ctaLabel: firstFilled(content.ctaQuoteLabel, regionalLabel(content, 'Demander un devis')),
      image: firstFilled(content.heroImage, '/images/verdure/image-import-27.jpg'),
    },
    servicesHeading: {
      eyebrow: 'Nos prestations',
      title: firstFilled(
        content.servicesHeading,
        city ? `Votre paysagiste ${cityWithItsPreposition}` : 'Votre paysagiste',
      ),
      lead: firstFilled(
        content.servicesLead,
        'Du dessin du jardin à son entretien régulier, des prestations adaptées à votre terrain.',
      ),
    },
    services,
    about: {
      heading: firstFilled(content.aboutHeading, `Qui est ${businessName} ?`),
      text: firstFilled(
        content.about,
        `Paysagiste ${city ? cityWithItsPreposition : 'local'} : création, aménagement et entretien de jardins et d'espaces verts.`,
      ),
      checks: (content.strengths ?? [])
        .map((strength: SiteContentStrength): string => firstFilled(strength.title))
        .filter((title: string): boolean => title.length > 0)
        .slice(0, 3),
      image: firstFilled(content.aboutImage, '/images/verdure/image-import-19.jpg'),
    },
    // Jamais de défaut : la section n'existe que pour une entreprise déclarée services à la personne.
    taxCredit: {
      heading: firstFilled(content.taxCreditHeading),
      lead: firstFilled(content.taxCreditLead),
      points: (content.taxCreditPoints ?? []).filter(
        (point: string): boolean => point.trim().length > 0,
      ),
      note: firstFilled(content.taxCreditNote),
    },
    howHeading: {
      eyebrow: 'Notre méthode',
      title: firstFilled(content.stepsHeading, 'Comment ça se passe ?'),
    },
    how,
    portfolioHeading: {
      eyebrow: 'Réalisations',
      title: firstFilled(content.portfolioHeading, 'Nos derniers chantiers'),
      lead: firstFilled(
        content.portfolioLead,
        "Chaque chantier est mené avec le même soin, qu'il s'agisse d'une création complète ou d'un entretien régulier.",
      ),
    },
    portfolio,
    faqHeading: {
      eyebrow: 'FAQ',
      title: firstFilled(content.faqHeading, 'Vos questions, nos réponses'),
    },
    faqs,
    reviewsHeading: {
      eyebrow: 'Avis clients',
      title: firstFilled(content.reviewsHeading, 'Ils nous ont fait confiance'),
    },
    reviews,
    // Bandeau de chiffres : uniquement des données réelles (note Google, nombre d'avis, repères
    // qualitatifs seedés par l'API). Jamais de chiffres inventés — la bande se masque si vide.
    stats: (content.trustItems ?? [])
      .filter(
        (item: { value?: string; label?: string }): boolean =>
          firstFilled(item.value, item.label).length > 0,
      )
      .slice(0, 3)
      .map((item: { value?: string; label?: string }): VerdureStat => ({
        value: firstFilled(item.value),
        label: firstFilled(item.label),
      })),
    contactHeading: {
      eyebrow: 'Contact',
      title: firstFilled(content.contactHeading, regionalLabel(content, 'Demandez votre devis')),
      lead: firstFilled(
        content.contactLead,
        'Décrivez votre extérieur et les travaux que vous envisagez.',
      ),
    },
    cta: {
      title: firstFilled(content.ctaTitle, 'Parlons de votre jardin'),
      lead: firstFilled(
        content.ctaLead,
        `Un projet d'aménagement ou un entretien régulier${city ? ` ${cityWithItsPreposition}` : ''} ? Chaque projet commence par un échange.`,
      ),
      label: firstFilled(content.ctaCallLabel, 'Être rappelé'),
      background: firstFilled(content.images?.ctaBackground, '/images/verdure/image-import-3.jpg'),
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
    professionalLicense: professionalLicenseLine(content),
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
      secondary: firstFilled(content.palette?.secondary, '#00b67a'),
      accent: firstFilled(content.palette?.accent, '#bcff83'),
    },
  }
}
