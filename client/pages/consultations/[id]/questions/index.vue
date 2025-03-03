<script setup lang="ts">

definePageMeta({
  layout: 'basic'
})

const route = useRoute()
const consultationId = route.params.id as string
const {fetchQuestions, questions} = useConsultationQuestions()

await fetchQuestions(consultationId)

const currentIndexQuestion = ref(1)
const currentQuestion = questions.value?.questions.filter((question) => question.order === currentIndexQuestion.value)[0]
</script>

<template>
  <div>
    <router-link :to="`/consultations/` + consultationId">Retour à la consultation</router-link>

    <div class="fr-stepper">
      <h2 class="fr-stepper__title">
        Question {{ currentQuestion?.order }}
      </h2>
      <div class="fr-stepper__steps" :data-fr-current-step="currentQuestion?.order" :data-fr-steps="questions?.questionCount"></div>
    </div>
    
    
    <h3>{{ currentQuestion?.title }}</h3>

    <section v-if="currentQuestion?.popupDescription != null" class="fr-accordion">
      <h3 class="fr-accordion__title">
        <button class="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-106">Plus de précision</button>
      </h3>
      <div class="fr-collapse" id="accordion-106">
        <h4 class="fr-h4">Contenu</h4>
        <p>{{ currentQuestion?.popupDescription }}</p>

      </div>
    </section>


    <div v-if="currentQuestion instanceof QuestionUniqueChoice">
      <fieldset class="fr-fieldset" id="radio-hint" aria-labelledby="radio-hint-legend radio-hint-messages">
        <legend class="fr-fieldset__legend--regular fr-fieldset__legend" id="radio-hint-legend">
          Vous pouvez choisir une seule réponse.
        </legend>

          <div class="fr-fieldset__element" v-for="choice in currentQuestion.possibleChoices">
            <div class="fr-radio-group">
              <input type="radio" :id="`question-` + currentQuestion.id + `choice-` + choice.id" name="radio-hint">
              <label class="fr-label" :for="`question-` + currentQuestion.id + `choice-` + choice.id">
                {{ choice.label }}
              </label>
            </div>
          </div>
        <div class="fr-messages-group" id="radio-hint-messages" aria-live="assertive">
        </div>
      </fieldset>
    </div>

    <!--    <p>Vous pouvez choisir jusqu’à {{ (currentQuestion as QuestionMultipleChoicesApiDTO).maxChoices }} réponses.</p>-->

    <div class="fr-input-group">
      <label class="fr-label" for="textarea">
        Label champs de saisie
      </label>
      <textarea class="fr-input" id="textarea" name="textarea"></textarea>
    </div>


    <!--  <DsfrCheckbox-->
    <!--    v-model="modelValue"-->
    <!--    value="En voiture seul(e)"-->
    <!--    name="checkbox-simple"-->
    <!--    label="Case à cocher simple"-->
    <!--  />-->

    <DsfrButton class="fr-btn fr-my-4w">
      Commencer
    </DsfrButton>
  </div>
</template>

<style>

</style>