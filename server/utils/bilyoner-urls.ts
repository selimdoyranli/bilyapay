export const getTrendingMatchesUrl = () => {
  return `https://www.bilyoner.com/api/v3/mobile/aggregator/gamelist/events/selections/trending?bulletinType=2`
}

export const getMatchDetailUrl = (matchId: number) => {
  return `https://www.bilyoner.com/api/mobile/match-card/event/${matchId}/detail`
}

export const getMatchStatisticsUrl = (matchId: number) => {
  return `https://www.bilyoner.com/api/mobile/match-card/${matchId}/statistics`
}

export const getMatchMissingPlayersUrl = (matchId: number) => {
  return `https://www.bilyoner.com/api/mobile/match-card/${matchId}/missing-players`
}

export const getMatchCommentsUrl = (matchId: number) => {
  return `https://www.bilyoner.com/api/v1/authors/comment/${matchId}`
}
