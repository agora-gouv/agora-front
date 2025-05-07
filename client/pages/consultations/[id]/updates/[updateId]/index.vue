<script setup lang="ts">
definePageMeta({
  layout: 'basic'
})

const links = ref()
const consultationUpdate = ref()
const jwtToken = ref()

onMounted(async () => {
  const consultationId = useRoute().params.id.toString()
  const consultationUpdateId = useRoute().params.updateId.toString()
  jwtToken.value = (await useAuthentication()).jwtToken
  consultationUpdate.value = (await (new ConsultationApi()).getConsultationUpdate(consultationId, consultationUpdateId, jwtToken.value)).value

  links.value = [
    {to: '/', text: 'Accueil'},
    {to: `/consultations/${consultationId}`, text: `Consultation citoyenne "${consultationUpdate.value.title}"`},
    {text: consultationUpdate.value.history?.find(element => element.updateId == consultationUpdate.value.updateId)?.title ?? ""}
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