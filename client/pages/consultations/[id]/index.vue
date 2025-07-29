<script setup lang="ts">

definePageMeta({
  layout: 'basic'
})

const consultation = ref()

onMounted(async () => {
  const consultationId = useRoute().params.id
  const jwtToken = (await useAuthentication()).jwtToken
  consultation.value = (await new ConsultationApi().getConsultation(consultationId.toString(), jwtToken)).value
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
