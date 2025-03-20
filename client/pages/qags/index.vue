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
    <div class="fr-grid-row fr-mb-1w">
      <div class="fr-col-md-6 fr-col-md fr-my-1w" v-for="qag in qags" :key="qag.qagId">
        <div class="fr-card fr-mx-1w">
          <div class="fr-card__body">
            <div class="fr-card__content">
              <h3 class="fr-card__title">
                <a :href="`qags/${qag.qagId}`">{{ qag.title }}</a>
              </h3>
              <div class="fr-card__start">
                <img :src="qag.authorPortraitUrl" alt="Portrait de l'auteur" class="fr-card__portrait">
                <span class="card_author">{{qag.author}}</span>
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
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 1rem;
  display: inline;
}
</style>