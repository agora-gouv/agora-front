import { FetchError } from "ofetch";
import { LoginResponse, SignupResponse } from "~/client/types/authentication/authenticationApiDTO";

export class AuthenticationApi {
  async login(loginToken: string): Promise<LoginResponse> {
    const baseUrl = useRuntimeConfig().public.apiBaseUrl;

    const routeUrl = `${baseUrl}/login`
    try {
      return await $fetch<LoginResponse, FetchError>(routeUrl, {
        method: "POST",
        headers: {
          "versionCode": "1",
          "platform": "web",
        },
        body: {"loginToken": loginToken},
      })
    } catch (error) {
      throw createError({statusCode: error.statusCode})
    }
  }

  async signup(): Promise<SignupResponse> {
    const runtimeConfig = useRuntimeConfig()
    const routeUrl = `${runtimeConfig.public.apiBaseUrl}/signup`
    try {
      const content = await $fetch<SignupResponse, FetchError>(routeUrl, {
        method: "POST",
        headers: {
          "versionCode": "1",
          "platform": "web",
        }
      })
      return content
    } catch (error) {
      throw createError({statusCode: error.statusCode})
    }
  }
}