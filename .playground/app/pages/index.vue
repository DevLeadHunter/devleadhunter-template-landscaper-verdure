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
  social: [
    { network: 'Facebook', url: 'https://facebook.com/jardins-emeraude' },
    { network: 'Instagram', url: 'https://instagram.com/jardins.emeraude' },
  ],
}
</script>
