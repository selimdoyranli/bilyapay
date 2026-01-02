<template>
  <div class="space-y-4 max-h-[600px] overflow-y-auto pr-2">
    <UCard
      v-for="(comment, index) in comments"
      :key="index"
      class="bg-none border-2 border-gray-100 dark:border-gray-900"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <UAvatar
              :alt="comment.authorName"
              size="sm"
              class="bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100"
            />
            <div class="flex flex-col">
              <span class="font-semibold text-sm">{{ comment.authorName }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(comment.createdDate) }}</span>
            </div>
          </div>
          <UBadge
            v-if="comment.marketInfo"
            color="primary"
            variant="soft"
            class="hidden sm:flex"
          >
            {{ comment.marketInfo.label }} @ {{ comment.marketInfo.currentOddsWeb }}
          </UBadge>
        </div>
      </template>

      <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
        {{ comment.comment }}
      </p>

      <template
        v-if="comment.marketInfo"
        #footer
      >
        <div class="flex flex-wrap items-center gap-2 text-xs">
          <span class="font-medium text-gray-500">Tahmin:</span>
          <UBadge
            color="neutral"
            variant="outline"
          >
            {{ comment.marketInfo.marketName }}
          </UBadge>
          <UIcon
            name="i-heroicons-arrow-right-20-solid"
            class="text-gray-400 w-3 h-3"
          />
          <UBadge
            color="neutral"
            variant="solid"
            class="font-bold"
          >
            {{ comment.marketInfo.marketOutcomeName }}
          </UBadge>
          <span class="ml-auto font-bold text-primary-600 dark:text-primary-400">
            Oran: {{ comment.marketInfo.currentOddsWeb }}
          </span>
        </div>
      </template>
    </UCard>

    <div
      v-if="comments.length === 0"
      class="text-center text-gray-500 py-8"
    >
      <UIcon
        name="i-heroicons-chat-bubble-left-right"
        class="w-8 h-8 mb-2 mx-auto opacity-50"
      />
      <p>Bu maç için henüz yorum yapılmamış.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface MarketInfo {
  label: string
  marketName: string
  marketOutcomeName: string
  currentOddsWeb: number
  marketId: number
}

interface Comment {
  authorName: string
  authorId: number
  createdDate: string
  comment: string
  marketInfo?: MarketInfo
}

interface Props {
  data: {
    data: Comment[]
  } | null
}

const props = defineProps<Props>()

const comments = computed(() => props.data?.data || [])

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  } catch (e) {
    console.error(e)

    return dateString
  }
}
</script>
