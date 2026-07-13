<template>
  <div class="bg-surface text-ink min-h-dvh font-sans">
    <HomeHeroSection />
    <HomeServicesSection />
    <HomeAboutSection />
    <HomeHowSection />
    <HomePortfolioSection />
    <FaqsSection />
    <CtaSection />
  </div>
</template>

<script lang="ts" setup>
/**
 * Layer root for future DevLeadHunter demo-host integration.
 * The playground currently renders a full multi-page Eco Landscaping site;
 * this root keeps a single entry point available for later SiteContent wiring.
 */
import HomeHeroSection from './sections/HomeHeroSection.vue'
import HomeServicesSection from './sections/HomeServicesSection.vue'
import HomeAboutSection from './sections/HomeAboutSection.vue'
import HomeHowSection from './sections/HomeHowSection.vue'
import HomePortfolioSection from './sections/HomePortfolioSection.vue'
import FaqsSection from './sections/FaqsSection.vue'
import CtaSection from './sections/CtaSection.vue'

useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap',
    },
  ],
})
</script>
