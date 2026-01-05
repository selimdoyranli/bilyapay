import { bilyonerHeaders } from '../global/headers'
import { getMatchDetailUrl } from '../../utils/bilyoner-urls'

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

  const query = getQuery(event)
  const matchId = Number(query.matchId)

  if (process.env.API_URL) {
    const targetUrl = `${process.env.API_URL}/match-detail?matchId=${matchId}`

    const response = await fetch(`${process.env.PROXY_URL}`, {
      method: 'POST',
      headers: {
        'accept': 'application/json, text/plain, */*',
        'content-type': 'application/json',
        'origin': `${process.env.PROXY_ORIGIN_URL}`,
        'referer': `${process.env.PROXY_ORIGIN_URL}`
      },
      body: JSON.stringify({
        accessToken: '',
        wantsBinary: true,
        url: targetUrl,
        method: 'GET',
        headers: bilyonerHeaders,
        params: {},
        data: null
      })
    })

    const data = await response.json()
    return data.data ? JSON.parse(Buffer.from(data.data, 'base64').toString('utf-8')) : []
  } else {
    const targetUrl = getMatchDetailUrl(matchId)
    const response = await fetch(targetUrl, {
      headers: bilyonerHeaders
    })
    return await response.json()
  }
})
