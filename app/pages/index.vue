<template>
  <div>
    <UContainer>
      <h1
        class="font-bold text-3xl mb-2 block mt-12"
      >
        Bilyapay
      </h1>

      <h2
        class="font-normal text-xl block mb-12"
      >
        Bilyoner verileri ile yapay zeka futbol maçı tahmini
      </h2>

      <FormPredictForm @on-submit="handlePredictFormSubmit" />

      <UTabs
        v-if="matchDetails"
        class="mt-12"
        :items="tabs"
      >
        <template #ai-analysis="{ item }">
          <MatchAiAnalysis :data="item.content" />
        </template>
        <template #match-details="{ item }">
          <MatchDetails :data="item.content" />
        </template>
        <template #match-statistics="{ item }">
          <MatchStatistics :data="item.content" />
        </template>
        <template #missing-players="{ item }">
          <MatchMissingPlayers :data="item.content" />
        </template>
        <template #match-comments="{ item }">
          <MatchComments :data="item.content" />
        </template>
      </UTabs>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const { fetchMatchDetails, fetchMatchStatistics, fetchMissingPlayersOfMatch, fetchMatchComments } = useBilyonerApi()

const state = reactive<{ matchId: number | null }>({
  matchId: null
})

const tabs = ref([
  {
    label: 'AI Analizi',
    icon: 'i-heroicons-sparkles',
    slot: 'ai-analysis'
  },
  {
    label: 'Maç detayları',
    icon: 'i-heroicons-information-circle',
    content: 'Maç detayları' as any,
    slot: 'match-details'
  },
  {
    label: 'Maç istatistikleri',
    icon: 'i-heroicons-chart-bar',
    content: 'Maç istatistikleri' as any,
    slot: 'match-statistics'
  },
  {
    label: 'Eksik oyuncular',
    icon: 'i-heroicons-user-minus',
    content: 'Eksik oyuncular' as any,
    slot: 'missing-players'
  },
  {
    label: 'Maç yorumları',
    icon: 'i-heroicons-chat-bubble-bottom-center-text',
    content: 'Maç yorumları' as any,
    slot: 'match-comments'
  }
])

const { execute: executeMatchDetails, data: matchDetails } = await useAsyncData(
  `matchDetails:${state.matchId}`,
  () => state.matchId ? fetchMatchDetails(state.matchId) : Promise.resolve(null),
  {
    immediate: false,
    watch: [() => state.matchId]
  }
)

const { execute: executeMatchStatistics, data: matchStatistics } = await useAsyncData(
  `matchStatistics:${state.matchId}`,
  () => state.matchId ? fetchMatchStatistics(state.matchId) : Promise.resolve(null),
  {
    immediate: false,
    watch: [() => state.matchId]
  }
)

const { execute: executeMissingPlayersOfMatch, data: missingPlayersOfMatch } = await useAsyncData(
  `missingPlayersOfMatch:${state.matchId}`,
  () => state.matchId ? fetchMissingPlayersOfMatch(state.matchId) : Promise.resolve(null),
  {
    immediate: false,
    watch: [() => state.matchId]
  }
)

const { execute: executeMatchComments, data: matchComments } = await useAsyncData(
  `matchComments:${state.matchId}`,
  () => state.matchId ? fetchMatchComments(state.matchId) : Promise.resolve(null),
  {
    immediate: false,
    watch: [() => state.matchId]
  }
)

const handlePredictFormSubmit = async (bilyonerMatchLink: string) => {
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
    const stats = matchStatistics.value as any
    const homeTeamName = stats.oddStatistics?.generalStats?.homeTeamName
    const awayTeamName = stats.oddStatistics?.generalStats?.awayTeamName

    if (homeTeamName) {
      ;(matchDetails.value as any).homeTeamName = homeTeamName
    }
    if (awayTeamName) {
      ;(matchDetails.value as any).awayTeamName = awayTeamName
    }
  }

  const matchData = {
    details: matchDetails.value,
    statistics: matchStatistics.value,
    missingPlayers: missingPlayersOfMatch.value,
    comments: matchComments.value
  }

  if (tabs.value[0]) tabs.value[0].content = matchData
  if (matchDetails.value && tabs.value[1]) tabs.value[1].content = matchDetails.value
  if (matchStatistics.value && tabs.value[2]) tabs.value[2].content = matchStatistics.value
  if (missingPlayersOfMatch.value && tabs.value[3]) tabs.value[3].content = missingPlayersOfMatch.value
  if (matchComments.value && tabs.value[4]) tabs.value[4].content = matchComments.value
}
</script>
