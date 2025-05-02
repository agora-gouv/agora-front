<script setup lang="ts">
definePageMeta({
  layout: 'basic',
})

useHead({
  title: 'Accueil - Agora',
})
</script>

<template>
  <HomeALaUne />
  <HomeHero class="fr-pt-4w" />
  <HomeFonctionnalites />
  <BandeauTelechargementAdaptatif title="Également disponible sur mobile" />
</template>