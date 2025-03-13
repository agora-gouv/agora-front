import { AsyncData } from "nuxt/app";
import { FetchError } from "ofetch";
import type Qag from "~/client/types/qag/qag";

export class QagApi {
  private baseUrl = useRuntimeConfig().public.apiBaseUrl;

  async getQag(qagId: string) {
    const routeQagUrl = `${this.baseUrl}/api/public/qags/${qagId}`
    const {
      data: qag,
      error: qagError
    } = await useFetch(routeQagUrl) as AsyncData<Qag, FetchError>

    if (qagError.value) {
      throw createError({statusCode: qagError.value!.statusCode})
    }

    return qag
  }
}