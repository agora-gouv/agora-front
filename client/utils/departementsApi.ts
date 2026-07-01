import { FetchError } from "ofetch";
import type { DepartementsDto } from "~/types/departements/departementsDto";

export class DepartementsApi {
  private baseUrl = useRuntimeConfig().public.apiBaseUrl;

  async getDepartements(): Promise<DepartementsDto> {
    const route = `${this.baseUrl}/referentiels/regions-et-departements`;

    try {
      return await $fetch<DepartementsDto>(route);
    } catch (error) {
      if (error instanceof FetchError) {
        throw createError({ statusCode: error.statusCode });
      }
      throw error;
    }
  }
}
