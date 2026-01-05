import { parseURL, parseQuery } from 'ufo'
import { bilyonerHeaders } from '../global/headers'
import { getMatchDetailUrl } from '../../utils/bilyoner-urls'

export default defineEventHandler((event) => {
  const url = parseURL(event.node.req.url)
  const query = parseQuery(url.search)

  const matchId = Number(query.matchId)

  const fetchMatchDetails = (matchId: number) => {
    const response = fetch(process.env.API_URL ? `${process.env.API_URL}/match-detail?matchId=${matchId}` : getMatchDetailUrl(matchId), {
      headers: bilyonerHeaders
    })

    return response
  }

  const result = fetchMatchDetails(matchId).then(response => response.json())

  return result
})
