<script setup lang="ts">
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
    <DsfrInput name="motCle" label-visible label="Rechercher par mot clé"/>
    <DsfrSelect name="thematique" label="Thématique" :options="thematiques" />
    <DsfrSelect name="etat" label="État de la consultation" :options="etats" />
    <DsfrCheckboxSet legend="Modalités" :options="modalites" :modelValue="[]" />
    <DsfrSelect name="annee" label="Année de la consultation" :options="annees" />
    <DsfrButton type="submit" class="button">Filtrer les consultations</DsfrButton>
    <DsfrButton type="reset" tertiary noOutline icon="ri:refresh-line" class="button">Réinitialiser les filtres</DsfrButton>
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