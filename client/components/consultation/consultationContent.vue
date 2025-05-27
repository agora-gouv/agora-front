<script setup lang="ts">
import Consultation from "~/client/types/consultation/consultation";
import svgBook from "@gouvfr/dsfr/dist/artwork/pictograms/leisure/book.svg";

const props = defineProps<{
  consultation: Consultation,
}>()

const userHasAnsweredToConsultation = useRoute().query.answered

const estEnCours = props.consultation.consultationDates?.endDate
  && new Date() < new Date(props.consultation.consultationDates.endDate)

const runtimeConfig = useRuntimeConfig();
const isResponseActivated = runtimeConfig.public.features.consultations

const openResponseModal = ref(false)
const respond = async () => {
  const isMobileDevice = /android|iPad|iPhone|iPod/i.test(navigator.userAgent)
  if (!isMobileDevice) {
    await navigateTo({path: `/consultations/${props.consultation.id}/questions`})
    return
  }

  return openResponseModal.value = true
}

const navigateToQuestions = () => navigateTo({path: `/consultations/${props.consultation.id}/questions`})

</script>

<template>
  <div class="fr-mt-4w">
    <div v-if="userHasAnsweredToConsultation" class="fr-alert fr-alert--success fr-mb-2w">
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
        <ConsultationQuestionsInformations v-if="consultation.questionsInfo && estEnCours" class="info-question fr-py-1w" 
                                           :questions-info="consultation.questionsInfo" :consultation-est-en-cours="estEnCours"/>
        <div v-if="consultation.responsesInfo" class="fr-callout" id="results">
          <div v-html="consultation.responsesInfo.description" />
          <NuxtLink :to="`/consultations/${consultation.id}/results`" class="fr-btn">
            {{ consultation.responsesInfo.actionText }}
          </NuxtLink>
        </div>
        <ConsultationSections :sections="consultation.body.headerSections"/>
        <ConsultationSections :sections="consultation.body.sections"/>
        <DsfrTile v-if="consultation.downloadAnalysisUrl" title="Télécharger la synthèse complète"
          :to="consultation.downloadAnalysisUrl" :download="true" :img-src="svgBook" class="fr-mb-4w"
          description="Pour aller plus loin, retrouvez l'analyse détaillée de l'ensemble des réponses à cette consultation."/>
        <ConsultationShare
          v-if="consultation.isAnsweredByUser"
          :share-text="consultation.shareText"
          :share-title="consultation.title"/>
        <ConsultationEncartFeedback :consultation="consultation" v-if="consultation.feedbackQuestion" />
        <DsfrButton type="button" v-if="estEnCours && isResponseActivated && !consultation.isAnsweredByUser"
                    class="fr-mb-4w fr-btn" @click="respond()">
          Répondre à la consultation
        </DsfrButton>

        <ConsultationRepondreModal :open="openResponseModal" @close="() => openResponseModal = false"
                                   :on-click="navigateToQuestions"/>
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

<style scoped lang="scss">
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

:deep(meter#objectif) {
  border-radius: 7px;
  height: 7px;
  display: block;
  width: 100%;
  background: #d9d9d98c;
  -webkit-appearance: none;
}

:deep(meter#objectif::-webkit-meter-bar) {
  background: #d9d9d98c;
  -webkit-appearance: none;
}

:deep(meter#objectif::-webkit-meter-optimum-value) {
  background: var(--text-title-blue-france);
}

:deep(meter#objectif::-moz-meter-bar) {
  background: var(--text-title-blue-france);
}

:deep(meter#objectif::-webkit-meter-bar) {
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

:deep(h2) {
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
</style>