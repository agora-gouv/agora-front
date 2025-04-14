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
  <h1>Mes informations</h1>
  <ClientOnly>
    <ProfilForm />
  </ClientOnly>
</template>