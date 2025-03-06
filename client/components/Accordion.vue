<script setup lang="ts">
defineProps<{
  buttonLabel: string,
  title: string,
  description: string
}>()
</script>

<template>
  <section class="fr-accordion">
    <h4 class="fr-accordion__title">
      <button class="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-106">{{ buttonLabel }}</button>
    </h4>
    <div class="fr-collapse" id="accordion-106">
      <h5 class="fr-h5">{{ title }}</h5>
      <p>{{ description }}</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
</style>