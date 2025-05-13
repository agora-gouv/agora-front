<script setup lang="ts">
import { Ref } from "vue";

const {open} = defineProps<{
  open: Ref<boolean>
  onClick: () => void
}>()
const emit = defineEmits<{
  (event: 'close'): void
}>()

// TODO url par défaut ?
const storeUrl: Ref<string> = ref("https://play.google.com/store/apps/details?id=fr.gouv.agora")
onMounted(() => {
  const userAgent = navigator.userAgent
  if (/android/i.test(userAgent)) {
    storeUrl.value = "https://play.google.com/store/apps/details?id=fr.gouv.agora"
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    storeUrl.value = "https://apps.apple.com/fr/app/agora-citoyens-gouv/id6449599025";
  }
})

const navigateToStore = () => {
  return navigateTo(storeUrl.value)
}
</script>
<template>
  <DsfrModal
    :opened="open"
    title="Participer à la consultation"
    :actions="[
      { label: 'Télécharger sur le store', onClick: navigateToStore, icon: 'ri:settings-5-line' }, 
      { label: 'Continuer sur le site', onClick: onClick, secondary: true }
    ]"
    @close="() => emit('close')"
  >
    <p>
      Vous pouvez répondre à la consultation sur l'application mobile Agora ou sur le site internet. L'application mobile offre une
      meilleure expérience.
    </p>
    <p>L'application mobile vous permet de :</p>
    <ul>
      <li>Conserver vos résultats</li>
      <li>Etre tenu au courant des suites.</li>
    </ul>
  </DsfrModal>
</template>