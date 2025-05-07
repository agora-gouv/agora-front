<script setup lang="ts">
import Consultation from "~/client/types/consultation/consultation";
import svgBook from "@gouvfr/dsfr/dist/artwork/pictograms/leisure/book.svg";

const props = defineProps<{
  consultation: Consultation,
  jwtToken: string
}>()

const userHasAnswered = useRoute().query.answered

const estEnCours = props.consultation.consultationDates?.endDate
  && new Date() < new Date(props.consultation.consultationDates.endDate)

const runtimeConfig = useRuntimeConfig();
const isResponseActivated = runtimeConfig.public.features.consultations == '1'

const giveFeedback = async (isPositive: boolean) => {
  const api = new ConsultationApi()
  await api.giveFeedback(props.consultation.id, props.consultation.updateId, isPositive, props.jwtToken)
}
</script>

<template>
  <div class="fr-mt-4w">
    <div v-if="userHasAnswered" class="fr-alert fr-alert--success fr-mb-2w">
      <h6 class="fr-alert__title">Vos réponses ont bien été envoyées.</h6>
    </div>
    <div class="consultation">
      <div id="right-column">
        <div>
          <DsfrBadge label="Consultation en cours" no-icon/>
        </div>
        <div>
          <DsfrTag :label="`${consultation.thematique.picto} ${consultation.thematique.label}`"/>
        </div>

        <h1>{{ consultation.title }}</h1>

        <ConsultationEnUnClinDOeil v-if="consultation.goals" :goals="consultation.goals"/>
        <div v-if="consultation.questionsInfo && estEnCours" class="info-question fr-py-1w">
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
        <!-- TODO Règles d'affichage des results = j'ai déjà répondu et que la consultation n'est pas terminée ? -->
        <div class="fr-callout" id="results">
          <h3>Vous avez déjà répondu à cette consultation et nous vous en remercions !</h3>
          <NuxtLink :to="'/consultations/' + consultation.id + '/results'" class="fr-btn">
            Voir les premiers résultats
          </NuxtLink>
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
        <ConsultationShare
          :share-text="consultation.shareText"
          :share-title="consultation.title"/>
        <!-- TODO Quelles sont les règles d'affichage du Feedback ? -->
        <!-- TODO Quel texte dans le p ? -->
        <!-- TODO Qu'est-ce que ça fait quand j'ai appuyé sur le bouton ? -->
        <div class="fr-callout">
          <h3>Donnez votre avis</h3>
          <p>Êtes-vous satisfait(e) de l’analyse de cette consultation ?</p>
          <DsfrButton type="button" class="fr-btn fr-mr-2w" icon="ri:thumb-up-fill" @click="giveFeedback(true)">Oui</DsfrButton>
          <DsfrButton type="button" class="fr-btn fr-btn--secondary" @click="giveFeedback(false)">Non</DsfrButton>
        </div>
        <NuxtLink :to="'/consultations/' + consultation.id + '/questions'"
                  v-if="estEnCours && isResponseActivated && !consultation.isAnsweredByUser" class="fr-mb-4w fr-btn">
          Répondre à la consultation
        </NuxtLink>
      </div>

      <div id="left-column">
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
        <ConsultationEnUnClinDOeil v-if="consultation.goals" :goals="consultation.goals"/>
      </div>
    </div>
    <BandeauTelechargementAdaptatif
      v-if="consultation.questionsInfo && new Date(consultation.questionsInfo.endDate) >= new Date()"
      title="C’est encore mieux sur l’application Agora."/>

    <BandeauTelechargementAdaptatif v-else title="Téléchargez l'application pour donner votre avis."/>
  </div>
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

#results {
  background-color: var(--blue-france-950-100);
}

#right-column {
  .goals {
    display: none;
  }
}

@media screen and (max-width: 767px) {
  .consultation {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    column-gap: 0;
  }

  .consultation #left-column {
    .fr-responsive-img, .goals {
      display: none;
    }

    .history {
      display: block;
      margin-bottom: 2em;
    }
  }

  #right-column {
    .goals {
      display: block;
    }
  }
}

.consultation #left-column {
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
</style>