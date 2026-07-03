<script setup lang="ts">
import type {Ref} from "vue";

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
</script>

<template>
  <div class="bandeau-adaptatif fr-grid-row fr-pt-6w fr-pb-2w break-container">
    <div class="fr-col-12 fr-col-md-8">
      <slot/>
      <div class="fr-mt-1w fr-grid-row fr-grid-row--middle fr-grid-row--gutters fr-px-md-6w">
        <div v-if="!isMobileRef || platformRef == 'iOS'" class="fr-col-12 fr-col-lg-6">
          <a class="fr-btn fr-btn--secondary" href="https://apps.apple.com/app/6449599025" target="_blank"
             rel="noopener" title="Téléchargez sur l’AppStore - nouvelle fenêtre">
            <VIcon icon="agora:apple" :ssr="true" class="fr-mr-1w"/>
            Téléchargez sur l’AppStore
          </a>
          <div v-if="platformRef=='desktop'" class="qr-code fr-my-2w">
            <img
              alt="QR code Agora AppStore"
              src="/qrCodes/qr-code-ios.webp"
            />
          </div>
        </div>

        <div v-if="!isMobileRef || platformRef == 'android'" class="fr-col-12 fr-col-lg-6">
          <a class="fr-btn fr-btn--secondary" href="https://play.google.com/store/apps/details?id=fr.gouv.agora"
             target="_blank" rel="noopener" title="Téléchargez sur GooglePlay - nouvelle fenêtre">
            <VIcon icon="agora:google" :ssr="true" class="fr-mr-1w"/>
            Téléchargez sur GooglePlay
          </a>
          <div v-if="platformRef=='desktop'" class="qr-code fr-my-2w">
            <img
              alt="QR code Agora Google Play"
              src="/qrCodes/qr-code-android.webp"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="fr-col-12 fr-col-md-4">
      <img src="/smartphones_complet.webp"
           style="width: 70%; max-width: 100vw;"
           alt="">
    </div>
  </div>
</template>

<style scoped lang="scss">
.bandeau-adaptatif {
  background-color: var(--blue-france-975-75);
  color: var(--blue-france-sun-113-625);
}

.qr-code {
  display: flex;
  justify-content: center;

  > img {
    max-width: 150px;
  }
}
</style>
