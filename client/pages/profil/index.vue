<script setup lang="ts">
/* TODO : 
* Get default values
* Send new values
* */

definePageMeta({
  layout: 'basic'
})

const genres = [
  {text: "Non renseigné", value: ''},
  {text: "Une femme", value: 'M'},
  {text: "Un homme", value: 'F'},
  {text: "Autre", value: 'A'}
]

</script>

<template>
  <h1>Mes informations</h1>
  <form action="/profile" method="POST">
    <DsfrSelect
      :options="genres"
    >
      <template #label>Vous êtes...</template>
    </DsfrSelect>
  </form>
</template>