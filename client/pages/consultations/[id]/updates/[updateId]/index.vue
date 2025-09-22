<script setup lang="ts">
definePageMeta({
  layout: 'basic',
})
useNoIndexation();

const links = ref()
const consultationUpdate = ref()
const jwtToken = ref()

const app = useNuxtApp()
if (!app.$departements) {
  const departements = await new DepartementsApi().getDepartements();
  app.provide('departements', departements);
}

onMounted(async () => {
  const consultationId = useRoute().params.id.toString()
  const consultationUpdateId = useRoute().params.updateId.toString()
  jwtToken.value = (await useAuthentication()).jwtToken
  consultationUpdate.value = (await (new ConsultationApi()).getConsultationUpdate(consultationId, consultationUpdateId, jwtToken.value)).value

  const currentUpdateTitle = consultationUpdate.value.history?.find(element => element.updateId == consultationUpdate.value.updateId)?.title

  useHead({
    title: `${consultationUpdate.value.title} - ${currentUpdateTitle} - Agora`,
  })

  links.value = [
    {to: '/', text: 'Accueil'},
    {to: `/consultations/${consultationId}`, text: `Consultation citoyenne "${consultationUpdate.value.title}"`},
    {text: currentUpdateTitle}
  ]
})

</script>

<template>
  <ClientOnly>
    <template #fallback>
      <Loader class="fr-mt-4w"/>
    </template>
    <DsfrBreadcrumb :links="links"/>
    <ConsultationContent v-if="consultationUpdate && jwtToken" :consultation="consultationUpdate" :jwt-token="jwtToken"/>
  </ClientOnly>
</template>

<style>
</style>
