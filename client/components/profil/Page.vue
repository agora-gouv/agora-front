<script setup lang="ts">
const {jwtToken} = await useAuthentication()
const { data: profil, refresh } = await new ProfilApi().getProfil(jwtToken);

const status = useState<'pending' | 'success' | 'error'>(() => 'pending')

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

async function clearData(event) {
  status.value = "pending"
  try {
    await new ProfilApi().resetProfil(jwtToken)
    await refresh();
    status.value = "success"
  } catch (error) {
    status.value = "error"
  }
}

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
  <ProfilForm class="fr-pb-4w" id="profil-form" @submit="submit" :profil="profil"/>
  <p>Ces informations nous permettent d'analyser plus finement les résultats des consultations à des fins statistiques et de manière anonyme.</p>
  <p>Conformément au RGPD, vous avez la possibilité de consulter, modifier ou supprimer l'ensemble des informations vous concernant.</p>
  <p><a href="/politique-confidentialite">Lire la politique de confidentialité</a></p>
  <DsfrButton secondary class="danger" @click="clearData">
    Supprimer mes informations
  </DsfrButton>
</template>

<style>
form::after {
  content: "";
  border-bottom: var(--blue-france-main-525) 4px solid;
  width: 80px;
  height: 20px;
  display: block;
}

button.danger {
  --border-action-high-blue-france: var(--border-plain-error);
  --text-action-high-blue-france: var(--text-default-error);
  --hover-tint: var(--background-contrast-error-hover);
  --active-tint: var(--background-contrast-error-active);
}
</style>