<script setup lang="ts">
defineProps<{
  hasPreviousQuestion: boolean
  hasNextQuestion: boolean
  nextQuestionId: string | undefined
  
  nextQuestion: (nextQuestionId: string | undefined) => void
  previousQuestion: () => void
}>()

const scrollToTop = () => {
  document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })
}

</script>

<template>
  <div class="fr-mt-3w">
    <DsfrButton type="button" v-if="hasPreviousQuestion" class="fr-btn fr-btn--secondary fr-mr-4w" @click="previousQuestion(); scrollToTop()">Question
      précédente
    </DsfrButton>
    <DsfrButton type="button" v-if="hasNextQuestion" class="fr-btn fr-mr-4w" @click="nextQuestion(nextQuestionId); scrollToTop()">Question suivante</DsfrButton>
    <DsfrButton v-if="!hasNextQuestion" class="fr-btn fr-mr-4w">Envoyer</DsfrButton>
  </div>
</template>

<style>
</style>