<template>
  <div class="space-y-6">
    <!-- Match Info Header -->
    <UCard>
      <div class="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
        <div class="text-center md:text-left">
          <div class="flex items-center justify-center md:justify-start gap-2">
            <div>
              <h3
                v-if="data.homeTeamName && data.awayTeamName"
                class="text-xl font-bold text-gray-900 dark:text-white"
              >
                {{ data.homeTeamName }} - {{ data.awayTeamName }}
              </h3>
              <h3
                v-else
                class="text-xl font-bold text-gray-900 dark:text-white"
              >
                {{ data.matchInfo?.tournament?.name }}
              </h3>
            </div>
          </div>
          <p class="text-gray-500 dark:text-gray-400 flex items-center justify-center md:justify-start gap-1 mt-1">
            <UIcon
              name="i-heroicons-map-pin"
              class="w-4 h-4"
            />
            {{ data.matchInfo?.venue }}
          </p>
        </div>

        <div class="flex flex-col items-center gap-2 justify-self-center">
          <UBadge
            size="lg"
            :color="data.eventStatusId === 'PLAYING' ? 'primary' : 'secondary'"
          >
            {{ data.eventStatus }}
          </UBadge>
          <span class="text-sm font-medium">{{ data.currentPeriod }}</span>
          <span class="text-xs text-gray-500 flex items-center gap-1">
            <UIcon
              name="i-heroicons-clock"
              class="w-3 h-3"
            />
            {{ data.matchInfo?.matchDate }}
          </span>
        </div>

        <div class="text-right hidden md:block justify-self-end">
          <p
            v-if="data.matchInfo?.referee"
            class="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-end gap-1"
          >
            <UIcon
              name="i-heroicons-flag"
              class="w-4 h-4"
            />
            Hakem: <span class="font-medium">{{ data.matchInfo.referee }}</span>
          </p>
          <p
            v-if="data.matchInfo?.tvInfo"
            class="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-end gap-1"
          >
            <UIcon
              name="i-heroicons-tv"
              class="w-4 h-4"
            />
            Yayın: <span class="font-medium">{{ data.matchInfo.tvInfo }}</span>
          </p>
        </div>
      </div>
    </UCard>

    <!-- Lineups -->
    <div
      v-if="data.lineups"
      class="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <!-- Home Team -->
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h4 class="text-lg font-bold text-primary-500">
              {{ data.homeTeamName || 'Ev Sahibi' }}
            </h4>
            <span class="text-sm text-gray-500">Teknik Direktör: {{ data.lineups.home.manager }}</span>
          </div>
        </template>

        <div
          v-if="data.lineups.home.lineUp.length > 0"
          class="space-y-4"
        >
          <div>
            <h5 class="font-semibold mb-2 text-sm text-gray-500 uppercase">
              İlk 11
            </h5>
            <ul class="space-y-1">
              <li
                v-for="player in data.lineups.home.lineUp"
                :key="player.shirtNumber"
                class="flex items-center justify-between text-sm p-1 hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
              >
                <div class="flex items-center gap-2">
                  <UBadge
                    variant="subtle"
                    size="xs"
                    class="w-6 text-center justify-center"
                  >
                    {{ player.shirtNumber }}
                  </UBadge>
                  <span class="font-medium">{{ player.name }}</span>
                </div>
                <span class="text-xs text-gray-400">{{ player.position }}</span>
              </li>
            </ul>
          </div>

          <USeparator />

          <div>
            <h5 class="font-semibold mb-2 text-sm text-gray-500 uppercase">
              Yedekler
            </h5>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="player in data.lineups.home.subs"
                :key="player.shirtNumber"
                class="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-300"
              >
                {{ player.name }} ({{ player.shirtNumber }})
              </span>
            </div>
          </div>
        </div>

        <UCard v-else>
          <div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
              <UIcon
                name="i-heroicons-user-group"
                class="w-8 h-8 text-green-400"
              />
            </div>
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">
              Kadro Bilgileri
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Henüz açıklanmadı
            </p>
          </div>
        </UCard>
      </UCard>

      <!-- Away Team -->
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h4 class="text-lg font-bold text-blue-500">
              {{ data.awayTeamName || 'Deplasman' }}
            </h4>
            <span class="text-sm text-gray-500">Teknik Direktör: {{ data.lineups.away.manager }}</span>
          </div>
        </template>

        <div
          v-if="data.lineups.away.lineUp.length > 0"
          class="space-y-4"
        >
          <div>
            <h5 class="font-semibold mb-2 text-sm text-gray-500 uppercase">
              İlk 11
            </h5>
            <ul class="space-y-1">
              <li
                v-for="player in data.lineups.away.lineUp"
                :key="player.shirtNumber"
                class="flex items-center justify-between text-sm p-1 hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
              >
                <div class="flex items-center gap-2">
                  <UBadge
                    variant="subtle"
                    color="info"
                    size="xs"
                    class="w-6 text-center justify-center"
                  >
                    {{ player.shirtNumber }}
                  </UBadge>
                  <span class="font-medium">{{ player.name }}</span>
                </div>
                <span class="text-xs text-gray-400">{{ player.position }}</span>
              </li>
            </ul>
          </div>

          <USeparator />

          <div>
            <h5 class="font-semibold mb-2 text-sm text-gray-500 uppercase">
              Yedekler
            </h5>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="player in data.lineups.away.subs"
                :key="player.shirtNumber"
                class="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-300"
              >
                {{ player.name }} ({{ player.shirtNumber }})
              </span>
            </div>
          </div>
        </div>

        <UCard v-else>
          <div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
              <UIcon
                name="i-heroicons-user-group"
                class="w-8 h-8 text-blue-400"
              />
            </div>
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">
              Kadro Bilgileri
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Henüz açıklanmadı
            </p>
          </div>
        </UCard>
      </UCard>
    </div>

    <!-- Match Timeline -->
    <UCard v-if="data.feeds && data.feeds.length > 0">
      <template #header>
        <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <UIcon
            name="i-heroicons-clock"
            class="w-5 h-5 text-gray-500"
          />
          Maç Akışı
        </h3>
      </template>

      <div class="space-y-4">
        <div
          v-for="(feed, index) in data.feeds"
          :key="index"
          class="relative"
        >
          <!-- Status Feed (Half Time, Full Time etc.) -->
          <div
            v-if="feed.feedType === 'STATUS'"
            class="flex items-center justify-center my-4"
          >
            <UBadge
              variant="subtle"
              color="neutral"
              class="px-4 py-1"
            >
              {{ feed.display }}
            </UBadge>
          </div>

          <!-- Event Feed -->
          <div
            v-else
            class="flex items-center gap-4"
            :class="feed.side === 'AWAY' ? 'flex-row-reverse text-right' : 'flex-row text-left'"
          >
            <!-- Time -->
            <div class="w-12 text-center font-mono text-sm font-bold text-gray-500 shrink-0">
              {{ feed.minuteDisplay }}
            </div>

            <!-- Icon -->
            <div class="shrink-0">
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center border-2"
                :class="{
                  'bg-yellow-100 border-yellow-200 text-yellow-600': feed.cardType === 'YELLOW_CARD',
                  'bg-red-100 border-red-200 text-red-600': feed.cardType === 'RED_CARD',
                  'bg-green-100 border-green-200 text-green-600': feed.feedType === 'GOAL',
                  'bg-blue-100 border-blue-200 text-blue-600': feed.feedType === 'SUBS'
                }"
              >
                <UIcon
                  v-if="feed.feedType === 'GOAL'"
                  name="i-heroicons-star"
                  class="w-5 h-5"
                />
                <UIcon
                  v-else-if="feed.feedType === 'CARD'"
                  name="i-heroicons-document"
                  class="w-5 h-5"
                />
                <UIcon
                  v-else-if="feed.feedType === 'SUBS'"
                  name="i-heroicons-arrow-path"
                  class="w-5 h-5"
                />
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1">
              <!-- Goal -->
              <div v-if="feed.feedType === 'GOAL'">
                <div class="font-bold">
                  {{ feed.scorerName }}
                </div>
                <div
                  v-if="feed.assistPlayerName"
                  class="text-xs text-gray-500"
                >
                  Asist: {{ feed.assistPlayerName }}
                </div>
                <div class="text-sm font-bold text-primary-600">
                  {{ feed.homeScore }} - {{ feed.awayScore }}
                </div>
              </div>

              <!-- Card -->
              <div v-if="feed.feedType === 'CARD'">
                <div class="font-medium">
                  {{ feed.playerName }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ feed.cardType === 'YELLOW_CARD' ? 'Sarı Kart' : 'Kırmızı Kart' }}
                </div>
              </div>

              <!-- Substitution -->
              <div v-if="feed.feedType === 'SUBS'">
                <div
                  class="flex items-center gap-1 text-sm"
                  :class="feed.side === 'AWAY' ? 'justify-end' : 'justify-start'"
                >
                  <span class="text-green-600 font-medium">Giren:</span> {{ feed.playerOn }}
                </div>
                <div
                  class="flex items-center gap-1 text-sm text-gray-500"
                  :class="feed.side === 'AWAY' ? 'justify-end' : 'justify-start'"
                >
                  <span class="text-red-500">Çıkan:</span> {{ feed.playerOff }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
interface Player {
  name: string
  shirtNumber: number
  position: string
}

interface TeamLineup {
  manager: string
  formation: string
  lineUp: Player[]
  subs: Player[]
}

interface MatchFeed {
  feedType: 'STATUS' | 'CARD' | 'GOAL' | 'SUBS'
  display?: string
  cardType?: 'YELLOW_CARD' | 'RED_CARD'
  playerName?: string
  minute?: number
  minuteDisplay?: string
  side?: 'HOME' | 'AWAY'
  period?: string
  goalType?: 'GOAL'
  scorerName?: string
  assistPlayerName?: string
  homeScore?: number
  awayScore?: number
  playerOn?: string
  playerOff?: string
}

interface MatchData {
  status: {
    code: number
    message: string
  }
  feeds: MatchFeed[]
  lineups: {
    home: TeamLineup
    away: TeamLineup
    hasFormations: boolean
  }
  matchInfo: {
    tournament: {
      name: string
    }
    matchDate: string
    referee: string
    tvInfo: string
    venue: string
    neutral: boolean
  }
  sportId: string
  eventStatus: string
  eventStatusId: string
  currentPeriod: string
  currentPeriodId: string
  homeTeamName?: string
  awayTeamName?: string
}

defineProps<{
  data: MatchData
}>()
</script>
