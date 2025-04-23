<script setup lang="ts">
definePageMeta({
  layout: 'basic'
})

const links = ref()
const consultationUpdate = ref()

onMounted(async () => {
  const consultationId = useRoute().params.id.toString()
  const consultationUpdateId = useRoute().params.updateId.toString()
  const {jwtToken} = await useAuthentication()
  consultationUpdate.value = (await (new ConsultationApi()).getConsultationUpdate(consultationId, consultationUpdateId, jwtToken)).value

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
    <ConsultationOther v-if="consultationUpdate" :consultation="consultationUpdate"/>
  </ClientOnly>
</template>

<style>
</style>