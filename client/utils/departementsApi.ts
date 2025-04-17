import {DepartementsDto} from "~/client/types/departements/departementsDto";

export class DepartementsApi {
  private baseUrl = useRuntimeConfig().public.apiBaseUrl;

  async getDepartements(): DepartementsDto {
    const route = `${this.baseUrl}/referentiels/regions-et-departements`

    const {
      data: departements,
      error
    } = await useFetch<DepartementsDto>(route)

    if (error.value) {
      throw createError({statusCode: error.value.statusCode})
    }

    return departements
  }
}