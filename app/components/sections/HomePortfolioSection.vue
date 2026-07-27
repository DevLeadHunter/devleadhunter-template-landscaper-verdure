<template>
  <section class="portfolio">
    <div class="container-eco portfolio__inner">
      <div
        v-reveal
        class="portfolio__heading">
        <p class="eyebrow">{{ content.portfolioHeading.eyebrow }}</p>
        <h2 class="heading-xl">{{ content.portfolioHeading.title }}</h2>
        <p class="lead-sm">
          Chaque chantier est mené avec le même soin, qu'il s'agisse d'une création complète ou d'un
          entretien régulier.
        </p>
      </div>
      <div
        v-reveal.stagger
        class="portfolio__grid">
        <PortfolioProjectCard
          v-for="(item, index) in content.portfolio"
          :key="item.image"
          to="#contact"
          :image="item.image"
          :category="item.category"
          :title="item.title"
          :accent="item.accent"
          :variant="index === 0 ? 'left' : 'right'" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { computed, inject } from 'vue'
import type { VerdurePageContent } from '../../types/verdure'
import { buildVerdureContent, VERDURE_CONTENT_KEY } from '../../types/verdure'
import PortfolioProjectCard from './PortfolioProjectCard.vue'

/** Contenu de la page fourni par la racine (défauts éditoriaux FR hors racine). */
const content: ComputedRef<VerdurePageContent> = inject(
  VERDURE_CONTENT_KEY,
  (): ComputedRef<VerdurePageContent> =>
    computed((): VerdurePageContent => buildVerdureContent({})),
  true,
)
</script>

<style scoped>
.portfolio {
  padding: 0 0 var(--verdure-section-space, 120px);
}

.portfolio__inner {
  display: grid;
  gap: 40px;
  justify-items: center;
}

.portfolio__heading {
  max-width: 780px;
  display: grid;
  gap: 14px;
  text-align: center;
}

.portfolio__grid {
  width: 100%;
  display: grid;
  gap: 28px;
  grid-template-columns: 1fr;
  align-items: start;
}

@media (min-width: 900px) {
  .portfolio__inner {
    gap: 64px;
  }

  .portfolio__heading {
    gap: 20px;
  }

  .portfolio__grid {
    gap: clamp(28px, 3.5vw, 48px);
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
