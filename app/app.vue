<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Bilyapay - Bilyoner verileri ile yapay zeka futbol maçı tahmini'
const description = 'Bilyapay - Bilyoner verileri ile yapay zeka futbol maçı tahmini'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <UHeader class="border-none">
      <template #left>
        <NuxtLink to="/">
          <LogoAppLogo class="w-auto h-6 shrink-0" />
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />

        <UButton
          to="https://github.com/selimdoyranli/bilyapay"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="i-simple-icons-gnometerminal" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Bilyapay - Bilyoner verileri ile yapay zeka futbol maçı tahmini
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/selimdoyranli/bilyapay"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
