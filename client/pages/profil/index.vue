<script setup lang="ts">
definePageMeta({
  layout: 'basic'
})
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <h1 class="fr-pt-4w" aria-busy="true" aria-describedby="loader">Mes informations</h1>
      <Loader id="loader" />
    </template>
    <h1 class="fr-pt-4w" aria-busy="false">Mes informations</h1>
    <ProfilForm id="profil-form"/>
  </ClientOnly>
  <ClientOnly>
    <ClearFormButton form="profil-form">
      Supprimer mes informations
    </ClearFormButton>
  </ClientOnly>
</template>