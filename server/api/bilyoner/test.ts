export default defineEventHandler(() => {
  try {
    return {
      ok: true
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        error: e.message
      }
    }
  }
})
