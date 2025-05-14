<script setup lang="ts">
import {Ref} from "vue";

defineProps<{
  title: string,
  description?: string,
}>()

const mobilePlatformRef : Ref<string| null> = ref(null)
const isMobileRef = ref(false)

onMounted(()=>{
  const userAgent = navigator.userAgent
  if (/android/i.test(userAgent)) {
    mobilePlatformRef.value = 'android'
    isMobileRef.value = true
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    mobilePlatformRef.value = "iOS";
    isMobileRef.value = true
  }
})
</script>

<template>
  <div class="bandeau-adaptatif fr-grid-row fr-py-1w break-container">
    <div class="fr-col-12 fr-col-md-6 fr-grid-row fr-grid-row--middle">
      <div>
        <h2>{{title}}</h2>
        
        <p v-if="description">
          {{description}}
        </p>
        
        <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
          <div v-if="!isMobileRef || mobilePlatformRef=='iOS'" class="fr-col-12 fr-col-lg-6">
            <a
              class="fr-btn fr-btn--secondary"
              href="https://apps.apple.com/app/6449599025"
              target="_blank"
              rel="noopener"
              title="Télécharger sur l’AppStore - nouvelle fenêtre"
            >
              <VIcon
                :ssr="true"
                icon="agora:apple"
                class="fr-mr-1w"
              />
              Télécharger sur l’AppStore
            </a>
            <div v-if="!isMobileRef" class="qr-code fr-my-2w">
              <img
                alt="QR code Agora AppStore"
                src="/qrCodes/qr-code-ios.webp"
                style="max-width:150px;"
              />
            </div>
          </div>
          <div v-if="!isMobileRef || mobilePlatformRef=='android'" class="fr-col-12 fr-col-lg-6">
            <a
              class="fr-btn fr-btn--secondary"
              href="https://play.google.com/store/apps/details?id=fr.gouv.agora"
              target="_blank"
              rel="noopener"
              title="Télécharger sur GooglePlay - nouvelle fenêtre"
            >
              <VIcon
                :ssr="true"
                icon="agora:google"
                class="fr-mr-1w"
              />
              Télécharger sur GooglePlay
            </a>
            <div v-if="!isMobileRef" class="qr-code fr-my-2w">
              <img
                alt="QR code Agora Google Play"
                src="/qrCodes/qr-code-android.webp"
                style="max-width:150px;"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fr-col-offset-md-1"/>
    <div class="fr-col-12 fr-col-md-5 hero-image-wrapper">
      <img
        src="/smartphones_complet.webp"
        style="max-width: 90%"
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.bandeau-adaptatif {
  background-color: var(--blue-france-975-75);
  color: var(--blue-france-sun-113-625);

  :is(h1, h2) {
    color: var(--blue-france-sun-113-625);
    font-size: 2.5rem;
    line-height: 3rem;
  }

  .fr-btn {
    width: 100%;
    justify-content: center;

    &::after {
      display: none;
    }
  }

  &-image-wrapper {
    display: flex;
    align-items: flex-end;
  }

  .qr-code{
    display: flex;
    justify-content: center;
  }
}

@media screen and (max-width: 767px) {
  .bandeau-adaptatif {
    text-align: center;
  }
}
</style>