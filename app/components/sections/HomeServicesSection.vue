<template>
  <section class="services">
    <div class="container-eco container-eco--wide services__inner">
      <div
        v-reveal
        class="services__heading">
        <p class="eyebrow">What we do</p>
        <h2 class="heading-xl">Get more value from our landscaper</h2>
        <p class="lead">
          Our technicians use state-of-the-art equipment and eco-friendly products to keep your lawn
          healthy and creating stunning and functional landscapes.
        </p>
      </div>
      <div
        v-reveal.stagger
        class="services__grid">
        <ServiceNotchCard
          v-for="(service, index) in homeServices"
          :key="service.title"
          :title="service.title"
          :description="service.description"
          :image="service.image"
          :icon-index="index"
          :to="`/services/${['installation', 'maintenance', 'hardscape', 'irrigation'][index]}`" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { homeServices } from '../../data/site'
import ServiceNotchCard from './ServiceNotchCard.vue'
</script>

<style scoped>
.services {
  padding: 0 0 100px;
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
  .services {
    padding: 0 0 120px;
  }

  .services__inner {
    gap: 56px;
  }

  .services__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }
}

@media (min-width: 1100px) {
  .services {
    padding: 0 0 140px;
  }

  .services__inner {
    gap: 64px;
  }

  .services__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 22px;
  }
}
</style>
