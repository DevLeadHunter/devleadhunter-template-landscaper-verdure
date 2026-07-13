<template>
  <div class="site-root">
    <PageGradients />
    <SiteHeader />
    <main class="site-main">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script lang="ts" setup>
import SiteHeader from '../../../app/components/layout/SiteHeader.vue'
import SiteFooter from '../../../app/components/layout/SiteFooter.vue'
import PageGradients from '../../../app/components/layout/PageGradients.vue'

useHead({
  titleTemplate: (title?: string) => (title ? `${title} | Eco Landscaping` : 'Eco Landscaping'),
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap',
    },
  ],
})
</script>

<style>
/* Single scroll container on the document — avoids mouse-wheel “mini freezes” */
html {
  height: auto;
  overflow-x: clip;
  overflow-y: scroll;
}

body,
#__nuxt {
  height: auto;
  min-height: 100%;
  margin: 0;
  overflow: visible;
}

.site-root {
  position: relative;
  min-height: 100vh;
  background: #f5f6ef;
  isolation: isolate;
}

.site-main {
  position: relative;
  z-index: 1;
}
</style>
