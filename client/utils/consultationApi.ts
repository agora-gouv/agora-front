import { AsyncData } from "nuxt/app";
import Consultation from "~/client/types/consultation/consultation";
import { FetchError } from "ofetch";
import { ConsultationResultsApiDTO } from "~/client/types/consultation/consultationResultsApiDTO";

export class ConsultationApi {
  private baseUrl = useRuntimeConfig().public.apiBaseUrl;

  async getConsultation(consultationId: string) {
    const routeConsultationUrl = `${this.baseUrl}/v2/consultations/${consultationId}`

    const {
      data: consultation,
      error: errorConsultation
    } = await useFetch(routeConsultationUrl) as AsyncData<Consultation, FetchError>

    if (errorConsultation.value) {
      throw createError({statusCode: errorConsultation.value!.statusCode})
    }

    return consultation
  }
  
  async getConsultationUpdate(consultationId: string, consultationUpdateId: string) {
    const routeUrl = `${this.baseUrl}/v2/consultations/${consultationId}/updates/${consultationUpdateId}`

    const {
      data: consultationUpdate, 
      error
    } = await useFetch(routeUrl) as AsyncData<Consultation, FetchError>

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
}