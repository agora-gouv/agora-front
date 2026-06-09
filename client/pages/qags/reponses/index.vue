<script setup lang="ts">
definePageMeta({
  layout: 'basic',
})
useHead({
  title: 'Réponses des Questions au Gouvernement - Agora',
})

const qags = (await (new QagApi().getQags(1))).value.responses
</script>

<template>
  <div class="fr-mb-2w fr-mt-6w">
    <div class=" fr-col-md fr-my-1w" v-for="qag in qags" :key="qag.qagId">
      <div class="fr-card fr-mx-1w card-margin">
        <div class="fr-card__body">
          <div class="fr-card__content">
            <span>Question de {{ qag.author }}</span>
            <h6>{{ qag.title }}</h6>
            <div class="fr-grid-row">
              <div class="fr-col-2 portrait-margin">
                <img :src="qag.authorPortraitUrl" alt="" class="fr-card__portrait">
              </div>
              <div class="fr-col-8 qag-answer">
                <div class="card_author">Réponse de {{ qag.author }}, le {{ qag.responseDate }}</div>
                <div>Réponse de {{ qag.author }}, le {{ qag.responseDate }}</div>
                <h3 class="fr-card__title">
                  <NuxtLink :to="`/qags/${qag.qagId}`">Voir la réponse complète du ministre</NuxtLink>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  width: 184px;
  height: 184px;
  border-radius: 50%;
  //margin-right: 1rem;
  display: inline;
}

.portrait-margin {
  margin-right: 2rem;
}

.qag-answer {
  border-left: 1px solid var(--border-default-grey);
  padding-left: 2rem;
}

.card-margin {
  margin-bottom: 2rem;
}
</style>
