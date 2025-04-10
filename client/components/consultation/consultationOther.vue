<script setup lang="ts">
import Consultation from "~/client/types/consultation/consultation";
import svgBook from "@gouvfr/dsfr/dist/artwork/pictograms/leisure/book.svg";

const props = defineProps<{
  consultation: Consultation
}>()

const userHasAnswered = useRoute().query.answered

const estEnCours = props.consultation.consultationDates?.endDate
  && new Date() < new Date(props.consultation.consultationDates.endDate)
</script>

<template>
  <!--  <ConsultationShare :shareText="props.consultation.shareText" :shareTitle="props.consultation.title"/>-->
  <div class="consultation fr-mt-4w">

    <!-- Volet droit -->
    <div>
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

      <div v-if="consultation.questionsInfo" class="info-question fr-px-2w fr-py-1w">
        <div class="fr-mb-2w">
          <VIcon icon="ri:calendar-2-line" :inline="true" :ssr="true"/>
          Jusqu'au
          <Date :date="consultation.questionsInfo.endDate"/>
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
            <meter id="objectif" min="0" :max="consultation.questionsInfo.participantCountGoal"
                   :value="consultation.questionsInfo.participantCount">
              {{ consultation.questionsInfo.participantCount }} sur un objectif de {{ consultation.questionsInfo.participantCountGoal }}
            </meter>
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

    <!-- Volet gauche -->
    <div class="left-column">
      <img class="fr-responsive-img" :src="consultation.coverUrl" alt="">
      <div class="history" v-if="consultation.history">
        <h2>Suivi de la consultation</h2>
        <ul>
          <li class="fr-grid-row" :aria-current="consultation.updateId == update.updateId" v-for="update in consultation.history">
            <div class="fr-col-1">
              <VIcon v-if="update.status ==='incoming'" icon="ri:checkbox-circle" :ssr="true"/>
              <VIcon v-else icon="ri:checkbox-circle-fill" :ssr="true"/>
            </div>
            <div class="fr-col-11">
              <div class="fr-ml-3w">
                <NuxtLink :to="`/consultations/${consultation.slug}/updates/${update.slug ?? update.updateId}`"
                          class="fr-mt-1w action">{{ update.title }}
                </NuxtLink>
              </div>
              <Date class="fr-ml-3w" :date="update.date!!"/>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="consultation.goals" class="goals fr-p-3w fr-my-4w">
        <p class="fr-h5">La consultation en un clin d'œil</p>
        <ul class="fr-mt-2w" v-for="goal in consultation.goals">
          <li class="fr-grid-row">
            <span aria-hidden="true" class="picto fr-col-2 fr-pt-1w">{{ goal.picto }}</span>
            <span class="fr-col-10" v-html="goal.description"></span>
          </li>
        </ul>
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
.consultation {
  display: grid;
  grid-template-columns: 
      [left-start]
      1fr
      [left-end right-start]
      2fr
      [right-end];
  column-gap: 2em;
  grid-auto-flow: dense;  
}

@media screen and (max-width: 767px) {
  .consultation {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    column-gap: 0;
  }

  .consultation .left-column {
    display: none;
  }
}

.consultation .left-column {
  grid-column: left;
}

.consultation > * {
  grid-column: right;
}

meter#objectif {
  border-radius: 7px;
  height: 7px;
  display: block;
  width: 100%;
  background: #d9d9d98c;
  -webkit-appearance: none;
}

meter#objectif::-webkit-meter-bar {
  background: #d9d9d98c;
  -webkit-appearance: none;
}

meter#objectif::-webkit-meter-optimum-value {
  background: var(--text-title-blue-france);
}

meter#objectif::-moz-meter-bar {
  background: var(--text-title-blue-france);
}

meter#objectif::-webkit-meter-bar {
  border-radius: 7px;
  height: 7px;
  width: 100%;
}

h1::after {
  content: "";
  border-bottom: var(--blue-france-main-525) 4px solid;
  width: 80px;
  height: 20px;
  display: block;
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

.goals ul {
  list-style: none;
  padding-inline-start: 0;
}

.history {
  h2 {
    font-size: 1.4em;
    margin-bottom: 0;
  }

  ul {
    list-style: none;
    padding-inline-start: 0;

    a {
      font-weight: bold;
      color: var(--blue-france-sun-113-625);
    }

    li {
      margin-left: 0.5em;
      padding: 0.5em 0;

      .iconify {
        width: 1.4em;
        height: 1.4em;
        margin-left: 1.2em;
      }
    }

    li[aria-current="true"] {
      margin-left: 4px;
    }

    li[aria-current="true"] {
      border-left-width: 4px;
      border-left-color: var(--blue-france-sun-113-625);
      border-left-style: solid;

      .iconify {
        color: var(--blue-france-main-525);
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