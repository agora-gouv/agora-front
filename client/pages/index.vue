<script setup lang="ts">
definePageMeta({
  layout: 'basic',
})

useHead({
  title: 'Accueil - Agora',
})

const runtimeConfig = useRuntimeConfig();
const displayBanner = runtimeConfig.public.features.aLaUne
</script>

<template>
  <HomeALaUne v-if="displayBanner" />
  <HomeHero class="fr-pt-4w" />
  <HomeFonctionnalites />
  <HomePGO />
  <BandeauTelechargementAdaptatif title="Ne manquez rien avec l'application mobile Agora." />
</template>