<script setup lang="ts">
import { Ref } from "vue";
import { VIcon } from "@gouvminint/vue-dsfr";

const {open} = defineProps<{
  open: Ref<boolean>
  onClick: () => void
}>()
const emit = defineEmits<{
  (event: 'close'): void
}>()

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
</script>
<template>
  <DsfrModal
    :opened="open"
    title="Participer à la consultation"
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
    <template #footer>
      <a :href="storeUrl" class="fr-btn fr-mb-1w" target="_blank" rel="noopener noreferrer">
        <VIcon icon="ri:settings-5-line" :inline="true" :ssr="true"/>
        Télécharger sur le store
      </a>
      <DsfrButton
        label="Continuer sur le site"
        type="button"
        secondary
        @click="onClick"
      />
    </template>
  </DsfrModal>
</template>
<style scoped lang="scss">
:deep(.fr-modal__footer) {
  display: flex;
  flex-direction: column;

  > * {
    justify-content: center;
    min-width: 100%;
  }
}
</style>