import { bilyonerHeaders } from '../global/headers'

export default defineEventHandler((_event) => {
  const fetchTrendMatches = () => {
    const response = fetch(`${process.env.API_URL || 'http://localhost:3000/api/bilyoner'}/trending-matches`, {
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
