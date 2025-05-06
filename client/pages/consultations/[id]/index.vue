<script setup lang="ts">
definePageMeta({
  layout: 'basic'
})

const consultation = ref()
const jwtToken = ref()

onMounted(async () => {
  const consultationId = useRoute().params.id
  jwtToken.value = (await useAuthentication()).jwtToken
  consultation.value = (await new ConsultationApi().getConsultation(consultationId.toString(), jwtToken.value)).value
})
</script>

<template>
  <div>
    <ClientOnly>
      <template #fallback>
        <Loader class="fr-mt-4w" />
      </template>
      <ConsultationContent v-if="consultation && jwtToken" :consultation="consultation" :jwt-token="jwtToken"/>
    </ClientOnly>
  </div>
</template>

<style>
</style>