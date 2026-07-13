<template>
  <div>
    <PageHeroSection
      eyebrow="our services"
      title="Get the best lawn on the block"
      description="Proin id turpis porta, efficitur tortor eget auctor dui Aenean tincidunt purus sed vestibulum sit amet pellentesque velit. Nunc sit amet dolor fringilla elit aliquam" />

    <section class="services-page">
      <div
        v-reveal.stagger
        class="container-eco container-eco--wide services-page__grid">
        <ServiceNotchCard
          v-for="(service, index) in servicesPage"
          :key="service.slug"
          :to="`/services/${service.slug}`"
          :title="service.title"
          :description="service.description"
          :image="service.image"
          :icon-index="index % 4" />
      </div>
    </section>

    <FaqsSection />
    <CtaSection />
  </div>
</template>

<script lang="ts" setup>
import PageHeroSection from '../../../app/components/sections/PageHeroSection.vue'
import FaqsSection from '../../../app/components/sections/FaqsSection.vue'
import CtaSection from '../../../app/components/sections/CtaSection.vue'
import ServiceNotchCard from '../../../app/components/sections/ServiceNotchCard.vue'
import { servicesPage } from '../../../app/data/site'

useHead({ title: 'Services' })
</script>

<style scoped>
.services-page {
  padding: 8px 0 72px;
}

.services-page__grid {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  width: 100%;
}

@media (min-width: 700px) {
  .services-page {
    padding: 12px 0 90px;
  }

  .services-page__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }
}

@media (min-width: 1100px) {
  .services-page__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 22px;
  }
}
</style>
