<script setup>
</script>

<template>
  <section class="goals fr-p-3w fr-my-4w">
    <h2 class="fr-h5"><Skeleton characterCount="30" lineCount="1" /></h2>
    <ul>
      <li class="fr-grid-row fr-mt-2w">
        <span aria-hidden="true" class="picto fr-col-2 fr-pt-1w"><Skeleton aspectRatio="1" lineCount="1" /></span>
        <span class="fr-col-10"><Skeleton fullWidth lineCount="3" /></span>
      </li>
      <li class="fr-grid-row fr-mt-2w">
        <span aria-hidden="true" class="picto fr-col-2 fr-pt-1w"><Skeleton aspectRatio="1" lineCount="1" /></span>
        <span class="fr-col-10"><Skeleton fullWidth lineCount="3" /></span>
      </li>
      <li class="fr-grid-row fr-mt-2w">
        <span aria-hidden="true" class="picto fr-col-2 fr-pt-1w"><Skeleton aspectRatio="1" lineCount="1" /></span>
        <span class="fr-col-10"><Skeleton fullWidth lineCount="3" /></span>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
@use './EnUnClinDOeil.module';

.icon {
  display: block;
  aspect-ratio: 1;
}
.text {
  width: 100%;
}
</style>