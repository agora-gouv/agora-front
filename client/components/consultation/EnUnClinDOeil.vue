<script setup lang="ts">
defineProps<{
  goals: {
    picto: string,
    description: string
  }[]
}>()
</script>

<template>
  <section aria-labelledby="clin-titre" class="goals fr-p-3w fr-my-4w">
    <h2 id="clin-titre" class="fr-h5">La consultation en un clin d'œil</h2>
    <ul>
      <li class="fr-grid-row fr-mt-2w" v-for="goal in goals">
        <span aria-hidden="true" class="picto fr-col-2 fr-pt-1w">{{ goal.picto }}</span>
        <span class="fr-col-10" v-html="goal.description"></span>
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
@use './EnUnClinDOeil.module';
</style>