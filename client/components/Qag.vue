<script setup lang="ts">

import { QagApiDTO } from "~/client/types/qag/qags";
import {VIcon} from "@gouvminint/vue-dsfr";

const { qag } = defineProps<{ qag: QagApiDTO }>()

</script>

<template>
  <div class="fr-card fr-card--horizontal">
    <div class="fr-card__body">
      <div class="fr-card__content">
        <p class="fr-card__desc fr-text--lg">
          {{ qag.title }}
        </p>
        <div class="fr-card__start">
          <p class="fr-card__detail">{{ qag.username }}</p>
        </div>
      </div>
    </div>
    <div class="fr-card__header fr-p-4w">
      <div class="fr-card__img">
        <img src="@gouvfr/dsfr/dist/artwork/pictograms/digital/avatar.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.fr-card img {
  width: 4rem;
  height: 4rem;
  text-align: center;
  align-content: center;
}

.fr-card .fr-card__content {
  flex: 1;
}

.fr-card .fr-card__header {
  flex: 0;
}
</style>