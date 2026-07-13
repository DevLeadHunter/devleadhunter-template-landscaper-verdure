<template>
  <div>
    <PageHeroSection
      eyebrow="What we do"
      title="Ready to transform your outdoor experience?"
      description="We offer a comprehensive range of services, including layout design sketch, plant selection and installation, revitalization of existing features, improved irrigation systems, paving options, simple aesthetic mulching, more" />

    <section class="portfolio-page">
      <div
        v-reveal.stagger
        class="container-eco portfolio-page__grid">
        <PortfolioProjectCard
          v-for="(item, index) in portfolioItems"
          :key="item.slug"
          :to="`/portfolio/${item.slug}`"
          :image="item.image"
          :category="item.category"
          :title="item.title"
          :accent="index === 0"
          :variant="index % 2 === 0 ? 'left' : 'right'" />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import PageHeroSection from '../../../app/components/sections/PageHeroSection.vue'
import PortfolioProjectCard from '../../../app/components/sections/PortfolioProjectCard.vue'
import { portfolioItems } from '../../../app/data/site'

useHead({ title: 'Portfolio' })
</script>

<style scoped>
.portfolio-page {
  padding: 8px 0 80px;
}

.portfolio-page__grid {
  display: grid;
  gap: 28px;
  grid-template-columns: 1fr;
  align-items: start;
}

@media (min-width: 900px) {
  .portfolio-page {
    padding: 12px 0 110px;
  }

  .portfolio-page__grid {
    gap: clamp(28px, 3.5vw, 48px);
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
