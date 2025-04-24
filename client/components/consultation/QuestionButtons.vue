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
  <div>
    <DsfrButton type="button" v-if="hasPreviousQuestion" class="fr-btn fr-btn--secondary fr-mr-4w fr-mt-2w" @click="previousQuestion(); scrollToTop()">Question
      précédente
    </DsfrButton>
    <DsfrButton type="button" v-if="hasNextQuestion" class="fr-btn fr-mr-4w fr-mt-2w" @click="nextQuestion(nextQuestionId); scrollToTop()">Question suivante</DsfrButton>
    <DsfrButton v-if="!hasNextQuestion" class="fr-btn fr-mr-4w fr-mt-2w">Envoyer</DsfrButton>
  </div>
</template>

<style>
</style>