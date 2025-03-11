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
    <DsfrButton v-if="hasPreviousQuestion" class="fr-btn fr-btn--secondary fr-mt-3w fr-mr-4w" @click="previousQuestion()">Question
      précédente
    </DsfrButton>
    <DsfrButton v-if="hasNextQuestion" class="fr-btn fr-mt-3w fr-mr-4w" @click="nextQuestion(nextQuestionId)">Question suivante</DsfrButton>
    <DsfrButton v-if="!hasNextQuestion" class="fr-btn fr-mt-3w fr-mr-4w" @click="submit()">Envoyer</DsfrButton>
</template>

<style>
</style>