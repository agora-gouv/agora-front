import type ThemeHebdo from "~/types/theme_hebdo/themeHebdo";

export class ThemeHebdoApi {
  private baseUrl = useRuntimeConfig().public.apiBaseUrl;

  async getThemeHebdo() {
    const routeThemeHebdoUrl = `${this.baseUrl}/theme_hebdo`
    const {
      data: themeHebdo,
      error: themeHebdoError
    } = await useFetch<ThemeHebdo>(routeThemeHebdoUrl)
    
    if (themeHebdoError.value) {
      throw createError({statusCode: themeHebdoError.value!.statusCode})
    }

    return themeHebdo
  }
}