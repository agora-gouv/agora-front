<script setup lang="ts">
definePageMeta({
  layout: 'basic',
})
useHead({
  title: 'Consultations - Agora',
})

const runtimeConfig = useRuntimeConfig()
const domainUrl = runtimeConfig.public.domainName

const consultations = await (new ConsultationApi().getAllConsultations())
</script>
<template>
  <div class="fr-mb-2w fr-mt-6w">
    <h2>Consultations en cours</h2>

    <DsfrCard
      :img-src="consultation.coverUrl"
      :link="`${domainUrl}/consultations/${consultation.slug}`"
      :title="consultation.title"
      :badges="[{label: consultation.thematique.picto + consultation.thematique.label, type: 'new'}]"
      description=""
      :end-detail="'se termine le ' + consultation.endDate.substring(0, 10)"
      alt-img=""
      horizontal
      v-for="consultation in consultations.ongoing" :key="consultation.id"
      class="fr-mb-2w"
    />

    <h2>Consultations terminées</h2>
    <div class="fr-grid-row">
      <div class="fr-col fr-col-sm-6 fr-col-md-4 fr-mb-2w" v-for="consultation in consultations.finished" :key="consultation.id">
        <DsfrCard
          :img-src="consultation.coverUrl"
          :link="`${domainUrl}/consultations/${consultation.slug}`"
          :title="consultation.title"
          :badges="[{label: consultation.thematique.picto + consultation.thematique.label, type: 'info'}]"
          description=""
          alt-img=""
        />
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