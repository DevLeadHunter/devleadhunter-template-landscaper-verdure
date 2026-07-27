<template>
  <section class="faqs">
    <div class="container-eco faqs__inner">
      <div
        v-reveal
        class="faqs__heading">
        <p class="eyebrow">{{ content.faqHeading.eyebrow }}</p>
        <h2 class="heading-xl">{{ content.faqHeading.title }}</h2>
      </div>
      <div
        v-reveal.stagger
        class="faqs__list">
        <article
          v-for="(item, index) in content.faqs"
          :key="item.question"
          class="faqs__item"
          :class="{ 'is-open': openIndex === index }">
          <button
            type="button"
            class="faqs__trigger"
            @click="openIndex = openIndex === index ? -1 : index">
            <span>{{ item.question }}</span>
            <img
              class="faqs__icon"
              :src="
                openIndex === index
                  ? '/images/verdure/icon-faq-minus.svg'
                  : '/images/verdure/icon-faq-plus.svg'
              "
              alt=""
              width="32"
              height="32" />
          </button>
          <p
            v-show="openIndex === index"
            class="body-text faqs__answer">
            {{ item.answer }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ComputedRef, Ref } from 'vue'
import { computed, inject, ref } from 'vue'
import type { VerdurePageContent } from '../../types/verdure'
import { buildVerdureContent, VERDURE_CONTENT_KEY } from '../../types/verdure'

/** Contenu de la page fourni par la racine (défauts éditoriaux FR hors racine). */
const content: ComputedRef<VerdurePageContent> = inject(
  VERDURE_CONTENT_KEY,
  (): ComputedRef<VerdurePageContent> =>
    computed((): VerdurePageContent => buildVerdureContent({})),
  true,
)

const openIndex: Ref<number> = ref(0)
</script>

<style scoped>
.faqs {
  padding: 32px 0 var(--verdure-section-space, 120px);
}

.faqs__inner {
  display: grid;
  gap: 40px;
  justify-items: center;
}

.faqs__heading {
  display: grid;
  gap: 16px;
  text-align: center;
  max-width: 860px;
}

.faqs__list {
  width: min(100%, 860px);
  display: grid;
  gap: 8px;
}

.faqs__item {
  background: #fff;
  border-radius: 10px;
  padding: 18px 16px;
  border-bottom: 1px solid rgb(0 63 46 / 8%);
}

.faqs__trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #003f2e;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.35;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
}

.faqs__icon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  display: block;
}

.faqs__answer {
  margin-top: 14px !important;
  max-width: 690px;
  line-height: 1.5;
  font-size: 15px;
}

@media (min-width: 640px) {
  .faqs {
    padding: 40px 0 100px;
  }

  .faqs__inner {
    gap: 56px;
  }

  .faqs__list {
    gap: 20px;
  }

  .faqs__item {
    padding: 24px;
  }

  .faqs__trigger {
    font-size: 17px;
  }

  .faqs__icon {
    width: 32px;
    height: 32px;
  }
}

@media (min-width: 900px) {
  .faqs {
    padding: 40px 0 120px;
  }

  .faqs__inner {
    gap: 72px;
  }

  .faqs__list {
    gap: 30px;
  }

  .faqs__item {
    padding: 30px;
  }

  .faqs__trigger {
    font-size: 18px;
  }
}
</style>
