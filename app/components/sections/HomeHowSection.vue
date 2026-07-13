<template>
  <section class="how">
    <div class="container-eco how__inner">
      <div
        v-reveal
        class="how__heading">
        <p class="eyebrow">how it works</p>
        <h2 class="heading-xl">Yard and lawn care made simple.</h2>
        <p class="lead-sm">
          Our experts will make a personalized plan for your yard so you can relax and enjoy your
          outdoor space hassle-free.
        </p>
      </div>
      <div
        v-reveal.stagger
        class="how__steps">
        <article
          v-for="(item, index) in howItWorks"
          :key="item.step"
          class="how__card">
          <div class="how__icon">
            <img
              :src="`/images/icon-how-${index}.svg`"
              alt=""
              width="40"
              height="40" />
          </div>
          <div class="how__text">
            <p class="eyebrow">{{ item.step }}</p>
            <h3>{{ item.title }}</h3>
            <p class="body-text">{{ item.description }}</p>
          </div>
        </article>
      </div>
      <div v-reveal="{ type: 'up', delay: 60 }">
        <NuxtLink
          to="/contact"
          class="btn-eco how__btn">
          Make an Appointment
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { howItWorks } from '../../data/site'
</script>

<style scoped>
.how {
  padding: 0 0 100px;
}

.how__inner {
  display: grid;
  gap: 40px;
  justify-items: center;
}

.how__heading {
  max-width: 820px;
  display: grid;
  gap: 14px;
  text-align: center;
}

.how__steps {
  width: 100%;
  display: grid;
  gap: 28px;
  grid-template-columns: 1fr;
}

.how__card {
  display: grid;
  gap: 20px;
  text-align: center;
  justify-items: center;
  padding: 0;
  width: 100%;
}

.how__icon {
  width: 72px;
  height: 72px;
  border-radius: 14px;
  background: #ffffff;
  display: grid;
  place-items: center;
  box-shadow: 0 0 0 10px #f5f6ef;
}

.how__icon img {
  width: 36px;
  height: 36px;
  display: block;
  object-fit: contain;
  object-position: center;
}

.how__text {
  display: grid;
  gap: 10px;
  justify-items: center;
}

.how__card h3 {
  margin: 0;
  color: #003f2e;
  font-size: clamp(20px, 5vw, 26px);
  font-weight: 600;
}

.how__card .body-text {
  font-size: clamp(15px, 1.05vw, 16px);
  line-height: 1.55;
  max-width: 360px;
}

@media (min-width: 900px) {
  .how {
    padding: 0 0 160px;
  }

  .how__inner {
    gap: 72px;
  }

  .how__heading {
    gap: 24px;
  }

  .how__steps {
    gap: 40px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .how__card {
    gap: 28px;
  }

  .how__icon {
    width: 80px;
    height: 80px;
    border-radius: 16px;
    box-shadow: 0 0 0 12px #f5f6ef;
  }

  .how__icon img {
    width: 40px;
    height: 40px;
  }

  .how__text {
    gap: 14px;
  }
}
</style>
