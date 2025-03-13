import { AsyncData } from "nuxt/app";
import { FetchError } from "ofetch";
import PolitiqueConfidentialiteContent from "~/client/types/content/politiqueConfidentialiteContent";
import MentionsLegalesContent from "~/client/types/content/mentionsLegalesContent";
import ParticipationCharter from "~/client/types/participation_charter/participationCharter";
import DeclarationAccessibiliteContent from "~/client/types/content/declarationAccessibiliteContent";
import ConditionGeneralesContent from "~/client/types/content/conditionGeneralesContent";
import QuestionAuGouvernementContent from "~/client/types/content/questionAuGouvernementContent";
import ConsultationsContent from "~/client/types/content/consultationsContent";

export class PageContentApi {
  private baseUrl = useRuntimeConfig().public.apiBaseUrl;

  async getPolitiqueConfidentialiteContent() {
    const routeUrl = `${this.baseUrl}/content/page-site-vitrine-politique-confidentialite`

    const {
      data: politiqueConfidentialite,
      error
    } = await useFetch(routeUrl) as AsyncData<PolitiqueConfidentialiteContent, FetchError>

    if (error.value) {
      throw createError({statusCode: error.value!.statusCode})
    }

    return politiqueConfidentialite
  }

  async getMentionsLegalesContent() {
    const routeUrl = `${this.baseUrl}/content/page-site-vitrine-mentions-legales`

    const {
      data: mentionsLegales,
      error
    } = await useFetch(routeUrl) as AsyncData<MentionsLegalesContent, FetchError>

    if (error.value) {
      throw createError({statusCode: error.value!.statusCode})
    }

    return mentionsLegales
  }

  async getParticipationCharterContent() {
    const routeUrl = `${this.baseUrl}/participation_charter`

    const {
      data: charte,
      error
    } = await useFetch(routeUrl) as AsyncData<ParticipationCharter, FetchError>

    if (error.value) {
      throw createError({statusCode: error.value!.statusCode})
    }

    return charte
  }

  async getDeclarationAccessibiliteContent() {
    const routeUrl = `${this.baseUrl}/content/page-site-vitrine-declaration-accessibilite`

    const {
      data: declarationAccessibilite,
      error
    } = await useFetch(routeUrl) as AsyncData<DeclarationAccessibiliteContent, FetchError>

    if (error.value) {
      throw createError({statusCode: error.value!.statusCode})
    }

    return declarationAccessibilite
  }

  async getConditionGeneralesContent() {
    const routeUrl = `${this.baseUrl}/content/page-site-vitrine-conditions-generales`

    const {
      data: conditionGenerales,
      error
    } = await useFetch(routeUrl) as AsyncData<ConditionGeneralesContent, FetchError>

    if (error.value) {
      throw createError({statusCode: error.value!.statusCode})
    }

    return conditionGenerales
  }

  async getQuestionAuGouvernementContent() {
    const routeUrl = `${this.baseUrl}/content/page-site-vitrine-question-au-gouvernement`

    const {
      data: content,
      error,
    } = await useFetch(routeUrl) as AsyncData<QuestionAuGouvernementContent, FetchError>

    if (error.value) {
      throw createError({statusCode: error.value!.statusCode})
    }

    return content
  }
}