<script setup lang="ts">
import Consultation from "~/client/types/consultation/consultation";
import svgBook from "@gouvfr/dsfr/dist/artwork/pictograms/leisure/book.svg";

const props = defineProps<{
  consultation: Consultation
}>()

const estEnCours = props.consultation.consultationDates?.endDate
  && new Date() < new Date(props.consultation.consultationDates.endDate)

const estSurLaPageLancement = props.consultation.goals != null
const opened = ref(false)
</script>

<template>

  <p v-if="estSurLaPageLancement" class="announcer fr-my-8w fr-display--md">
    {{ consultation.titrePageWeb }}
    <span class="fr-display&#45;&#45;xs">{{ consultation.sousTitrePageWeb }}</span>
  </p>
  <!--<ConsultationShare :shareText="props.consultation.shareText" :shareTitle="props.consultation.title"/>-->


  <div class="fr-grid fr-mb-2w fr-mt-6w">
    <div class="fr-grid-row top fr-grid-row--gutters">
      <div class="fr-col-md-8 fr-col-12">
        <p v-if="estEnCours" class="fr-mb-2w fr-badge fr-badge--info fr-badge--no-icon">CONSULTATION EN COURS</p>

        <p class="fr-text--lead thematique">
          {{ consultation.thematique.picto + " " + consultation.thematique.label }}
        </p>
        <h1>{{ consultation.title }}</h1>
      </div>
      <div class="fr-col-md-4 fr-col-12">
        <img class="fr-responsive-img" :src="consultation.coverUrl" alt="">
      </div>

      <div class="fr-col-md-12 fr-col-12">
        <div v-if="consultation.questionsInfo" class="info-question fr-px-2w fr-pb-1w">
          <div class="fr-mb-2w">
            <VIcon scale="1.4" color=var(--blue-france-sun-113-625) name="ri-calendar-2-line"/>
            Jusqu'au {{ new Date(consultation.questionsInfo.endDate).toLocaleDateString("fr-FR") }}
          </div>
          <div class="fr-mb-2w">
            <VIcon scale="1.4" color=var(--blue-france-sun-113-625) name="ri-timer-line"/>
            {{ consultation.questionsInfo.estimatedTime }}
          </div>
          <div class="fr-mb-2w">
            <VIcon scale="1.4" color=var(--blue-france-sun-113-625) name="ri-questionnaire-line"/>
            {{ consultation.questionsInfo.questionCount }}
          </div>
          <div class="fr-mb-2w">
            <VIcon scale="1.4" color=var(--blue-france-sun-113-625) name="ri-group-line"/>
            <span class="fr-pl-1v" v-if="consultation.questionsInfo.participantCount == 0">Aucun participant</span>
            <span class="fr-pl-1v" v-else-if="consultation.questionsInfo.participantCount == 1">1 participant</span>
            <span class="fr-pl-1v" v-else>{{ consultation.questionsInfo.participantCount }} participants</span>
            <div class="fr-mt-1w fr-ml-4w" v-if="estEnCours">
              <div class="progress-bar fr-mb-1w">
                <div class="progress-value"
                     :style="{ width:  (consultation.questionsInfo.participantCount / consultation.questionsInfo.participantCountGoal) * 100 + '%' }"></div>
              </div>
              Prochain objectif : {{ consultation.questionsInfo.participantCountGoal }} participants !
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ConsultationSections :sections="consultation.body.headerSections"/>
  <ConsultationSections :sections="consultation.body.sections"/>

  <div v-if="consultation.goals" class="goals fr-mt-8w fr-mb-4w">
    <div v-for="goal in consultation.goals" class="fr-mb-4w">
      <span class="picto fr-mr-4w">{{ goal.picto }}</span>
      <span v-html="goal.description"></span>
    </div>
  </div>

  <DsfrButton class="fr-btn fr-my-4w" @click="opened = true">
    Commencer
  </DsfrButton>

  <DsfrModal
    v-model:opened="opened"
    title="Participer à la consultation"
    icon="fr-icon-arrow-right-line"
    :is-alert="false"
    @close="opened = false"
  >
    <template #default>
      <p>Vous pouvez répondre à la consultation sur l'application mobile Agora ou sur le site internet.</p>
      <p>L'application mobile offre une meilleure expérience.</p>

      <a
        class="fr-btn"
        :href="`/consultations/${consultation.id}/questions/1`"
        title="Répondre à la consultation"
      >Commencer</a>
    </template>
  </DsfrModal>

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

<style>
.info-question {
  .progress-bar {
    background-color: #d9d9d9;
    opacity: 0.6;
    border-radius: 8px;
    height: 7px;

    .progress-value {
      background-color: var(--text-title-blue-france);
      border-radius: 8px;
      height: 7px;
    }
  }
}

.announcer {
  color: var(--blue-france-sun-113-625);
  text-align: center;

  > span {
    display: block;
  }
}

.section-title {
  color: var(--blue-france-sun-113-625);
}

.goals {
  .picto {
    font-size: 1.75rem;
  }
}

.thematique {
  font-weight: 500;
}

</style>