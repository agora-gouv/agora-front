<script setup lang="ts">
/* TODO : 
* Get default values
* Feature Flipper
* Explication "De quoi s'agit-il ?" pour les catégories socio-pro
* Explication "Pourquoi me demande-t-on cela ?" pour le fieldset de profil de voteur
* mettre l'année actuelle comme valeur max pour yearOfBirth
* */

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
    <ProfilForm />
  </ClientOnly>
</template>