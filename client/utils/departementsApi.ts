import { FetchError } from "ofetch";
import type { DepartementsDto } from "~/types/departements/departementsDto";

export class DepartementsApi {
  async getDepartements(): Promise<DepartementsDto> {
    try {
      return await $fetch<DepartementsDto>("/api/referentiels/regions-et-departements");
    } catch (error) {
      if (error instanceof FetchError) {
        throw createError({ statusCode: error.statusCode });
      }
      throw error;
    }
  }
}
