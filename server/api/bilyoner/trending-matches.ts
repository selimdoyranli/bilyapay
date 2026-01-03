import { bilyonerHeaders } from '../global/headers'

export default defineEventHandler((event) => {
  const fetchTrendMatches = () => {
    const response = fetch(`https://www.bilyoner.com/api/v3/mobile/aggregator/gamelist/events/selections/trending?bulletinType=2`, {
      headers: bilyonerHeaders
    })

    return response
  }

  const result = fetchTrendMatches().then(response => response.json())

  return result
})
