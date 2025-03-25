<script setup lang="ts">
/* TODO : 
* Get default values
* Send new values
* Feature Flipper
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

const typesVilles = [
  {text: "Non renseigné", value: ''},
  {text: "En milieu rural", value: 'R'},
  {text: "En milieu urbain", value: 'U'},
  {text: "Autre / Je ne sais pas", value: 'A'},
]

</script>

<template>
  <h1>Mes informations</h1>
  <form action="/profile" method="POST">
    <DsfrSelect
      name="gender"
      :options="genres"
    >
      <template #label>Vous êtes&hellip;</template>
    </DsfrSelect>

    <DsfrInput
      name="yearOfBirth"
      labelVisible
      type="number"
      min="1900"
      max="9999"
      placeholder="YYYY"
    >
      <template #label>Quelle est votre année de naissance ?</template>
    </DsfrInput>

    <DsfrInput
      name="department"
      labelVisible
      type="text"
      placeholder="75"
      hint="Indiquez le numéro de département. Exemple : 75"
    >
      <template #label>Dans quel département ou collectivité d'outre-mer vivez-vous ?</template>
    </DsfrInput>

    <DsfrSelect
      name="cityType"
      :options="typesVilles"
    >
      <template #label>Vous habitez plutôt&hellip;</template>
    </DsfrSelect>
  </form>
</template>