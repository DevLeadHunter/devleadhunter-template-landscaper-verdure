<template>
  <footer
    v-reveal
    class="site-footer">
    <div
      class="site-footer__glow"
      aria-hidden="true" />
    <div class="container-eco container-eco--wide site-footer__top">
      <div class="site-footer__brand">
        <p class="site-footer__name">{{ site.name }}</p>
        <p class="body-text site-footer__tagline">{{ site.tagline }}</p>
        <div
          class="site-footer__social"
          aria-label="Social links">
          <a
            v-for="(icon, i) in socialIcons"
            :key="i"
            href="#"
            class="site-footer__social-link"
            :aria-label="icon.label">
            <span
              class="site-footer__social-ring"
              v-html="icon.svg" />
          </a>
        </div>
      </div>
      <div class="site-footer__cols">
        <div>
          <p class="site-footer__heading">ADDRESS</p>
          <p class="body-text">{{ site.address }}</p>
          <p class="body-text site-footer__contact">
            Phone: {{ site.phone }}
            <br />
            Email: {{ site.email }}
          </p>
        </div>
        <div>
          <p class="site-footer__heading">NAVIGATION</p>
          <ul>
            <li
              v-for="item in site.nav"
              :key="item.to">
              <NuxtLink :to="item.to">{{
                item.label === 'Service' ? 'Services' : item.label
              }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <p class="site-footer__heading">OUR SERVICES</p>
          <ul>
            <li
              v-for="service in site.footerServices"
              :key="service">
              {{ service }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container-eco container-eco--wide site-footer__bottom">
      <p>© 2023 Eco landscaping services All rights reserved.</p>
      <div class="site-footer__legal">
        <span>Privacy policy</span>
        <span>Terms and Conditions</span>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { site } from '../../data/site'

const socialIcons = [
  {
    label: 'Facebook',
    svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" fill="#003f2e"/></svg>`,
  },
  {
    label: 'Twitter',
    svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 5.8c-.7.3-1.5.5-2.3.6A4 4 0 0 0 21.4 4a8 8 0 0 1-2.5 1 4 4 0 0 0-6.8 3.6A11.3 11.3 0 0 1 3 4.9a4 4 0 0 0 1.2 5.3 4 4 0 0 1-1.8-.5v.1a4 4 0 0 0 3.2 3.9 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.6a11.3 11.3 0 0 0 6.1 1.8c7.4 0 11.4-6.1 11.4-11.4v-.5A8 8 0 0 0 22 5.8z" fill="#003f2e"/></svg>`,
  },
  {
    label: 'Instagram',
    svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5.2A3.8 3.8 0 1 0 15.8 12 3.8 3.8 0 0 0 12 8.2zm6.2-1.9a1 1 0 1 0 1 1 1 1 0 0 0-1-1zM12 9.8A2.2 2.2 0 1 1 9.8 12 2.2 2.2 0 0 1 12 9.8z" fill="#003f2e"/></svg>`,
  },
  {
    label: 'YouTube',
    svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18.2 5.6 12 5.6 12 5.6s-6.2 0-7.9.5A3 3 0 0 0 2 8.2C1.6 9.9 1.6 12 1.6 12s0 2.1.4 3.8a3 3 0 0 0 2.1 2.1c1.7.5 7.9.5 7.9.5s6.2 0 7.9-.5a3 3 0 0 0 2.1-2.1c.4-1.7.4-3.8.4-3.8s0-2.1-.4-3.8zM10 15.2V8.8L15.5 12 10 15.2z" fill="#003f2e"/></svg>`,
  },
]
</script>

<style scoped>
.site-footer {
  position: relative;
  overflow: hidden;
  background: var(--color-surface);
  padding: 56px 0 24px;
}

.site-footer__glow {
  position: absolute;
  left: -120px;
  bottom: -60px;
  width: clamp(420px, 32vw, 560px);
  height: clamp(420px, 32vw, 560px);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--color-brand-accent) 40%, transparent),
    transparent 70%
  );
  pointer-events: none;
  filter: blur(40px);
}

.site-footer__top {
  position: relative;
  display: grid;
  gap: 48px;
  padding-bottom: 48px;
}

.site-footer__name {
  margin: 0;
  color: #000000;
  font-size: clamp(22px, 1.6vw, 28px);
  font-weight: 900;
}

.site-footer__tagline {
  max-width: 320px;
  margin-top: 20px !important;
  font-size: clamp(15px, 1.05vw, 17px);
}

.site-footer__social {
  display: flex;
  gap: 16px;
  margin-top: 28px;
}

.site-footer__social-link {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1.5px solid #003f2e;
  text-decoration: none;
}

.site-footer__social-ring {
  display: grid;
  place-items: center;
  line-height: 0;
}

.site-footer__cols {
  display: grid;
  gap: 32px;
}

.site-footer__heading {
  margin: 0 0 20px;
  color: var(--color-brand);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1.4px;
}

.site-footer__cols ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 14px;
}

.site-footer__cols a,
.site-footer__cols li {
  color: var(--color-brand-dark);
  font-size: clamp(15px, 1.05vw, 16px);
  text-decoration: none;
}

.site-footer__contact {
  margin-top: 18px !important;
}

.site-footer__bottom {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  padding-top: 28px;
  border-top: 1px solid color-mix(in srgb, var(--color-brand-dark) 12%, transparent);
  font-size: 15px;
  color: #000;
}

.site-footer__legal {
  display: flex;
  gap: 30px;
}

@media (min-width: 900px) {
  .site-footer {
    padding: 80px 0 32px;
  }

  .site-footer__top {
    grid-template-columns: 1.15fr 2.2fr;
    align-items: start;
    gap: clamp(48px, 6vw, 120px);
  }

  .site-footer__cols {
    grid-template-columns: 1.3fr 1fr 1fr;
    gap: clamp(32px, 4vw, 72px);
  }
}
</style>
