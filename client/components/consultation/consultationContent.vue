<script setup lang="ts">
import Consultation from "~/client/types/consultation/consultation";
import svgBook from "@gouvfr/dsfr/dist/artwork/pictograms/leisure/book.svg";

const props = defineProps<{
  consultation: Consultation
}>()

const userHasAnswered = useRoute().query.answered

const estEnCours = props.consultation.consultationDates?.endDate
  && new Date() < new Date(props.consultation.consultationDates.endDate)

const estSurLaPageLancement = props.consultation.goals != null

</script>

<template>
  <p v-if="estSurLaPageLancement" class="announcer fr-my-8w fr-display--md">
    {{ consultation.titrePageWeb }}
    <span class="fr-display--xs">{{ consultation.sousTitrePageWeb }}</span>
  </p>

  <div v-if="userHasAnswered" class="fr-alert fr-alert--success">
    <h6 class="fr-alert__title">Vos réponses ont bien été envoyées.</h6>
  </div>
<!--  <ConsultationShare :shareText="props.consultation.shareText" :shareTitle="props.consultation.title"/>-->

  <div class="fr-grid fr-mb-2w fr-mt-6w">
    <div class="fr-grid-row fr-grid-row--middle fr-grid-row--gutters">
      <div class="fr-col-md-6 fr-col-12">
        <p class="fr-text--lead">
          {{ consultation.thematique.picto + " " + consultation.thematique.label }}
        </p>
        <h1>{{ consultation.title }}</h1>

        <div v-if="consultation.questionsInfo" class="info-question fr-px-2w fr-py-1w">
          <div class="fr-mb-1w">
            <VIcon
              icon="ri:calendar-2-line"
              :inline="true"
            />
            Jusqu'au {{ new Date(consultation.questionsInfo.endDate).toLocaleDateString("fr-FR") }}
          </div>
          <div class="fr-mb-1w">
            <VIcon
              icon="ri:questionnaire-line"
              :inline="true"
            />
            {{ consultation.questionsInfo.questionCount }}
          </div>
          <div class="fr-mb-1w">
            <VIcon
              icon="ri:timer-line"
              :inline="true"
            />
            {{ consultation.questionsInfo.estimatedTime }}
          </div>
          <div class="fr-mb-1w">
            <VIcon
              icon="ri:group-line"
              :inline="true"
            />
            <span class="fr-pl-1v" v-if="consultation.questionsInfo.participantCount == 0">Aucun participant</span>
            <span class="fr-pl-1v" v-else-if="consultation.questionsInfo.participantCount == 1">1 participant</span>
            <span class="fr-pl-1v" v-else>{{ consultation.questionsInfo.participantCount }} participants</span>
            <div class="fr-mt-1w fr-ml-3w" v-if="estEnCours">
              <div class="progress-bar fr-mb-1w">
                <div class="progress-value"
                     :style="{ width:  (consultation.questionsInfo.participantCount / consultation.questionsInfo.participantCountGoal) *100 + '%' }"></div>
              </div>
              Prochain objectif : {{ consultation.questionsInfo.participantCountGoal }} participants !
            </div>
          </div>
        </div>
      </div>
      <div class="fr-col-md-6 fr-col-12">
        <img class="fr-responsive-img" :src="consultation.coverUrl" alt="">
      </div>
    </div>
  </div>

  <div v-if="consultation.goals" class="goals fr-p-3w fr-my-4w">
    <div class="fr-mt-1v" v-for="goal in consultation.goals">
      <span class="fr-text--lead fr-mr-2w">{{ goal.picto }}</span>
      <span v-html="goal.description"></span>
    </div>
  </div>

  <ConsultationHistory
    v-if="consultation.history && !estEnCours"
    :history="consultation.history"
    :consultation-slug="consultation.slug"
    :current-update-id="consultation.lastUpdateSlug ?? consultation.updateId"
    class="fr-my-6w"
  />

  <ConsultationSections :sections="consultation.body.headerSections"/>
  <ConsultationSections :sections="consultation.body.sections"/>

  <DsfrTile
    v-if="consultation.downloadAnalysisUrl"
    title="Télécharger la synthèse complète"
    description="Pour aller plus loin, retrouvez l'analyse détaillée de l'ensemble des réponses à cette consultation."
    :to="consultation.downloadAnalysisUrl"
    :download="true"
    :img-src="svgBook"
    class="fr-mb-4w"
  />
  <BandeauTelechargementAdaptatif
    v-if="consultation.questionsInfo && new Date(consultation.questionsInfo.endDate) >= new Date()"
    title="Pour répondre à cette consultation, rendez-vous sur l’application Agora."/>

  <BandeauTelechargementAdaptatif v-else title="Téléchargez l'application pour donner votre avis."/>
</template>

<style scoped>
.info-question {
  .progress-bar {
    background-color: #dcdcdc;
    border-radius: 8px;
    height: 10px;

    .progress-value {
      background-color: var(--text-title-blue-france);
      border-radius: 8px;
      height: 10px;
    }
  }
}

.goals {
  background-color: #eeeeee;
}

.announcer {
  color: var(--blue-france-sun-113-625);
  text-align: center;

  > span {
    display: block;
  }
}
</style>