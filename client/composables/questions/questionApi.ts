import { AsyncData } from "nuxt/app";
import { FetchError } from "ofetch";
import { ConsultationQuestionsApiDTO } from "~/client/types/consultation/consultationQuestions";

export async function getQuestionsApiDto(consultationId: string) {
  const runtimeConfig = useRuntimeConfig()

  const apiBaseUrl = runtimeConfig.public.apiBaseUrl
  const routeConsultationUrl = `${apiBaseUrl}/consultations/${consultationId}/questions`

  const {data: questions, error: errorQuestions} = await useFetch(routeConsultationUrl) as AsyncData<ConsultationQuestionsApiDTO, FetchError>
  if (errorQuestions.value) {
    throw createError({statusCode: errorQuestions.value!.statusCode})
  }
  
  return questions.value
}



// todo service et mapper