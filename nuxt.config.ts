// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/mdc'
  ],

  devtools: {
    enabled: true
  },
  app: {
    head: {
      title: 'Bilyapay - Bilyoner verileri ile yapay zeka futbol maçı tahmini',
      meta: [
        { name: 'description', content: 'Bilyapay - Bilyoner verileri ile yapay zeka futbol maçı tahmini' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&display=swap' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
