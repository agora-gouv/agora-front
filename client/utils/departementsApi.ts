import { FetchError } from "ofetch";
import type { DepartementsDto } from "~/types/departements/departementsDto";

const getCachedDepartements = defineCachedFunction(
  async (baseUrl: string): Promise<DepartementsDto> => {
    return await $fetch<DepartementsDto>(`${baseUrl}/referentiels/regions-et-departements`);
  },
  {
    maxAge: 60 * 60, // 1 heure
    name: "departements",
    getKey: () => "all",
  }
);

export class DepartementsApi {
  private baseUrl = useRuntimeConfig().public.apiBaseUrl;

  async getDepartements(): Promise<DepartementsDto> {
    try {
      return await getCachedDepartements(this.baseUrl);
    } catch (error) {
      if (error instanceof FetchError) {
        throw createError({ statusCode: error.statusCode });
      }
      throw error;
    }
  }
}
