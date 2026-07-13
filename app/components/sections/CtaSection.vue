<template>
  <section class="cta">
    <div class="cta__shell">
      <div
        v-reveal="'scale'"
        class="cta__inner">
        <div class="cta__copy">
          <h2>We're ready to start.</h2>
          <p>Transform your home to zen garden</p>
          <NuxtLink
            to="/contact"
            class="btn-eco cta__btn">
            Make an Appointment
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  padding: 0 0 72px;
}

/* Dedicated gutter so the panel never kisses the viewport on mobile/tablet */
.cta__shell {
  width: 100%;
  max-width: 1140px;
  margin-inline: auto;
  padding-inline: 16px;
  box-sizing: border-box;
}

@media (min-width: 640px) {
  .cta__shell {
    padding-inline: 24px;
  }
}

@media (min-width: 900px) {
  .cta {
    padding: 0 0 100px;
  }
}

@media (min-width: 1600px) {
  .cta__shell {
    max-width: 1280px;
    padding-inline: 32px;
  }
}

.cta__inner {
  position: relative;
  overflow: hidden;
  min-height: clamp(280px, 42vw, 460px);
  border-radius: clamp(16px, 3vw, 24px);
  background:
    linear-gradient(
      90deg,
      rgb(0 63 46 / 72%) 0%,
      rgb(45 116 109 / 45%) 55%,
      rgb(0 63 46 / 35%) 100%
    ),
    url('/images/image-import-3.jpg') center / cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: clamp(56px, 8vw, 120px) clamp(20px, 4vw, 24px);
}

.cta__copy {
  display: grid;
  gap: 18px;
  justify-items: center;
  max-width: 720px;
}

.cta__copy h2 {
  margin: 0;
  color: #fff;
  font-size: clamp(28px, 7vw, 52px);
  font-weight: 600;
  line-height: 1.15;
}

.cta__copy p {
  margin: 0;
  color: #fff;
  font-size: clamp(16px, 3.6vw, 22px);
  line-height: 1.45;
}

.cta__btn {
  border-radius: 6px;
  min-height: 52px;
  padding: 16px 36px;
  font-size: 15px;
  width: auto;
  max-width: none;
}

@media (min-width: 640px) {
  .cta__copy {
    gap: 24px;
  }

  .cta__btn {
    min-height: 58px;
    padding: 18px 42px;
    font-size: 16px;
  }
}
</style>
