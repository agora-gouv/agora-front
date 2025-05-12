<script setup lang="ts">
import Consultation from "~/client/types/consultation/consultation";

const props = defineProps<{
  consultation: Consultation,
}>()

const feedbackQuestion = props.consultation.feedbackQuestion!
const userHasAnsweredToFeedback = ref(props.consultation.feedbackQuestion?.results?.userResponse != undefined)

const giveFeedback = async (isPositive: boolean) => {
  const api = new ConsultationApi()
  const jwtToken = (await useAuthentication()).jwtToken
  await api.giveFeedback(props.consultation.id, props.consultation.updateId, isPositive, jwtToken)
  userHasAnsweredToFeedback.value = true
}
</script>

<template>
  <div class="fr-callout">
    <h3>{{ feedbackQuestion.title }}</h3>
    <p v-html="feedbackQuestion.description"/>
    <div v-if="userHasAnsweredToFeedback" class="fr-alert fr-alert--success fr-mt-2w">
      <p class="fr-h6 fr-alert__title">Merci pour votre avis !</p>
    </div>
    <DsfrButton type="button" class="fr-btn fr-mr-2w" icon="ri:thumb-up-fill" v-if="!userHasAnsweredToFeedback"
                @click="giveFeedback(true)">Oui</DsfrButton>
    <DsfrButton type="button" class="fr-btn fr-btn--secondary" icon="ri:thumb-down-fill" v-if="!userHasAnsweredToFeedback"
                @click="giveFeedback(false)">Non</DsfrButton>
  </div>
</template>

<style>
</style>