<script setup lang="ts">
definePageMeta({
  layout: 'basic'
})
useHead({
  title: 'Mon profil - Agora'
})

const app = useNuxtApp()
if (!app.$departements) {
  const departements = await new DepartementsApi().getDepartements();
  app.provide('departements', departements);
}
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <h1 class="fr-pt-4w" aria-busy="true" aria-describedby="loader">Mes informations</h1>
      <Loader id="loader" />
    </template>
    <h1 class="fr-pt-4w" aria-busy="false">Mes informations</h1>
    <ProfilPage />
  </ClientOnly>
</template>
