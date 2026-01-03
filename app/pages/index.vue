<template>
  <div class="flex flex-col min-h-[calc(100vh-var(--ui-footer-height))]">
    <UContainer class="flex-1 w-full pt-[20vh] pb-[20vh] max-w-6xl">
      <FormPredictForm @on-submit="handlePredictFormSubmit" />

      <UTabs
        v-if="matchDetails"
        class="mt-8 sm:mt-12"
        data-id="match-tabs"
        :items="tabItems"
      >
        <template #ai-analysis>
          <MatchAiAnalysis :data="tabContents.aiAnalysis" />
        </template>
        <template #match-details>
          <MatchDetails :data="tabContents.matchDetails" />
        </template>
        <template #match-statistics>
          <MatchStatistics :data="tabContents.matchStatistics" />
        </template>
        <template #missing-players>
          <MatchMissingPlayers :data="tabContents.missingPlayers" />
        </template>
        <template #match-comments>
          <MatchComments :data="tabContents.matchComments" />
        </template>
      </UTabs>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type {
  MatchDetails as MatchDetailsType,
  MatchStatistics as MatchStatisticsType,
  MissingPlayersData,
  MatchCommentsData,
  MatchData
} from '~/types/bilyoner'

const { fetchMatchDetails, fetchMatchStatistics, fetchMissingPlayersOfMatch, fetchMatchComments } = useBilyonerApi()

interface PageState {
  matchId: number | null
}

const state = reactive<PageState>({
  matchId: null
})

const tabItems = [
  {
    label: 'AI Analizi',
    icon: 'i-heroicons-sparkles',
    slot: 'ai-analysis' as const
  },
  {
    label: 'Maç detayları',
    icon: 'i-heroicons-information-circle',
    slot: 'match-details' as const
  },
  {
    label: 'Maç istatistikleri',
    icon: 'i-heroicons-chart-bar',
    slot: 'match-statistics' as const
  },
  {
    label: 'Eksik oyuncular',
    icon: 'i-heroicons-user-minus',
    slot: 'missing-players' as const
  },
  {
    label: 'Maç yorumları',
    icon: 'i-heroicons-chat-bubble-bottom-center-text',
    slot: 'match-comments' as const
  }
]

interface TabContents {
  aiAnalysis: MatchData | null
  matchDetails: MatchDetailsType | null
  matchStatistics: MatchStatisticsType | null
  missingPlayers: MissingPlayersData | null
  matchComments: MatchCommentsData | null
}

const tabContents = reactive<TabContents>({
  aiAnalysis: null,
  matchDetails: null,
  matchStatistics: null,
  missingPlayers: null,
  matchComments: null
})

const { execute: executeMatchDetails, data: matchDetails } = await useAsyncData<MatchDetailsType | null>(
  `matchDetails:${state.matchId}`,
  () => state.matchId ? fetchMatchDetails(state.matchId) : Promise.resolve(null),
  {
    immediate: false,
    watch: [() => state.matchId]
  }
)

const { execute: executeMatchStatistics, data: matchStatistics } = await useAsyncData<MatchStatisticsType | null>(
  `matchStatistics:${state.matchId}`,
  () => state.matchId ? fetchMatchStatistics(state.matchId) : Promise.resolve(null),
  {
    immediate: false,
    watch: [() => state.matchId]
  }
)

const { execute: executeMissingPlayersOfMatch, data: missingPlayersOfMatch } = await useAsyncData<MissingPlayersData | null>(
  `missingPlayersOfMatch:${state.matchId}`,
  () => state.matchId ? fetchMissingPlayersOfMatch(state.matchId) : Promise.resolve(null),
  {
    immediate: false,
    watch: [() => state.matchId]
  }
)

const { execute: executeMatchComments, data: matchComments } = await useAsyncData<MatchCommentsData | null>(
  `matchComments:${state.matchId}`,
  () => state.matchId ? fetchMatchComments(state.matchId) : Promise.resolve(null),
  {
    immediate: false,
    watch: [() => state.matchId]
  }
)

const handlePredictFormSubmit = async (bilyonerMatchLink: string): Promise<void> => {
  const matchId = Number(bilyonerMatchLink.split('/')[5])
  state.matchId = matchId

  // Refresh data since watch option handles reactivity, but we want to ensure fetch
  await Promise.all([
    executeMatchDetails(),
    executeMatchStatistics(),
    executeMissingPlayersOfMatch(),
    executeMatchComments()
  ])

  if (matchDetails.value && matchStatistics.value) {
    const stats = matchStatistics.value
    const homeTeamName = stats.oddStatistics?.generalStats?.homeTeamName
    const awayTeamName = stats.oddStatistics?.generalStats?.awayTeamName

    if (homeTeamName) {
      matchDetails.value.homeTeamName = homeTeamName
    }
    if (awayTeamName) {
      matchDetails.value.awayTeamName = awayTeamName
    }
  }

  const matchData: MatchData = {
    details: matchDetails.value ?? null,
    statistics: matchStatistics.value ?? null,
    missingPlayers: missingPlayersOfMatch.value ?? null,
    comments: matchComments.value ?? null
  }

  tabContents.aiAnalysis = matchData
  tabContents.matchDetails = matchDetails.value ?? null
  tabContents.matchStatistics = matchStatistics.value ?? null
  tabContents.missingPlayers = missingPlayersOfMatch.value ?? null
  tabContents.matchComments = matchComments.value ?? null

  nextTick(() => {
    const matchTabs = document.querySelector('[data-id="match-tabs"]')
    if (matchTabs) {
      matchTabs.scrollIntoView({ behavior: 'smooth' })
    }
  })
}
</script>
