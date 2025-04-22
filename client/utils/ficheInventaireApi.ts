import { AsyncData } from "nuxt/app";
import { FetchError } from "ofetch";
import { FicheInventaireApiDTO } from "~/client/types/fiche_inventaire/ficheInventaire";

export class FicheInventaireApi {
  private baseUrl = useRuntimeConfig().public.apiBaseUrl;

  async getAll() {
    const routeFicheInventaireResponsesUrl = `${this.baseUrl}/fiches_inventaire`

    const {data: fichesInventaire, error: error}
      = await useFetch(routeFicheInventaireResponsesUrl) as AsyncData<FicheInventaireApiDTO, FetchError>

    if (error.value) throw createError({statusCode: error.value!.statusCode})

    return fichesInventaire
  }

  async get(id: string) {
    const routeFicheInventaireResponsesUrl = `${this.baseUrl}/fiches_inventaire/${id}`

    const {data: ficheInventaire, error: error}
      = await useFetch(routeFicheInventaireResponsesUrl) as AsyncData<FicheInventaireApiDTO, FetchError>

    if (error.value) throw createError({statusCode: error.value!.statusCode})

    return ficheInventaire
  }
}