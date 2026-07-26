import type { DirectiveBinding } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
  const observerMap = new WeakMap<Element, IntersectionObserver>();

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      // Default animation type class
      const animationType = binding.arg || 'fade-up'; // e.g. v-reveal:fade-up or v-reveal:scale
      el.classList.add('reveal-element', `reveal-${animationType}`);

      // Stagger delay if provided via value, e.g. v-reveal="100" (ms) or v-reveal="{ delay: 150 }"
      if (typeof binding.value === 'number') {
        el.style.transitionDelay = `${binding.value}ms`;
      } else if (typeof binding.value === 'object' && binding.value?.delay) {
        el.style.transitionDelay = `${binding.value.delay}ms`;
      }

      if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        el.classList.add('revealed');
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.classList.add('revealed');
              // Unobserve once revealed so animation triggers once smoothly
              observer.unobserve(el);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      observer.observe(el);
      observerMap.set(el, observer);
    },
    unmounted(el: HTMLElement) {
      const observer = observerMap.get(el);
      if (observer) {
        observer.disconnect();
        observerMap.delete(el);
      }
    },
  });
});
