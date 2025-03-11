<script setup lang="ts">

import { FetchError } from "ofetch";
import type Consultation from "~/client/types/consultation/consultation";
import { AsyncData } from "nuxt/app";
import ConsultationsContent from "~/client/types/content/consultationsContent";

definePageMeta({
  layout: 'basic'
})

const platformRef: Ref<string | null> = ref('desktop')
const isMobileRef = ref(false)

onMounted(() => {
  const userAgent = navigator.userAgent
  if (/android/i.test(userAgent)) {
    platformRef.value = 'android'
    isMobileRef.value = true
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    platformRef.value = "iOS";
    isMobileRef.value = true
  }
})


const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const consultationId = route.params.id

const apiBaseUrl = runtimeConfig.public.apiBaseUrl
const routeConsultationUrl = `${apiBaseUrl}/v2/consultations/${consultationId}`
const {data: consultation, error: errorConsultation} = await useFetch(routeConsultationUrl) as AsyncData<Consultation, FetchError>
if (errorConsultation.value) {
  throw createError({statusCode: errorConsultation.value!.statusCode})
}

const routeUrl = `${apiBaseUrl}/content/page-site-vitrine-consultation`
const { data: content, error } = await useFetch(routeUrl) as AsyncData<ConsultationsContent, FetchError>
if (error.value) {
  throw createError({ statusCode: error.value!.statusCode})
}
</script>

<template>
  <div>
    <ConsultationContentDeux :consultation="consultation"/>
  </div>
</template>

<style>
</style>