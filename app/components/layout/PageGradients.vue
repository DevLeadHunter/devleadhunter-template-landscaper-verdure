<template>
  <div
    class="page-gradients"
    aria-hidden="true">
    <div class="page-gradient page-gradient--tl" />
    <div class="page-gradient page-gradient--tr" />
    <div class="page-gradient page-gradient--bl" />
  </div>
</template>

<style scoped>
.page-gradients {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.page-gradient {
  position: absolute;
  display: block;
  filter: blur(100px);
  opacity: 0.85;
  background-color: var(--color-verdure-glow);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
}

.page-gradient--tl {
  left: max(-120px, 4vw - 200px);
  top: 180px;
  width: clamp(280px, 22vw, 420px);
  aspect-ratio: 256 / 423;
  -webkit-mask-image: url('/images/verdure/gradient-top-left.svg');
  mask-image: url('/images/verdure/gradient-top-left.svg');
}

.page-gradient--tr {
  right: max(-80px, 2vw - 160px);
  top: 40px;
  width: clamp(260px, 20vw, 400px);
  aspect-ratio: 252 / 343;
  transform: rotate(50deg);
  transform-origin: center;
  -webkit-mask-image: url('/images/verdure/gradient-top-right.svg');
  mask-image: url('/images/verdure/gradient-top-right.svg');
}

.page-gradient--bl {
  left: max(-140px, 3vw - 220px);
  bottom: 8%;
  width: clamp(300px, 24vw, 460px);
  aspect-ratio: 256 / 423;
  opacity: 0.55;
  -webkit-mask-image: url('/images/verdure/gradient-top-left.svg');
  mask-image: url('/images/verdure/gradient-top-left.svg');
}
</style>
