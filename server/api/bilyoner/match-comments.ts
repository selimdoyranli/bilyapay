import { parseURL, parseQuery } from 'ufo'
import { bilyonerHeaders } from '../global/headers'
import { getMatchCommentsUrl } from '../../utils/bilyoner-urls'

export default defineEventHandler((event) => {
  const url = parseURL(event.node.req.url)
  const query = parseQuery(url.search)

  const matchId = Number(query.matchId)

  const fetchMatchComments = (matchId: number) => {
    const response = fetch(process.env.API_URL ? `${process.env.API_URL}/match-comments?matchId=${matchId}` : getMatchCommentsUrl(matchId), {
      headers: bilyonerHeaders
    })

    return response
  }

  const result = fetchMatchComments(matchId).then(response => response.json())

  return result
})
