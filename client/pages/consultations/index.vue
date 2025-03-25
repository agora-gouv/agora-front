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
      :link="consultation.slug"
      :title="consultation.title"
      :badges="[{label: consultation.thematique.picto + consultation.thematique.label, type: 'new'}]"
      description=""
      :end-detail="'se termine le ' + consultation.endDate.substring(0, 10)"
      alt-img=""
      horizontal
      v-for="consultation in consultations.ongoing" :key="consultation.id"
    />
    
    <h2>Consultations terminées</h2>
    <div class="fr-grid-row">
      <div class="fr-col fr-col-sm-6 fr-col-md-4 fr-mb-2w" v-for="consultation in consultations.finished" :key="consultation.id">
        <div class="fr-card fr-enlarge-link fr-mx-2w">
          <div class="fr-card__body">
            <div class="fr-card__content">
              <div class="fr-card__start">
                <ul class="fr-tags-group">
                  <li>
                    <p class="fr-tag">Consultation terminée</p>
                  </li>
                </ul>
              </div>
              <h3 class="fr-card__title"><a :href="`consultations/${consultation.slug}`">{{ consultation.title }}</a></h3>
            </div>
          </div>
          <div class="fr-card__header">
            <div class="fr-card__img">
              <img class="fr-responsive-img" :src="consultation.coverUrl" alt=""/>
            </div>
            <ul class="fr-badges-group">
              <li>
                <p class="fr-badge">{{ consultation.thematique.picto }} {{ consultation.thematique.label }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.fr-card {
  margin-bottom: 2rem;
}

.fr-badge {
  font-size: 12px;
}

.fr-card .fr-card__body {
  display: flex;
  flex-direction: row;
  padding: 0;
}

.fr-card .fr-card__body .fr-card__content {
  margin: 0;
  padding-bottom: 0;
}

.fr-card__detail {
  font-size: 14px;
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