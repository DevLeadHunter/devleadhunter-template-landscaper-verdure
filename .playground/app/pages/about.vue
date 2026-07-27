<template>
  <div>
    <PageHeroSection
      eyebrow="about us"
      title="Not sure how to choose perfect contractor ?"
      description="We offer high-quality and award-winning services to all of our clients with a commitment to do our best with sustainable waste disposal, organic products and practices that nurture the planet." />

    <section class="mission">
      <div class="container-eco mission__inner">
        <div
          v-reveal="'left'"
          class="mission__media">
          <img
            src="/images/image-import-32.jpg"
            alt="Our mission"
            width="520"
            height="560" />
        </div>
        <div
          v-reveal="'right'"
          class="mission__copy">
          <p class="eyebrow">why us</p>
          <h2 class="heading-xl">Service empathy & impact</h2>
          <p class="body-text">
            We're not just about making gardens beautiful; we're making a positive impact on the
            community and the environment. With a dedication to sustainable waste disposal, organic
            products, and eco-friendly practices, we're nurturing the planet every step of the way.
          </p>
          <p class="body-text">
            Committed to delivering an unforgettable service, our caring team truly gets your needs.
            We aim to set a new standard for garden care and landscaping, ensuring your experience
            leaves you absolutely delighted and ready to savor your outdoor haven.
          </p>
        </div>
      </div>
    </section>

    <section class="stats">
      <div
        v-reveal.stagger
        class="container-eco stats__grid">
        <article
          v-for="(item, index) in stats"
          :key="item.label"
          class="stats__item">
          <img
            :src="`/images/icon-stat-${index}.svg`"
            alt=""
            width="40"
            height="40"
            class="stats__icon" />
          <p class="stats__label">{{ item.label }}</p>
          <p class="stats__value">{{ item.value }}</p>
        </article>
      </div>
    </section>

    <section class="team">
      <div class="container-eco team__inner">
        <div
          v-reveal
          class="team__heading">
          <p class="eyebrow">our team</p>
          <h2 class="heading-xl">Get more value from our landscaper</h2>
          <p class="lead">
            Our technicians use state-of-the-art equipment and eco-friendly products to keep your
            lawn healthy and creating stunning and functional landscapes.
          </p>
        </div>
        <div
          v-reveal.stagger
          class="team__grid">
          <article
            v-for="(member, index) in team"
            :key="`${member.name}-${index}`"
            class="team__card">
            <img
              :src="member.image"
              :alt="member.name"
              width="280"
              height="320" />
            <h3>{{ member.name }}</h3>
            <p>{{ member.role }}</p>
            <div
              class="team__social"
              aria-label="Social links">
              <a
                v-for="social in teamSocials"
                :key="social.label"
                href="#"
                class="team__social-link"
                :aria-label="social.label"
                v-html="social.svg" />
            </div>
          </article>
        </div>
      </div>
    </section>

    <FaqsSection />
    <CtaSection />
  </div>
</template>

<script lang="ts" setup>
import PageHeroSection from '../../../app/components/sections/PageHeroSection.vue'
import FaqsSection from '../../../app/components/sections/FaqsSection.vue'
import CtaSection from '../../../app/components/sections/CtaSection.vue'
import { stats, team } from '../../../app/data/site'

useHead({ title: 'About' })

const teamSocials = [
  {
    label: 'Facebook',
    svg: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" fill="#003f2e"/></svg>`,
  },
  {
    label: 'Twitter',
    svg: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 5.8c-.7.3-1.5.5-2.3.6A4 4 0 0 0 21.4 4a8 8 0 0 1-2.5 1 4 4 0 0 0-6.8 3.6A11.3 11.3 0 0 1 3 4.9a4 4 0 0 0 1.2 5.3 4 4 0 0 1-1.8-.5v.1a4 4 0 0 0 3.2 3.9 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.6a11.3 11.3 0 0 0 6.1 1.8c7.4 0 11.4-6.1 11.4-11.4v-.5A8 8 0 0 0 22 5.8z" fill="#003f2e"/></svg>`,
  },
  {
    label: 'Instagram',
    svg: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5.2A3.8 3.8 0 1 0 15.8 12 3.8 3.8 0 0 0 12 8.2zm6.2-1.9a1 1 0 1 0 1 1 1 1 0 0 0-1-1zM12 9.8A2.2 2.2 0 1 1 9.8 12 2.2 2.2 0 0 1 12 9.8z" fill="#003f2e"/></svg>`,
  },
]
</script>

<style scoped>
.mission,
.team {
  padding: 28px 0 72px;
}

.mission__inner {
  display: grid;
  gap: 32px;
  align-items: center;
}

.mission__media img {
  width: 100%;
  max-width: 480px;
  border-radius: clamp(20px, 5vw, 30px) clamp(48px, 18vw, 200px) clamp(20px, 5vw, 30px)
    clamp(48px, 18vw, 200px);
  object-fit: cover;
  aspect-ratio: 520 / 560;
  display: block;
  margin-inline: auto;
}

.mission__copy {
  display: grid;
  gap: 16px;
  max-width: 560px;
  text-align: center;
  margin-inline: auto;
}

.stats {
  padding: 8px 0 56px;
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

.team__inner {
  display: grid;
  gap: 40px;
  justify-items: center;
}

.team__heading {
  max-width: 780px;
  display: grid;
  gap: 14px;
  text-align: center;
}

.team__grid {
  width: 100%;
  max-width: 1140px;
  display: grid;
  gap: 28px;
  grid-template-columns: 1fr;
}

.team__card {
  background: transparent;
  overflow: visible;
  text-align: center;
  padding-bottom: 0;
}

.team__card img {
  width: 100%;
  max-width: 360px;
  margin-inline: auto;
  height: clamp(260px, 70vw, 320px);
  object-fit: cover;
  display: block;
  border-radius: 18px;
}

.team__card h3 {
  margin: 16px 0 6px;
  color: var(--color-verdure-brand-dark);
  font-size: 18px;
  font-weight: 600;
}

.team__card > p {
  margin: 0;
  color: var(--color-verdure-brand);
  font-size: 15px;
}

.team__social {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 14px;
}

.team__social-link {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  border: 1.5px solid #003f2e;
  display: grid;
  place-items: center;
  text-decoration: none;
  line-height: 0;
}

.team__social-link :deep(svg) {
  display: block;
}

@media (min-width: 640px) {
  .stats__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 30px;
  }

  .stats__label {
    font-size: 19px;
  }

  .mission__copy {
    text-align: left;
    margin-inline: 0;
  }
}

@media (min-width: 900px) {
  .mission,
  .team {
    padding: 40px 0 90px;
  }

  .mission__inner {
    grid-template-columns: 1fr 1.05fr;
    gap: clamp(48px, 5vw, 88px);
  }

  .team__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 30px;
  }

  .team__inner {
    gap: 56px;
  }

  .team__heading {
    gap: 20px;
  }

  .team__card img {
    height: 320px;
  }

  .team__card h3 {
    font-size: 20px;
  }
}
</style>
