import { AsyncData } from "nuxt/app";
import { FetchError } from "ofetch";
import { ConsultationQuestionsApiDTO } from "~/client/types/consultation/consultationQuestionsApiDTO";
import { ConsultationAnswersApiDTO } from "~/client/types/consultation/consultationAnswersApiDTO";

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

  async sendAnswers(consultationId: string, answersCheckbox: Record<string, string | string[]>, answersText: Record<string, string>, jwtToken: string) {
    const routeConsultationUrl = `${this.baseUrl}/consultations/${consultationId}/responses`

    const dtoAnswers = Object.entries(answersCheckbox).map(([questionId, response]) => {
      return {
        questionId: questionId,
        choiceIds: Array.isArray(response) ? response : [response],
        responseText: answersText[questionId] ? answersText[questionId] : ""
      }
    })
    
    const consultationAnswersApiDTO: ConsultationAnswersApiDTO = {
      consultationId: consultationId,
      responses: dtoAnswers
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