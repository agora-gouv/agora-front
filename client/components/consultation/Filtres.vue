<script setup lang="ts">
// NOTE (GAFI 12-05-2025): Besoin du model parce que les checkboxes VueDSFR ne gèrent pas bien le reset
const queries = useRoute().query
const model = useState(() => ({
  titre: queries['titre'] || "",
  thematique: queries['thematique'] || "",
  etape: queries['etape'] || "",
  modaliteParticipation: Array.isArray(queries['participation']) ? queries['participation'] : [queries['participation']], 
  anneeDeLancement: queries['anneeDeLancement'] || "",
}))
function reset() {
  model.value = {
    titre: "",
    thematique: "",
    etape: "",
    modaliteParticipation: [],
    anneeDeLancement: "",
  }
}

const data = await new ThematiqueApi().getAll()
const thematiques: { text: string; value: string }[] = [
    {text: "Non renseigné", value: ""},
    ...((data["thematiques"] ?? []).map(({label, id}) => ({text: label, value: id})))
  ];
const anneeCourante: number = new Date().getFullYear();
const premiereDateDeLancement = 2017;

const annees = [
  {text: "Non renseigné", value: ""},
  ...new Array(anneeCourante - premiereDateDeLancement + 1).fill(0).map((_, i)  => String(anneeCourante - i))
]

const etapes = [{text: "Non renseigné", value: ""}, EtapeTerminee.Resultat, EtapeTerminee.Dispo, EtapeTerminee.Action]
const modalites = [
  { label: ModaliteLabel.Ouvert, name:"participation", value: ModaliteValue.Ouvert},
  { label: ModaliteLabel.Tirage, name:"participation", value: ModaliteValue.Tirage},
  { label: ModaliteLabel.Remote, name:"participation",  value: ModaliteValue.Remote},
  { label: ModaliteLabel.Local, name:"participation", value: ModaliteValue.Local}]

</script>

<template>
  <form action="/je-participe#terminees">
    <h3>Filtres</h3>
    <DsfrInputGroup name="titre" label-visible label="Rechercher par mot clé" v-model="model.titre" />
    <DsfrSelect name="thematique" label="Thématique" :options="thematiques" v-model="model.thematique" />
    <DsfrSelect name="etape" label="Étape" :options="etapes" v-model="model.etape" />
    <DsfrCheckboxSet legend="Modalité de participation" :options="modalites" v-model="model.modaliteParticipation" />
    <DsfrSelect name="anneeDeLancement" label="Année de lancement" :options="annees" v-model="model.anneeDeLancement" />
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