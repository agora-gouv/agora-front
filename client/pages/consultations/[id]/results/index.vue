<script setup lang="ts">

definePageMeta({
  layout: 'basic'
})

const consultationId = useRoute().params.id.toString()
const consultationResults = (await (new ConsultationApi().getConsultationResults(consultationId))).value

</script>

<template>
  <div class="fr-grid fr-mb-2w fr-mt-6w">
    <div class="fr-grid-row fr-grid-row--middle fr-grid-row--gutters">
      <div class="fr-col-md-6 fr-col-12">
        <h1>{{ consultationResults.title }}</h1>
      </div>
      <div class="fr-col-md-6 fr-col-12">
        <img class="fr-responsive-img" :src="consultationResults.coverUrl" alt="">
      </div>
    </div>

    <div>
      <h2>Réponses des participants</h2>
      <p><VIcon
        :ssr="true"
        :inline="true"
        icon="ri:group-line"
        class="icon"
      /> {{ consultationResults.participantCount }} participants</p>
    </div>

    <div class="question" v-for="consultationQuestion in consultationResults.resultsUniqueChoice" :key="consultationQuestion.questionId">
      <h3>{{ consultationQuestion.questionTitle }}</h3>

      <div v-for="consultationResponse in consultationQuestion.responses" style="position: relative;">
        <ConsultationQuestionResult :value="consultationResponse.ratio">
          <template #label>
            {{consultationResponse.label}}
          </template>
        </ConsultationQuestionResult>
      </div>
    </div>

    <div class="question" v-for="consultationQuestion in consultationResults.resultsOpen" :key="consultationQuestion.questionId">
      <h3>{{ consultationQuestion.questionTitle }}</h3>
      <p>L’analyse des réponses à cette question sera disponible dans la synthèse</p>
    </div>

    <div class="question" v-for="consultationQuestion in consultationResults.resultsMultipleChoice" :key="consultationQuestion.questionId">
      <h3>{{ consultationQuestion.questionTitle }}</h3>
      <p>Plusieurs réponses possibles</p>
      <div v-for="consultationResponse in consultationQuestion.responses">
        <ConsultationQuestionResult :value="consultationResponse.ratio">
          <template #label>
            {{consultationResponse.label}}
          </template>
        </ConsultationQuestionResult>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
.question-title {
  color: var(--blue-france-sun-113-625)
}

.question {
  margin-top: 3em;
}

img {
  width: 80%;
}

a {
  color: var(--blue-france-sun-113-625)
}

h2 {
  color: var(--blue-france-sun-113-625);
}

h3 {
  font-size: 18px;
}
</style>