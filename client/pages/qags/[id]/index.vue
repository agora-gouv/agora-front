<script setup lang="ts">
import type Link from '~/types/dsfr/link';
import {DsfrTranscription} from "@gouvminint/vue-dsfr";

definePageMeta({
  layout: 'basic'
})

const qagId = useRoute().params.id.toString()

const qag = await (new QagApi()).getQag(qagId)

useHead({
  title: qag.value ? `${qag.value.title} - Agora` : 'Agora'
})

const content = await (new PageContentApi()).getQuestionAuGouvernementContent()

const sousTitreWithUsername = qag.value && content.value ? content.value.sousTitre.replace("{}", qag.value.username) : ''
const texteSoutienWithUsername = qag.value && content.value ? content.value.texteSoutien
  .replace("{}", qag.value.supportCount)
  .replace("{}", qag.value.username) : ''

const links: Link[] = [{to: '/', text: 'Accueil'}, {text: 'Question citoyenne'}]

const shareTitle = computed(() => {
  return "Je pense que la réponse du gouvernement peut t'intéresser"
})
const shareText = computed(() => {
  return "👉\u{00A0}" + qag.value.title + "\u{00A0}https://www.agora.gouv.fr/qags/" + qag.value.id
})
</script>

<template>
  <h1 class="fr-mt-4w">{{ content.titre }}</h1>

  <p class="fr-text--lead" v-if="qag.username">
    {{ sousTitreWithUsername }}
  </p>

  <div class="question fr-p-2w fr-mx-1w">
    <p class="fr-text--lead">
      <span aria-hidden="true">{{ qag.thematique.picto }}</span>
      <span>{{ qag.thematique.label }}</span>
    </p>
    <DsfrBadge v-if="qag.status=='selectedForResponse'" type="info" label="Réponse à venir"/>
    <DsfrBadge v-else-if="qag.status=='responseAvailable'" type="success" label="Réponse reçue"/>
    <DsfrBadge v-else-if="qag.status=='openForSupport'" type="new" label="À soutenir"/>
    <h2 class="fr-mt-4w question-text">{{ qag.title }}</h2>
    <div class="fr-mt-6w">
      <p>{{ qag.description }}</p>
    </div>
  </div>

  <h1 class="fr-mt-4w" v-if="qag.response">Réponse du Gouvernement</h1>

  <div class="video-response fr-mt-2w" v-if="qag.response">
    <p class="fr-text--lead" v-if="qag.response.videoTitle">{{ qag.response.videoTitle }}</p>
    <p class="fr-text--lead" v-else>Réponse du Gouvernement</p>

    <div class="fr-px-1w">
      Par <b>{{ qag.response.author }}</b>, le
      <Date :date="qag.response.responseDate"/>
      <p class="fr-text--xs"> {{ qag.response.authorDescription }}</p>

      <div>
        <Video :url=qag.response.videoUrl />
          <DsfrTranscription class="fr-my-1" :content="qag.response.transcription"/>
      </div>

      <div v-if="qag.response.additionalInfo" class="additionnal-info">
        <span class="fr-text--lead fr-mb-4w">{{ qag.response.additionalInfo.title }}</span>
        <div class="fr-mt-2w" v-html="qag.response.additionalInfo.description"></div>
      </div>
    </div>
  </div>

  <div class="text-response fr-mt-2w" v-if="qag.textResponse">
    <p class="fr-text--lead">{{ qag.textResponse.responseLabel }}</p>
    <div class="fr-px-1w" v-html="qag.textResponse.responseText"></div>
  </div>
  <ConsultationShare
    v-if="qag.response || qag.textResponse"
    :share-text="shareText"
    :share-title="shareTitle"/>
  <DsfrBreadcrumb :links="links"/>
  <BandeauTelechargement>
    <div v-if="!qag.response && !qag.textResponse" v-html="texteSoutienWithUsername"/>
    <div v-else-if="qag.response">
      <h2>{{ qag.response.feedbackQuestion }}</h2>
      <p>Donnez votre avis en téléchargeant l’application Agora :</p>
    </div>
    <div v-else-if="qag.textResponse">
      <h2>{{ qag.textResponse.feedbackQuestion }}</h2>
      <p>Répondez à cette question en télechargeant l'application :</p>
    </div>
  </BandeauTelechargement>
</template>

<style scoped lang="scss">
:is(h1, h2) {
  color: var(--blue-france-sun-113-625);
  font-size: 2.5rem;
  line-height: 3rem;
}

.heart-icon {
  color: var(--red-marianne-main-472);
}

.question {
  background-color: var(--blue-france-975-75);
  position: relative;

  .status-container {
    text-align: end;
  }
}

.question-text {
  color: var(--blue-france-sun-113-625)
}
</style>
