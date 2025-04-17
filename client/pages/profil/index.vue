<script setup lang="ts">
definePageMeta({
  layout: 'basic'
})
</script>

<template>
  <h1 class="fr-pt-4w">Mes informations</h1>
  <ClientOnly>
    <ProfilForm />
  </ClientOnly>
</template>