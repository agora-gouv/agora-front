<script setup lang="ts">
const props = defineProps<{
  feedbackQuestion: {
    title: string,
    picto: string,
    description: string
    results?: { userResponse?: boolean }
  },
  sendFeedback: (isPositive: boolean) => void,
}>()

const userHasAnsweredToFeedback = ref(props.feedbackQuestion?.results?.userResponse != undefined)

const giveFeedback = async (isPositive: boolean) => {
  props.sendFeedback(isPositive)
  userHasAnsweredToFeedback.value = true
}
</script>

<template>
  <div class="fr-callout">
    <h3>{{ feedbackQuestion.title }}</h3>
    <p v-html="feedbackQuestion.description"/>
    <div v-if="userHasAnsweredToFeedback" class="fr-alert fr-alert--success fr-mt-2w">
      <h6 class="fr-alert__title">Merci pour votre avis !</h6>
    </div>
    <DsfrButton type="button" class="fr-btn fr-mr-2w" icon="ri:thumb-up-fill" v-if="!userHasAnsweredToFeedback" @click="giveFeedback(true)">
      Oui
    </DsfrButton>
    <DsfrButton type="button" class="fr-btn fr-btn--secondary" v-if="!userHasAnsweredToFeedback" @click="giveFeedback(false)">Non
    </DsfrButton>
  </div>
</template>

<style>
</style>