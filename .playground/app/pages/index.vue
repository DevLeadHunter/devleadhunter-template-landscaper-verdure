<template>
  <LandscaperVerdureRoot :content="previewContent" />
</template>

<script lang="ts" setup>
// Page d'accueil du playground : rejoue le chemin de prod (Root + SiteContent),
// avec un paysagiste fictif réaliste. Les sous-pages restent la maquette multi-pages.
import LandscaperVerdureRoot from '../../../app/components/LandscaperVerdureRoot.vue'
import type { SiteContent } from '../../../app/types/SiteContent'

definePageMeta({ layout: false })

const previewContent: SiteContent = {
  businessName: 'Les Jardins d’Émeraude',
  phone: '02 99 47 12 58',
  email: 'contact@jardins-emeraude.fr',
  city: 'Rennes',
  area: 'Rennes et sa métropole',
  zones: ['Rennes', 'Cesson-Sévigné', 'Bruz', 'Betton', 'Saint-Grégoire'],
  openingHours: [
    { day: 'Lundi – Vendredi', hours: '8h00 – 18h30' },
    { day: 'Samedi', hours: '9h00 – 12h30' },
  ],
  // Section crédit d'impôt : remplie par l'API pour une entreprise déclarée services à la personne.
  taxCreditHeading: 'Votre entretien de jardin à moitié prix',
  taxCreditLead:
    'Les Jardins d’Émeraude est déclaré organisme de services à la personne : la moitié de vos travaux de jardinage vous est remboursée par l’État sous forme de crédit d’impôt, que vous soyez imposable ou non.',
  taxCreditPoints: [
    '50 % de la facture remboursés, même si vous ne payez pas d’impôt',
    'Jusqu’à 5 000 € de travaux par an, soit 2 500 € de crédit d’impôt',
    'Tonte, taille de haies, désherbage, débroussaillage, ramassage des feuilles',
    'Attestation fiscale fournie chaque année pour votre déclaration',
  ],
  taxCreditNote:
    'Petits travaux de jardinage au sens des services à la personne, dans la limite de 5 000 € de dépenses par an et par foyer.',
  // Bandeau de chiffres : données réelles pré-remplies par l'API (note Google + nombre d'avis).
  trustItems: [
    { value: '4,9/5', label: 'Note Google' },
    { value: '87', label: 'avis clients' },
    { value: 'Devis 0 €', label: 'Sans engagement' },
  ],
  reviews: [
    {
      author: 'Camille R.',
      rating: 5,
      text: 'Travail impeccable sur la taille des haies et l’élagage. Terrain laissé propre, rien à redire.',
    },
    {
      author: 'Thomas L.',
      rating: 5,
      text: 'Devis clair et respecté, intervention rapide après la tempête. Je recommande sans hésiter.',
    },
    {
      author: 'Sophie M.',
      rating: 4,
      text: 'Création du massif conforme à ce qu’on avait imaginé ensemble, avec de bons conseils sur les végétaux.',
    },
  ],
  strengths: [
    { title: 'Taille de haies et élagage' },
    { title: 'Terrain laissé propre' },
    { title: 'Conseils sur les végétaux' },
  ],
  // Réalisations du prospect : une photo embarquée par la template (/images/verdure/) serait écartée.
  portfolio: [
    {
      image: '/images/image-import-12.jpg',
      title: 'Massif de vivaces créé le long d’une allée',
      category: 'Création',
    },
    {
      image: '/images/image-import.jpg',
      title: 'Haies taillées et pelouse remise en état',
      category: 'Entretien',
    },
  ],
  social: [
    { network: 'Facebook', url: 'https://facebook.com/jardins-emeraude' },
    { network: 'Instagram', url: 'https://instagram.com/jardins.emeraude' },
  ],
}
</script>
