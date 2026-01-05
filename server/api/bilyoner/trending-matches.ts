import { bilyonerHeaders } from '../global/headers'
import { getTrendingMatchesUrl } from '../../utils/bilyoner-urls'

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  })

  if (event.method === 'OPTIONS') {
    event.node.res.statusCode = 204
    return ''
  }

  const response = await fetch(
    process.env.API_URL ? `${process.env.API_URL}/trending-matches` : getTrendingMatchesUrl(),
    { headers: bilyonerHeaders }
  )

  const data = await response.json()

  return data.data ? data.data : []
})
