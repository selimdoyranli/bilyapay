<template>
  <div class="space-y-4">
    <h5 class="font-bold mt-4 mb-2">
      Sistem girdisi
    </h5>
    <small class="text-gray-500 dark:text-gray-400 mb-4 block">
      Bilyoner verileri otomatik olarak sistem girdisine iliştirilir.
      <br>
      Model: gemini-3-flash-preview
    </small>

    <UChatPrompt
      v-model="systemPrompt"
      :rows="4"
      placeholder="Analiz için talimatları buraya girin..."
      :autofocus="false"
      @submit="handleAnalyze"
    >
      <template #footer>
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between w-full gap-2">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1 opacity-0 pointer-events-none">
            <USelect
              v-model="selectedModel"
              :options="['gemini-2.5-pro', 'gemini-3-flash-preview']"
              size="xs"
              class="w-full sm:w-48"
            />

            <UInput
              v-if="selectedModel"
              v-model="apiKey"
              type="password"
              placeholder="API Key (Optional)"
              icon="i-heroicons-key"
              size="xs"
              class="flex-1 w-full sm:max-w-xs"
            />
          </div>

          <UButton
            :loading="isLoading"
            size="md"
            icon="i-heroicons-sparkles"
            class="w-full sm:w-auto flex justify-center"
            @click="handleAnalyze"
          >
            Analiz et
          </UButton>
        </div>
      </template>
    </UChatPrompt>

    <div
      v-if="completion"
      class="border-b border-gray-200 dark:border-gray-700 pb-8 mb-8"
    >
      <h4 class="font-bold mb-4">
        Analiz Sonucu:
      </h4>
      <div class="prose dark:prose-invert max-w-none break-words overflow-hidden">
        <MDC :value="completion" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCompletion } from '@ai-sdk/vue'
import { FOOTBALL_ANALYSIS_PROMPT } from '~/constants/prompts'
import type { MatchData } from '~/types/bilyoner'

const props = defineProps<{
  data: MatchData | null
}>()

const selectedModel = ref('gemini-3-flash-preview')
const apiKey = ref('')
const systemPrompt = ref(FOOTBALL_ANALYSIS_PROMPT)

const { completion, complete, isLoading } = useCompletion({
  api: '/api/chat',
  streamProtocol: 'text'
})

const handleAnalyze = () => {
  const fullContent = `${systemPrompt.value}

MAÇ VERİLERİ:
${JSON.stringify(props.data, null, 2)}`

  complete(fullContent, {
    body: {
      model: selectedModel.value,
      apiKey: apiKey.value
    }
  })
}
</script>
