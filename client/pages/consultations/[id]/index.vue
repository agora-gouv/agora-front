<script setup lang="ts">

definePageMeta({
  layout: 'basic'
})

const app = useNuxtApp()
if (!app.$departements) {
  const departements = await new DepartementsApi().getDepartements();
  app.provide('departements', departements);
}

const consultation = ref()
onMounted(async () => {
  const consultationId = useRoute().params.id
  const jwtToken = (await useAuthentication()).jwtToken
  consultation.value = (await new ConsultationApi().getConsultation(consultationId.toString(), jwtToken)).value
  useHead({
    title: `${consultation.value.title} - Agora`,
  })
})
</script>

<template>
  <div>
    <ClientOnly>
      <template #fallback>
        <ConsultationContentSkeleton />
      </template>
      <ConsultationContent v-if="consultation" :consultation="consultation"/>
    </ClientOnly>
  </div>
</template>

<style>
</style>
