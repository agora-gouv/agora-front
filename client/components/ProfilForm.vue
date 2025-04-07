<script setup lang="ts">
/* TODO : 
* Feature Flipper
* Explication "De quoi s'agit-il ?" pour les catégories socio-pro
* Explication "Pourquoi me demande-t-on cela ?" pour le fieldset de profil de voteur
* mettre l'année actuelle comme valeur max pour yearOfBirth
* Notif on success
* */

const {jwtToken} = await useAuthentication()
const profil = await new ProfilApi().getProfil(jwtToken);

async function submit(event) {
  const formData = new FormData(event.currentTarget)
  await new ProfilApi().editProfil({
    "gender": formData.get('gender'),
    "yearOfBirth": formData.get('yearOfBirth') && Number(formData.get('yearOfBirth')),
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
  <form @submit.prevent="submit">
    <DsfrSelect
      name="gender"
      :options="genres"
      :model-value="profil?.gender"
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
          :model-value="profil?.yearOfBirth"
        >
          <template #label>Quelle est votre année de naissance ?</template>
        </DsfrInput>
    
        <DsfrInput
          name="department"
          labelVisible
          type="text"
          placeholder="75"
          hint="Indiquez le numéro de département. Exemple : 75"
          :model-value="profil?.department"
        >
          <template #label>Dans quel département ou collectivité d'outre-mer vivez-vous ?</template>
        </DsfrInput>

        <DsfrSelect
          name="cityType"
          :options="typesVilles"
          :model-value="profil?.cityType"
        >
          <template #label>Vous habitez plutôt&hellip;</template>
        </DsfrSelect>

        <DsfrSelect
          name="jobCategory"
          :options="categoriesJob"
          :model-value="profil?.jobCategory"
        >
          <template #label>De quelle catégorie socio-professionnelle faites-vous partie ?</template>
        </DsfrSelect>

        <DsfrFieldset>
          <!-- FIXME (GAFI 25-03-2025): Pas très explicite comme legend -->
          <template #legend>Diriez-vous que...</template>
            <DsfrRadioButtonSet
              inline
              :options="frequences"
              name="voteFrequency"
              :model-value="profil?.voteFrequency"
            >
              <template #legend>Je vote&hellip;</template>
            </DsfrRadioButtonSet>

            <DsfrRadioButtonSet
              :model-value="profil?.publicMeetingFrequency"
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
              :model-value="profil?.consultationFrequency"
              inline
              :options="frequences"
              name="consultationFrequency"
            >
              <template #legend>Je m'engage en ligne&hellip;</template>
              <template #hint>Exemples : donner mon avis via des consultations en ligne, signer une pétition, défendre des causes sur les
                réseaux sociaux, etc.
              </template>
            </DsfrRadioButtonSet>
        </DsfrFieldset>
    <DsfrButton label="Enregistrer"/>
  </form>
</template>
