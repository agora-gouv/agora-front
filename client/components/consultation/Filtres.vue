<script setup lang="ts">
// NOTE (GAFI 12-05-2025): Besoin du model parce que les checkboxes VueDSFR ne gèrent pas bien le reset
import ThematiqueApiDTO from "~/client/types/thematique/thematique";

const queries = useRoute().query

function toArray(modalite: unknown): string[] {
  if (Array.isArray(modalite)) return modalite as string[]
  if (typeof modalite === 'string' && modalite.length > 0) return [modalite]
  return []
}

const model = useState('consultation-filtres', () => ({
  titre: (queries.titre as string) ?? "",
  thematique: (queries.thematique as string) ?? "",
  etape: (queries.etape as string) ?? "",
  modaliteParticipation: toArray(queries.modaliteParticipation),
  anneeDeLancement: (queries.anneeDeLancement as string) ?? "",
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

 function dataFromCms() {
   return [
     {text: "Non renseigné", value: ""},
     ...((data["thematiques"] ?? []).map(({label, id}: ThematiqueApiDTO) => ({text: label, value: id})))
   ];
 }
const thematiques: { text: string; value: string }[] = dataFromCms()

const anneeCourante: number = new Date().getFullYear();
const premiereDateDeLancement = 2017 as const;
const NombreAnneeTotale: number = anneeCourante - premiereDateDeLancement + 1

const annees = [
  {text: "Non renseigné", value: ""},
  ...Array.from({ length: NombreAnneeTotale }, (_, i) => String(anneeCourante - i))
  ]
const etapes = useAppConfig().lists.etapesTerminees
const modalites = useAppConfig().lists.modalites

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