<script setup lang="ts">


import { getQuestions } from "~/client/composables/questionService";

const route = useRoute()
const consultationId = route.params.id

const questions = await getQuestions(consultationId as string)

const modelValue = ref(undefined)
const currentIndexQuestion = ref(1)
getQuestionsx(consultationId as string)
// const currentQuestion = questions.questions.filter((question) => question.order === currentIndexQuestion.value)[0]
</script>

<template>
<!--  Question {{ currentQuestion.order }}-->

  <div>
<!--    <h3>{{ currentQuestion.title }}</h3>-->
    <!--    <p>Vous pouvez choisir jusqu’à {{ (currentQuestion as QuestionMultipleChoicesApiDTO).maxChoices }} réponses.</p>-->

    <section class="fr-accordion">
      <h3 class="fr-accordion__title">
        <button class="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-106">Plus de précision</button>
      </h3>
      <div class="fr-collapse" id="accordion-106">
        <h4 class="fr-h4">Contenu </h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing,</p>

      </div>
    </section>
  </div>


  <div class="fr-input-group">
    <label class="fr-label" for="textarea">
      Label champs de saisie
    </label>
    <textarea class="fr-input" id="textarea" name="textarea"></textarea>
  </div>


  <DsfrCheckbox
    v-model="modelValue"
    value="En voiture seul(e)"
    name="checkbox-simple"
    label="Case à cocher simple"
  />

  <DsfrButton class="fr-btn fr-my-4w">
    Commencer
  </DsfrButton>

</template>

<style>

</style>