import { bilyonerHeaders } from '../global/headers'
import { getTrendingMatchesUrl } from '../../utils/bilyoner-urls'

export default defineEventHandler((_event) => {
  const fetchTrendMatches = () => {
    const response = fetch(process.env.API_URL ? `${process.env.API_URL}/trending-matches` : getTrendingMatchesUrl(), {
      headers: bilyonerHeaders
    })

    return response
  }

  const result = fetchTrendMatches().then(response => response.json()).then((data) => {
    if (data.data) {
      return data.data
    }

    return []
  })

  return result
})
