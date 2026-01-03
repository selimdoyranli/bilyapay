export const useBilyonerApi = () => {
  const fetchMatchDetails = async (matchId: number) => {
    return await $fetch(`/api/bilyoner/match-detail?matchId=${matchId}`)
  }

  const fetchMatchStatistics = async (matchId: number) => {
    return await $fetch(`/api/bilyoner/match-statistics?matchId=${matchId}`)
  }

  const fetchMissingPlayersOfMatch = async (matchId: number) => {
    return await $fetch(`/api/bilyoner/match-missing-players?matchId=${matchId}`)
  }

  const fetchMatchComments = async (matchId: number) => {
    return await $fetch(`/api/bilyoner/match-comments?matchId=${matchId}`)
  }

  const fetchTrendMatches = async () => {
    return await $fetch(`/api/bilyoner/trending-matches`)
  }

  return { fetchMatchDetails, fetchMatchStatistics, fetchMissingPlayersOfMatch, fetchMatchComments, fetchTrendMatches }
}
