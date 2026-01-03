<template>
  <div
    v-if="loading"
    class="flex justify-center items-center py-4"
  >
    <UIcon
      name="i-heroicons-arrow-path"
      class="animate-spin h-8 w-8 text-primary-500"
    />
  </div>
  <UCarousel
    v-else-if="matches && matches.length > 0"
    v-slot="{ item: match }"
    :items="matches"
    :ui="{ item: 'basis-2/3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4' }"
    class="w-full mt-8"
    arrows
  >
    <div class="p-2 w-full">
      <UCard
        :ui="{ body: ['px-4', 'py-3', 'sm:p-4'] }"
        class="hover:border-primary-500 transition-colors cursor-pointer h-full"
        @click="selectMatch(match)"
      >
        <div class="flex flex-col gap-2">
          <div class="flex justify-between items-start">
            <span class="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 truncate max-w-[60%]">{{ match.lgn }}</span>
            <span class="text-[10px] font-medium text-primary-500">{{ match.strt }}</span>
          </div>

          <div
            class="font-semibold text-xs truncate"
            :title="match.en"
          >
            {{ match.en }}
          </div>

          <div class="mt-1 p-1.5 bg-gray-50 dark:bg-gray-800 rounded text-center">
            <div class="text-[10px] text-gray-500 mb-0.5 truncate">
              {{ match.market?.mrn }}
            </div>
            <div class="flex justify-center items-center gap-2 font-bold text-xs">
              <span>{{ match.market?.n }}</span>
              <span class="text-primary-600 dark:text-primary-400">{{ match.market?.val }}</span>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </UCarousel>
  <div
    v-else
    class="text-center text-gray-500 mt-4"
  >
    Trend maçlar bulunamadı.
  </div>
</template>

<script setup lang="ts">
import type { TrendingMatch } from '~/composables/useBilyonerApi'

defineProps<{
  matches: TrendingMatch[]
  loading?: boolean
}>()

const emit = defineEmits(['select'])

function selectMatch(match: TrendingMatch) {
  // Construct the URL similar to the placeholder
  // https://www.bilyoner.com/mac-karti/futbol/2549856/oranlar/1
  // id: 2552563
  // We don't have enough info to construct the full URL perfectly without knowing the logic,
  // but we can try to guess or just pass the ID if the parent handles it.
  // The placeholder in PredictForm is: https://www.bilyoner.com/mac-karti/futbol/2549856/oranlar/1
  // The ID in the data is match.id.
  const url = `https://www.bilyoner.com/mac-karti/futbol/${match.id}/oranlar/1`
  emit('select', url)
}
</script>
