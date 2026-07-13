<template>
  <article
    v-if="!to"
    class="svc-card">
    <img
      class="svc-card__shape"
      src="/images/service-card-bg.svg"
      alt=""
      width="264"
      height="390" />
    <div class="svc-card__icon">
      <img
        :src="`/images/icon-service-${iconIndex}.svg`"
        alt=""
        width="26"
        height="22" />
    </div>
    <h3>{{ title }}</h3>
    <p class="body-text">{{ description }}</p>
    <img
      class="svc-card__thumb"
      :src="image"
      :alt="title"
      width="223"
      height="190" />
  </article>
  <NuxtLink
    v-else
    :to="to"
    class="svc-card">
    <img
      class="svc-card__shape"
      src="/images/service-card-bg.svg"
      alt=""
      width="264"
      height="390" />
    <div class="svc-card__icon">
      <img
        :src="`/images/icon-service-${iconIndex}.svg`"
        alt=""
        width="26"
        height="22" />
    </div>
    <h3>{{ title }}</h3>
    <p class="body-text">{{ description }}</p>
    <img
      class="svc-card__thumb"
      :src="image"
      :alt="title"
      width="223"
      height="190" />
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  description: string
  image: string
  iconIndex: number
  to?: string
}>()
</script>

<style scoped>
/* Fluid card: fills grid cell, keeps 264×390 proportions */
.svc-card {
  position: relative;
  width: 100%;
  max-width: none;
  aspect-ratio: 264 / 390;
  display: block;
  text-decoration: none;
  color: inherit;
  justify-self: stretch;
  margin-inline: 0;
  transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
}

.svc-card:hover {
  transform: translateY(-6px);
}

.svc-card__shape {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  object-fit: fill;
}

.svc-card__icon {
  position: absolute;
  top: 2.56%;
  right: 5.3%;
  left: auto;
  z-index: 2;
  width: 12.1%;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
}

.svc-card__icon img {
  width: 80%;
  height: auto;
  display: block;
}

.svc-card h3 {
  position: absolute;
  top: 0;
  left: 6.8%;
  z-index: 1;
  margin: 0;
  width: 60%;
  height: 15.4%;
  display: flex;
  align-items: center;
  color: #003f2e;
  font-size: clamp(18px, 5.2vw, 22px);
  font-weight: 600;
  line-height: 1.2;
}

.svc-card .body-text {
  position: absolute;
  top: 20.5%;
  left: 7.6%;
  z-index: 1;
  width: 84.5%;
  line-height: 1.5;
  font-size: clamp(14px, 3.8vw, 16px);
}

.svc-card__thumb {
  position: absolute;
  top: 46.15%;
  left: 7.6%;
  z-index: 1;
  width: 84.5%;
  height: 48.7%;
  object-fit: cover;
  border-radius: 8px;
  display: block;
}

@media (min-width: 900px) {
  .svc-card h3 {
    font-size: clamp(18px, 1.4vw, 22px);
  }

  .svc-card .body-text {
    font-size: clamp(14px, 1.1vw, 16px);
  }
}
</style>
