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

function extractTuileData(text: string): { title: string, description: string } {
  const [match, title, descriptionRaw] = text.match(/^<h[1-6]>(.*)<\/h[1-6]>(.*)$/);
  const description = descriptionRaw.replace(/<([^>]*)>/, '');
  return {
    title,
    description
  }
}

const tuiles = [
  {
    ...extractTuileData(accueilContent.value.texteImage1),
    "imgSrc": "/fonctionnalite_1.svg"
  },
  {
    ...extractTuileData(accueilContent.value.texteImage2),
    "imgSrc": "/fonctionnalite_2.svg"
  },
  {
    ...extractTuileData(accueilContent.value.texteImage3),
    "imgSrc": "/fonctionnalite_3.svg"
  }
]
</script>

<template>
  <div class="tuiles fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-py-8w">
    <div v-for="tuile in tuiles" class="fr-col-12 fr-col-sm-6 fr-col-md-4">
      <DsfrTile
        :title="tuile.title"
        :imgSrc="tuile.imgSrc"
        :description="tuile.description"
        class="tuile"
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