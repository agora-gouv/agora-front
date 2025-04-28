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
  <div class="tuiles fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-py-8w">
    <div class="fr-col-12 fr-col-sm-6 fr-col-md-4">
      <DsfrTile
        title="prendre part à la politique de la France"
        imgSrc="./fonctionnalite_1.svg"
        class="tuile"
        to="/consultations"
        :disabled="!runtimeConfig.public.features.consultations"
      />
    </div>
    <div class="fr-col-12 fr-col-sm-6 fr-col-md-4">
      <DsfrTile
        title="Poser des questions au Gouvernement"
        imgSrc="./fonctionnalite_2.svg"
        class="tuile"
        to="/qags"
        :disabled="!runtimeConfig.public.features.qags"
      />
    </div>
    <div class="fr-col-12 fr-col-sm-6 fr-col-md-4">
      <DsfrTile
        title="En savoir plus sur la participation citoyenne en France"
        imgSrc="./fonctionnalite_3.svg"
        class="tuile"
        to="/participation-citoyenne"
        :disabled="!runtimeConfig.public.features.pedagogie"
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