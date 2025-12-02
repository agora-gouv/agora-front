<script setup lang="ts">
// NOTE (GAFI 12-05-2025): Besoin du model parce que les checkboxes VueDSFR ne gèrent pas bien le reset
import ThematiqueApiDTO from "~/client/types/thematique/thematique";

const queries = useRoute().query

const model = useState(() => ({
  titre: queries['titre'] || "",
  thematique: queries['thematique'] || "",
  etape: queries['etape'] || "",
  modaliteParticipation: queries['modaliteParticipation'] || [],
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

 function dataFromCms() {
   return [
     {text: "Non renseigné", value: ""},
     ...((data["thematiques"] ?? []).map(({label, id}: ThematiqueApiDTO) => ({text: label, value: id})))
   ];
 }

 const thematiques: { text: string; value: string }[] = dataFromCms()
 const etapes = [ { text: "Non renseigné", value: "" }, "À venir", "En cours", "Résultats à venir", "Résultats disponibles", "Actions" ]
 const modalites = [
   { label: "Ouvert à tous", value: "open", name: "modalite" },
   { label: "Tirage au sort représentatif", value: "tirage", name: "modalite" },
   { label: "En ligne", value: "remote", name: "modalite" },
   { label: "En présentiel", value: "local", name: "modalite" },
]

 const annees = [ { text: "Non renseigné", value: "" }, "2020", "2021", "2022", "2023", "2024", "2025", "2026" ]

function isEmptyValue(val: unknown): boolean {
  if (val == null) return true
  if (typeof val === 'string') return val.trim() === ''
  if (Array.isArray(val)) return val.length === 0
  if (typeof val === 'object') return Object.keys(val as object).length === 0
  return false
}
function normalize(val: unknown) {
  if (typeof val === 'string') return val.trim()
  if (Array.isArray(val)) return val.map(x => typeof x === 'string' ? x.trim() : x).filter(x => !isEmptyValue(x))
  return val
}

function cleanQuery(raw: Record<string, any>) {
  const entries = Object.entries(raw).map(([k, v]) => [k, normalize(v)])
  return Object.fromEntries(entries.filter(([, v]) => !isEmptyValue(v)))
}

 async function onSubmit() {
   const query = cleanQuery(model.value as any)
   await useRouter().push({ path: '/je-participe', query, hash: '#terminees'})
 }
</script>

<template>
  <form @submit.prevent="onSubmit">
    <h3>Filtres</h3>
    <DsfrInputGroup name="titre" label-visible label="Rechercher par mot clé" v-model="model.titre" />
    <DsfrSelect name="thematique" label="Thématique" :options="thematiques" v-model="model.thematique" />
    <DsfrSelect name="etape" label="Étape" :options="etapes" v-model="model.etape" />
    <DsfrCheckboxSet legend="modaliteParticipation de participation" :options="modalites" v-model="model.modaliteParticipation" />
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