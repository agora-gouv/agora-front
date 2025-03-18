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
    <div class="fr-card fr-enlarge-link fr-card--horizontal" v-for="consultation in consultations.ongoing" :key="consultation.id">
      <div class="fr-card__body">
        <div class="fr-card__header">
          <div class="fr-card__img">
            <img class="fr-responsive-img" :src="consultation.coverUrl" alt=""/>
          </div>
        </div>
        <div class="fr-card__content">
          <h3 class="fr-card__title">
            <a :href="consultation.slug">{{ consultation.title }}</a>
          </h3>
          <div class="fr-card__start">
            <ul class="fr-tags-group">
              <li>
                <p class="fr-badge fr-badge--purple-glycine">{{ consultation.thematique.picto }} {{ consultation.thematique.label }}</p>
              </li>
            </ul>
            <p class="fr-card__detail fr-icon-warning-fill">cette consultation se terminera le {{ consultation.endDate }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="fr-card fr-enlarge-link fr-card--horizontal" v-for="consultation in consultations.finished" :key="consultation.id">
      <div class="fr-card__header">
        <div class="fr-card__img">
          <img class="fr-responsive-img" :src="consultation.coverUrl" alt=""/>
        </div>
      </div>
      <div class="fr-card__body">
        <div class="fr-card__content">
          <h3 class="fr-card__title">
            <a :href="consultation.slug">{{ consultation.title }}</a>
          </h3>
          <div class="fr-card__start">
            <ul class="fr-tags-group">
              <li>
                <p class="fr-tag">{{ consultation.thematique.label }}</p>
              </li>
              <li>
                <p class="fr-tag">{{ consultation.territory }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

.fr-card {
  margin-bottom: 2rem;
}

.fr-card__body {
  display: flex;
  flex-direction: row;
}

.fr-card__content {
  margin: 0;
}

h1 {
  color: var(--blue-france-sun-113-625);
}

p {
  font-size: 16px;
}
</style>