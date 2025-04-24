<script setup lang="ts">
definePageMeta({
  layout: 'basic',
})
useHead({
  title: 'Fiches inventaire - Agora',
})

const fiches = await (new FicheInventaireApi().getAll())

const today = new Date()

const fichesAVenir = fiches.filter(fiche => {
  const dateDebut = new Date(fiche.debut)
  return dateDebut > today
})
const fichesEnCours = fiches.filter(fiche => {
  const dateFin = new Date(fiche.fin)
  const dateDebut = new Date(fiche.debut)
  return dateFin > today && dateDebut < today
})
const fichesTerminees = fiches.filter(fiche => {
  const dateFin = new Date(fiche.fin)
  return dateFin < today
})

</script>
<template>
  <div class="fr-mb-2w fr-mt-6w">
    <div v-if="fichesAVenir.length > 0">
      <h2>Fiches à venir</h2>

      <DsfrCard
        :img-src="fiche.illustrationUrl"
        :link="`/fiches-inventaire/${fiche.id}`"
        :title="fiche.titre"
        description=""
        alt-img=""
        horizontal
        v-for="fiche in fichesAVenir" :key="fiche.id"
        class="fr-mb-2w"
      >
        <template #start-details>
          <DsfrBadge :label="`${fiche.thematique.picto} ${fiche.thematique.label}`" no-icon/>
        </template>
        <template #end-details>
          <div>se termine le <Date :date="fiche.fin" /></div>
        </template>
      </DsfrCard>
    </div>
    
    <div v-if="fichesEnCours.length > 0">
      <h2>Fiches en cours</h2>

      <DsfrCard
        :img-src="fiche.illustrationUrl"
        :link="`/fiches-inventaire/${fiche.id}`"
        :title="fiche.titre"
        description=""
        alt-img=""
        horizontal
        v-for="fiche in fichesEnCours" :key="fiche.id"
        class="fr-mb-2w"
      >
        <template #start-details>
          <DsfrBadge :label="`${fiche.thematique.picto} ${fiche.thematique.label}`" no-icon/>
        </template>
        <template #end-details>
          <div>se termine le <Date :date="fiche.fin" /></div>
        </template>
      </DsfrCard>
    </div>

    <div v-if="fichesTerminees.length > 0">
      <h2>Fiches terminées</h2>
      <div class="fr-grid-row">
        <div class="fr-col fr-col-sm-6 fr-col-md-4 fr-mb-2w" v-for="fiche in fichesTerminees" :key="fiche.id">
          <DsfrCard
            :img-src="fiche.illustrationUrl"
            :link="`/fiches-inventaire/${fiche.id}`"
            :title="fiche.titre"
            description=""
            alt-img="">
            <template #start-details>
              <DsfrBadge :label="`${fiche.thematique.picto} ${fiche.thematique.label}`" no-icon/>
              <div>terminée le <Date :date="fiche.fin" /></div>
            </template>
            <template #end-details>
            </template>
          </DsfrCard>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.fr-grid-row .fr-card {
  min-height: 100%;
  height: auto;
  margin-left: 1rem;
  margin-right: 1rem;
}

.fr-badge {
  font-size: 12px;
}

.fr-card__start div {
  font-size: 12px;
}

h1, h2 {
  color: var(--blue-france-sun-113-625);
}

h2 {
  margin-bottom: 2rem;
  margin-top: 4rem;
}

p {
  font-size: 16px;
}
</style>