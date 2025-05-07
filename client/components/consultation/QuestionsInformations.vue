<script setup lang="ts">
defineProps<{
  questionsInfo: {
    endDate: string,
    questionCount: string,
    estimatedTime: string,
    participantCount: number,
    participantCountGoal: number
  },
  consultationEstEnCours: boolean
}>()
</script>

<template>
  <div v-if="questionsInfo && consultationEstEnCours" class="info-question fr-py-1w">
    <div class="fr-mb-2w">
      <VIcon icon="ri:calendar-2-line" :inline="true" :ssr="true"/>
      Jusqu'au
      <Date :date="questionsInfo.endDate"/>
    </div>
    <div class="fr-mb-2w">
      <VIcon :ssr="true" icon="ri:questionnaire-line" :inline="true"/>
      {{ questionsInfo.questionCount }}
    </div>
    <div class="fr-mb-2w">
      <VIcon :ssr="true" icon="ri:timer-line" :inline="true"/>
      {{ questionsInfo.estimatedTime }}
    </div>
    <div class="fr-mb-2w">
      <VIcon :ssr="true" icon="ri:group-line" :inline="true"/>
      <span class="fr-pl-1v" v-if="questionsInfo.participantCount == 0">Aucun participant</span>
      <span class="fr-pl-1v" v-else-if="questionsInfo.participantCount == 1">1 participant</span>
      <span class="fr-pl-1v" v-else>{{ questionsInfo.participantCount }} participants</span>
      <div class="fr-mt-1w fr-ml-3w">
        <meter id="objectif" min="0" :max="questionsInfo.participantCountGoal"
               :value="questionsInfo.participantCount">
          {{ questionsInfo.participantCount }} sur un objectif de {{ questionsInfo.participantCountGoal }}
        </meter>
        Prochain objectif : {{ questionsInfo.participantCountGoal }} participants !
      </div>
    </div>
  </div>
</template>

<style>
.iconify {
  color: var(--blue-france-sun-113-625);
  width: 1.2em;
  height: 1.2em;
  margin-right: 0.5em;
}
</style>