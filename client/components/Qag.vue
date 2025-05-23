<script setup lang="ts">

import { QagApiDTO } from "~/client/types/qag/qags";

const { qag } = defineProps<{ qag: QagApiDTO }>()

</script>

<template>
  <div class="fr-card fr-card--horizontal">
    <div class="fr-card__body">
      <div class="fr-card__content">
        <p class="fr-card__desc">
          {{ qag.title }}
        </p>
        <div class="fr-card__start">
          <p class="fr-card__detail">{{ qag.username }}</p>
        </div>
      </div>
    </div>
    <div class="fr-card__header fr-p-4w">
      <div class="fr-card__img">
        <div role="img" :aria-label="qag.thematique.label">{{ qag.thematique.picto }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fr-card [role="img"] {
  font-size: 4rem;
  text-align: center;
  align-content: center;
  height: 100%;
}

.fr-card .fr-card__content {
  flex: 1;
}

.fr-card .fr-card__header {
  flex: 0;
}
</style>