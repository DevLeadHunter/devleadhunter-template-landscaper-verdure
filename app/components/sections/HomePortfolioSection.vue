<template>
  <section class="portfolio">
    <div class="container-eco portfolio__inner">
      <div
        v-reveal
        class="portfolio__heading">
        <p class="eyebrow">portfolio</p>
        <h2 class="heading-xl">Recent project highlights</h2>
        <p class="lead-sm">
          Our commitment to excellence ensures that your landscape is not only stunning but also
          affordable.
        </p>
      </div>
      <div
        v-reveal.stagger
        class="portfolio__grid">
        <PortfolioProjectCard
          v-for="(item, index) in homePortfolio"
          :key="item.image"
          to="/portfolio/backyard-pool"
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
import { homePortfolio } from '../../data/site'
import PortfolioProjectCard from './PortfolioProjectCard.vue'
</script>

<style scoped>
.portfolio {
  padding: 0 0 100px;
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
  .portfolio {
    padding: 0 0 140px;
  }

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
