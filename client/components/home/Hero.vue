<script setup lang="ts">

import { FetchError } from "ofetch";
import AccueilContent from "~/client/types/content/accueilContent";
import { AsyncData } from "nuxt/app";

const runtimeConfig = useRuntimeConfig()

const apiBaseUrl = runtimeConfig.public.apiBaseUrl
const routeUrl = `${apiBaseUrl}/content/page-site-vitrine-accueil`

const {data: accueilContent, error} = await useFetch(routeUrl) as AsyncData<AccueilContent, FetchError>

if (error.value) {
  throw createError({statusCode: error.value!.statusCode})
}
</script>

<template>
  <div class="hero break-container fr-grid-row fr-py-1w">
    <div class="content fr-col-12 fr-col-md-8 fr-grid-row fr-grid-row--middle">
      <h1>La plateforme de participation citoyenne de l'État</h1>
      <p>
        Vous avez votre mot à dire sur la politique de la France, et pas seulement au moment des élections. Découvrez sur Agora les actions
        menées pour rendre notre démocratie plus forte.
      </p>
    </div>
    <img src="/hero-illustration.webp" alt="" class="fr-col-12 fr-col-md-4">
  </div>
</template>

<style>
.hero {
  background-color: var(--blue-france-975-75);
  color: var(--blue-france-sun-113-625);
}

.hero img {
  object-fit: contain;
}
</style>