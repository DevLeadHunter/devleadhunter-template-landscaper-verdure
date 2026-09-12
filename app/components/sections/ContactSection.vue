<template>
  <section class="contact">
    <div class="container-eco contact__inner">
      <div
        v-reveal
        class="contact__intro">
        <p class="eyebrow">{{ content.contactHeading.eyebrow }}</p>
        <h2 class="heading-xl">{{ content.contactHeading.title }}</h2>
        <p class="body-text">{{ content.contactHeading.lead }}</p>
      </div>

      <div
        v-reveal.stagger
        class="contact__points">
        <article
          v-for="point in contactPoints"
          :key="point.label"
          class="contact__point">
          <span
            class="contact__icon"
            aria-hidden="true"
            v-html="point.icon" />
          <h3>{{ point.label }}</h3>
          <ul
            v-if="point.hours"
            class="contact__hours">
            <li
              v-for="slot in point.hours"
              :key="slot.day"
              class="contact__hours-row">
              <span class="contact__hours-day">{{ slot.day }}</span>
              <span class="contact__hours-time">{{ slot.hours }}</span>
            </li>
          </ul>
          <p
            v-else
            class="body-text">
            {{ point.value }}
          </p>
        </article>
      </div>

      <div
        v-if="mapSrc"
        v-reveal
        class="contact__map">
        <iframe
          :title="`Carte — ${content.contact.area}`"
          :src="mapSrc"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen />
      </div>

      <form
        v-if="hasEmail"
        v-reveal="{ type: 'up', delay: 100 }"
        class="contact__form"
        @submit.prevent="sendMailto">
        <label>
          <span>NOM</span>
          <input
            v-model="form.name"
            type="text"
            name="name"
            autocomplete="name"
            placeholder="Votre nom"
            required />
        </label>
        <label>
          <span>EMAIL</span>
          <input
            v-model="form.email"
            type="email"
            name="email"
            autocomplete="email"
            placeholder="Votre adresse email"
            required />
        </label>
        <label>
          <span>TÉLÉPHONE</span>
          <input
            v-model="form.phone"
            type="tel"
            name="phone"
            autocomplete="tel"
            placeholder="Votre numéro de téléphone" />
        </label>
        <label>
          <span>ADRESSE DU JARDIN</span>
          <input
            v-model="form.address"
            type="text"
            name="address"
            autocomplete="street-address"
            placeholder="Adresse, code postal, ville…" />
        </label>
        <label class="is-full">
          <span>VOTRE PROJET</span>
          <textarea
            v-model="form.notes"
            name="notes"
            rows="5"
            placeholder="Décrivez votre extérieur et ce que vous aimeriez en faire" />
        </label>
        <button
          type="submit"
          class="btn-eco">
          Envoyer ma demande
        </button>
      </form>

      <div
        v-else-if="content.contact.phone"
        v-reveal="{ type: 'up', delay: 100 }"
        class="contact__call">
        <p class="body-text">
          Le plus simple pour demander un devis : un appel, avec une réponse directe.
        </p>
        <a
          :href="`tel:${content.contact.phone}`"
          class="btn-eco">
          Appeler le {{ content.contact.phone }}
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Formulaire + carte repris de la page contact de la maquette multi-pages.
// L'envoi ouvre un email pré-rempli vers le prospect (aucun backend requis).
import type { ComputedRef } from 'vue'
import { computed, inject, reactive } from 'vue'
import type { VerdureContact, VerdurePageContent } from '../../types/verdure'
import { buildVerdureContent, VERDURE_CONTENT_KEY } from '../../types/verdure'

/** Contenu de la page fourni par la racine (défauts éditoriaux FR hors racine). */
const content: ComputedRef<VerdurePageContent> = inject(
  VERDURE_CONTENT_KEY,
  (): ComputedRef<VerdurePageContent> =>
    computed((): VerdurePageContent => buildVerdureContent({})),
  true,
)

/** Saisie du visiteur, injectée dans l'email pré-rempli. */
const form: { name: string; email: string; phone: string; address: string; notes: string } =
  reactive({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  })

/** Une carte de coordonnées : soit une valeur simple (zone, téléphone, email), soit des horaires. */
interface ContactPoint {
  label: string
  icon: string
  value?: string
  hours?: { day: string; hours: string }[]
}

/** Vrai quand un email de contact est renseigné (pilote l'affichage du formulaire). */
const hasEmail: ComputedRef<boolean> = computed(
  (): boolean => content.value.contact.email.length > 0,
)

/**
 * Cartes de coordonnées affichées : la zone d'intervention (toujours), le canal de contact
 * (le téléphone, ou l'email à sa place quand il n'y a pas de téléphone), et les horaires dès qu'ils
 * sont connus (sinon l'email en secours). On n'affiche jamais de carte vide.
 */
