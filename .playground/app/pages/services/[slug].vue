<template>
  <div>
    <PageHeroSection
      eyebrow="service"
      title="Ready to transform your outdoor experience?"
      description="We offer a comprehensive range of services, including layout design sketch, plant selection and installation, revitalization of existing features, improved irrigation systems, paving options, simple aesthetic mulching, more"
      image="/images/image-import-16.jpg" />

    <section class="service-detail">
      <div class="container-eco service-detail__inner">
        <div class="service-detail__copy">
          <h2 class="heading-xl">With a focus on functionality, aesthetics, and sustainability</h2>
          <p class="body-text">
            Our team can work with you to create a customized landscape sketch that reflects your
            style and desires for a landscaped garden. From concept to execution, we prioritize open
            communication and attention to detail to ensure your landscape becomes a source of pride
            and joy. Through this process, we will give advice on critical factors such as
            topography, sunlight exposure, existing vegetation, and structural wall requirements.
            With our skills, experience, and commitment to quality, we will bring your design to
            life, enhance your property’s value and provide a serene sanctuary for you to enjoy.
          </p>
        </div>

        <div class="service-detail__includes">
          <h3>Our services includes</h3>
          <p class="body-text">
            For a comprehensive landscape design service we have a team we work with to provide you
            with a more in-depth consultation to understand your vision, requirements, and budget in
            further detail if required.
          </p>
          <ul>
            <li
              v-for="item in serviceIncludes"
              :key="item">
              <img
                class="service-detail__check"
                src="/images/icon-check-circle.svg"
                alt=""
                width="32"
                height="32" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <FaqsSection />
    <CtaSection />
  </div>
</template>

<script lang="ts" setup>
import PageHeroSection from '../../../../app/components/sections/PageHeroSection.vue'
import FaqsSection from '../../../../app/components/sections/FaqsSection.vue'
import CtaSection from '../../../../app/components/sections/CtaSection.vue'
import { serviceIncludes, servicesPage } from '../../../../app/data/site'

const route = useRoute()
const service = computed(
  () => servicesPage.find((s) => s.slug === route.params.slug) || servicesPage[0],
)

useHead({ title: () => service.value?.title || 'Service' })
</script>

<style scoped>
.service-detail {
  padding: 12px 0 72px;
}

.service-detail__inner {
  display: grid;
  gap: 36px;
  max-width: 750px;
}

.service-detail__copy,
.service-detail__includes {
  display: grid;
  gap: 16px;
  background: transparent;
}

.service-detail__includes h3 {
  margin: 0;
  color: var(--color-brand-dark);
  font-size: clamp(20px, 5vw, 28px);
  font-weight: 600;
}

.service-detail__includes ul {
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 12px;
}

.service-detail__includes li {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: #003f2e;
  font-size: 15px;
  font-weight: 600;
  border-radius: 100px;
  padding: 8px 12px;
  line-height: 1.2;
  background: transparent;
}

.service-detail__check {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  display: block;
}

@media (min-width: 640px) {
  .service-detail {
    padding: 16px 0 90px;
  }

  .service-detail__inner {
    gap: 48px;
  }

  .service-detail__copy,
  .service-detail__includes {
    gap: 20px;
  }

  .service-detail__includes ul {
    flex-direction: row;
    gap: 20px;
  }

  .service-detail__includes li {
    gap: 20px;
    padding: 8px 15px;
  }

  .service-detail__check {
    width: 32px;
    height: 32px;
  }
}
</style>
