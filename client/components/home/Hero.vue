<script setup lang="ts">

import {FetchError} from "ofetch";
import AccueilContent from "~/client/types/content/accueilContent";
import {AsyncData} from "nuxt/app";

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
    <div class="content fr-col-12 fr-col-md-6 fr-grid-row fr-grid-row--middle">
      <h1>Bienvenue sur le site de la participation citoyenne de l’État</h1>
      <p>
        Ce site présente les initiatives lancées par les ministères et les services de l’État, à l’échelle nationale et dans les
        territoires, pour associer les citoyens à l’élaboration des politiques publiques et à la décision politique, en dehors des
        rendez-vous électoraux.
      </p>
    </div>
    <img src="/cooperation.svg" alt="" class="fr-col-12 fr-col-md-6">
  </div>
</template>

<style>
.hero {
  background-color: var(--blue-france-975-75);
  color: var(--blue-france-sun-113-625);
}
</style>