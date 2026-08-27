export default defineEventHandler(async (event) => {
  const token = getRouterParam(event, 'token')
  const backendUrl = process.env.ACME_CHALLENGE_BACKEND_URL

  if (!backendUrl) {
    throw createError({ statusCode: 500, statusMessage: 'ACME_CHALLENGE_BACKEND_URL not configured' })
  }

  const targetUrl = `${backendUrl}/.well-known/acme-challenge/${token}`

  try {
    const response = await $fetch.raw(targetUrl, { ignoreResponseError: true })

    if (response.status === 404) {
      throw createError({ statusCode: 404, statusMessage: 'Not Found' })
    }

    setResponseStatus(event, response.status)
    return response._data
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({ statusCode: 502, statusMessage: 'Bad Gateway' })
  }
})
