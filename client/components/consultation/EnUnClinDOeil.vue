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
    <ul class="fr-mt-2w" v-for="goal in goals">
      <li class="fr-grid-row">
        <span aria-hidden="true" class="picto fr-col-2 fr-pt-1w">{{ goal.picto }}</span>
        <span class="fr-col-10" v-html="goal.description"></span>
      </li>
    </ul>
  </section>
</template>

<style>
.goals ul {
  list-style: none;
  padding-inline-start: 0;
}

.goals {
  background-color: var(--blue-france-950-100);
  padding: 1em;

  .picto {
    font-size: 1.6em;
  }

  .fr-h5 {
    color: var(--blue-france-sun-113-625);
  }
}
</style>