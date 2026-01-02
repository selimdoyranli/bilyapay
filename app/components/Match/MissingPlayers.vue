<template>
  <div
    v-if="data?.homeTeam"
    class="grid grid-cols-1 md:grid-cols-2 gap-4"
  >
    <!-- Home Team -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-center font-bold text-lg text-primary">
          {{ data.homeTeam.name }}
        </div>
      </template>

      <div class="p-4 space-y-4">
        <div
          v-if="data.homeTeam.players.length === 0"
          class="text-center text-gray-500 text-sm"
        >
          Eksik oyuncu bulunmamaktadır.
        </div>
        <div
          v-for="(player, index) in data.homeTeam.players"
          :key="index"
          class="flex flex-col gap-1 border-b border-gray-100 dark:border-gray-800 last:border-0 pb-3 last:pb-0"
        >
          <div class="flex justify-between items-start">
            <span class="font-semibold text-sm">{{ player.name }}</span>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400">{{ player.desc }}</span>
          <div
            v-if="player.returnDate"
            class="text-xs text-gray-400"
          >
            Dönüş: {{ player.returnDate }}
          </div>
        </div>
      </div>
    </UCard>

    <!-- Away Team -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-center font-bold text-lg text-primary">
          {{ data.awayTeam.name }}
        </div>
      </template>

      <div class="p-4 space-y-4">
        <div
          v-if="data.awayTeam.players.length === 0"
          class="text-center text-gray-500 text-sm"
        >
          Eksik oyuncu bulunmamaktadır.
        </div>
        <div
          v-for="(player, index) in data.awayTeam.players"
          :key="index"
          class="flex flex-col gap-1 border-b border-gray-100 dark:border-gray-800 last:border-0 pb-3 last:pb-0"
        >
          <div class="flex justify-between items-start">
            <span class="font-semibold text-sm">{{ player.name }}</span>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400">{{ player.desc }}</span>
          <div
            v-if="player.returnDate"
            class="text-xs text-gray-400"
          >
            Dönüş: {{ player.returnDate }}
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
interface Player {
  name: string
  missingType: string
  desc: string
  position: string | null
  positionNumber: string | null
  totalPlayed: string
  lineUp: string
  scored: string
  returnDate: string | null
}

interface TeamMissingPlayers {
  name: string
  players: Player[]
}

interface MissingPlayersData {
  status: { code: number, message: string }
  homeTeam: TeamMissingPlayers
  awayTeam: TeamMissingPlayers
}

defineProps<{
  data: MissingPlayersData
}>()
</script>
