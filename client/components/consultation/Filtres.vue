<script setup lang="ts">
// NOTE (GAFI 12-05-2025): Besoin du model parce que les checkboxes VueDSFR ne gèrent pas bien le reset
const queries = useRoute().query
const model = useState(() => ({
  motCle: queries['motCle'],
  thematique: queries['thematique'],
  etat: queries['etat'],
  modalite: queries['modalite'],
  annee: Number(queries['annee']) || "",
}))
function reset() {
  model.value = {
    motCle: "",
    thematique: "",
    etat: "",
    modalite: [],
    annee: "",
  }
}

 const thematiques = [
   "Culture",  "Transition Écologique", "Logement",
   "Services publics", "Économie", "Autonomie",
   "Agriculture & alimentation"
 ]
 const etats = [ "À venir", "En cours", "Terminée" ]
 const modalites = [
   { label: "Ouvert à tout le monde", value: "open", name: "modalite" },
   { label: "Par tirage au sort", value: "tirage", name: "modalite" },
   { label: "Consultation en ligne", value: "remote", name: "modalite" },
   { label: "Consultation en local", value: "local", name: "modalite" },
 ]
 const annees = [2020, 2021, 2022, 2023, 2024, 2025, 2026]
</script>

<template>
  <form action="/consultations">
    <DsfrInputGroup name="motCle" label-visible label="Rechercher par mot clé" :modelValue="model.motCle" />
    <DsfrSelect name="thematique" label="Thématique" :options="thematiques" :modelValue="model.thematique" />
    <DsfrSelect name="etat" label="État de la consultation" :options="etats" :modelValue="model.etat" />
    <DsfrCheckboxSet legend="Modalités" :options="modalites" :modelValue="model.modalite" />
    <DsfrSelect name="annee" label="Année de la consultation" :options="annees" :modelValue="model.annee" />
    <DsfrButton type="submit" class="button">Filtrer les consultations</DsfrButton>
    <DsfrButton
      type="reset"
      tertiary
      noOutline
      icon="ri:refresh-line"
      class="button"
      @click.prevent="reset"
    >
      Réinitialiser les filtres
    </DsfrButton>
  </form>
</template>

<style scoped>
.button {
  display: flex;
}
.button:not(:last-child) {
  margin-bottom: 1rem;
}
</style>