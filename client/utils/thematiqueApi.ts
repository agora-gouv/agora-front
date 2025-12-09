import ThematiqueApiDTO from "~/client/types/thematique/thematique";

export class ThematiqueApi {
  private baseUrl = useRuntimeConfig().public.apiBaseUrl;

  async getAll() {
    const routeThematiqueResponsesUrl = `${this.baseUrl}/thematiques`

    const {data: thematiques, error}
      = await useFetch<ThematiqueApiDTO[]>(routeThematiqueResponsesUrl)

    if (error.value) throw createError({statusCode: error.value.statusCode})

    return thematiques.value!
  }
}