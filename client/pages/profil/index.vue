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
    <ProfilForm class="fr-pb-4w" />
  </ClientOnly>
  <p>Ces informations nous permettent d'analyser plus finement les résultats des consultations à des fins statistiques et de manière anonyme.</p>
  <p>Conformément au RGPD, vous avez la possibilité de consulter, modifier ou supprimer l'ensemble des informations vous concernant.</p>
  <a href="/politique-confidentialite">Lire la politique de confidentialité</a>
</template>

<style>
form::after {
  content: "";
  border-bottom: var(--blue-france-main-525) 4px solid;
  width: 80px;
  height: 20px;
  display: block;
}
</style>