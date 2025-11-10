import NewsDto from "~/client/types/content/news";

export class NewsApi {
  private baseUrl = useRuntimeConfig().public.apiBaseUrl;

  async get() {
    const routeUrl = `${this.baseUrl}/welcome_page/last_news`

    const {
      data: news,
      error
    } = await useFetch<NewsDto>(routeUrl);

    if (error.value) {
      throw createError({statusCode: error.value!.statusCode})
    }

    return news
  }
}
