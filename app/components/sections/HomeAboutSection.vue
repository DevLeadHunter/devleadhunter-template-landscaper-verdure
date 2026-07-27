<template>
  <section class="about">
    <div class="container-eco about__inner">
      <div
        v-reveal="'left'"
        class="about__media">
        <img
          :src="content.about.image"
          alt="L'équipe au travail sur un chantier paysager"
          width="458"
          height="540" />
      </div>
      <div
        v-reveal="'right'"
        class="about__copy">
        <div class="about__heading">
          <p class="eyebrow">Pourquoi nous choisir</p>
          <h2 class="heading-xl">{{ content.about.heading }}</h2>
          <p class="body-text">{{ content.about.text }}</p>
        </div>
        <ul class="about__list">
          <li
            v-for="(item, index) in content.about.checks"
            :key="item">
            <img
              :src="`/images/icon-about-${index % 3}.svg`"
              alt=""
              width="32"
              height="32" />
            <span>{{ item }}</span>
          </li>
        </ul>
        <a
          href="#contact"
          class="btn-eco">
          {{ content.hero.ctaLabel }}
        </a>
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
</script>

<style scoped>
.about {
  padding: 0 0 100px;
}

.about__inner {
  display: grid;
  gap: 36px;
  align-items: center;
}

.about__media img {
  width: 100%;
  max-width: 520px;
  height: auto;
  aspect-ratio: 458 / 540;
  object-fit: cover;
  border-radius: clamp(20px, 5vw, 30px) clamp(48px, 18vw, 200px) clamp(20px, 5vw, 30px)
    clamp(48px, 18vw, 200px);
  display: block;
  margin-inline: auto;
}

.about__copy {
  display: grid;
  gap: 24px;
  max-width: 600px;
  padding-inline: 16px;
  box-sizing: border-box;
}

.about__heading {
  display: grid;
  gap: 16px;
  text-align: center;
}

.about__heading .body-text {
  line-height: 1.75;
}

.about__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 18px;
  justify-items: start;
}

.about__list li {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 14px;
  color: #003f2e;
  font-size: clamp(15px, 1.1vw, 18px);
  font-weight: 500;
  text-align: left;
}

.about__list img {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: block;
}

.about__copy .btn-eco {
  justify-self: center;
}

@media (min-width: 640px) {
  .about {
    padding: 0 0 120px;
  }

  .about__copy {
    padding-inline: 0;
  }

  .about__heading {
    text-align: left;
  }

  .about__copy .btn-eco {
    justify-self: start;
    width: auto;
    max-width: none;
  }
}

@media (min-width: 900px) {
  .about {
    padding: 0 0 160px;
  }

  .about__inner {
    grid-template-columns: minmax(320px, 1fr) 1.15fr;
    gap: clamp(48px, 8vw, 140px);
  }

  .about__heading {
    gap: 24px;
  }

  .about__list {
    gap: 28px;
  }

  .about__list li {
    gap: 20px;
  }

  .about__list img {
    width: 36px;
    height: 36px;
  }
}
</style>
