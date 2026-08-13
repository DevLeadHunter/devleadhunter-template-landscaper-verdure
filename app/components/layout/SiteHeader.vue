<template>
  <header class="site-header">
    <div class="site-header__bar">
      <a
        :href="homeTarget"
        class="site-header__logo"
        :aria-label="`${brandFirst} ${brandRest} — accueil`">
        <img
          v-if="brandLogo"
          :src="brandLogo"
          alt=""
          class="site-header__logo-img" />
        <span
          v-else
          class="site-header__mark"
          aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 32 32"
            fill="none">
            <path
              fill="#003f2e"
              fill-opacity=".2"
              d="M6.5 22.5C2 15.5 8 4.5 24.5 5.5c1 16.5-8.5 24-18 17z" />
            <path
              fill="#003f2e"
              d="M24.8 4.2c-7.8-.5-14.2 2.2-17 7.5-1.1 2-1.5 4.2-1.4 6.4.2 2.1.9 4.2 2.1 6.1L6 26.7a1.1 1.1 0 0 0 1.6 1.5l2.5-2.5c2 .9 4.1 1.4 6.2 1.4 2.1 0 4.1-.6 5.9-1.7 5.5-3.3 8.5-11.2 7.9-21a1.2 1.2 0 0 0-1.3-1.2zm-8.7 18.2c-2.9 1.8-6.4 1.8-9.9.1l11.4-11.4a1.1 1.1 0 0 0-1.6-1.6L4.8 20.9c-1.7-3.5-1.6-7 .1-9.9 2.8-4.7 9.6-7.3 18.2-7 0 8.6-2.5 16.1-7 19.4z" />
          </svg>
        </span>
        <span class="site-header__wordmark">
          <span class="site-header__name">{{ brandFirst }}</span>
          <span class="site-header__tag">{{ brandRest }}</span>
        </span>
      </a>

      <nav
        class="site-header__nav"
        aria-label="Navigation principale">
        <a
          v-for="item in navItems"
          :key="item.to"
          :href="item.to"
          class="site-header__link">
          {{ item.label }}
        </a>
      </nav>

      <button
        type="button"
        class="site-header__burger"
        :class="{ 'is-open': open }"
        :aria-expanded="open"
        :aria-label="open ? 'Fermer le menu' : 'Ouvrir le menu'"
        @click="open = !open">
        <span />
        <span />
        <span />
      </button>
    </div>

    <!-- Overlay menu: does NOT push page content -->
    <Teleport to="body">
      <div
        v-show="open"
        class="site-header__overlay"
        @click.self="open = false">
        <nav
          class="site-header__panel"
          aria-label="Navigation mobile">
          <a
            v-for="item in navItems"
            :key="item.to"
            :href="item.to"
            class="site-header__panel-link"
            @click="open = false">
            {{ item.label }}
          </a>
          <a
            :href="ctaTarget"
            class="btn-eco site-header__panel-cta"
            @click="open = false">
            {{ ctaLabel }}
          </a>
        </nav>
      </div>
    </Teleport>
  </header>
</template>

<script lang="ts" setup>
import type { ComputedRef, Ref } from 'vue'
import { computed, inject, onBeforeUnmount, ref, watch } from 'vue'
import type { VerdurePageContent } from '../../types/verdure'
import { VERDURE_CONTENT_KEY } from '../../types/verdure'
import { site } from '../../data/site'

/** Contenu one-page fourni par la racine ; absent dans le playground multi-pages. */
const injectedContent: ComputedRef<VerdurePageContent> | null = inject(VERDURE_CONTENT_KEY, null)

/** Ancres de la one-page, ou pages du playground en fallback. */
const navItems: ComputedRef<{ label: string; to: string }[]> = computed(
  (): { label: string; to: string }[] =>
    injectedContent
      ? [
          { label: 'Prestations', to: '#services' },
          { label: 'À propos', to: '#about' },
          { label: 'Réalisations', to: '#portfolio' },
          { label: 'Contact', to: '#contact' },
        ]
      : site.nav,
)

/** Premier mot du nom : partie mise en avant du logo. */
const brandFirst: ComputedRef<string> = computed((): string => {
  const name: string = injectedContent ? injectedContent.value.businessName : site.name
  return name.split(' ')[0] ?? name
})

/** Reste du nom (ou le métier quand le nom tient en un mot). */
const brandRest: ComputedRef<string> = computed((): string => {
  const name: string = injectedContent ? injectedContent.value.businessName : site.name
  const rest: string = name.split(' ').slice(1).join(' ')
  return rest || 'Paysagiste'
})

