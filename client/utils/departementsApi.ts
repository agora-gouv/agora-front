import { FetchError } from "ofetch";
import type { DepartementsDto } from "~/types/departements/departementsDto";

// Cache en mémoire côté serveur (persiste entre les requêtes SSR dans le process Node.js)
let cachedDepartements: DepartementsDto | null = null;
let cacheExpiry = 0;
const CACHE_TTL = 60 * 60 * 1000; // 1 heure en ms

export class DepartementsApi {
  private baseUrl = useRuntimeConfig().public.apiBaseUrl;

  async getDepartements(): Promise<DepartementsDto> {
    const now = Date.now();
    if (cachedDepartements && now < cacheExpiry) {
      return cachedDepartements;
    }

    const route = `${this.baseUrl}/referentiels/regions-et-departements`;
    try {
      const result = await $fetch<DepartementsDto>(route);
      cachedDepartements = result;
      cacheExpiry = now + CACHE_TTL;
      return result;
    } catch (error) {
      if (error instanceof FetchError) {
        throw createError({ statusCode: error.statusCode });
      }
      throw error;
    }
  }
}
