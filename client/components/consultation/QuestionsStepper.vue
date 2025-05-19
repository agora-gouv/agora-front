<script setup lang="ts">

defineProps<{
  numberOfSteps: number,
  currentStep: number,
  currentQuestion: number,
}>()

</script>

<template>
  <Stepper :title="`Question ${currentQuestion}`" :current-step="currentStep" 
           :total-steps="numberOfSteps"/>
</template>

<style scoped>
:deep(.fr-stepper__steps) {
  --steps: v-bind(numberOfSteps);
  --step-width: calc(v-bind(numberOfSteps)/100)%;
  --current-step: v-bind(currentStep);
}
</style>