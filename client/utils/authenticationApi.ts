import { FetchError } from "ofetch";
import type { LoginResponse, SignupResponse } from "~/types/authentication/authenticationApiDTO";

export class AuthenticationApi {
  async login(loginToken: string): Promise<LoginResponse> {
    const baseUrl = useRuntimeConfig().public.apiBaseUrl;

    const routeUrl = `${baseUrl}/login`;
    try {
      return await $fetch<LoginResponse>(routeUrl, {
        method: "POST",
        headers: {
          versionCode: "1",
          platform: "web",
        },
        body: { loginToken: loginToken },
      });
    } catch (error) {
      const statusCode = error instanceof FetchError ? error.statusCode : 500;
      throw createError({ statusCode });
    }
  }

  async signup(): Promise<SignupResponse> {
    const runtimeConfig = useRuntimeConfig();
    const routeUrl = `${runtimeConfig.public.apiBaseUrl}/signup`;
    try {
      const content = await $fetch<SignupResponse>(routeUrl, {
        method: "POST",
        headers: {
          versionCode: "1",
          platform: "web",
        },
      });
      return content;
    } catch (error) {
      const statusCode = error instanceof FetchError ? error.statusCode : 500;
      throw createError({ statusCode });
    }
  }
}
