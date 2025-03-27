import {ConsultationQuestionsApiDTO} from "~/client/types/consultation/consultationQuestionsApiDTO";
import {FetchError} from "ofetch";

type ProfilInfo = {
  "gender": string,
  "yearOfBirth": number,
  "department": string,
  "cityType": string,
  "jobCategory": string,
  "voteFrequency": string,
  "publicMeetingFrequency": string,
  "consultationFrequency": string,
}

export class ProfilApi {
  private baseUrl = useRuntimeConfig().public.apiBaseUrl;

  async editProfil(data: ProfilInfo, token: string) {
    const route = `${this.baseUrl}/profile`

    const {
      error
    } = await useFetch<never, FetchError>(route, {
      method: "POST",
      body: data,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    if (error.value) {
      throw createError({statusCode: error.value.statusCode})
    }
  }
}