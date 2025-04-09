<script setup lang="ts">
import Consultation from "~/client/types/consultation/consultation";
import svgBook from "@gouvfr/dsfr/dist/artwork/pictograms/leisure/book.svg";

const props = defineProps<{
  consultation: Consultation
}>()

const userHasAnswered = useRoute().query.answered

const estEnCours = props.consultation.consultationDates?.endDate
  && new Date() < new Date(props.consultation.consultationDates.endDate)

const toReadableDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  
  return new Date(date).toLocaleDateString("fr-FR", options)
}

</script>

<template>
  <!--  <ConsultationShare :shareText="props.consultation.shareText" :shareTitle="props.consultation.title"/>-->
  <div class="fr-grid fr-mb-2w fr-mt-6w">
    <div class="fr-grid-row fr-grid-row--top fr-grid-row--gutters">
      <!-- Volet gauche -->
      <div class="fr-col-4">
        <img class="fr-responsive-img" :src="consultation.coverUrl" alt="">
        <div class="history" v-if="consultation.history">
          <h2>Suivi de la consultation</h2>
          <ul>
            <li class="active fr-grid-row" v-for="update in consultation.history">
              <div class="fr-col-1">
                <VIcon icon="ri:checkbox-circle-fill" :ssr="true"/>
              </div>
              <div class="fr-col-11">
                <div class="fr-ml-1w">
                  <NuxtLink :to="`/consultations/${consultation.slug}/updates/${update.slug ?? update.updateId}`"
                            class="fr-mt-1w action">{{ update.title }}
                  </NuxtLink>
                </div>
                <div class="fr-ml-1w">{{ toReadableDate(update.date!!) }}</div>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="consultation.goals" class="goals fr-p-3w fr-my-4w">
          <p class="fr-h5">La consultation en un clin d'œil</p>
          <div class="fr-mt-2w fr-grid-row" v-for="goal in consultation.goals">
            <span class="picto fr-col-2 fr-pt-1w">{{ goal.picto }}</span>
            <span class="fr-col-10" v-html="goal.description"></span>
          </div>
        </div>
      </div>

      <!-- Volet droit -->
      <div class="fr-col-8">
        <div v-if="userHasAnswered" class="fr-alert fr-alert--success">
          <h6 class="fr-alert__title">Vos réponses ont bien été envoyées.</h6>
        </div>
        <div>
          <DsfrBadge label="Consultation en cours" no-icon/>
        </div>
        <div>
          <DsfrTag :label="`${consultation.thematique.picto} ${consultation.thematique.label}`"/>
        </div>

        <h1>{{ consultation.title }}</h1>

        <div class="hyphen"></div>

        <div v-if="consultation.questionsInfo" class="info-question fr-px-2w fr-py-1w">
          <div class="fr-mb-2w">
            <VIcon icon="ri:calendar-2-line" :inline="true" :ssr="true"/>
            Jusqu'au {{ toReadableDate(consultation.questionsInfo.endDate) }}
          </div>
          <div class="fr-mb-2w">
            <VIcon :ssr="true" icon="ri:questionnaire-line" :inline="true"/>
            {{ consultation.questionsInfo.questionCount }}
          </div>
          <div class="fr-mb-2w">
            <VIcon :ssr="true" icon="ri:timer-line" :inline="true"/>
            {{ consultation.questionsInfo.estimatedTime }}
          </div>
          <div class="fr-mb-2w">
            <VIcon :ssr="true" icon="ri:group-line" :inline="true"/>
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
        <ConsultationSections :sections="consultation.body.headerSections"/>
        <ConsultationSections :sections="consultation.body.sections"/>
        <NuxtLink :to="'/consultations/' + consultation.id + '/questions'" v-if="estEnCours"
                  class="fr-mb-4w fr-btn">
          Répondre à la consultation
        </NuxtLink>
      </div>
    </div>
  </div>

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
.hyphen {
  border-bottom: var(--blue-france-main-525) 4px solid;
  width: 80px;
  margin-bottom: 1.6em;
}

.fr-badge {
  margin-bottom: 1.6em;
}

.fr-tag {
  margin-bottom: 0.4em;
}

h1 {
  margin: 0 0 0.4em 0;
}

h2 {
  color: var(--blue-france-sun-113-625);
}

.history {
  h2 {
    font-size: 1.4em;
  }

  ul {
    list-style: none;
    padding-inline-start: 0;

    a {
      font-weight: bold;
      color: var(--blue-france-sun-113-625);
    }

    li.active {
      border-left-width: 4px;
      border-left-color: var(--blue-france-sun-113-625);
      border-left-style: solid;
      padding-left: 1em;

      .iconify {
        color: var(--blue-france-main-525);
        width: 1.4em;
        height: 1.4em;
      }
    }
  }
}

.info-question {
  .iconify {
    color: var(--blue-france-sun-113-625);
    width: 1.2em;
    height: 1.2em;
    margin-right: 0.5em;
  }

  .progress-bar {
    background-color: #d9d9d98c;
    border-radius: 7px;
    height: 7px;

    .progress-value {
      background-color: var(--text-title-blue-france);
      border-radius: 7px;
      height: 7px;
    }
  }
}

.goals {
  background-color: var(--blue-france-950-100);
  padding: 1em;

  .picto {
    font-size: 1.6em;
  }

  .fr-h5 {
    color: var(--blue-france-sun-113-625);
  }
}

.announcer {
  color: var(--blue-france-sun-113-625);
  text-align: center;

  > span {
    display: block;
  }
}
</style>