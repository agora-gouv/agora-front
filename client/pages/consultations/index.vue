<script setup lang="ts">
definePageMeta({
  layout: 'basic',
})
useHead({
  title: 'Consultations - Agora',
})

const consultations = await (new ConsultationApi().getAllConsultations())
</script>
<template>
  <div class="fr-mb-2w fr-mt-6w">
    <h2>Consultations en cours</h2>

    <DsfrCard
      :img-src="consultation.coverUrl"
      :link="`/consultations/${consultation.slug}`"
      :title="consultation.title"
      description=""
      alt-img=""
      horizontal
      v-for="consultation in consultations.ongoing" :key="consultation.id"
      class="fr-mb-2w"
    >
      <template #start-details>
        <DsfrBadge :label="`${consultation.thematique.picto} ${consultation.thematique.label}`" no-icon/>
      </template>
      <template #end-details>
        <div>se termine le <Date :date="consultation.endDate" /></div>
      </template>
    </DsfrCard>
    

    <h2 id="terminees">Consultations terminées</h2>
    <div class="fr-grid-row fr-grid-row--gutters">
      <ConsultationFiltres class="fr-col fr-col-sm-12 fr-col-md-4" />
      <div class="fr-grid-row fr-col fr-col-sm-12 fr-col-md-8 fr-grid-row--gutters">
        <div class="fr-col fr-col-sm-6 fr-col-md-6 fr-mb-2w" v-for="consultation in consultations.finished" :key="consultation.id">
          <DsfrCard
            :img-src="consultation.coverUrl"
            :link="`/consultations/${consultation.slug}`"
            :title="consultation.title"
            description=""
            alt-img="">
            <template #start-details>
              <DsfrBadge :label="`${consultation.thematique.picto} ${consultation.thematique.label}`" no-icon/>
              <div>terminée le <Date :date="consultation.updateDate" /></div>
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