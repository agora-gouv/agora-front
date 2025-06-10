<script setup lang="ts">
</script>

<template>
  <div class="info-question fr-py-1w">
    <div class="fr-mb-2w">
      <Skeleton class="iconify" />
      <Skeleton lineCount="1" characterCount="20" />
    </div>
    <div class="fr-mb-2w">
      <Skeleton class="iconify" />
      <Skeleton lineCount="1" characterCount="15" />
    </div>
    <div class="fr-mb-2w">
      <Skeleton class="iconify" />
      <Skeleton lineCount="1" characterCount="13" />
    </div>
    <div class="fr-mb-2w">
      <Skeleton class="iconify" />
      <span class="fr-pl-1v"><Skeleton lineCount="1" characterCount="17" /></span>
      <div class="fr-mt-1w fr-ml-3w">
        <Skeleton fullWidth lineCount="1" />
        <Skeleton lineCount="1" characterCount="31" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use './QuestionsInformations.module';
</style>