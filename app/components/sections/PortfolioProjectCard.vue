<template>
  <NuxtLink
    :to="to"
    class="pf-card"
    :class="variant === 'left' ? 'is-left' : 'is-right'">
    <div class="pf-card__media">
      <img
        class="pf-card__image"
        :src="image"
        :alt="title"
        width="487"
        height="450" />
    </div>
    <div
      class="pf-card__meta"
      :class="{ 'is-accent': accent }">
      <div class="pf-card__text">
        <p class="pf-card__cat">{{ category }}</p>
        <h3>{{ title }}</h3>
      </div>
      <span
        class="pf-card__arrow"
        aria-hidden="true">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M7 17L17 7M17 7H9M17 7V15"
            stroke="#003f2e"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </span>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    to: string
    image: string
    category: string
    title: string
    accent?: boolean
    variant?: 'left' | 'right'
  }>(),
  {
    accent: false,
    variant: 'left',
  },
)
</script>

<style scoped>
.pf-card {
  position: relative;
  display: block;
  width: 100%;
  max-width: 460px;
  margin-inline: auto;
  text-decoration: none;
  color: inherit;
  padding-bottom: 28px;
  transition: transform 360ms cubic-bezier(0.22, 1, 0.36, 1);
}

.pf-card:hover {
  transform: translateY(-6px);
}

.pf-card:hover .pf-card__image {
  transform: scale(1.04);
}

.pf-card__media {
  width: 100%;
  overflow: hidden;
}

.pf-card.is-left .pf-card__media {
  border-radius: clamp(20px, 5vw, 30px) clamp(48px, 18vw, 200px) clamp(20px, 5vw, 30px)
    clamp(48px, 18vw, 200px);
}

.pf-card.is-right .pf-card__media {
  border-radius: clamp(48px, 18vw, 200px) clamp(20px, 5vw, 30px) clamp(48px, 18vw, 200px)
    clamp(20px, 5vw, 30px);
}

.pf-card__image {
  width: 100%;
  height: clamp(280px, 55vw, 420px);
  object-fit: cover;
  display: block;
  transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
}

.pf-card__meta {
  position: absolute;
  left: 50%;
  bottom: 0;
  translate: -50% 0;
  width: min(340px, 86%);
  display: grid;
  gap: 18px;
  justify-items: start;
  padding: 16px;
  border-radius: 24px 24px 72px 24px;
  background: #fff;
  box-sizing: border-box;
  z-index: 2;
}

.pf-card__meta.is-accent {
  background: #bcff83;
}

.pf-card__text {
  display: grid;
  gap: 8px;
}

.pf-card__cat {
  margin: 0;
  color: #003f2e;
  font-size: 14px;
  font-weight: 400;
}

.pf-card__meta h3 {
  margin: 0;
  color: #003f2e;
  font-size: clamp(15px, 3.8vw, 18px);
  font-weight: 600;
  line-height: 1.35;
}

.pf-card__arrow {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  background: #bcff83;
  display: grid;
  place-items: center;
  box-shadow: 0 0 0 8px #f5f6ef;
}

.pf-card__meta.is-accent .pf-card__arrow {
  background: #fff;
  box-shadow: 0 0 0 8px #bcff83;
}

.pf-card__arrow svg {
  display: block;
  width: 18px;
  height: 18px;
}

@media (min-width: 640px) {
  .pf-card {
    padding-bottom: 36px;
  }

  .pf-card__meta {
    gap: 28px;
    padding: 20px;
    border-radius: 30px 30px 100px 30px;
    width: min(340px, 74%);
  }

  .pf-card__arrow {
    width: 56px;
    height: 56px;
    box-shadow: 0 0 0 10px #f5f6ef;
  }

  .pf-card__meta.is-accent .pf-card__arrow {
    box-shadow: 0 0 0 10px #bcff83;
  }
}
</style>
