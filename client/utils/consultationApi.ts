import { AsyncData } from "nuxt/app";
import Consultation from "~/client/types/consultation/consultation";
import { FetchError } from "ofetch";
import { ConsultationResultsApiDTO } from "~/client/types/consultation/consultationResultsApiDTO";
import ConsultationsListApiDTO from "~/client/types/consultation/consultationsList";

export class ConsultationApi {
  private baseUrl = useRuntimeConfig().public.apiBaseUrl;

  async getConsultation(consultationId: string, jwtToken: string | null) {
    const routeConsultationUrl = `${this.baseUrl}/v2/consultations/${consultationId}`

    const jwtOption = jwtToken ? {headers: {"Authorization": `Bearer ${jwtToken}`}} : {}

    const {
      data: consultation,
      error: errorConsultation
    } = await useFetch(routeConsultationUrl, jwtOption) as AsyncData<Consultation, FetchError>

    if (errorConsultation.value) {
      throw createError({statusCode: errorConsultation.value!.statusCode})
    }

    return consultation
  }

  async getConsultationUpdate(consultationId: string, consultationUpdateId: string, jwtToken: string | null) {
    const routeUrl = `${this.baseUrl}/v2/consultations/${consultationId}/updates/${consultationUpdateId}`

    const jwtOption = jwtToken ? {headers: {"Authorization": `Bearer ${jwtToken}`}} : {}

    const {
      data: consultationUpdate,
      error
    } = await useFetch(routeUrl, jwtOption) as AsyncData<Consultation, FetchError>

    if (error.value) {
      throw createError({statusCode: error.value!.statusCode})
    }

    return consultationUpdate
  }

  async getConsultationResults(consultationId: string) {
    const routeConsultationResponsesUrl = `${this.baseUrl}/v2/consultations/${consultationId}/responses`

    const {
      data: consultationResults,
      error: errorConsultation
    } = await useFetch(routeConsultationResponsesUrl) as AsyncData<ConsultationResultsApiDTO, FetchError>

    if (errorConsultation.value) {
      throw createError({statusCode: errorConsultation.value!.statusCode})
    }

    return consultationResults
  }

  async getAllConsultations() {
    const routeConsultationResponsesUrl = `${this.baseUrl}/consultations`

    const {
      data: consultations,
      error: errorConsultation
    } = await useFetch(routeConsultationResponsesUrl) as AsyncData<ConsultationsListApiDTO, FetchError>

    if (errorConsultation.value) {
      throw createError({statusCode: errorConsultation.value!.statusCode})
    }

    return consultations
  }

  async giveFeedback(consultationId: string, consultationUpdate: string, isPositive: boolean, token: string) {
    const route = `${this.baseUrl}/consultations/${consultationId}/updates/${consultationUpdate}/feedback`

    const {
      error
    } = await useFetch<never, FetchError>(route, {
      method: "POST",
      body: {isPositive: isPositive},
      headers: {"Authorization": `Bearer ${token}`}
    })

    if (error.value) {
      throw createError({statusCode: error.value!.statusCode})
    }
  }
}