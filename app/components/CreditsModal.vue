<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
</script>

<template>
  <UModal v-model:open="isOpen">
    <template #content>
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Credits
          </h3>
          <UButton
            icon="i-heroicons-x-mark-20-solid"
            color="neutral"
            variant="ghost"
            size="sm"
            @click="isOpen = false"
          />
        </div>

        <div class="space-y-4">
          <div class="text-sm text-gray-600 dark:text-gray-300">
            <p class="mb-2">
              <strong>Bilyapay</strong> - Bilyoner verileri ile yapay zeka futbol maçı tahmini
            </p>
            <p class="mb-2">
              Bu web sitesi bilyoner servisleri üzerinden halka açık verileri kullanır,
              bilyoner üzerinde anormal yük sağlanmaz, elde edilen veriler saklanmaz ya da satılmaz.
              Alınan veriler görselleştirir,
              bilyoner üzerinden alınan veriler bu websitesi üzerinde
              yapay zeka modellerine iletilip analiz ve tahmin sağlanır.
              Yapay zeka modellerine ait çıktıların yanıltıcı olabileceğini unutmayın.
              Analiz ve tahminler yatırım tavsiyesi değildir.
            </p>
            <p class="mb-2">
              iletişim: selimdoyranli@gmail.com
            </p>
          </div>
        </div>

        <div class="flex justify-end mt-6">
          <UButton
            color="primary"
            variant="outline"
            @click="isOpen = false"
          >
            Kapat
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
