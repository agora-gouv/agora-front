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
  <p>
    Ce site est produit par le centre interministériel de la participation citoyenne, au sein de la DITP.
    <a href="https://www.modernisation.gouv.fr/associer-les-citoyens/centre-interministeriel-de-la-participation-citoyenne">Qui sommes-nous ?</a>
  </p>
  <BandeauTelechargementAdaptatif title="Également disponible sur mobile" />
</template>