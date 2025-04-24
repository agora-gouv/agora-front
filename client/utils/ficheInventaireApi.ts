import { FicheInventaireApiDTO } from "~/client/types/fiche_inventaire/ficheInventaire";

export class FicheInventaireApi {
  private baseUrl = useRuntimeConfig().public.apiBaseUrl;

  async getAll() {
    const routeFicheInventaireResponsesUrl = `${this.baseUrl}/fiches_inventaire`

    const {data: fichesInventaire, error}
      = await useFetch<FicheInventaireApiDTO[]>(routeFicheInventaireResponsesUrl)

    if (error.value) throw createError({statusCode: error.value!.statusCode})

    return fichesInventaire.value!!
  }

  async get(id: string) {
    const routeFicheInventaireResponsesUrl = `${this.baseUrl}/fiches_inventaire/${id}`

    const {data: ficheInventaire, error}
      = await useFetch<FicheInventaireApiDTO>(routeFicheInventaireResponsesUrl)

    if (error.value) throw createError({statusCode: error.value!.statusCode})

    return ficheInventaire.value!!
  }
}