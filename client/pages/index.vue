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
  <BandeauTelechargementAdaptatif title="Ne manquez rien avec l'application mobile Agora." />
</template>