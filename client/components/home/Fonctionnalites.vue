<script setup lang="ts">

import {AsyncData} from "nuxt/app";
import AccueilContent from "~/client/types/content/accueilContent";
import {FetchError} from "ofetch";

const runtimeConfig = useRuntimeConfig()

const apiBaseUrl = runtimeConfig.public.apiBaseUrl
const routeUrl = `${apiBaseUrl}/content/page-site-vitrine-accueil`

const {data: accueilContent, error} = await useFetch(routeUrl) as AsyncData<AccueilContent, FetchError>

if (error.value) {
  throw createError({statusCode: error.value!.statusCode})
}
</script>

<template>
  <div class="tuiles fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-my-8w">
    <div class="fr-col-12 fr-col-sm-6 fr-col-md-4">
      <DsfrTile
        title="Donner votre avis sur les politiques publiques"
        titleTag="h2"
        imgSrc="/community.svg"
        class="tuile"
        to="/je-participe"
        :disabled="!runtimeConfig.public.features.consultations"
      />
    </div>
    <div class="fr-col-12 fr-col-sm-6 fr-col-md-4">
      <DsfrTile
        title="Suivre les résultats de la participation citoyenne"
        titleTag="h2"
        imgSrc="/search.svg"
        class="tuile"
        to="/je-participe#terminees"
        :disabled="!runtimeConfig.public.features.consultations"
      />
    </div>
    <div class="fr-col-12 fr-col-sm-6 fr-col-md-4">
      <DsfrTile
        title="Poser vos questions au Gouvernement"
        titleTag="h2"
        imgSrc="/conclusion.svg"
        class="tuile"
        to="/qags"
        :disabled="!runtimeConfig.public.features.qags"
      />
    </div>
  </div>
</template>

<style>
.tuile img {
  object-fit: cover;
  width: 100%;
}
</style>
