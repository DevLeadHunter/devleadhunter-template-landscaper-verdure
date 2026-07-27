<template>
  <section class="stats">
    <div
      v-reveal.stagger
      class="container-eco stats__grid">
      <article
        v-for="(item, index) in content.stats"
        :key="item.label"
        class="stats__item">
        <img
          :src="`/images/verdure/icon-stat-${index % 3}.svg`"
          alt=""
          width="40"
          height="40"
          class="stats__icon" />
        <p class="stats__label">{{ item.label }}</p>
        <p class="stats__value">{{ item.value }}</p>
      </article>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Bandeau de chiffres clés repris de la page « à propos » de la maquette multi-pages.
import type { ComputedRef } from 'vue'
import { computed, inject } from 'vue'
import type { VerdurePageContent } from '../../types/verdure'
import { buildVerdureContent, VERDURE_CONTENT_KEY } from '../../types/verdure'

/** Contenu de la page fourni par la racine (défauts éditoriaux FR hors racine). */
const content: ComputedRef<VerdurePageContent> = inject(
  VERDURE_CONTENT_KEY,
  (): ComputedRef<VerdurePageContent> =>
    computed((): VerdurePageContent => buildVerdureContent({})),
  true,
)
</script>

<style scoped>
.stats {
  padding: 8px 0 var(--verdure-section-space, 120px);
}

.stats__grid {
  display: grid;
  gap: 44px;
  grid-template-columns: 1fr;
  max-width: 1140px;
  margin-inline: auto;
}

.stats__item {
  background: transparent;
  padding: 0;
  text-align: center;
  display: grid;
  gap: 10px;
  justify-items: center;
}

.stats__icon {
  width: 36px;
  height: 36px;
  display: block;
  object-fit: contain;
}

.stats__label {
  margin: 0;
  color: var(--color-verdure-brand);
  font-size: 16px;
  font-weight: 600;
}

.stats__value {
  margin: 0;
  color: var(--color-verdure-brand-dark);
  font-size: clamp(36px, 10vw, 56px);
  font-weight: 600;
}

@media (min-width: 800px) {
  .stats__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
