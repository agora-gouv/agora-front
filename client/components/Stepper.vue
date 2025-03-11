<script setup lang="ts">
defineProps<{
  title: string, 
  currentStep: number, 
  totalSteps: number
}>()
</script>

<template>
  <div class="fr-stepper fr-mt-4w">
    <h2 class="fr-stepper__title">
      {{ title }}
    </h2>
    <div class="fr-stepper__steps" :data-fr-current-step="currentStep" :data-fr-steps="totalSteps"></div>
  </div>
</template>

<style lang="scss" scoped>
</style>