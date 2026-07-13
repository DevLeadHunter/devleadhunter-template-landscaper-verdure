import type { Directive, DirectiveBinding } from 'vue'

type RevealType = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'

type RevealOptions = {
  type?: RevealType
  delay?: number
  duration?: number
  once?: boolean
  distance?: number
}

type RevealEl = HTMLElement & {
  __revealObserver?: IntersectionObserver
  __revealCleanup?: () => void
}

function normalize(
  value: unknown,
  modifiers: DirectiveBinding['modifiers'],
): Required<RevealOptions> {
  const fromString = typeof value === 'string' ? { type: value as RevealType } : null
  const fromObject = value && typeof value === 'object' ? (value as RevealOptions) : null
  const opts = fromObject || fromString || {}

  return {
    type: opts.type || 'up',
    delay: opts.delay ?? 0,
    duration: opts.duration ?? 820,
    once: opts.once ?? !modifiers.repeat,
    distance: opts.distance ?? 36,
  }
}

function runAfterPaint(cb: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb)
  })
}

const revealDirective: Directive<RevealEl, RevealOptions | RevealType | undefined> = {
  getSSRProps() {
    return {}
  },

  mounted(el, binding) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const opts = normalize(binding.value, binding.modifiers)
    const stagger = Boolean(binding.modifiers.stagger)

    el.classList.add('reveal')
    if (stagger) {
      el.classList.add('reveal-stagger', 'reveal--hold')
    } else {
      el.classList.add(`reveal--${opts.type}`)
    }

    el.style.setProperty('--reveal-delay', `${opts.delay}ms`)
    el.style.setProperty('--reveal-duration', `${opts.duration}ms`)
    el.style.setProperty('--reveal-distance', `${opts.distance}px`)

    if (reducedMotion) {
      el.classList.add('is-inview')
      return
    }

    const revealNow = () => {
      el.classList.add('is-inview')
    }

    // Force the initial hidden state to paint before revealing (fixes “no animation on reload”)
    void el.offsetWidth

    const alreadyVisible = el.getBoundingClientRect().top < window.innerHeight * 0.9

    if (alreadyVisible) {
      runAfterPaint(revealNow)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            revealNow()
            if (opts.once) observer.unobserve(el)
          } else if (!opts.once) {
            el.classList.remove('is-inview')
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -4% 0px',
      },
    )

    el.__revealObserver = observer
    observer.observe(el)
  },

  unmounted(el) {
    el.__revealObserver?.disconnect()
    el.__revealCleanup?.()
    delete el.__revealObserver
    delete el.__revealCleanup
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', revealDirective)
})
