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

  async getProfil(token: string): Promise<ProfilInfoDto | null> {
    const route = `${this.baseUrl}/profile`;

    try {
      return await $fetch<ProfilInfoDto>(route, {
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
