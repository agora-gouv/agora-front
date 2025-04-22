<script setup lang="ts">
definePageMeta({
  layout: 'basic'
})

const platformRef: Ref<string | null> = ref('desktop')
const isMobileRef = ref(false)
const consultation = ref()

onMounted(async () => {
  const userAgent = navigator.userAgent
  if (/android/i.test(userAgent)) {
    platformRef.value = 'android'
    isMobileRef.value = true
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    platformRef.value = "iOS";
    isMobileRef.value = true
  }

  const consultationId = useRoute().params.id
  const {jwtToken} = await useAuthentication()
  consultation.value = (await new ConsultationApi().getConsultation(consultationId.toString(), jwtToken)).value
})
</script>

<template>
  <div>
    <ClientOnly>
      <template #fallback>
        <Loader id="loader" class="fr-mt-4w" />
      </template>
      <ConsultationOther v-if="consultation" :consultation="consultation"/>
    </ClientOnly>
  </div>
</template>

<style>
</style>