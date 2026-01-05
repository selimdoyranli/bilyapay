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

  if (process.env.API_URL) {
    const targetUrl = `${process.env.API_URL}/trending-matches`

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

    return data.data ? JSON.parse(atob(data.data)) : []
  } else {
    const targetUrl = getTrendingMatchesUrl()
    const response = await fetch(targetUrl, {
      headers: bilyonerHeaders
    })
    const data = await response.json()
    return data.data ? data.data : []
  }
})
