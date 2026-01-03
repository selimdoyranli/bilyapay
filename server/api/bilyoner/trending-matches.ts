import { bilyonerHeaders } from '../global/headers'

export default defineEventHandler((_event) => {
  const fetchTrendMatches = () => {
    const response = fetch(`https://www.bilyoner.com/api/v3/mobile/aggregator/gamelist/events/selections/trending?bulletinType=2`, {
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
