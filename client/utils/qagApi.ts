import type Qag from "~/client/types/qag/qag";
import { QagsApiDTO, QagsWithResponsesApiDTO } from "~/client/types/qag/qags";

export class QagApi {
  private baseUrl = useRuntimeConfig().public.apiBaseUrl;

  async getQag(qagId: string) {
    const routeQagUrl = `${this.baseUrl}/api/public/qags/${qagId}`
    const {
      data: qag,
      error: qagError
    } = await useFetch<Qag>(routeQagUrl)

    if (qagError.value) {
      throw createError({statusCode: qagError.value!.statusCode})
    }

    return qag
  }

  async getQags(page: number) {
    const routeQagUrl = `${this.baseUrl}/qags/responses/${page}`
    const {
      data: qags,
      error: qagError
    } = await useFetch<QagsWithResponsesApiDTO>(routeQagUrl)

    if (qagError.value) {
      throw createError({statusCode: qagError.value!.statusCode})
    }

    return qags
  }

  async getLatest(token: string) {
    const routeQagUrl = `${this.baseUrl}/v2/qags?pageNumber=1&filterType=latest`
    const {
      data: qags,
      error: qagError
    } = await useFetch<QagsApiDTO>(routeQagUrl, {headers: {"Authorization": `Bearer ${token}`}})

    if (qagError.value) {
      throw createError({statusCode: qagError.value!.statusCode})
    }

    return qags
  }
}