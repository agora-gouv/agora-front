<script setup lang="ts">

import { AsyncData } from "nuxt/app";
import type Consultation from "~/client/types/consultation/consultation";
import { FetchError } from "ofetch";

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const consultationId = route.params.id
const consultationUpdateId = route.params.updateId
const links = ref()

definePageMeta({
  layout: 'basic'
})

const apiBaseUrl = runtimeConfig.public.apiBaseUrl
const routeUrl = `${apiBaseUrl}/v2/consultations/${consultationId}/updates/${consultationUpdateId}`

const {data: consultationUpdate, error} = await useFetch(routeUrl, {
  onResponse({response}) {
    links.value = [
      {to: '/', text: 'Accueil'},
      {to: `/consultations/${consultationId}`, text: `Consultation citoyenne "${response._data.title}"`},
      {text: response._data.history?.find(element => element.updateId == response._data.updateId)?.title ?? ""}
    ]
  },
}) as AsyncData<Consultation, FetchError>

if (error.value) {
  throw createError({statusCode: error.value!.statusCode})
}
</script>

<template>
  <DsfrBreadcrumb :links="links"/>
  <div>
    <ConsultationContent :consultation="consultationUpdate"/>
  </div>
</template>

<style>
</style>