import { parseURL, parseQuery } from 'ufo'
import { bilyonerHeaders } from '../global/headers'

export default defineEventHandler((event) => {
  const url = parseURL(event.node.req.url)
  const query = parseQuery(url.search)

  const matchId = Number(query.matchId)

  const fetchMatchDetails = (matchId: number) => {
    const response = fetch(`https://www.bilyoner.com/api/mobile/match-card/event/${matchId}/detail`, {
      headers: bilyonerHeaders
    })

    return response
  }

  const result = fetchMatchDetails(matchId).then(response => response.json())

  return result
})
