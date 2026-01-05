import { parseURL, parseQuery } from 'ufo'
import { bilyonerHeaders } from '../global/headers'
import { getMatchStatisticsUrl } from '../../utils/bilyoner-urls'

export default defineEventHandler((event) => {
  const url = parseURL(event.node.req.url)
  const query = parseQuery(url.search)

  const matchId = Number(query.matchId)

  const fetchMatchStatistics = (matchId: number) => {
    const response = fetch(process.env.API_URL ? `${process.env.API_URL}/match-statistics?matchId=${matchId}` : getMatchStatisticsUrl(matchId), {
      headers: bilyonerHeaders
    })

    return response
  }

  const result = fetchMatchStatistics(matchId).then(response => response.json())

  return result
})