/** Logo réel du prospect : remplace la feuille décorative quand il est fourni. */
const brandLogo: ComputedRef<string> = computed((): string => {
  const logo: string = injectedContent ? injectedContent.value.logo : ''
  return typeof logo === 'string' ? logo.trim() : ''
})

const homeTarget: ComputedRef<string> = computed((): string => (injectedContent ? '#top' : '/'))
const ctaTarget: ComputedRef<string> = computed((): string =>
  injectedContent ? '#contact' : '/contact',
)
const ctaLabel: ComputedRef<string> = computed((): string =>
  injectedContent ? injectedContent.value.hero.ctaLabel : 'Make an Appointment',
)

const open: Ref<boolean> = ref(false)
const route = useRoute()

watch(open, (isOpen) => {
  if (import.meta.client) {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
})

watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.site-header {
  position: relative;
  z-index: 60;
  background: rgb(245 246 239 / 92%);
  backdrop-filter: blur(10px);
}

.site-header__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 56px;
  /* Extra breathing room so the logo isn’t glued to the screen edge */
  padding: 10px 20px;
  max-width: 1280px;
  margin-inline: auto;
  box-sizing: border-box;
}

.site-header__logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  text-decoration: none;
  color: inherit;
}

.site-header__logo-img {
  flex-shrink: 0;
  height: 38px;
  width: auto;
  max-width: 130px;
  object-fit: contain;
}

.site-header__mark {
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: linear-gradient(145deg, #d8ff9e 0%, #bcff83 55%, #9ae86a 100%);
  display: grid;
  place-items: center;
  box-shadow: 0 1px 0 rgb(255 255 255 / 55%) inset;
}

.site-header__mark svg {
  display: block;
}

.site-header__wordmark {
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
  line-height: 1.05;
}

.site-header__name {
  color: #003f2e;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.site-header__tag {
  color: #2d746d;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.site-header__nav {
  display: none;
  align-items: center;
  gap: 36px;
}

.site-header__link {
  color: #003f2e;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
}

.site-header__link.router-link-active {
  color: #2d746d;
}

.site-header__burger {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  padding: 11px;
  border: 0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 0 1px rgb(0 63 46 / 8%);
  cursor: pointer;
  flex-shrink: 0;
}

.site-header__burger span {
  display: block;
  width: 100%;
  height: 2px;
  background: #003f2e;
  border-radius: 2px;
  transition:
    transform 220ms ease,
    opacity 180ms ease;
  transform-origin: center;
}

.site-header__burger.is-open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.site-header__burger.is-open span:nth-child(2) {
  opacity: 0;
}

.site-header__burger.is-open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.site-header__overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  background: rgb(0 63 46 / 28%);
  padding: 72px 16px 24px;
  box-sizing: border-box;
  animation: overlay-in 180ms ease;
}

.site-header__panel {
  display: grid;
  gap: 4px;
  max-width: 420px;
  margin-inline: auto;
  padding: 12px;
  border-radius: 18px;
  background: #f5f6ef;
  box-shadow: 0 18px 50px rgb(0 63 46 / 18%);
  animation: panel-in 260ms cubic-bezier(0.16, 1, 0.3, 1);
}

.site-header__panel-link {
  color: #003f2e;
  font-size: 17px;
  font-weight: 600;
  text-decoration: none;
  padding: 14px 14px;
  border-radius: 12px;
}

.site-header__panel-link:hover,
.site-header__panel-link.router-link-active {
  background: rgb(45 116 109 / 10%);
  color: #2d746d;
}

.site-header__panel-cta {
  margin-top: 8px;
  width: 100%;
  max-width: none;
}

@keyframes overlay-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes panel-in {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (min-width: 640px) {
  .site-header__bar {
    padding: 12px 24px;
  }

  .site-header__wordmark {
    flex-direction: row;
    align-items: baseline;
    gap: 7px;
  }

  .site-header__name {
    font-size: 18px;
  }

  .site-header__tag {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
    text-transform: none;
    color: #003f2e;
  }
}

@media (min-width: 900px) {
  .site-header__bar {
    padding: 12px 28px;
    min-height: 64px;
  }

  .site-header__nav {
    display: flex;
  }

  .site-header__burger,
  .site-header__overlay {
    display: none !important;
  }

  .site-header__mark {
    width: 42px;
    height: 42px;
  }

  .site-header__name,
  .site-header__tag {
    font-size: 20px;
  }
}
</style>
