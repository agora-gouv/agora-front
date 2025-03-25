<script setup lang="ts">
/* TODO : 
* Get default values
* Send new values
* Feature Flipper
* Explication "De quoi s'agit-il ?" pour les catégories socio-pro
* Explication "Pourquoi me demande-t-on cela ?" pour le fieldset de profil de voteur
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

const categoriesJob = [
  {text: "Agriculteurs", value: 'AG'},
  {text: "Artisans, commerçants, chefs d'entreprise", value: 'AR'},
  {text: "Cadres", value: 'CA'},
  {text: "Professions intermédiaires", value: 'PI'},
  {text: "Employés", value: 'EM'},
  {text: "Ouvriers", value: 'OU'},
  {text: "Étudiants", value: 'ET'},
  {text: "Retraités", value: 'RE'},
  {text: "Autre / Sans activité professionnelle", value: 'AU'},
  {text: "Je ne sais pas", value: 'UN'}
]

const frequences = [
  {label: "Sans réponse", value: ''},
  {label: "Souvent", value: 'S'},
  {label: "Parfois", value: 'P'},
  {label: "Jamais", value: 'J'},
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

    <DsfrSelect
      name="jobCategory"
      :options="categoriesJob"
    >
      <template #label>De quelle catégorie socio-professionnelle faites-vous partie ?</template>
    </DsfrSelect>
    
    <DsfrFieldset>
      <!-- FIXME (GAFI 25-03-2025): Pas très explicite comme legend -->
      <template #legend>Diriez-vous que...</template>
      <template>
        <DsfrRadioButtonSet
          :modelValue="''"
          inline
          :options="frequences"
          name="voteFrequency"
        >
          <template #legend>Je vote&hellip;</template>
        </DsfrRadioButtonSet>
      </template>
    </DsfrFieldset>
  </form>
</template>