<template>
  <div
    id="top"
    class="verdure-root bg-verdure-surface text-verdure-ink font-verdure-sans"
    :style="themeVars">
    <PageGradients />
    <SiteHeader />
    <main class="verdure-root__main">
      <HomeHeroSection />
      <section id="services">
        <HomeServicesSection />
      </section>
      <section id="about">
        <HomeAboutSection />
      </section>
      <HomeHowSection />
      <section id="portfolio">
        <HomePortfolioSection />
      </section>
      <FaqsSection />
      <section id="contact">
        <CtaSection />
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

<script lang="ts" setup>
/**
 * Template 'landscaper-verdure' — vitrine one-page paysagiste / verdure.
 * DA « Eco Landscaping » (Pencil) : fond vert d'eau, encre sapin, lime en accent.
 * Racine publique de la template : elle rend un `SiteContent` typé et POSSÈDE sa
 * copie éditoriale française (via `buildVerdureContent`), fournie aux sections
 * par injection. Aucune dépendance à demo-host.
 */
import type { ComputedRef, PropType } from 'vue'
import { computed, provide } from 'vue'
import PageGradients from './layout/PageGradients.vue'
import SiteHeader from './layout/SiteHeader.vue'
import SiteFooter from './layout/SiteFooter.vue'
import HomeHeroSection from './sections/HomeHeroSection.vue'
import HomeServicesSection from './sections/HomeServicesSection.vue'
import HomeAboutSection from './sections/HomeAboutSection.vue'
import HomeHowSection from './sections/HomeHowSection.vue'
import HomePortfolioSection from './sections/HomePortfolioSection.vue'
import FaqsSection from './sections/FaqsSection.vue'
import CtaSection from './sections/CtaSection.vue'
import type { SiteContent } from '~/types/SiteContent'
import type { VerdurePageContent } from '~/types/verdure'
import { buildVerdureContent, VERDURE_CONTENT_KEY } from '~/types/verdure'

/**
 * Racine de la template — l'unique point d'entrée public rendu par demo-host.
 * `content` porte les données variables réelles du prospect (toutes clés optionnelles).
 */
const props = defineProps({
  content: {
    type: Object as PropType<SiteContent>,
    required: true,
  },
})

/** Contenu complet (données prospect fusionnées à la copie éditoriale FR). */
const parsed: ComputedRef<VerdurePageContent> = computed((): VerdurePageContent =>
  buildVerdureContent(props.content),
)

provide(VERDURE_CONTENT_KEY, parsed)

/** Palette du prospect appliquée par-dessus les tokens par défaut de la DA. */
const themeVars: ComputedRef<Record<string, string>> = computed((): Record<string, string> => ({
  '--color-verdure-brand': parsed.value.theme.primary,
  '--color-verdure-muted': parsed.value.theme.primary,
  '--color-verdure-ink': parsed.value.theme.secondary,
  '--color-verdure-brand-dark': parsed.value.theme.secondary,
  '--color-verdure-brand-lime': parsed.value.theme.accent,
}))

useHead((): { title: string; htmlAttrs: { lang: string }; link: Record<string, string>[] } => ({
  title: parsed.value.businessName,
  htmlAttrs: { lang: 'fr' },
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap',
    },
  ],
}))
</script>

<style scoped>
.verdure-root {
  position: relative;
  isolation: isolate;
}

.verdure-root__main {
  position: relative;
  z-index: 1;
}

/* Les ancres tombent sous le header : petit dégagement au scroll ciblé. */
.verdure-root section[id] {
  scroll-margin-top: 24px;
}
</style>
