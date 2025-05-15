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
        <label class="progress-label">
          <span class="ratio">{{ consultationResponse.ratio }} %</span>
          {{ consultationResponse.label }}
        </label>
        <progress :value="consultationResponse.ratio" max="100"></progress>
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
        <label class="progress-label">
          <span class="ratio">{{ consultationResponse.ratio }} %</span>
          {{ consultationResponse.label }}
        </label>
        <progress :value="consultationResponse.ratio" max="100"></progress>
      </div>
    </div>

  </div>
</template>

<style>
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

progress {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: white;
  border: 1px solid #bbbbbb;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

progress::-webkit-progress-bar {
  background-color: white;
  border-radius: 5px;
}

progress::-webkit-progress-value {
  background-color: #ECECFE;
  border-radius: 5px;
}

progress::-moz-progress-bar {
  background-color: #ECECFE;
  border-radius: 5px;
}

.progress-label {
  position: absolute;
  width: 100%;
  margin-left: 4px;
  text-align: left;
  line-height: 40px;
  color: #161616;
  z-index: 1;
  font-size: 14px;
  
  .ratio {
    font-weight: bold;
    margin-right: 4px;
    margin-left: 8px;
  }
}

h2 {
  color: var(--blue-france-sun-113-625);
}

h3 {
  font-size: 18px;
}
</style>