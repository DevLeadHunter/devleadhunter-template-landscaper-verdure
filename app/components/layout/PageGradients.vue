<template>
  <div
    class="page-gradients"
    aria-hidden="true">
    <img
      class="page-gradient page-gradient--tl"
      src="/images/gradient-top-left.svg"
      alt=""
      width="256"
      height="423" />
    <img
      class="page-gradient page-gradient--tr"
      src="/images/gradient-top-right.svg"
      alt=""
      width="252"
      height="343" />
    <img
      class="page-gradient page-gradient--bl"
      src="/images/gradient-top-left.svg"
      alt=""
      width="256"
      height="423" />
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
}

.page-gradient--tl {
  left: max(-120px, 4vw - 200px);
  top: 180px;
  width: clamp(280px, 22vw, 420px);
  height: auto;
}

.page-gradient--tr {
  right: max(-80px, 2vw - 160px);
  top: 40px;
  width: clamp(260px, 20vw, 400px);
  height: auto;
  transform: rotate(50deg);
  transform-origin: center;
}

.page-gradient--bl {
  left: max(-140px, 3vw - 220px);
  bottom: 8%;
  width: clamp(300px, 24vw, 460px);
  height: auto;
  opacity: 0.55;
}
</style>
