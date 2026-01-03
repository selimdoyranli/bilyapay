<template>
  <LogoAppLogo class="w-auto shrink-0 mb-4 block" />

  <h2
    class="font-normal text-2xl block mb-12"
  >
    Bilyoner verileri ile yapay zeka futbol maçı tahmini
  </h2>

  <UForm
    :state="state"
    @submit="onSubmit"
  >
    <UFormField
      name="bilyonerMatchLink"
      label="Bilyoner maç linki"
      label-class="mb-4 block"
    >
      <UInput
        v-model="state.bilyonerMatchLink"
        placeholder="https://www.bilyoner.com/mac-karti/futbol/2549856/oranlar/1"
        class="w-full"
        size="xl"
        :ui="{ root: 'mt-2' }"
        icon="i-heroicons-link"
      />
    </UFormField>
    <UButton
      type="submit"
      class="mt-4"
      size="md"
      loading-auto
    >
      Bilyoner verilerini getir
    </UButton>
  </UForm>

  <div class="mt-12">
    <h3 class="text-lg font-semibold mb-4">
      Popüler Maçlar
    </h3>
    <MatchTrendMatches
      :matches="trendingMatches"
      :loading="pending"
      @select="onMatchSelect"
    />
  </div>
</template>

<script setup lang="ts">
interface TrendingMatch {
  id: number
  en: string
  lgn: string
  strt: string
  market?: {
    mrn: string
    n: string
    val: number
  }
}

const state = reactive({ bilyonerMatchLink: '' })

const emit = defineEmits(['on-submit'])

const { fetchTrendMatches } = useBilyonerApi()

const { data, pending } = await useAsyncData('trending-matches', () => fetchTrendMatches())

const trendingMatches = computed(() => {
  const response = data.value as { data: TrendingMatch[] } | null
  return response?.data || []
})

function onMatchSelect(url: string) {
  state.bilyonerMatchLink = url
}

async function onSubmit() {
  emit('on-submit', state.bilyonerMatchLink)
}
</script>
