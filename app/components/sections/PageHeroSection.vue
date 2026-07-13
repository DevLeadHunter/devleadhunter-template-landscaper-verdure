<template>
  <section
    class="page-hero"
    :class="{ 'page-hero--ready': ready }">
    <div class="container-eco page-hero__inner">
      <p
        v-if="eyebrow"
        class="eyebrow page-hero-anim">
        {{ eyebrow }}
      </p>
      <h1 class="heading-hero page-hero__title page-hero-anim page-hero-anim--title">
        {{ title }}
      </h1>
      <p
        v-if="description"
        class="lead page-hero__desc page-hero-anim page-hero-anim--desc">
        {{ description }}
      </p>
      <div
        v-if="map"
        class="page-hero__media page-hero__map page-hero-anim page-hero-anim--media">
        <iframe
          title="Office location map"
          :src="mapSrc"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen />
      </div>
      <div
        v-else-if="image"
        class="page-hero__media page-hero-anim page-hero-anim--media">
        <img
          :src="image"
          :alt="title"
          width="1240"
          height="480" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    description?: string
    image?: string
    map?: boolean
    lat?: number
    lng?: number
    zoom?: number
  }>(),
  {
    eyebrow: '',
    description: '',
    image: '',
    map: false,
    lat: -7.4724,
    lng: 112.4336,
    zoom: 12,
  },
)

const ready = ref(false)

const mapSrc = computed(() => {
  const { lat, lng, zoom } = props
  const delta = Math.max(0.04, 0.55 / Math.max(zoom, 1))
  const left = lng - delta
  const right = lng + delta
  const top = lat + delta * 0.65
  const bottom = lat - delta * 0.65
  return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${lat}%2C${lng}`
})

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
.page-hero {
  padding: clamp(28px, 4vw, 64px) 0 clamp(28px, 4vw, 56px);
}

.page-hero__inner {
  display: grid;
  gap: 16px;
  justify-items: center;
  text-align: center;
}

.page-hero__title {
  max-width: 900px;
  font-size: clamp(28px, 7vw, 48px);
}

.page-hero__desc {
  max-width: 800px;
}

.page-hero__media {
  width: 100%;
  margin-top: 12px;
  border-radius: 14px;
  overflow: hidden;
  background: #e8ebe3;
}

.page-hero__media img {
  width: 100%;
  max-height: clamp(220px, 42vw, 480px);
  object-fit: cover;
  display: block;
  transform: scale(1.06);
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.28s;
}

.page-hero--ready .page-hero__media img {
  transform: scale(1);
}

.page-hero__map {
  height: clamp(240px, 48vw, 460px);
}

.page-hero__map iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

.page-hero-anim {
  opacity: 0;
  transform: translate3d(0, 36px, 0);
  transition:
    opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-hero-anim--title {
  transform: translate3d(0, 44px, 0);
}

.page-hero-anim--media {
  transform: translate3d(0, 48px, 0) scale(0.98);
  transition-duration: 1.05s;
}

.page-hero--ready .page-hero-anim {
  opacity: 1;
  transform: none;
  transition-delay: 40ms;
}

.page-hero--ready .page-hero-anim--title {
  transition-delay: 120ms;
}

.page-hero--ready .page-hero-anim--desc {
  transition-delay: 220ms;
}

.page-hero--ready .page-hero-anim--media {
  transition-delay: 180ms;
}

@media (min-width: 640px) {
  .page-hero__inner {
    gap: 20px;
  }

  .page-hero__media {
    margin-top: 20px;
    border-radius: clamp(22px, 3.5vw, 50px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .page-hero-anim,
  .page-hero__media img {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
</style>
