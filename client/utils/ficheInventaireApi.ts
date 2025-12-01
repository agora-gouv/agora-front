import { FicheInventaireApiDTO } from "~/client/types/fiche_inventaire/ficheInventaire";
import {LocationQuery} from "vue-router";

export class FicheInventaireApi {
  private baseUrl = useRuntimeConfig().public.apiBaseUrl;

  async getAll(query: LocationQuery = {}) {
    const routeFicheInventaireResponsesUrl = `${this.baseUrl}/fiches_inventaire`

    const {data: fichesInventaire, error}
      = await useFetch<FicheInventaireApiDTO[]>(routeFicheInventaireResponsesUrl, { query })

    if (error.value) throw createError({statusCode: error.value.statusCode})

    return fichesInventaire.value!
  }

  async getAllWithFetch(query: LocationQuery = {}) {
    const url = `${this.baseUrl}/fiches_inventaire`;
    try {
      return await $fetch<FicheInventaireApiDTO[]>(url, {
        method: 'GET',
        params: query,
      });
    } catch (e: any) {
      const statusCode = e?.response?.status ?? 500;
      throw createError({ statusCode });
    }
  }

  async get(id: string) {
    const routeFicheInventaireResponsesUrl = `${this.baseUrl}/fiches_inventaire/${id}`

    const {data: ficheInventaire, error}
      = await useFetch<FicheInventaireApiDTO>(routeFicheInventaireResponsesUrl)

    if (error.value) throw createError({statusCode: error.value.statusCode})

    return ficheInventaire.value!
  }
}