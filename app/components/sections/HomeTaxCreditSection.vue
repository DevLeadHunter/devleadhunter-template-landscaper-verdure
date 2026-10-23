<template>
  <section
    v-if="content.taxCredit.heading"
    class="tax-credit">
    <div class="container-eco">
      <div
        v-reveal
        class="tax-credit__card">
        <div class="tax-credit__figure">
          <p class="tax-credit__eyebrow">Services à la personne</p>
          <p class="tax-credit__rate">50 %</p>
          <p class="tax-credit__caption">de la facture remboursés par l'État</p>
        </div>
        <div class="tax-credit__copy">
          <p class="eyebrow">Crédit d'impôt</p>
          <h2 class="heading-xl">{{ content.taxCredit.heading }}</h2>
          <p
            v-if="content.taxCredit.lead"
            class="body-text">
            {{ content.taxCredit.lead }}
          </p>
          <ul
            v-if="content.taxCredit.points.length > 0"
            v-reveal.stagger
            class="tax-credit__list">
            <li
              v-for="point in content.taxCredit.points"
              :key="point">
              <img
                src="/images/verdure/icon-check-circle.svg"
                alt=""
                width="26"
                height="26" />
              <span>{{ point }}</span>
            </li>
          </ul>
          <p
            v-if="content.taxCredit.note"
            class="tax-credit__note">
            {{ content.taxCredit.note }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Section « crédit d'impôt » : l'entretien de jardin est un service à la personne, la moitié de la
// facture revient au client. Rendue seulement quand l'API a rempli le titre (entreprise déclarée).
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
.tax-credit {
  padding: 0 0 var(--verdure-section-space, 120px);
}

.tax-credit__card {
  display: grid;
  overflow: hidden;
  border-radius: clamp(20px, 4vw, 30px);
  background: var(--color-verdure-surface-alt);
  box-shadow: 0 24px 60px -40px rgba(0, 63, 46, 0.35);
}

.tax-credit__figure {
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 8px;
  padding: 36px 24px;
  background: var(--color-verdure-brand);
  color: #ffffff;
  text-align: center;
}

.tax-credit__eyebrow {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--color-verdure-brand-lime);
}

.tax-credit__rate {
  margin: 0;
  font-size: clamp(64px, 16vw, 112px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
}

.tax-credit__caption {
  margin: 0;
  max-width: 220px;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.4;
}

.tax-credit__copy {
  display: grid;
  gap: 18px;
  padding: 32px 24px 36px;
}

.tax-credit__copy .body-text {
  line-height: 1.7;
}

.tax-credit__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 14px;
}

.tax-credit__list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: var(--color-verdure-ink);
  font-size: clamp(15px, 1.05vw, 17px);
  font-weight: 500;
  line-height: 1.45;
}

.tax-credit__list img {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  display: block;
}

.tax-credit__note {
  margin: 4px 0 0;
  color: var(--color-verdure-ink);
  opacity: 0.72;
  font-size: 13px;
  line-height: 1.5;
}

@media (min-width: 900px) {
  .tax-credit__card {
    grid-template-columns: minmax(280px, 0.8fr) 1.6fr;
  }

  .tax-credit__figure {
    padding: 48px 32px;
  }

  .tax-credit__copy {
    gap: 22px;
    padding: 52px clamp(32px, 5vw, 72px);
  }

  .tax-credit__list {
    gap: 16px;
  }
}
</style>
