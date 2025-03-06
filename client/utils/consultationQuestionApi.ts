import { AsyncData } from "nuxt/app";
import { FetchError } from "ofetch";
import { ConsultationQuestionsApiDTO } from "~/client/types/consultation/consultationQuestionsApiDTO";

export class ConsultationQuestionApi {
  private baseUrl = useRuntimeConfig().public.apiBaseUrl;

  async getQuestions(consultationId: string) {
    const routeQuestionsUrl = `${this.baseUrl}/consultations/${consultationId}/questions`

    const {
      data: questions,
      error: errorQuestions
    } = await useFetch(routeQuestionsUrl) as AsyncData<ConsultationQuestionsApiDTO, FetchError>

    if (errorQuestions.value) {
      throw createError({statusCode: errorQuestions.value!.statusCode})
    }

    return questions
  }

  async sendAnswers(consultationId: string, jwtToken: string) {
    const routeConsultationUrl = `${this.baseUrl}/consultations/${consultationId}/responses`
    const consultationAnswersApiDTO = {
      consultationId: "",
      responses: [
        {
          questionId: "",
          choiceIds: [""],
          responseText: ""
        }
      ]
    }

    const {
      data: questions,
      error: errorQuestions
    } = await useFetch(routeConsultationUrl, {
      method: "POST",
      body: consultationAnswersApiDTO,
      headers: {
        "Authorization": `Bearer ${jwtToken}`
      }
    }) as AsyncData<{ askDemographicInfo: boolean }, FetchError>

    if (errorQuestions.value) {
      throw createError({statusCode: errorQuestions.value!.statusCode})
    }

    return questions
  }
}