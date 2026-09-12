<template>
  <section
    v-if="content.reviews.length > 0"
    class="reviews">
    <div class="container-eco reviews__inner">
      <div
        v-reveal
        class="reviews__heading">
        <p class="eyebrow">{{ content.reviewsHeading.eyebrow }}</p>
        <h2 class="heading-xl">{{ content.reviewsHeading.title }}</h2>
      </div>
      <div
        v-reveal.stagger
        class="reviews__grid">
        <article
          v-for="(review, index) in content.reviews"
          :key="`${review.author}-${index}`"
          class="reviews__card">
          <div
            class="reviews__stars"
            :aria-label="`Note : ${roundedRating(review.rating)} sur 5`">
            <svg
              v-for="star in 5"
              :key="star"
              class="reviews__star"
              :class="{ 'reviews__star--filled': star <= roundedRating(review.rating) }"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true">
              <path
                d="M12 2.6l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.6z"
                fill="currentColor" />
            </svg>
          </div>
          <blockquote class="reviews__text body-text">{{ review.text }}</blockquote>
          <p class="reviews__author">{{ review.author }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
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

/**
 * Arrondit une note à l'entier le plus proche, borné entre 0 et 5, pour l'affichage des étoiles.
 * @param rating - Note brute de l'avis.
 * @returns Un entier de 0 à 5.
 */
function roundedRating(rating: number): number {
  return Math.max(0, Math.min(5, Math.round(rating)))
}
</script>

<style scoped>
.reviews {
  padding: 0 0 var(--verdure-section-space, 120px);
}

.reviews__inner {
  display: grid;
  gap: 40px;
  justify-items: center;
  width: 100%;
}

.reviews__heading {
  max-width: 780px;
  display: grid;
  gap: 14px;
  text-align: center;
}

.reviews__grid {
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
}

.reviews__card {
  display: grid;
  gap: 16px;
  align-content: start;
  background: #fff;
  border: 1px solid color-mix(in srgb, var(--color-verdure-ink) 12%, transparent);
  border-radius: clamp(16px, 2.4vw, 22px);
  padding: clamp(24px, 3vw, 32px);
  box-shadow: 0 18px 40px -32px rgb(0 63 46 / 45%);
}

.reviews__stars {
  display: inline-flex;
  gap: 3px;
  color: color-mix(in srgb, var(--color-verdure-ink) 16%, transparent);
}

.reviews__star {
  display: block;
}

.reviews__star--filled {
  color: var(--color-verdure-brand);
}

.reviews__text {
  margin: 0;
  font-size: clamp(15px, 1.05vw, 16px);
  line-height: 1.6;
}

.reviews__author {
  margin: 0;
  color: var(--color-verdure-ink);
  font-size: 15px;
  font-weight: 600;
}

@media (min-width: 700px) {
  .reviews__inner {
    gap: 56px;
  }

  .reviews__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }
}

@media (min-width: 1100px) {
  .reviews__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
