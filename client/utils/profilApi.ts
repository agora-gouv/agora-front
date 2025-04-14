import {FetchError} from "ofetch";

type ProfilInfoDto = {
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

  async getProfil(token: string) {
    const route = `${this.baseUrl}/profile`

    const {
      data: profil,
      error
    } = await useFetch<ProfilInfoDto, FetchError>(route, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    if (error.value) {
      throw createError({statusCode: error.value.statusCode})
    }

    return profil
  }

  async editProfil(data: ProfilInfoDto, token: string) {
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