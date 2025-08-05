<script setup lang="ts">

defineProps<{
  numberOfSteps: number,
  currentStep: number,
  currentQuestion: number,
}>()

</script>

<template>
  <Stepper :title="`Étape ${currentQuestion}`" :current-step="currentStep"
           :total-steps="numberOfSteps"/>
</template>

<style scoped>
:deep(.fr-stepper__steps) {
  --steps: v-bind(numberOfSteps);
  --current-step: v-bind(currentStep);
}
</style>
