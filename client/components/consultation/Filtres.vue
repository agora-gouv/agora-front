<script setup lang="ts">
// NOTE (GAFI 12-05-2025): Besoin du model parce que les checkboxes VueDSFR ne gèrent pas bien le reset
const queries = useRoute().query
const model = useState(() => ({
  motCle: queries['motCle'] || "",
  thematique: queries['thematique'] || "",
  etapes: queries['etapes'] || "",
  modalite: queries['modalite'] || [],
  annee: queries['annee'] || "",
}))
function reset() {
  model.value = {
    motCle: "",
    thematique: "",
    etapes: "",
    modalite: [],
    annee: "",
  }
}

 const thematiques = [
   { text: "Non renseigné", value: "" }, "Culture",
   "Transition Écologique", "Logement", "Services publics",
   "Économie", "Autonomie", "Agriculture & alimentation"
 ]
 const etapes = [ { text: "Non renseigné", value: "" }, "À venir", "En cours", "Résultats à venir", "Résultats disponibles", "Actions" ]
 const modalites = [
   { label: "Ouvert à tous", value: "open", name: "modalite" },
   { label: "Tirage au sort représentatif", value: "tirage", name: "modalite" },
   { label: "En ligne", value: "remote", name: "modalite" },
   { label: "En présentiel", value: "local", name: "modalite" },
]

 const annees = [ { text: "Non renseigné", value: "" }, "2020", "2021", "2022", "2023", "2024", "2025", "2026" ]
</script>

<template>
  <form action="/fiches-inventaire#terminees">
    <h3>Filtres</h3>
    <DsfrInputGroup name="motCle" label-visible label="Rechercher par mot clé" v-model="model.motCle" />
    <DsfrSelect name="thematique" label="Thématique" :options="thematiques" v-model="model.thematique" />
    <DsfrSelect name="etape" label="Étape" :options="etapes" v-model="model.etapes" />
    <DsfrCheckboxSet legend="Modalités de participation" :options="modalites" v-model="model.modalite" />
    <DsfrSelect name="annee" label="Année de lancement" :options="annees" v-model="model.annee" />
    <DsfrButton type="submit" class="button">Filtrer les dispositifs</DsfrButton>
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