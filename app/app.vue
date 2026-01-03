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

// Credits modal state
const isCreditsModalOpen = ref(false)

const openCreditsModal = () => {
  isCreditsModalOpen.value = true
}
</script>

<template>
  <UApp>
    <UMain class="min-h-[calc(100vh-var(--ui-footer-height))]">
      <NuxtPage />
    </UMain>

    <UFooter class="h-[50px] fixed bottom-0 left-0 right-0 flex items-center bg-neutral-900">
      <template #left>
        <p class="text-sm text-muted">
          Created by
          <button
            class="text-blue-400 hover:text-blue-300 underline cursor-pointer transition-colors"
            @click="openCreditsModal"
          >
            @selimdoyranli
          </button>
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

    <!-- Credits Modal -->
    <CreditsModal v-model="isCreditsModalOpen" />
  </UApp>
</template>
