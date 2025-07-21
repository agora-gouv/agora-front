import {AsyncData} from "nuxt/app";
import {FetchError} from "ofetch";
import NewsDto from "~/client/types/content/news";

export class NewsApi {
  private baseUrl = useRuntimeConfig().public.apiBaseUrl;

  async get() {
    const routeUrl = `${this.baseUrl}/welcome_page/last_news`

    const {
      data: news,
      error
    } = await useFetch(routeUrl) as AsyncData<NewsDto, FetchError>

    if (error.value) {
      throw createError({statusCode: error.value!.statusCode})
    }

    return news
  }
}