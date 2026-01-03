<template>
  <div
    v-if="data"
    class="space-y-6"
  >
    <!-- Top Goal Scorers -->
    <div
      v-if="data.topGoalScorers"
      class="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <UCard>
        <template #header>
          <div class="font-bold text-primary-500">
            {{ data.topGoalScorers.homeTopGoalScorers.title }}
          </div>
        </template>
        <div class="space-y-2">
          <div
            v-for="scorer in data.topGoalScorers.homeTopGoalScorers.topScorers || []"
            :key="scorer.name"
            class="flex justify-between items-center"
          >
            <span>{{ scorer.name }}</span>
            <UBadge variant="subtle">
              {{ scorer.goalsScored }}
            </UBadge>
          </div>
          <div
            v-if="!data.topGoalScorers.homeTopGoalScorers.topScorers || data.topGoalScorers.homeTopGoalScorers.topScorers.length === 0"
            class="text-gray-500 text-sm italic"
          >
            Veri yok
          </div>
        </div>
      </UCard>
      <UCard>
        <template #header>
          <div class="font-bold text-blue-500">
            {{ data.topGoalScorers.awayTopGoalScorers.title }}
          </div>
        </template>
        <div class="space-y-2">
          <div
            v-for="scorer in data.topGoalScorers.awayTopGoalScorers.topScorers || []"
            :key="scorer.name"
            class="flex justify-between items-center"
          >
            <span>{{ scorer.name }}</span>
            <UBadge
              variant="subtle"
              color="info"
            >
              {{ scorer.goalsScored }}
            </UBadge>
          </div>
          <div
            v-if="!data.topGoalScorers.awayTopGoalScorers.topScorers || data.topGoalScorers.awayTopGoalScorers.topScorers.length === 0"
            class="text-gray-500 text-sm italic"
          >
            Veri yok
          </div>
        </div>
      </UCard>
    </div>

    <!-- Odd Statistics -->
    <UCard v-if="data.oddStatistics">
      <template #header>
        <h3 class="font-bold text-lg">
          İddaa İstatistikleri
        </h3>
      </template>

      <UTabs :items="statTabs">
        <template #item="{ item }">
          <div class="space-y-6 mt-4">
            <!-- Dynamic Sections based on available stats -->
            <!-- Match Result -->
            <div
              v-if="item.data.matchResultStats"
              class="space-y-2"
            >
              <h4 class="font-semibold text-sm text-gray-600 dark:text-gray-400 border-b pb-1">
                {{ item.data.matchResultStats.betTypeName }}
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <div class="font-medium text-primary-500">
                    {{ item.data.matchResultStats.betTypeWonTitle }}
                  </div>
                  <div class="text-lg font-bold">
                    {{ item.data.matchResultStats.homeWon || 'Veri yok' }}
                  </div>
                  <UProgress
                    v-if="item.data.matchResultStats.homeWon"
                    :model-value="parseFloat(String(item.data.matchResultStats.homeWonPercentage)) || 0"
                    color="primary"
                  />
                  <div
                    v-else
                    class="text-gray-500 text-sm italic"
                  >
                    Veri yok
                  </div>
                </div>
                <div>
                  <div class="font-medium text-gray-500">
                    {{ item.data.matchResultStats.betTypeDrawTitle }}
                  </div>
                  <div class="text-lg font-bold">
                    {{ item.data.matchResultStats.homeDraw || 'Veri yok' }}
                  </div>
                  <UProgress
                    v-if="item.data.matchResultStats.homeDraw"
                    :model-value="parseFloat(String(item.data.matchResultStats.homeDrawPercentage)) || 0"
                    color="neutral"
                  />
                  <div
                    v-else
                    class="text-gray-500 text-sm italic"
                  >
                    Veri yok
                  </div>
                </div>
                <div>
                  <div class="font-medium text-blue-500">
                    {{ item.data.matchResultStats.betTypeLostTitle }}
                  </div>
                  <div class="text-lg font-bold">
                    {{ item.data.matchResultStats.homeLost || item.data.matchResultStats.awayLost || 'Veri yok' }}
                  </div>
                  <UProgress
                    v-if="item.data.matchResultStats.homeLost || item.data.matchResultStats.awayLost"
                    :model-value="parseFloat(String(item.data.matchResultStats.homeLostPercentage || item.data.matchResultStats.awayLostPercentage)) || 0"
                    color="info"
                  />
                  <div
                    v-else
                    class="text-gray-500 text-sm italic"
                  >
                    Veri yok
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              class="text-gray-500 text-sm italic"
            >
              Maç sonucu istatistikleri için veri yok
            </div>

            <!-- KG (Both Teams to Score) -->
            <div
              v-if="item.data.bothTeamsToScoreStats"
              class="space-y-2"
            >
              <h4 class="font-semibold text-sm text-gray-600 dark:text-gray-400 border-b pb-1">
                {{ item.data.bothTeamsToScoreStats.betTypeName }}
              </h4>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>{{ item.data.bothTeamsToScoreStats.betTypeYesTitle }} (Ev)</span>
                    <span class="font-bold">{{ item.data.bothTeamsToScoreStats.homeBothTeamsToScoreYesPercentage ? item.data.bothTeamsToScoreStats.homeBothTeamsToScoreYesPercentage + '%' : 'Veri yok' }}</span>
                  </div>
                  <UProgress
                    v-if="item.data.bothTeamsToScoreStats.homeBothTeamsToScoreYesPercentage"
                    :model-value="parseFloat(String(item.data.bothTeamsToScoreStats.homeBothTeamsToScoreYesPercentage)) || 0"
                    color="success"
                  />
                  <div
                    v-else
                    class="text-gray-500 text-sm italic"
                  >
                    Veri yok
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>{{ item.data.bothTeamsToScoreStats.betTypeNoTitle }} (Ev)</span>
                    <span class="font-bold">{{ item.data.bothTeamsToScoreStats.homeBothTeamsToScoreNoPercentage ? item.data.bothTeamsToScoreStats.homeBothTeamsToScoreNoPercentage + '%' : 'Veri yok' }}</span>
                  </div>
                  <UProgress
                    v-if="item.data.bothTeamsToScoreStats.homeBothTeamsToScoreNoPercentage"
                    :model-value="parseFloat(String(item.data.bothTeamsToScoreStats.homeBothTeamsToScoreNoPercentage)) || 0"
                    color="error"
                  />
                  <div
                    v-else
                    class="text-gray-500 text-sm italic"
                  >
                    Veri yok
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              class="text-gray-500 text-sm italic"
            >
              Karışık gol istatistikleri için veri yok
            </div>

            <!-- Total Goals -->
            <div
              v-if="item.data.totalGoalStats"
              class="space-y-2"
            >
              <h4 class="font-semibold text-sm text-gray-600 dark:text-gray-400 border-b pb-1">
                {{ item.data.totalGoalStats.betTypeName }}
              </h4>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
                <div class="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                  <div class="font-medium">
                    0-1 Gol
                  </div>
                  <div class="font-bold text-lg">
                    {{ item.data.totalGoalStats.homeTotalGoal0_1 || 'Veri yok' }}
                  </div>
                  <div class="text-gray-400">
                    {{ item.data.totalGoalStats.homeTotalGoal0_1Percentage ? '%' + item.data.totalGoalStats.homeTotalGoal0_1Percentage : 'Veri yok' }}
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                  <div class="font-medium">
                    2-3 Gol
                  </div>
                  <div class="font-bold text-lg">
                    {{ item.data.totalGoalStats.homeTotalGoal2_3 || 'Veri yok' }}
                  </div>
                  <div class="text-gray-400">
                    {{ item.data.totalGoalStats.homeTotalGoal2_3Percentage ? '%' + item.data.totalGoalStats.homeTotalGoal2_3Percentage : 'Veri yok' }}
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                  <div class="font-medium">
                    4-6 Gol
                  </div>
                  <div class="font-bold text-lg">
                    {{ item.data.totalGoalStats.homeTotalGoal4_6 || 'Veri yok' }}
                  </div>
                  <div class="text-gray-400">
                    {{ item.data.totalGoalStats.homeTotalGoal4_6Percentage ? '%' + item.data.totalGoalStats.homeTotalGoal4_6Percentage : 'Veri yok' }}
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                  <div class="font-medium">
                    7+ Gol
                  </div>
                  <div class="font-bold text-lg">
                    {{ item.data.totalGoalStats.homeTotalGoal7P || 'Veri yok' }}
                  </div>
                  <div class="text-gray-400">
                    {{ item.data.totalGoalStats.homeTotalGoal7PPercentage ? '%' + item.data.totalGoalStats.homeTotalGoal7PPercentage : 'Veri yok' }}
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              class="text-gray-500 text-sm italic"
            >
              Toplam gol istatistikleri için veri yok
            </div>

            <!-- Under/Over 2.5 -->
            <div
              v-if="item.data.underOverStats"
              class="space-y-2"
            >
              <h4 class="font-semibold text-sm text-gray-600 dark:text-gray-400 border-b pb-1">
                {{ item.data.underOverStats.betTypeName }}
              </h4>
              <div class="flex flex-col gap-2">
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>{{ item.data.underOverStats.betTypeOverTitle }} (Ev)</span>
                    <span class="font-bold">{{ item.data.underOverStats.home25OverPercentage ? '%' + item.data.underOverStats.home25OverPercentage : 'Veri yok' }}</span>
                  </div>
                  <UProgress
                    v-if="item.data.underOverStats.home25OverPercentage"
                    :model-value="parseFloat(String(item.data.underOverStats.home25OverPercentage)) || 0"
                    color="warning"
                  />
                  <div
                    v-else
                    class="text-gray-500 text-sm italic"
                  >
                    Veri yok
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>{{ item.data.underOverStats.betTypeUnderTitle }} (Ev)</span>
                    <span class="font-bold">{{ item.data.underOverStats.home25UnderPercentage ? '%' + item.data.underOverStats.home25UnderPercentage : 'Veri yok' }}</span>
                  </div>
                  <UProgress
                    v-if="item.data.underOverStats.home25UnderPercentage"
                    :model-value="parseFloat(String(item.data.underOverStats.home25UnderPercentage)) || 0"
                    color="secondary"
                  />
                  <div
                    v-else
                    class="text-gray-500 text-sm italic"
                  >
                    Veri yok
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              class="text-gray-500 text-sm italic"
            >
              Alt/üst istatistikleri için veri yok
            </div>
          </div>
        </template>
      </UTabs>
    </UCard>

    <!-- Recent Forms Comparison -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Home Form -->
      <UCard v-if="data.homeTeamForms">
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="font-bold truncate">
              {{ data.homeTeamForms.title }}
            </h3>
            <div class="flex gap-1">
              <UBadge
                v-for="(result, i) in data.homeTeamForms.recentForms"
                :key="i"
                :color="getResultColor(result)"
                size="xs"
                variant="solid"
                class="w-6 h-6 flex items-center justify-center rounded-full p-0"
              >
                {{ result?.[0] }}
              </UBadge>
            </div>
          </div>
        </template>
        <div class="space-y-3 h-80 overflow-y-auto pr-2">
          <div
            v-for="(match, idx) in data.homeTeamForms.teamForm"
            :key="idx"
            class="text-sm border-b dark:border-gray-700 last:border-0 pb-2 last:pb-0"
          >
            <div class="flex justify-between text-xs text-gray-500 mb-1">
              <span>{{ match.date }}</span>
              <span>{{ match.tournamentShortName }}</span>
            </div>
            <div class="flex justify-between items-center">
              <div
                class="flex-1 text-right"
                :class="{ 'font-bold': match.homeTeamName === data.oddStatistics?.generalStats?.homeTeamName }"
              >
                {{ match.homeTeamName }}
              </div>
              <div class="px-3 font-mono font-bold bg-gray-100 dark:bg-gray-800 rounded mx-2">
                {{ match.score }}
              </div>
              <div
                class="flex-1 text-left"
                :class="{ 'font-bold': match.awayTeamName === data.oddStatistics?.generalStats?.homeTeamName }"
              >
                {{ match.awayTeamName }}
              </div>
            </div>
            <div class="text-center mt-1">
              <UBadge
                :color="getResultColor(match.markedTeamResult)"
                variant="subtle"
                size="xs"
              >
                {{ match.markedTeamResult }}
              </UBadge>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Away Form -->
      <UCard v-if="data.awayTeamForms">
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="font-bold truncate">
              {{ data.awayTeamForms.title }}
            </h3>
            <div class="flex gap-1">
              <UBadge
                v-for="(result, i) in data.awayTeamForms.recentForms"
                :key="i"
                :color="getResultColor(result)"
                size="xs"
                variant="solid"
                class="w-6 h-6 flex items-center justify-center rounded-full p-0"
              >
                {{ result?.[0] }}
              </UBadge>
            </div>
          </div>
        </template>
        <div class="space-y-3 h-80 overflow-y-auto pr-2">
          <div
            v-for="(match, idx) in data.awayTeamForms.teamForm"
            :key="idx"
            class="text-sm border-b dark:border-gray-700 last:border-0 pb-2 last:pb-0"
          >
            <div class="flex justify-between text-xs text-gray-500 mb-1">
              <span>{{ match.date }}</span>
              <span>{{ match.tournamentShortName }}</span>
            </div>
            <div class="flex justify-between items-center">
              <div
                class="flex-1 text-right"
                :class="{ 'font-bold': match.homeTeamName === data.oddStatistics?.generalStats?.awayTeamName }"
              >
                {{ match.homeTeamName }}
              </div>
              <div class="px-3 font-mono font-bold bg-gray-100 dark:bg-gray-800 rounded mx-2">
                {{ match.score }}
              </div>
              <div
                class="flex-1 text-left"
                :class="{ 'font-bold': match.awayTeamName === data.oddStatistics?.generalStats?.awayTeamName }"
              >
                {{ match.awayTeamName }}
              </div>
            </div>
            <div class="text-center mt-1">
              <UBadge
                :color="getResultColor(match.markedTeamResult)"
                variant="subtle"
                size="xs"
              >
                {{ match.markedTeamResult }}
              </UBadge>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Matches Between -->
    <UCard v-if="data.matchesBetween">
      <template #header>
        <h3 class="font-bold">
          {{ data.matchesBetween.title }}
        </h3>
      </template>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th class="px-4 py-2">
                Tarih
              </th>
              <th class="px-4 py-2">
                Turnuva
              </th>
              <th class="px-4 py-2 text-right">
                Ev Sahibi
              </th>
              <th class="px-4 py-2 text-center">
                Skor
              </th>
              <th class="px-4 py-2">
                Deplasman
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(match, idx) in data.matchesBetween.teamForm"
              :key="idx"
              class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td class="px-4 py-2">
                {{ match.date }}
              </td>
              <td class="px-4 py-2">
                {{ match.tournamentShortName }}
              </td>
              <td class="px-4 py-2 text-right font-medium">
                {{ match.homeTeamName }}
              </td>
              <td class="px-4 py-2 text-center font-bold bg-gray-100 dark:bg-gray-900 rounded">
                {{ match.score }}
              </td>
              <td class="px-4 py-2 font-medium">
                {{ match.awayTeamName }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Scorer {
  name: string
  goalsScored: number | string
}

interface TopScorerSection {
  title: string
  topScorers: Scorer[]
}

interface MatchResultStats {
  betTypeName: string
  betTypeWonTitle: string
  homeWon: string | number
  homeWonPercentage: number
  betTypeDrawTitle: string
  homeDraw: string | number
  homeDrawPercentage: number
  betTypeLostTitle: string
  homeLost?: string | number
  homeLostPercentage?: number
  awayLost?: string | number
  awayLostPercentage?: number
}

interface BothTeamsToScoreStats {
  betTypeName: string
  betTypeYesTitle: string
  homeBothTeamsToScoreYesPercentage: number
  betTypeNoTitle: string
  homeBothTeamsToScoreNoPercentage: number
}

interface TotalGoalStats {
  betTypeName: string
  homeTotalGoal0_1: string | number
  homeTotalGoal0_1Percentage: number
  homeTotalGoal2_3: string | number
  homeTotalGoal2_3Percentage: number
  homeTotalGoal4_6: string | number
  homeTotalGoal4_6Percentage: number
  homeTotalGoal7P: string | number
  homeTotalGoal7PPercentage: number
}

interface UnderOverStats {
  betTypeName: string
  betTypeOverTitle: string
  home25OverPercentage: number
  betTypeUnderTitle: string
  home25UnderPercentage: number
}

interface OddStatsDetail {
  matchResultStats?: MatchResultStats
  bothTeamsToScoreStats?: BothTeamsToScoreStats
  totalGoalStats?: TotalGoalStats
  underOverStats?: UnderOverStats
  homeTeamName?: string
  awayTeamName?: string
}

interface OddStatistics {
  generalStats?: OddStatsDetail
  homeAwayStats?: OddStatsDetail
  betweenStats?: OddStatsDetail
}

interface MatchItem {
  date: string
  tournamentShortName: string
  homeTeamName: string
  awayTeamName: string
  score: string
  markedTeamResult: string
}

interface TeamForm {
  title: string
  recentForms: string[]
  teamForm: MatchItem[]
}

interface StatisticsData {
  topGoalScorers?: {
    homeTopGoalScorers: TopScorerSection
    awayTopGoalScorers: TopScorerSection
  }
  oddStatistics?: OddStatistics
  homeTeamForms?: TeamForm
  awayTeamForms?: TeamForm
  matchesBetween?: TeamForm
}

const props = defineProps<{ data: StatisticsData | null }>()

interface StatTab {
  label: string
  slot: string
  data: OddStatsDetail
}

const statTabs = computed(() => {
  const tabs: StatTab[] = []
  if (!props.data) return tabs

  if (props.data.oddStatistics?.generalStats) {
    tabs.push({
      label: 'Genel',
      slot: 'item',
      data: props.data.oddStatistics.generalStats
    })
  }
  if (props.data.oddStatistics?.homeAwayStats) {
    tabs.push({
      label: 'İç/Dış Saha',
      slot: 'item',
      data: props.data.oddStatistics.homeAwayStats
    })
  }
  if (props.data.oddStatistics?.betweenStats) {
    tabs.push({
      label: 'Aralarındaki',
      slot: 'item',
      data: props.data.oddStatistics.betweenStats
    })
  }
  return tabs
})

const getResultColor = (result: string) => {
  switch (result) {
    case 'WON': return 'success'
    case 'LOST': return 'error'
    case 'DRAW': return 'warning'
    default: return 'neutral'
  }
}
</script>
