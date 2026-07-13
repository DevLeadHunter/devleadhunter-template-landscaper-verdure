<template>
  <div>
    <PageHeroSection
      eyebrow="contact us"
      title="Get in touch"
      description="We're happy to answer any questions you may have about our lawn care or landscaping services, Feel free to give us a call or send us a message and we'll help get the answers you need"
      map
      :lat="-7.4724"
      :lng="112.4336"
      :zoom="12" />

    <section class="contact-info">
      <div
        v-reveal.stagger
        class="container-eco contact-info__grid">
        <article
          v-for="item in contactPoints"
          :key="item.label"
          class="contact-info__item">
          <span
            class="contact-info__icon"
            aria-hidden="true"
            v-html="item.icon" />
          <h3>{{ item.label }}</h3>
          <p class="body-text">{{ item.value }}</p>
        </article>
      </div>
    </section>

    <section class="contact-form">
      <div class="container-eco contact-form__inner">
        <div
          v-reveal
          class="contact-form__intro">
          <p class="eyebrow">contact form</p>
          <h2 class="heading-xl">Let's schedule your appointment</h2>
          <p class="body-text">
            Feel free to give us a call or send us a message and we'll help get the answers you
            need, or a quote for services at your residential or commercial property.
          </p>
        </div>
        <form
          v-reveal="{ type: 'up', delay: 100 }"
          class="contact-form__form"
          @submit.prevent="sendMailto">
          <label>
            <span>NAME</span>
            <input
              v-model="form.name"
              type="text"
              name="name"
              autocomplete="name"
              placeholder="Write your name"
              required />
          </label>
          <label>
            <span>EMAIL</span>
            <input
              v-model="form.email"
              type="email"
              name="email"
              autocomplete="email"
              placeholder="Write your email address"
              required />
          </label>
          <label>
            <span>PHONE NUMBER</span>
            <input
              v-model="form.phone"
              type="tel"
              name="phone"
              autocomplete="tel"
              placeholder="Write your phone number" />
          </label>
          <label>
            <span>ADDRESS</span>
            <input
              v-model="form.address"
              type="text"
              name="address"
              autocomplete="street-address"
              placeholder="Write your street address, zipcode , etc" />
          </label>
          <label class="is-full">
            <span>NOTES</span>
            <textarea
              v-model="form.notes"
              name="notes"
              rows="5"
              placeholder="Type here" />
          </label>
          <button
            type="submit"
            class="btn-eco">
            Send Message
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import PageHeroSection from '../../../app/components/sections/PageHeroSection.vue'

useHead({ title: 'Contact' })

const CONTACT_EMAIL = 'hello@yourewebsite.com'

const contactPoints = [
  {
    label: 'Office',
    value: 'Desa bangsal Rt 11 Rw 02 Kec Bangsal Kab Mojokerto Jawa timur Indonesia 61381',
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1v-9.5z" stroke="#2d746d" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  },
  {
    label: 'Phone',
    value: '+123456790',
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 3.5h3.2l1.6 4.4-2.1 1.2a11.5 11.5 0 0 0 4.7 4.7l1.2-2.1 4.4 1.6v3.2a2 2 0 0 1-2 2A14.5 14.5 0 0 1 4.5 7.5a2 2 0 0 1 4-4z" stroke="#2d746d" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  },
  {
    label: 'Location',
    value: CONTACT_EMAIL,
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#2d746d" stroke-width="1.6"/><path d="m3.5 7 8.5 6.5L20.5 7" stroke="#2d746d" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
]

const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  notes: '',
})

function sendMailto() {
  const subject = encodeURIComponent(
    form.name ? `Appointment request from ${form.name}` : 'Appointment request',
  )
  const body = encodeURIComponent(
    [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Address: ${form.address}`,
      '',
      'Notes:',
      form.notes || '-',
    ].join('\n'),
  )
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
}
</script>

<style scoped>
.contact-info {
  padding: 24px 0 48px;
}

.contact-info__grid {
  display: grid;
  gap: 36px;
  grid-template-columns: 1fr;
  text-align: center;
  max-width: 980px;
  margin-inline: auto;
  align-items: start;
}

.contact-info__item {
  display: grid;
  gap: 12px;
  justify-items: center;
  align-content: start;
  background: transparent;
}

.contact-info__icon {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  line-height: 0;
}

.contact-info__icon :deep(svg) {
  width: 32px;
  height: 32px;
  display: block;
}

.contact-info__item h3 {
  margin: 0;
  color: #003f2e;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
}

.contact-info__item .body-text {
  margin: 0;
  white-space: pre-line;
  max-width: 100%;
  font-size: 15px;
  line-height: 1.5;
  text-align: center;
}

@media (min-width: 800px) {
  .contact-info {
    padding: 32px 0 64px;
  }

  .contact-info__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: 32px auto auto;
    column-gap: 48px;
    row-gap: 12px;
    text-align: left;
    align-items: start;
  }

  .contact-info__item {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 3;
    gap: unset;
    row-gap: 12px;
    justify-items: start;
    align-content: start;
  }

  .contact-info__item .body-text {
    text-align: left;
  }

  .contact-info__item h3 {
    font-size: 20px;
  }
}

.contact-form {
  padding: 12px 0 80px;
}

.contact-form__inner {
  display: grid;
  gap: 32px;
  width: 100%;
  max-width: 1000px;
  margin-inline: auto;
}

.contact-form__intro {
  display: grid;
  gap: 14px;
  text-align: center;
  justify-items: center;
}

.contact-form__intro .body-text {
  max-width: 700px;
}

.contact-form__form {
  display: grid;
  gap: 18px;
  grid-template-columns: 1fr;
  background: transparent;
  padding: 0;
}

.contact-form__form label {
  display: grid;
  gap: 8px;
}

.contact-form__form span {
  color: #003f2e;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
}

.contact-form__form input,
.contact-form__form textarea {
  width: 100%;
  border: 1px solid color-mix(in srgb, var(--color-brand-dark) 18%, transparent);
  border-radius: 10px;
  padding: 14px 16px;
  font: inherit;
  color: var(--color-brand-dark);
  background: #fff;
  box-sizing: border-box;
}

.contact-form__form input:focus,
.contact-form__form textarea:focus {
  outline: 2px solid color-mix(in srgb, var(--color-brand) 35%, transparent);
  border-color: var(--color-brand);
}

.contact-form__form .is-full {
  grid-column: 1 / -1;
}

.contact-form__form .btn-eco {
  width: 100%;
  max-width: none;
}

@media (min-width: 800px) {
  .contact-form {
    padding: 16px 0 110px;
  }

  .contact-form__inner {
    gap: 40px;
  }

  .contact-form__form {
    grid-template-columns: 1fr 1fr;
    gap: 22px;
  }

  .contact-form__form .btn-eco {
    grid-column: 1 / 2;
    justify-self: start;
    width: auto;
  }
}
</style>
