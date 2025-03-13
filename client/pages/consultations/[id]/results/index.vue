<script setup lang="ts">

definePageMeta({
  layout: 'basic'
})

const consultationId = useRoute().params.id.toString()
const consultationResults = (await (new ConsultationApi().getConsultationResults(consultationId))).value

// TODO :
// - retourner les questions dans l'ordre
// - trier les réponses par le + de vote
// - design progress bar

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
      <p>{{ consultationResults.participantCount }} participants</p>
    </div>


    <div v-for="consultationQuestion in consultationResults.resultsOpen" :key="consultationQuestion.questionId">
      <h2>{{ consultationQuestion.questionTitle }}</h2>
    </div>

    <div v-for="consultationQuestion in consultationResults.resultsUniqueChoice" :key="consultationQuestion.questionId">
      <h2>{{ consultationQuestion.questionTitle }}</h2>

      <div v-for="consultationResponse in consultationQuestion.responses">
        <label>{{ consultationResponse.label }}</label>
        <progress :value="consultationResponse.ratio" max="100"></progress>
      </div>
    </div>

    <div v-for="consultationQuestion in consultationResults.resultsMultipleChoice" :key="consultationQuestion.questionId">
      <h2>{{ consultationQuestion.questionTitle }}</h2>

      <div v-for="consultationResponse in consultationQuestion.responses">
        <label>{{ consultationResponse.label }}</label>
        <progress :value="consultationResponse.ratio" max="100"></progress>
      </div>
    </div>

  </div>
</template>

<style>
.question-title {
  color: var(--blue-france-sun-113-625)
}

img {
  width: 80%;
}

a {
  color: var(--blue-france-sun-113-625)
}
</style>