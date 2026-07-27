<template>
  <section class="services">
    <div class="container-eco container-eco--wide services__inner">
      <div
        v-reveal
        class="services__heading">
        <p class="eyebrow">{{ content.servicesHeading.eyebrow }}</p>
        <h2 class="heading-xl">{{ content.servicesHeading.title }}</h2>
        <p class="lead">{{ content.servicesHeading.lead }}</p>
      </div>
      <div
        v-reveal.stagger
        class="services__grid">
        <ServiceNotchCard
          v-for="(service, index) in content.services"
          :key="service.title"
          :title="service.title"
          :description="service.description"
          :image="service.image"
          :icon-index="index"
          to="#contact" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { computed, inject } from 'vue'
import type { VerdurePageContent } from '../../types/verdure'
import { buildVerdureContent, VERDURE_CONTENT_KEY } from '../../types/verdure'
import ServiceNotchCard from './ServiceNotchCard.vue'

/** Contenu de la page fourni par la racine (défauts éditoriaux FR hors racine). */
const content: ComputedRef<VerdurePageContent> = inject(
  VERDURE_CONTENT_KEY,
  (): ComputedRef<VerdurePageContent> =>
    computed((): VerdurePageContent => buildVerdureContent({})),
  true,
)
</script>

<style scoped>
.services {
  padding: 0 0 var(--verdure-section-space, 120px);
}

.services__inner {
  display: grid;
  gap: 40px;
  justify-items: stretch;
  width: 100%;
}

.services__heading {
  max-width: 780px;
  display: grid;
  gap: 16px;
  text-align: center;
  justify-self: center;
}

.services__heading .lead {
  line-height: 1.6;
}

.services__grid {
  width: 100%;
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
}

@media (min-width: 700px) {
  .services__inner {
    gap: 56px;
  }

  .services__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }
}

@media (min-width: 1100px) {
  .services__inner {
    gap: 64px;
  }

  .services__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 22px;
  }
}
</style>
