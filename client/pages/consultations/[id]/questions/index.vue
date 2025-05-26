<script setup lang="ts">

definePageMeta({
  layout: 'basic',
})

const {
  currentQuestion, questionCount, initQuestions, hasNextQuestion, hasPreviousQuestion, errorMessage,
  nextQuestion, previousQuestion, consultationId, submit, answersCheckbox, answersText, numberOfAnsweredQuestions
} = useConsultationQuestionsForm();

await initQuestions()

const isTextChoiceChecked = (choiceId) => {
  if (currentQuestion?.value?.id == null || answersCheckbox.value[currentQuestion.value!!.id] == null) {
    return false
  }

  return answersCheckbox.value[currentQuestion.value!!.id].includes(choiceId);
}

const isMaximumChoices = computed(() => {
  if (currentQuestion.value instanceof QuestionMultipleChoices) {
    return answersCheckbox.value[currentQuestion.value?.id!!].length >= currentQuestion.value.maxChoices
  }
  return false
})

const activeAccordion = ref<number>()
</script>

<template>
  <div class="fr-col-offset-1 fr-col-10 fr-pt-3w">
    <a id="top" :href="`/consultations/${consultationId}`">Retour à la présentation</a>

    <div v-if="errorMessage" class="fr-alert fr-alert--error fr-mt-2w">
      <h6 class="fr-alert__title">{{ errorMessage }}</h6>
    </div>

    <ConsultationQuestionsStepper :current-question="numberOfAnsweredQuestions" :current-step="currentQuestion!!.order" :number-of-steps="questionCount!!"/>

    <h3 class="question-title">{{ currentQuestion?.title }}</h3>

    <DsfrAccordionsGroup class="fr-my-3w" v-model="activeAccordion">
      <DsfrAccordion v-if="currentQuestion?.popupDescription" title="Plus de précisions" id="accordion-1">
        <div v-html="currentQuestion?.popupDescription"/>
      </DsfrAccordion>
    </DsfrAccordionsGroup>

    <form @submit.prevent="submit">
      <div v-if="currentQuestion instanceof QuestionUniqueChoice">
        <fieldset class="fr-fieldset" id="radio-hint" aria-labelledby="radio-hint-legend radio-hint-messages">
          <legend class="fr-fieldset__legend--regular fr-fieldset__legend" id="radio-hint-legend">
            Vous pouvez choisir une seule réponse.
          </legend>

          <div class="fr-fieldset__element" v-for="choice in currentQuestion.possibleChoices">
            <div class="fr-radio-group">
              <input type="radio" :id="choice.id" :value="choice.id" v-model="answersCheckbox[currentQuestion.id]">
              <label class="fr-label" :for="choice.id">
                {{ choice.label }}
              </label>
              <input maxlength="200" v-if="choice.hasOpenTextField && isTextChoiceChecked(choice.id)" type="text"
                     v-model="answersText[currentQuestion.id]" class="fr-input"/>
            </div>
          </div>
          <div class="fr-messages-group" id="radio-hint-messages" aria-live="assertive">
          </div>
        </fieldset>
        <ConsultationQuestionButtons
          :hasPreviousQuestion="hasPreviousQuestion.valueOf()"
          :hasNextQuestion="hasNextQuestion.valueOf()"
          :nextQuestionId="currentQuestion.nextQuestionId"
          :nextQuestion="nextQuestion"
          :previousQuestion="previousQuestion"
        />
      </div>

      <div v-if="currentQuestion instanceof QuestionMultipleChoices">
        <fieldset class="fr-fieldset" id="checkboxes" aria-labelledby="checkboxes-legend checkboxes-messages">
          <legend class="fr-fieldset__legend--regular fr-fieldset__legend" id="checkboxes-legend">
            Vous pouvez choisir jusqu’à {{ currentQuestion.maxChoices }} réponses.
          </legend>

          <div class="fr-fieldset__element" v-for="choice in currentQuestion.possibleChoices">
            <div class="fr-checkbox-group">
              <input :id="choice.id" type="checkbox" :value="choice.id" v-model="answersCheckbox[currentQuestion.id]"
                     aria-describedby="checkboxes-1-messages"
                     :disabled="isMaximumChoices && !answersCheckbox[currentQuestion.id!!].includes(choice.id)">
              <label class="fr-label" :for="choice.id">
                {{ choice.label }}
              </label>
              <input v-if="choice.hasOpenTextField && isTextChoiceChecked(choice.id)" type="text" v-model="answersText[currentQuestion.id]"
                     class="fr-input" maxlength="200"/>
              <div class="fr-messages-group" id="checkboxes-1-messages" aria-live="assertive">
              </div>
            </div>
          </div>
          <div class="fr-messages-group" id="checkboxes-messages" aria-live="assertive">
          </div>
        </fieldset>
        <ConsultationQuestionButtons
          :hasPreviousQuestion="hasPreviousQuestion.valueOf()"
          :hasNextQuestion="hasNextQuestion.valueOf()"
          :nextQuestionId="currentQuestion.nextQuestionId"
          :nextQuestion="nextQuestion"
          :previousQuestion="previousQuestion"
        />
      </div>

      <div v-if="currentQuestion instanceof QuestionOpened">
        <div class="fr-input-group">
          <label class="fr-label" for="textarea">
            Vous avez jusqu’à 400 caractères. Attention à n’indiquer ni données personnelles qui pourraient vous identifier, ni de lien vers
            un site internet.
          </label>
          <textarea class="fr-input" id="textarea" maxlength="400"
                    v-model="answersText[currentQuestion.id]"></textarea>
        </div>
        <ConsultationQuestionButtons
          :hasPreviousQuestion="hasPreviousQuestion.valueOf()"
          :hasNextQuestion="hasNextQuestion.valueOf()"
          :nextQuestionId="currentQuestion.nextQuestionId"
          :nextQuestion="nextQuestion"
          :previousQuestion="previousQuestion"
        />
      </div>

      <div v-if="currentQuestion instanceof QuestionWithCondition">
        <fieldset class="fr-fieldset" id="radio-hint" aria-labelledby="radio-hint-legend radio-hint-messages">
          <legend class="fr-fieldset__legend--regular fr-fieldset__legend" id="radio-hint-legend">
            Vous pouvez choisir une seule réponse.
          </legend>

          <div class="fr-fieldset__element" v-for="choice in currentQuestion.possibleChoices">
            <div class="fr-radio-group">
              <input type="radio" :id="choice.id" :value="choice.id" v-model="answersCheckbox[currentQuestion.id]">
              <label class="fr-label" :for="choice.id">
                {{ choice.label }}
              </label>
              <input v-if="choice.hasOpenTextField && isTextChoiceChecked(choice.id)" type="text" v-model="answersText[currentQuestion.id]"
                     maxlength="200" class="fr-input"/>
            </div>
          </div>
          <div class="fr-messages-group" id="radio-hint-messages" aria-live="assertive">
          </div>
        </fieldset>
        <ConsultationQuestionButtons
          :hasPreviousQuestion="hasPreviousQuestion.valueOf()"
          :hasNextQuestion="hasNextQuestion.valueOf()"
          :nextQuestionId="currentQuestion.possibleChoices.find((choice) => choice.id == answersCheckbox[currentQuestion!!.id])?.nextQuestionId!!"
          :nextQuestion="nextQuestion"
          :previousQuestion="previousQuestion"
        />
      </div>

      <div v-if="currentQuestion instanceof Chapter">
        <div v-html="currentQuestion.description"></div>
        <img class="fr-my-3w" v-if="currentQuestion.imageUrl" :src="currentQuestion.imageUrl" alt="">

        <DsfrTranscription v-if="currentQuestion.imageTranscription" @click.prevent title="Transcription"
                           :content="currentQuestion.imageTranscription"/>

        <ConsultationQuestionButtons
          :hasPreviousQuestion="hasPreviousQuestion.valueOf()"
          :hasNextQuestion="hasNextQuestion.valueOf()"
          :nextQuestionId="currentQuestion.nextQuestionId"
          :nextQuestion="nextQuestion"
          :previousQuestion="previousQuestion"
        />
      </div>

    </form>
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