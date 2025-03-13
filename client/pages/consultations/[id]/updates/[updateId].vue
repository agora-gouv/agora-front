<script setup lang="ts">
definePageMeta({
  layout: 'basic'
})

const route = useRoute()
const consultationId = route.params.id.toString()
const consultationUpdateId = route.params.updateId.toString()
const links = ref()

const consultationUpdate = await (new ConsultationApi()).getConsultationUpdate(consultationId, consultationUpdateId)

links.value = [
  {to: '/', text: 'Accueil'},
  {to: `/consultations/${consultationId}`, text: `Consultation citoyenne "${consultationUpdate.value.title}"`},
  {text: consultationUpdate.value.history?.find(element => element.updateId == consultationUpdate.value.updateId)?.title ?? ""}
]
</script>

<template>
  <DsfrBreadcrumb :links="links"/>
  <div>
    <ConsultationContent :consultation="consultationUpdate"/>
  </div>
</template>

<style>
</style>