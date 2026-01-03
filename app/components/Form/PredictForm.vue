<template>
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
      size="lg"
      loading-auto
    >
      Bilyoner verilerini getir
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
const state = reactive({ bilyonerMatchLink: '' })

const emit = defineEmits(['on-submit'])

async function onSubmit() {
  emit('on-submit', state.bilyonerMatchLink)
}
</script>
