<script setup lang="ts">
const {jwtToken} = await useAuthentication()
const profil = await new ProfilApi().getProfil(jwtToken);
const status = useState<'pending' | 'success' | 'error'>(() => 'pending')
const categorieSocioProModalOpen = useState<boolean>(() => false);
const profilVoteurModalOpen = useState<boolean>(() => false);

const { id = useId() } = defineProps<{
  id?: string
}>()

function convertLetters(code: string) {
  return code.replace(/([A-Za-z])/, (match, letter) => `0${letter}`)
}

const departements = useNuxtApp().$departements
  .value
  .regions
  .flatMap(region => region.departements)
  .sort((departement1, departement2) => convertLetters(departement1.codePostal)
    .localeCompare(convertLetters(departement2.codePostal), undefined, { numeric: true }))
  .map(departement => ({
    value: departement.codePostal,
    text: `${departement.codePostal} – ${departement.label}`
  }))
const departementsOptions = [
  { value: '', text: 'Non renseigné'},
  ...departements,
  { value: '99', text: '99 – Étranger' }
]

async function submit(event) {
  const formData = new FormData(event.currentTarget)
  status.value = "pending"
  try {
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
    status.value = "success"
  } catch (error) {
    status.value = "error"
  }
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
  {text: "Non renseigné", value: ''},
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

const maxYear = new Date().getFullYear()

const vAutofocus = {
  mounted: (element) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion)').matches
    element.scrollIntoView({
      block: "center",
      behavior: prefersReducedMotion ? "auto" : "smooth"
    })
    element.focus({ preventScroll: true, focusVisible: true, })
  } 
}
</script>

<template>
  <DsfrAlert tabindex="-1" v-autofocus v-if="status === 'success'" type="success" title="Modifications enregistrées" class="fr-mb-4w">
    Vos modifications ont été enregistrées avec succès.
  </DsfrAlert>
  <DsfrAlert tabindex="-1" v-autofocus v-if="status === 'error'" type="error" title="Un problème est survenu" class="fr-mb-4w">
    <p>
      Un problème est survenu avec l'enregistrement de vos informations.
      Veuillez réessayer plus tard.
    </p>
    <DsfrButton label="Réessayer" type="submit" :form="id"/>
  </DsfrAlert>
  <ProfilCategorieSocioProModal :open="categorieSocioProModalOpen" @close="() => categorieSocioProModalOpen = false" />
  <ProfilVoteurModal :open="profilVoteurModalOpen" @close="() => profilVoteurModalOpen = false" />
  <form @submit.prevent="submit" :id="id" v-bind="$attrs">
    <DsfrSelect
      name="gender"
      :options="genres"
      :model-value="profil?.gender"
    >
      <template #label>Vous êtes&hellip;</template>
    </DsfrSelect>

    <DsfrInputGroup
      name="yearOfBirth"
      labelVisible
      type="number"
      min="1900"
      :max="maxYear"
      placeholder="YYYY"
      label="Quelle est votre année de naissance ?"
      :model-value="profil?.yearOfBirth"
    >
    </DsfrInputGroup>

    <div role="group">
      <DsfrSelect
        name="department"
        labelVisible
        label="Dans quel département ou collectivité d'outre-mer vivez-vous ?"
        :options="departementsOptions"
        :model-value="profil?.department"
        selectId="select-departement"
      >
      </DsfrSelect>
      <SetValueButton for="select-departement" value="99">
        J'habite à l'étranger
      </SetValueButton>
    </div>

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
      <template #label>
        De quelle catégorie socio-professionnelle faites-vous partie ?
        <!-- FIXME (GAFI 22-04-2025): Devrait être en dehors du label -->
        <DsfrButton
          class="aide-saisie"
          label="De quoi s'agit-il ?"
          type="button"
          tertiary
          @click="() => categorieSocioProModalOpen = true"
        />
      </template>
    </DsfrSelect>

    <DsfrFieldset>
      <!-- FIXME (GAFI 25-03-2025): Pas très explicite comme legend -->
      <template #legend>Diriez-vous que...</template>
      <DsfrButton
        class="aide-saisie"
        label="Pourquoi me demande-t-on cela ?"
        type="button"
        tertiary
        @click="() => profilVoteurModalOpen = true"
      />

      <DsfrRadioButtonSet
        inline
        :options="frequences"
        name="voteFrequency"
        :model-value="profil?.voteFrequency ?? ''"
      >
        <template #legend>Je vote&hellip;</template>
      </DsfrRadioButtonSet>

      <DsfrRadioButtonSet
        :model-value="profil?.publicMeetingFrequency ?? ''"
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
        :model-value="profil?.consultationFrequency ?? ''"
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

<style>
div[role="group"] * + button[aria-controls] {
  margin-top: -.5rem;
}
div[role="group"] {
  margin-bottom: 1.5rem;
}
/* FIXME (GAFI 28-04-2025): Nécessaire pour palier au style scopé du VueDSFR */
button.aide-saisie.aide-saisie {
  display: flex;
}
legend + button.aide-saisie,
legend + * > button.aide-saisie:first-child {
  margin-top: -1rem;
  margin-bottom: 1rem;
}
</style>