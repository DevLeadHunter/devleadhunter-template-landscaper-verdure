<template>
  <div>
    <PageHeroSection
      eyebrow="installation"
      title="A Small Cottage Garden"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nisl tortor, semper et pulvinar non, ullamcorper et dolor. Maecenas lectus libero, aliquam nec blandit eget, luctus id elit. Nunc congue est sed pellentesque tincidunt"
      image="/images/image-import-16.jpg" />

    <section class="project-meta">
      <div class="container-eco project-meta__grid">
        <article
          v-for="item in metaItems"
          :key="item.label"
          class="project-meta__item">
          <span
            class="project-meta__icon"
            aria-hidden="true"
            v-html="item.icon" />
          <p class="project-meta__label">{{ item.label }}</p>
          <p class="project-meta__value">{{ item.value }}</p>
        </article>
      </div>
    </section>

    <section class="project-content">
      <div class="container-eco project-content__inner">
        <h2 class="heading-xl">
          Backyard Transformation With a Pool, Fire Pit, Landscaping & More
        </h2>
        <p class="body-text">
          Our team recently completed a transformative backyard landscaping project at a home
          located in the Whitehawk neighborhood in Omaha, NE. Around the new swimming pool area, we
          installed retaining walls, a fire pit, stamped concrete, landscape lighting, landscaping,
          and more to turn our client's backyard into a beautiful oasis. This breathtaking project
          began with an initial meeting where we learned about our client's vision and discussed all
          of the details. Then, we used the information we gathered to design the project and select
          the best materials. Once our client approved the design, we executed the construction
          phase and brought the plan to life. Our team performed each installation with precise
          attention to detail to ensure a phenomenal outcome. Continue reading to learn more about
          this top-notch backyard landscaping project!
        </p>
        <h3>Project Photo Gallery</h3>
        <div class="project-content__gallery">
          <img
            v-for="src in portfolioGallery"
            :key="src"
            :src="src"
            alt="Project gallery photo"
            width="360"
            height="280" />
        </div>
      </div>
    </section>

    <FaqsSection />
    <CtaSection />
  </div>
</template>

<script lang="ts" setup>
import PageHeroSection from '../../../../app/components/sections/PageHeroSection.vue'
import FaqsSection from '../../../../app/components/sections/FaqsSection.vue'
import CtaSection from '../../../../app/components/sections/CtaSection.vue'
import { portfolioGallery } from '../../../../app/data/site'

useHead({ title: 'Portfolio project' })

const metaItems = [
  {
    label: 'Date',
    value: 'April 15, 2022',
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="#003f2e" stroke-width="1.5"/><path d="M3 10h18M8 3v4M16 3v4" stroke="#003f2e" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  },
  {
    label: 'Services',
    value: 'Garden Design Installation',
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 7h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" stroke="#003f2e" stroke-width="1.5"/></svg>`,
  },
  {
    label: 'Location',
    value: '3375 Hillview Drive Columbus',
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" stroke="#003f2e" stroke-width="1.5"/><circle cx="12" cy="10" r="2.5" stroke="#003f2e" stroke-width="1.5"/></svg>`,
  },
]
</script>

<style scoped>
.project-meta {
  padding: 8px 0 36px;
}

.project-meta__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  max-width: 745px;
  margin-inline: auto;
}

.project-meta__item {
  background: transparent;
  padding: 0;
  display: grid;
  gap: 8px;
  justify-items: center;
  text-align: center;
}

.project-meta__icon {
  display: grid;
  place-items: center;
  line-height: 0;
}

.project-meta__label {
  margin: 0;
  color: #003f2e;
  font-size: 17px;
  font-weight: 600;
}

.project-meta__value {
  margin: 0;
  color: #003f2e;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
}

.project-content {
  padding: 12px 0 72px;
}

.project-content__inner {
  display: grid;
  gap: 20px;
  width: 100%;
  max-width: 750px;
  margin-inline: auto;
}

.project-content__inner h3 {
  margin: 8px 0 0;
  color: var(--color-verdure-brand-dark);
  font-size: clamp(20px, 5vw, 28px);
  font-weight: 600;
}

.project-content__gallery {
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 1fr;
}

.project-content__gallery img {
  width: 100%;
  height: clamp(140px, 28vw, 220px);
  object-fit: cover;
  border-radius: 14px;
  display: block;
}

@media (min-width: 900px) {
  .project-meta {
    padding: 10px 0 48px;
  }

  .project-meta__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .project-meta__label {
    font-size: 19px;
  }

  .project-meta__value {
    font-size: 16px;
  }

  .project-content {
    padding: 16px 0 90px;
  }

  .project-content__inner {
    gap: 24px;
  }

  .project-content__gallery {
    gap: 20px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .project-content__gallery img {
    height: 220px;
    border-radius: 18px;
  }
}
</style>
