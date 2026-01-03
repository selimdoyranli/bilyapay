import type {
  MatchDetails,
  MatchStatistics,
  MissingPlayersData,
  MatchCommentsData
} from '~/types/bilyoner'

export interface TrendingMatch {
  id: number
  homeTeamName: string
  awayTeamName: string
  matchDate: string
  tournamentName: string
}

export interface TrendingMatchesResponse {
  data: TrendingMatch[]
}

export const useBilyonerApi = () => {
  const fetchMatchDetails = async (matchId: number): Promise<MatchDetails> => {
    return await $fetch<MatchDetails>(`/api/bilyoner/match-detail?matchId=${matchId}`)
  }

  const fetchMatchStatistics = async (matchId: number): Promise<MatchStatistics> => {
    return await $fetch<MatchStatistics>(`/api/bilyoner/match-statistics?matchId=${matchId}`)
  }

  const fetchMissingPlayersOfMatch = async (matchId: number): Promise<MissingPlayersData> => {
    return await $fetch<MissingPlayersData>(`/api/bilyoner/match-missing-players?matchId=${matchId}`)
  }

  const fetchMatchComments = async (matchId: number): Promise<MatchCommentsData> => {
    return await $fetch<MatchCommentsData>(`/api/bilyoner/match-comments?matchId=${matchId}`)
  }

  const fetchTrendMatches = async (): Promise<TrendingMatchesResponse> => {
    return await $fetch<TrendingMatchesResponse>(`/api/bilyoner/trending-matches`)
  }

  return {
    fetchMatchDetails,
    fetchMatchStatistics,
    fetchMissingPlayersOfMatch,
    fetchMatchComments,
    fetchTrendMatches
  }
}
