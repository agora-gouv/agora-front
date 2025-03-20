<script setup lang="ts">

definePageMeta({
  layout: 'basic',
})
useHead({
  title: 'Réponses des Questions au Gouvernement - Agora',
})

const qags = (await (new QagApi().getQags(1))).value.responses
</script>
<template>
  <div class="fr-mb-2w fr-mt-6w">
    <div class="fr-grid-row fr-mb-1w">
      <div class="fr-col-md-6 fr-col-md" v-for="qag in qags" :key="qag.qagId">
        <div class="fr-card fr-enlarge-link fr-mx-2w">
          <div class="fr-card__body">
            <div class="fr-card__content">
              <h3 class="fr-card__title">
                <a :href="`qags/${qag.qagId}`">{{qag.title}}</a>
              </h3>
            </div>
          </div>
          <div class="fr-card__header">
            <ul class="fr-badges-group">
              <li>
                <p class="fr-badge fr-badge--green-emeraude">{{ qag.thematique.picto }} {{ qag.thematique.label }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.fr-card__title {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
  margin: 0;
  color: #333;
}
</style>