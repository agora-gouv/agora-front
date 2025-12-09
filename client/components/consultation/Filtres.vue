<script setup lang="ts">
// NOTE (GAFI 12-05-2025): Besoin du model parce que les checkboxes VueDSFR ne gèrent pas bien le reset
import {FicheInventaireDTO} from "~/types/fiche_inventaire/ficheInventaire";
const queries = useRoute().query

function getArrayQueryParam(paramName: string) {
  return Array.isArray(queries[paramName]) ? queries[paramName] : [queries[paramName]];
}

let model = useState('filtre', () => ({
  titre: queries['titre'] || "",
  thematique: queries['thematique'] || "",
  etape: queries['etape'] || "",
  modaliteParticipation: getArrayQueryParam("conditionParticipation").concat(getArrayQueryParam("modaliteParticipation")),
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

const etapes = [{text: "Non renseigné", value: ""},
  {text: "Résultats à venir", value: FicheInventaireDTO.Etape.ResultatAVenir},
  {text: "Résultats disponibles", value: FicheInventaireDTO.Etape.ResultatDispo},
  {text: "Actions", value: FicheInventaireDTO.Etape.Actions,}]

const modalites = [
  { label: "Ouvert à tous", name:"conditionParticipation", value: FicheInventaireDTO.Condition.Ouvert},
  { label: "Tirage au sort représentatif", name:"conditionParticipation", value: FicheInventaireDTO.Condition.Tirage},
  { label: "En ligne", name:"modaliteParticipation",  value: FicheInventaireDTO.Modalite.Remote},
  { label: "En présentiel", name:"modaliteParticipation", value: FicheInventaireDTO.Modalite.Local}]

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