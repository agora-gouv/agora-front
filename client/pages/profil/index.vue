<script setup lang="ts">
/* TODO : 
* Get default values
* Feature Flipper
* Explication "De quoi s'agit-il ?" pour les catégories socio-pro
* Explication "Pourquoi me demande-t-on cela ?" pour le fieldset de profil de voteur
* */

definePageMeta({
  layout: 'basic'
})


async function submit(event) {
  const {jwtToken} = await useAuthentication()
  const formData = new FormData(event.currentTarget)
  await new ProfilApi().editProfil({
      "gender": formData.get('gender'),
      "yearOfBirth": Number(formData.get('yearOfBirth')),
      "department": formData.get('department'),
      "cityType": formData.get('cityType'),
      "jobCategory": formData.get('jobCategory'),
      "voteFrequency": formData.get('voteFrequency'),
      "publicMeetingFrequency": formData.get('publicMeetingFrequency'),
      "consultationFrequency": formData.get('consultationFrequency'),
    }, jwtToken)
}

const genres = [
  {text: "Non renseigné", value: ''},
  {text: "Une femme", value: 'F'},
  {text: "Un homme", value: 'M'},
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
  <form @submit.prevent="submit">
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

        <DsfrRadioButtonSet
          :modelValue="''"
          inline
          :options="frequences"
          name="publicMeetingFrequency"
        >
          <template #legend>Je m'engage sur le terrain&hellip;</template>
          <template #hint>Exemples : faire partie d'une association, manifester, participer à des débats publics ou aux conseils municipaux
            de ma ville, etc.
          </template>
        </DsfrRadioButtonSet>

        <DsfrRadioButtonSet
          :modelValue="''"
          inline
          :options="frequences"
          name="consultationFrequency"
        >
          <template #legend>Je m'engage en ligne&hellip;</template>
          <template #hint>Exemples : donner mon avis via des consultations en ligne, signer une pétition, défendre des causes sur les
            réseaux sociaux, etc.
          </template>
        </DsfrRadioButtonSet>
      </template>
    </DsfrFieldset>
    <DsfrButton label="Enregistrer"/>
  </form>
</template>