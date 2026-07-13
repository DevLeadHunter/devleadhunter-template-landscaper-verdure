<template>
  <div>
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
import HomeHeroSection from '../../../app/components/sections/HomeHeroSection.vue'
import HomeServicesSection from '../../../app/components/sections/HomeServicesSection.vue'
import HomeAboutSection from '../../../app/components/sections/HomeAboutSection.vue'
import HomeHowSection from '../../../app/components/sections/HomeHowSection.vue'
import HomePortfolioSection from '../../../app/components/sections/HomePortfolioSection.vue'
import FaqsSection from '../../../app/components/sections/FaqsSection.vue'
import CtaSection from '../../../app/components/sections/CtaSection.vue'

useHead({ title: 'Home' })
</script>
