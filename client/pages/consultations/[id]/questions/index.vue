<script setup lang="ts">

definePageMeta({
  layout: 'basic'
})

const {
  currentQuestion, getQuestionCount, initQuestions,
  nextQuestion, previousQuestion, consultationId, answers, submit
} = useConsultationQuestions();

await initQuestions()

</script>

<template>
  <div class="fr-col-offset-1 fr-col-10">
    <router-link :to="`/consultations/` + consultationId">Retour à la consultation</router-link>

    <div class="fr-stepper fr-mt-4w">
      <h2 class="fr-stepper__title">
        Question {{ currentQuestion?.order }}
      </h2>
      <div class="fr-stepper__steps" :data-fr-current-step="currentQuestion?.order" :data-fr-steps="getQuestionCount()"></div>
    </div>


    <h3 class="question-title">{{ currentQuestion?.title }}</h3>

    <section v-if="currentQuestion?.popupDescription != null" class="fr-accordion">
      <h4 class="fr-accordion__title">
        <button class="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-106">Plus de précision</button>
      </h4>
      <div class="fr-collapse" id="accordion-106">
        <h5 class="fr-h5">Contenu</h5>
        <p>{{ currentQuestion?.popupDescription }}</p>
      </div>
    </section>

    <form @submit.prevent="submit">

      <div v-if="currentQuestion instanceof QuestionUniqueChoice">
        <fieldset class="fr-fieldset" id="radio-hint" aria-labelledby="radio-hint-legend radio-hint-messages">
          <legend class="fr-fieldset__legend--regular fr-fieldset__legend" id="radio-hint-legend">
            Vous pouvez choisir une seule réponse.
          </legend>

          <div class="fr-fieldset__element" v-for="choice in currentQuestion.possibleChoices">
            <div class="fr-radio-group">
              <input type="radio" :id="choice.id" :value="choice.id" v-model="answers[currentQuestion.id]">
              <label class="fr-label" :for="choice.id">
                {{ choice.label }}
              </label>
            </div>
          </div>
          <div class="fr-messages-group" id="radio-hint-messages" aria-live="assertive">
          </div>
        </fieldset>
      </div>

      <div v-if="currentQuestion instanceof QuestionMultipleChoices">
        <fieldset class="fr-fieldset" id="checkboxes" aria-labelledby="checkboxes-legend checkboxes-messages">
          <legend class="fr-fieldset__legend--regular fr-fieldset__legend" id="checkboxes-legend">
            Vous pouvez choisir jusqu’à {{ currentQuestion.maxChoices }} réponses.
          </legend>

          <div class="fr-fieldset__element" v-for="choice in currentQuestion.possibleChoices">
            <div class="fr-checkbox-group">
              <input :id="choice.id" type="checkbox" :value="choice.id" v-model="answers[currentQuestion.id]"
                     aria-describedby="checkboxes-1-messages">
              <label class="fr-label" :for="choice.id">
                {{ choice.label }}
              </label>
              <div class="fr-messages-group" id="checkboxes-1-messages" aria-live="assertive">
              </div>
            </div>
          </div>
          <div class="fr-messages-group" id="checkboxes-messages" aria-live="assertive">
          </div>
        </fieldset>
      </div>

      <div v-if="currentQuestion instanceof QuestionOpened">
        <div class="fr-input-group">
          <label class="fr-label" for="textarea">
            Attention à n’indiquer ni données personnelles qui pourraient vous identifier, ni de lien vers un site internet
          </label>
          <textarea class="fr-input" id="textarea" v-model="answers[currentQuestion.id]"></textarea>
        </div>
      </div>

      <div v-if="currentQuestion instanceof Chapter">
        <div v-html="currentQuestion.description"></div>
        <img class="fr-my-3w" :src="currentQuestion.imageUrl" alt="">

        <DsfrTranscription title="Transcription" :content="currentQuestion.imageTranscription"/>
      </div>

    </form>

    <DsfrButton class="fr-btn fr-btn--secondary" @click="previousQuestion()">Question précédente</DsfrButton>
    <DsfrButton class="fr-btn fr-mt-4w" @click="nextQuestion()">Question suivante</DsfrButton>
    <DsfrButton class="fr-btn fr-btn--secondary">
      Passer cette question
    </DsfrButton>
    <DsfrButton class="fr-btn fr-mt-4w" @click="submit()">Envoyer</DsfrButton>
  </div>
</template>

<style>
.question-title {
  color: var(--blue-france-sun-113-625)
}

img {
  width: 80%;
}
</style>