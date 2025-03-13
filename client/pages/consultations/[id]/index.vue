<script setup lang="ts">
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

const consultationId = useRoute().params.id
const consultation = await new ConsultationApi().getConsultation(consultationId.toString())

</script>

<template>
  <div>
    <ConsultationContent :consultation="consultation"/>
  </div>
</template>

<style>
</style>