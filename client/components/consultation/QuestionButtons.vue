<script setup lang="ts">

defineProps<{
  hasPreviousQuestion: boolean
  hasNextQuestion: boolean
  nextQuestionId: string
  
  nextQuestion: (nextQuestionId: string) => void
  previousQuestion: () => void
  submit: () => void
}>()
</script>

<template>
  <div class="fr-mt-3w">
    <DsfrButton v-if="hasPreviousQuestion" class="fr-btn fr-btn--secondary fr-mr-4w" @click="previousQuestion()">Question
      précédente
    </DsfrButton>
    <DsfrButton v-if="hasNextQuestion" class="fr-btn fr-mr-4w" @click="nextQuestion(nextQuestionId)">Question suivante</DsfrButton>
    <DsfrButton v-if="!hasNextQuestion" class="fr-btn fr-mr-4w" @click="submit()">Envoyer</DsfrButton>
  </div>
</template>

<style>
</style>