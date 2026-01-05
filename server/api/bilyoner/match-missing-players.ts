import { parseURL, parseQuery } from 'ufo'
import { bilyonerHeaders } from '../global/headers'
import { getMatchMissingPlayersUrl } from '../../utils/bilyoner-urls'

export default defineEventHandler((event) => {
  const url = parseURL(event.node.req.url)
  const query = parseQuery(url.search)

  const matchId = Number(query.matchId)

  const fetchMatchMissingPlayers = (matchId: number) => {
    const response = fetch(process.env.API_URL ? `${process.env.API_URL}/match-missing-players?matchId=${matchId}` : getMatchMissingPlayersUrl(matchId), {
      headers: bilyonerHeaders
    })

    return response
  }

  const result = fetchMatchMissingPlayers(matchId).then(response => response.json())

  return result
})
