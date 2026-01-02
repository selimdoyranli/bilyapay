import { parseURL, parseQuery } from 'ufo'
import { bilyonerHeaders } from '../global/headers'

export default defineEventHandler((event) => {
  const url = parseURL(event.node.req.url)
  const query = parseQuery(url.search)

  const matchId = Number(query.matchId)

  const fetchMatchComments = (matchId: number) => {
    const response = fetch(`https://www.bilyoner.com/api/v1/authors/comment/${matchId}`, {
      headers: bilyonerHeaders
    })

    return response
  }

  const result = fetchMatchComments(matchId).then(response => response.json())

  return result
})