const contactPoints: ComputedRef<ContactPoint[]> = computed((): ContactPoint[] => {
  const contact: VerdureContact = content.value.contact
  const points: ContactPoint[] = []
  if (contact.area.length > 0) {
    points.push({ label: 'Zone d’intervention', value: contact.area, icon: HOME_ICON })
  }
  if (contact.phone.length > 0) {
    points.push({ label: 'Téléphone', value: contact.phone, icon: PHONE_ICON })
  } else if (contact.email.length > 0) {
    points.push({ label: 'Email', value: contact.email, icon: MAIL_ICON })
  }
  const hours: { day: string; hours: string }[] = contact.openingHours.filter(
    (slot: { day: string; hours: string }): boolean => slot.day.length > 0 && slot.hours.length > 0,
  )
  if (hours.length > 0) {
    points.push({ label: 'Horaires', hours, icon: CLOCK_ICON })
  } else if (contact.phone.length > 0 && contact.email.length > 0) {
    points.push({ label: 'Email', value: contact.email, icon: MAIL_ICON })
  }
  return points
})

/** Carte embarquée centrée sur la zone du prospect (aucune clé API requise). */
const mapSrc: ComputedRef<string> = computed((): string => {
  const place: string = content.value.contact.city || content.value.contact.area
  if (!place) return ''
  return `https://www.google.com/maps?q=${encodeURIComponent(place)}&z=12&output=embed`
})

/**
 * Ouvre un email pré-rempli vers le prospect avec la demande du visiteur.
 */
function sendMailto(): void {
  const subject: string = encodeURIComponent(
    form.name ? `Demande de devis — ${form.name}` : 'Demande de devis',
  )
  const body: string = encodeURIComponent(
    [
      `Nom : ${form.name}`,
      `Email : ${form.email}`,
      `Téléphone : ${form.phone || '—'}`,
      `Adresse du jardin : ${form.address || '—'}`,
      '',
      'Projet :',
      form.notes || '—',
    ].join('\n'),
  )
  window.location.href = `mailto:${content.value.contact.email}?subject=${subject}&body=${body}`
}

const HOME_ICON: string = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1v-9.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`
const PHONE_ICON: string = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 3.5h3.2l1.6 4.4-2.1 1.2a11.5 11.5 0 0 0 4.7 4.7l1.2-2.1 4.4 1.6v3.2a2 2 0 0 1-2 2A14.5 14.5 0 0 1 4.5 7.5a2 2 0 0 1 4-4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`
const MAIL_ICON: string = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="m3.5 7 8.5 6.5L20.5 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const CLOCK_ICON: string = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 7.5V12l3.2 1.9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
</script>

<style scoped>
.contact {
  padding: 0 0 var(--verdure-section-space, 120px);
}

.contact__inner {
  display: grid;
  gap: 36px;
  width: 100%;
  max-width: 1000px;
  margin-inline: auto;
}

.contact__intro {
  display: grid;
  gap: 14px;
  text-align: center;
  justify-items: center;
}

.contact__intro .body-text {
  max-width: 700px;
}

.contact__points {
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr;
  align-items: start;
  text-align: center;
}

.contact__point {
  display: grid;
  gap: 10px;
  justify-items: center;
  color: var(--color-verdure-brand);
}

.contact__icon {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  line-height: 0;
}

.contact__icon :deep(svg) {
  width: 32px;
  height: 32px;
  display: block;
}

.contact__point h3 {
  margin: 0;
  color: var(--color-verdure-ink);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
}

.contact__point .body-text {
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
}

.contact__hours {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 4px;
  width: 100%;
  max-width: 240px;
  font-size: 14px;
}

.contact__hours-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.contact__hours-day {
  text-transform: capitalize;
  color: color-mix(in srgb, var(--color-verdure-ink) 65%, transparent);
}

.contact__hours-time {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  color: var(--color-verdure-ink);
}

.contact__call {
  display: grid;
  gap: 18px;
  justify-items: center;
  text-align: center;
}

.contact__call .body-text {
  max-width: 460px;
}

.contact__map {
  border-radius: clamp(16px, 3vw, 24px);
  overflow: hidden;
  background: #e8ebe3;
}

.contact__map iframe {
  display: block;
  width: 100%;
  height: clamp(260px, 34vw, 380px);
  border: 0;
}

.contact__form {
  display: grid;
  gap: 18px;
  grid-template-columns: 1fr;
}

.contact__form label {
  display: grid;
  gap: 8px;
}

.contact__form span {
  color: var(--color-verdure-ink);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
}

.contact__form input,
.contact__form textarea {
  width: 100%;
  border: 1px solid color-mix(in srgb, var(--color-verdure-ink) 18%, transparent);
  border-radius: 10px;
  padding: 14px 16px;
  font: inherit;
  color: var(--color-verdure-ink);
  background: #fff;
  box-sizing: border-box;
}

.contact__form input:focus,
.contact__form textarea:focus {
  outline: 2px solid color-mix(in srgb, var(--color-verdure-brand) 35%, transparent);
  border-color: var(--color-verdure-brand);
}

.contact__form .is-full {
  grid-column: 1 / -1;
}

.contact__form .btn-eco {
  width: 100%;
  max-width: none;
}

@media (min-width: 800px) {
  .contact__points {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .contact__form {
    grid-template-columns: 1fr 1fr;
    gap: 22px;
  }

  .contact__form .btn-eco {
    grid-column: 1 / 2;
    justify-self: start;
    width: auto;
  }
}
</style>
