<template>
  <div class="space-y-4">
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

          <UChatPromptSubmit
            :loading="isLoading"
            size="xs"
          />
        </div>
      </template>
    </UChatPrompt>
  </div>
</template>

<script setup lang="ts">
import { useCompletion } from '@ai-sdk/vue'

const props = defineProps<{
  data: any
}>()

const selectedModel = ref('gemini-3-flash-preview')
const apiKey = ref('')
const systemPrompt = ref('Sen profesyonel bir futbol analistisin. Aşağıdaki maç verilerini kullanarak detaylı bir maç analizi yap. İki takımın durumunu, eksiklerini ve istatistiklerini değerlendirerek maçın muhtemel gidişatı hakkında yorum yap. Ve maç skoru tahmini yap.')

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

