import { AsyncData } from "nuxt/app";
import { ConsultationQuestionsApiDTO } from "~/client/types/consultation/consultationQuestionsDTO";
import { FetchError } from "ofetch";

export class ConsultationQuestionApi {
  private baseUrl = useRuntimeConfig().public.apiBaseUrl;

  async getQuestions(consultationId: string) {
    const routeConsultationUrl = `${this.baseUrl}/consultations/${consultationId}/questions`

    const {
      data: questions,
      error: errorQuestions
    } = await useFetch(routeConsultationUrl) as AsyncData<ConsultationQuestionsApiDTO, FetchError>

    if (errorQuestions.value) {
      throw createError({statusCode: errorQuestions.value!.statusCode})
    }

    return questions
  }
}