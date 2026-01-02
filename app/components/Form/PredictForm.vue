<template>
  <UForm
    :state="state"
    @submit="onSubmit"
  >
    <UFormField
      name="bilyonerMatchLink"
      label="Bilyoner maç linki"
    >
      <UInput
        v-model="state.bilyonerMatchLink"
        placeholder="https://www.bilyoner.com/mac-karti/futbol/2549856/oranlar/1"
        class="w-full"
      />
    </UFormField>
    <UButton
      type="submit"
      class="mt-2"
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
