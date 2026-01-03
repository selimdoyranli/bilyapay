<template>
  <div class="space-y-4">
    <h5 class="font-bold mt-4 mb-2">
      Sistem girdisi
    </h5>
    <small class="text-gray-500 dark:text-gray-400 mb-4 block">
      Bilyoner verileri otomatik olarak sistem girdisine iliştirilir.
    </small>

    <UChatPrompt
      v-model="systemPrompt"
      :rows="4"
      placeholder="Analiz için talimatları buraya girin..."
      @submit="handleAnalyze"
    >
      <template #footer>
        <div class="flex items-center justify-between w-full gap-2">
          <div class="flex items-center gap-2 flex-1">
            <USelect
              v-model="selectedModel"
              :options="['gemini-2.5-pro', 'gemini-3-flash-preview']"
              size="xs"
              class="w-48"
            />

            <UInput
              v-if="selectedModel"
              v-model="apiKey"
              type="password"
              placeholder="API Key (Optional)"
              icon="i-heroicons-key"
              size="xs"
              class="flex-1 max-w-xs"
            />
          </div>

          <UButton
            :loading="isLoading"
            size="md"
            icon="i-heroicons-sparkles"
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
      <div class="prose dark:prose-invert max-w-none">
        <MDC :value="completion" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCompletion } from '@ai-sdk/vue'
import { FOOTBALL_ANALYSIS_PROMPT } from '~/constants/prompts'

const props = defineProps<{
  data: any
}>()

const selectedModel = ref('gemini-3-flash-preview')
const apiKey = ref('')
const systemPrompt = ref(FOOTBALL_ANALYSIS_PROMPT)

const { completion, complete, isLoading } = useCompletion({
  api: '/api/chat',
  streamProtocol: 'text'
})

const handleAnalyze = () => {
  // We'll pass the full content including data to the prompt
  // But usually the system prompt is separate.
  // The useCompletion hook sends `prompt` in the body.

  const fullContent = `${systemPrompt.value}

MAÇ VERİLERİ:
${JSON.stringify(props.data, null, 2)}`

  complete(fullContent, {
    body: {
      model: selectedModel.value,
      apiKey: apiKey.value // Send API key to backend
    }
  })
}
</script>
