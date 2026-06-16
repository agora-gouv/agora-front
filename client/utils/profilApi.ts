import { FetchError } from "ofetch";

export type ProfilInfoDto = {
  gender: string;
  yearOfBirth: number;
  department: string;
  cityType: string;
  jobCategory: string;
  voteFrequency: string;
  publicMeetingFrequency: string;
  consultationFrequency: string;
};

export class ProfilApi {
  private baseUrl = useRuntimeConfig().public.apiBaseUrl;

  async getProfil(token: string) {
    const route = `${this.baseUrl}/profile`;

    const result = await useFetch<ProfilInfoDto, FetchError>(route, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data: profil, error } = result;

    if (error.value) {
      throw createError({ statusCode: error.value.statusCode });
    }

    return result;
  }

  async editProfil(data: ProfilInfoDto, token: string) {
    const route = `${this.baseUrl}/profile`;

    try {
      await $fetch(route, {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (error instanceof FetchError) {
        throw createError({ statusCode: error.statusCode });
      }
      throw error;
    }
  }

  async resetProfil(token: string) {
    const route = `${this.baseUrl}/profile`;

    try {
      await $fetch(route, {
        method: "POST",
        body: {
          gender: null,
          yearOfBirth: null,
          department: null,
          cityType: null,
          jobCategory: null,
          voteFrequency: null,
          publicMeetingFrequency: null,
          consultationFrequency: null,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (error instanceof FetchError) {
        throw createError({ statusCode: error.statusCode });
      }
      throw error;
    }
  }
}
