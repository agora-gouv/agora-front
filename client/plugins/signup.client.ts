import { AsyncData } from "nuxt/app";
import { FetchError } from "ofetch";

interface SignupResponse {
  jwtToken: string,
  jwtExpirationEpochMilli: string,
  loginToken: string,
}

interface LoginResponse {
  jwtToken: string,
  jwtExpirationEpochMilli: string,
}

export default defineNuxtPlugin(async nuxtApp => {
  const isSignupEnabled = false
  if (!isSignupEnabled) {return}
  
  if (localStorage.getItem("loginToken") == null) {
    const content = await signup()
    localStorage.setItem("loginToken", content.loginToken)
    localStorage.setItem("jwtToken", content.jwtToken)
    localStorage.setItem("jwtExpirationEpochMilli", content.jwtExpirationEpochMilli)
  }
  
  const jwtExpirationEpochMilli = parseInt(localStorage.getItem("jwtExpirationEpochMilli")!!)
  
  const now = new Date()
  now.setHours(now.getHours() - 1);
  const oneHourAgo = now.getTime()
  
  if (jwtExpirationEpochMilli < oneHourAgo) {
    const loginToken = localStorage.getItem("loginToken")!!
    const freshAuthInfo = await logUser(loginToken)

    localStorage.setItem("jwtToken", freshAuthInfo.jwtToken)
    localStorage.setItem("jwtExpirationEpochMilli", freshAuthInfo.jwtExpirationEpochMilli)
  }
});

async function logUser(loginToken: string): Promise<LoginResponse> {
  const runtimeConfig = useRuntimeConfig()
  
  const routeUrl = `${runtimeConfig.public.apiBaseUrl}/login`
  const {data: contentLogin, error} = await useFetch(routeUrl, {
    method: "POST",
    headers: {
      "versionCode": "1",
      "platform": "web",
    },
    body: {"loginToken": loginToken},
  }) as AsyncData<LoginResponse, FetchError>

  if (error.value) {
    throw createError({statusCode: error.value!.statusCode})
  }
  
  return contentLogin.value
}

async function signup(): Promise<SignupResponse> {
  const runtimeConfig = useRuntimeConfig()
  const routeUrl = `${runtimeConfig.public.apiBaseUrl}/signup`
  const {data: content, error} = await useFetch(routeUrl, {
    method: "POST",
    headers: {
      "versionCode": "1",
      "platform": "web",
    }
  }) as AsyncData<SignupResponse, FetchError>
  
  if (error.value) {
    throw createError({statusCode: error.value!.statusCode})
  }
  
  return content.value
}