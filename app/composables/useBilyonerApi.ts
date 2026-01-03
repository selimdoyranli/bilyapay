import type {
  MatchDetails,
  MatchStatistics,
  MissingPlayersData,
  MatchCommentsData
} from '~/types/bilyoner'

export interface TrendingMatchMarket {
  mrn: string
  n: string
  val: number
}

export interface TrendingMatch {
  id: number
  en: string
  lgn: string
  strt: string
  market?: TrendingMatchMarket
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

  const fetchTrendMatches = async (): Promise<TrendingMatch[]> => {
    return await $fetch<TrendingMatch[]>(`/api/bilyoner/trending-matches`)
  }

  return {
    fetchMatchDetails,
    fetchMatchStatistics,
    fetchMissingPlayersOfMatch,
    fetchMatchComments,
    fetchTrendMatches
  }
}
