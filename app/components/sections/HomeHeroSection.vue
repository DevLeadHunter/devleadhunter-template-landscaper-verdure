<template>
  <section
    class="hero"
    :class="{ 'hero--ready': ready }">
    <div class="container-eco hero__inner">
      <div class="hero__copy">
        <img
          class="hero__badge hero-anim"
          src="/images/verdure/hero-badge.svg"
          alt=""
          width="67"
          height="70" />
        <div class="hero__heading">
          <h1 class="heading-hero hero-anim hero-anim--title">
            {{ content.hero.titleLine1 }}
            <br />
            {{ content.hero.titleLine2 }}
          </h1>
          <p class="lead hero-anim hero-anim--lead">{{ content.hero.lead }}</p>
          <div class="hero-anim hero-anim--cta">
            <a
              href="#contact"
              class="btn-eco">
              {{ content.hero.ctaLabel }}
            </a>
          </div>
        </div>
      </div>
      <div class="hero__media hero-anim hero-anim--media">
        <img
          :src="content.hero.image"
          alt="Jardin aménagé et entretenu par un paysagiste professionnel"
          width="1140"
          height="550" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ComputedRef, Ref } from 'vue'
import { computed, inject, onMounted, ref } from 'vue'
import type { VerdurePageContent } from '../../types/verdure'
import { buildVerdureContent, VERDURE_CONTENT_KEY } from '../../types/verdure'

/** Contenu de la page fourni par la racine (défauts éditoriaux FR hors racine). */
const content: ComputedRef<VerdurePageContent> = inject(
  VERDURE_CONTENT_KEY,
  (): ComputedRef<VerdurePageContent> =>
    computed((): VerdurePageContent => buildVerdureContent({})),
  true,
)

const ready: Ref<boolean> = ref(false)

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    ready.value = true
    return
  }
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ready.value = true
    })
  })
})
</script>

<style scoped>
.hero {
  padding: clamp(48px, 7vw, 110px) 0 clamp(72px, 9vw, 140px);
}

.hero__inner {
  display: grid;
  gap: clamp(36px, 5vw, 64px);
  justify-items: center;
  text-align: center;
}

.hero__copy {
  display: grid;
  gap: 16px;
  justify-items: center;
  max-width: 920px;
  width: 100%;
}

.hero__badge {
  width: 52px;
  height: 54px;
  display: block;
}

.hero__heading {
  display: grid;
  gap: 22px;
  justify-items: center;
  width: 100%;
}

.hero__heading .lead {
  line-height: 1.6;
  max-width: 880px;
}

.hero__media {
  position: relative;
  width: 100%;
  max-width: 1140px;
  border-radius: 14px;
  overflow: hidden;
  aspect-ratio: 1140 / 550;
  background: #e8ebe3;
}

@media (min-width: 640px) {
  .hero__media {
    border-radius: clamp(22px, 3.5vw, 50px);
  }
}

.hero__media > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.08);
  transition: transform 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.35s;
}

.hero--ready .hero__media > img {
  transform: scale(1);
}

.hero__play {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: 36px;
  height: 42px;
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
  display: block;
  transition:
    transform 280ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) 0.55s;
  opacity: 0;
}

.hero--ready .hero__play {
  opacity: 1;
}

.hero__play:hover {
  transform: scale(1.08);
}

.hero__play img {
  width: 100%;
  height: 100%;
  display: block;
}

.hero-anim {
  opacity: 0;
  transform: translate3d(0, 42px, 0);
  transition:
    opacity 0.95s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.95s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-anim--title {
  transform: translate3d(0, 52px, 0);
  transition-duration: 1.05s;
}

.hero-anim--lead {
  transform: translate3d(0, 36px, 0);
}

.hero-anim--cta {
  transform: translate3d(0, 28px, 0) scale(0.96);
}

.hero-anim--media {
  transform: translate3d(0, 56px, 0) scale(0.97);
  transition-duration: 1.15s;
}

.hero--ready .hero__badge {
  opacity: 1;
  transform: none;
  transition-delay: 40ms;
}

.hero--ready .hero-anim--title {
  opacity: 1;
  transform: none;
  transition-delay: 140ms;
}

.hero--ready .hero-anim--lead {
  opacity: 1;
  transform: none;
  transition-delay: 260ms;
}

.hero--ready .hero-anim--cta {
  opacity: 1;
  transform: none;
  transition-delay: 380ms;
}

.hero--ready .hero-anim--media {
  opacity: 1;
  transform: none;
  transition-delay: 220ms;
}

@media (min-width: 640px) {
  .hero__badge {
    width: 60px;
    height: 63px;
  }

  .hero__play {
    width: 42px;
    height: 50px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-anim,
  .hero__media > img,
  .hero__play {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
</style>
