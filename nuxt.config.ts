// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  app: {
    baseURL: '/',
    head: {
      title: 'Tanguy Hardion',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Personal website of Tanguy Hardion. Gen AI / Agentic AI, Data Engineering/Architecture/Governance/Management, Business Analysis & Software Development.'
        },
        { name: 'theme-color', content: '#000000' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/images/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/images/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap'
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  css: ['~/assets/scss/main.scss'],

  nitro: {
    preset: 'github-pages'
  }
});
