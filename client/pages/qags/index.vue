<script setup lang="ts">

import {QagsApiDTO} from "~/client/types/qag/qags";

definePageMeta({
  layout: 'basic',
})
useHead({
  title: 'Réponses des Questions au Gouvernement - Agora',
})

const qags = useState<QagsApiDTO["qags"]>(() => ([]));

onMounted(async () => {
  const { jwtToken } = await useAuthentication()
  qags.value = (await (new QagApi().getLatest(jwtToken))).value.qags.slice(0, 4)
})
</script>
<template>
  <div class="fr-mb-2w fr-mt-6w">
    <ol class="fr-mb-1w fr-raw-list">
      <li class="fr-my-4w" v-for="qag in qags" :key="qag.qagId">
        <Qag :qag="qag" />
      </li>
    </ol>
  </div>
</template>
<style scoped>
.fr-card__title {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
  margin: 0;
  color: #333;
}

.card_author {
  color: var(--text-mention-grey);
  font-size: 0.80rem;
  line-height: 1.25rem;
  margin-bottom: 0;
  vertical-align: super;
}

.fr-card__portrait {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 1rem;
  display: inline;
}
</style>