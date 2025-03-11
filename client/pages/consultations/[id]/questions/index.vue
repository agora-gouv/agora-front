<script setup lang="ts">

definePageMeta({
  layout: 'basic'
})

const {
  currentQuestion, questionCount, initQuestions, hasNextQuestion, hasPreviousQuestion,
  nextQuestion, previousQuestion, consultationId, submit, answersCheckbox, answersText
} = useConsultationQuestionsForm();

await initQuestions()

const isTextChoiceChecked = (choiceId) => {
  return answersCheckbox.value[currentQuestion.value!!.id].includes(choiceId);
}

const expandedSectionId = ref("")

</script>

<template>
  <div class="fr-col-offset-1 fr-col-10 fr-pt-3w">
    <a :href="`/consultations/` + consultationId">Retour à la consultation</a>

    <Stepper :title="`Question ${currentQuestion?.order}`" :current-step="currentQuestion!!.order" :total-steps="questionCount!!"/>

    <h3 class="question-title">{{ currentQuestion?.title }}</h3>

    <DsfrAccordion v-if="currentQuestion?.popupDescription" title="Plus de précision" 
                   :expanded-id="expandedSectionId" @expand="id => expandedSectionId = id">
      <h5>Contenu</h5>
      <div v-html="currentQuestion?.popupDescription"/>
    </DsfrAccordion>

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
              <input v-if="choice.hasOpenTextField && isTextChoiceChecked(choice.id)" type="text" v-model="answersText[currentQuestion.id]" class="fr-input"/>
            </div>
          </div>
          <div class="fr-messages-group" id="radio-hint-messages" aria-live="assertive">
          </div>
        </fieldset>
        <ConsultationQuestionButtons
          :hasPreviousQuestion = "hasPreviousQuestion.valueOf()"
          :hasNextQuestion = "hasNextQuestion.valueOf()"
          :nextQuestionId = "currentQuestion.nextQuestionId!!"
          :nextQuestion = "nextQuestion"
          :previousQuestion = "previousQuestion"
          :submit = "submit"
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
                     aria-describedby="checkboxes-1-messages">
              <label class="fr-label" :for="choice.id">
                {{ choice.label }}
              </label>
              <input v-if="choice.hasOpenTextField && isTextChoiceChecked(choice.id)" type="text" v-model="answersText[currentQuestion.id]"
                     class="fr-input"/>
              <div class="fr-messages-group" id="checkboxes-1-messages" aria-live="assertive">
              </div>
            </div>
          </div>
          <div class="fr-messages-group" id="checkboxes-messages" aria-live="assertive">
          </div>
        </fieldset>
        <ConsultationQuestionButtons
          :hasPreviousQuestion = "hasPreviousQuestion.valueOf()"
          :hasNextQuestion = "hasNextQuestion.valueOf()"
          :nextQuestionId = "currentQuestion.nextQuestionId!!"
          :nextQuestion = "nextQuestion"
          :previousQuestion = "previousQuestion"
          :submit = "submit"
        />
      </div>

      <div v-if="currentQuestion instanceof QuestionOpened">
        <div class="fr-input-group">
          <label class="fr-label" for="textarea">
            Attention à n’indiquer ni données personnelles qui pourraient vous identifier, ni de lien vers un site internet
          </label>
          <textarea class="fr-input" id="textarea"
                    v-model="answersText[currentQuestion.id]"></textarea>
        </div>
        <ConsultationQuestionButtons
          :hasPreviousQuestion = "hasPreviousQuestion.valueOf()"
          :hasNextQuestion = "hasNextQuestion.valueOf()"
          :nextQuestionId = "currentQuestion.nextQuestionId!!"
          :nextQuestion = "nextQuestion"
          :previousQuestion = "previousQuestion"
          :submit = "submit"
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
              <input v-if="choice.hasOpenTextField && isTextChoiceChecked(choice.id)" type="text" v-model="answersText[currentQuestion.id]" class="fr-input"/>
            </div>
          </div>
          <div class="fr-messages-group" id="radio-hint-messages" aria-live="assertive">
          </div>
        </fieldset>
        <ConsultationQuestionButtons
          :hasPreviousQuestion = "hasPreviousQuestion.valueOf()"
          :hasNextQuestion = "hasNextQuestion.valueOf()"
          :nextQuestionId = "currentQuestion.possibleChoices.find((choice) => choice.id == answersCheckbox[currentQuestion!!.id])?.nextQuestionId!!"
          :nextQuestion = "nextQuestion"
          :previousQuestion = "previousQuestion"
          :submit = "submit"
        />
      </div>

      <div v-if="currentQuestion instanceof Chapter">
        <div v-html="currentQuestion.description"></div>
        <img class="fr-my-3w" v-if="currentQuestion.imageUrl" :src="currentQuestion.imageUrl" alt="">

        <DsfrTranscription v-if="currentQuestion.imageTranscription" @click.prevent title="Transcription" :content="currentQuestion.imageTranscription"/>
        
        <ConsultationQuestionButtons
          :hasPreviousQuestion = "hasPreviousQuestion.valueOf()"
          :hasNextQuestion = "hasNextQuestion.valueOf()"
          :nextQuestionId = "currentQuestion.nextQuestionId!!"
          :nextQuestion = "nextQuestion"
          :previousQuestion = "previousQuestion"
          :submit = "submit"
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