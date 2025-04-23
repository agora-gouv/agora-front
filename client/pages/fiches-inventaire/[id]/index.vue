<script setup lang="ts">
import { VIcon } from "@gouvminint/vue-dsfr";

definePageMeta({
  layout: 'basic'
})

const ficheId = useRoute().params.id as string
const ficheInventaire = (await new FicheInventaireApi().get(ficheId)).value

const etape = ficheInventaire.etape
const objectif = ficheInventaire.objectif
const thematique = `${ficheInventaire.thematique.picto} ${ficheInventaire.thematique.label}`
const titre = ficheInventaire.titre
const illustration = ficheInventaire.illustrationUrl
const anneeLancement = ficheInventaire.anneeDeLancement
const porteur = ficheInventaire.porteur
const site = ficheInventaire.lienSite
const debutConsultation = ficheInventaire.debut
const finConsultation = ficheInventaire.fin
const statut = ficheInventaire.statut
const condition = ficheInventaire.conditionParticipation
const modalite = ficheInventaire.modaliteParticipation
const nombreDeCaracteresMinimumPourAfficherContenu = 20

const tabListName = 'Étapes de la consultation'
const tabs = [
  {id: "lancement", title: 'Lancement de la consultation', content: ficheInventaire.etapeLancementHtml},
  {id: "analyse", title: 'Analyse des résultats', content: ficheInventaire.etapeAnalyseHtml},
  {id: "suivi", title: 'Suivi de la consultation', content: ficheInventaire.etapeSuiviHtml},
]
const activeTab = ref(tabs.findIndex((xx) => xx.title.toLowerCase() === etape.toLowerCase()) ?? 0)

const selectPrevious = async () => {
  const newIndex = activeTab.value === 0 ? tabs.length - 1 : activeTab.value - 1
  activeTab.value = newIndex
}
const selectNext = async () => {
  activeTab.value = (activeTab.value + 1) % tabs.length
}
const selectFirst = async () => {
  activeTab.value = 0
}
const selectLast = async () => {
  activeTab.value = tabs.length - 1
}

</script>

<template>
  <div class="fr-mt-4w">
    <div class="header-grid">
      <div>
        <div class="fr-mb-2w">
          <DsfrBadge :label="etape" type="success" class="fr-mr-1w" no-icon/>
          <DsfrBadge :label="objectif" type="info" no-icon/>
        </div>
        <p>{{ thematique }}</p>
        <h1>{{ titre }}</h1>
      </div>
      <div>
        <img :src="illustration" alt="" class="fr-mt-2w fr-responsive-img"/>
      </div>
    </div>

    <ul class="cadre-meta fr-mb-8w head">
      <li>
        <VIcon icon="ri:calendar-fill" :inline="true" :ssr="true"/>
        <b>Année de lancement :</b> {{ anneeLancement }}
      </li>
      <li>
        <VIcon icon="ri:government-fill" :inline="true" :ssr="true"/>
        <b>Porteur :</b> {{ porteur }}
      </li>
      <li>
        <a :href="site" class="fr-btn" rel="external" target="_blank">Site officiel de la consultation</a>
      </li>
    </ul>

    <DsfrTabs v-model="activeTab" :tab-list-name="tabListName" :tab-titles="tabs">
      <template #tab-items>
        <TabItem v-for="(tab, index) of tabs" :key="index" :tab-id="tab.id"
                     :panel-id="index.toString()" @click="activeTab = index" @next="selectNext()"
                     @previous="selectPrevious()" @first="selectFirst()" @last="selectLast()"
                     :disabled="tab.content.length < nombreDeCaracteresMinimumPourAfficherContenu">
          {{ tab.title }}
        </TabItem>
      </template>

      <DsfrTabContent panel-id="0" tab-id="lancement">
        <ul class="head">
          <li>
            <VIcon icon="ri:time-fill" :inline="true" :ssr="true"/>
            <b>Statut de la consultation :</b> {{ statut }}
          </li>
          <li>
            <VIcon icon="ri:calendar-2-fill" :inline="true" :ssr="true"/>
            <b>Dates d’ouverture à la participation :</b> du
            <Date :date="debutConsultation"/>
            au
            <Date :date="finConsultation"/>
          </li>
          <li>
            <VIcon icon="ri:team-fill" :inline="true" :ssr="true"/>
            <b>Conditions de participation :</b> {{ condition }}
          </li>
          <li>
            <VIcon icon="ri:message-2-fill" :inline="true" :ssr="true"/>
            <b>Modalités de participation :</b> {{ modalite }}
          </li>
        </ul>
        <div v-html="tabs[0].content"></div>
      </DsfrTabContent>

      <DsfrTabContent panel-id="1" tab-id="analyse">
        <div v-html="tabs[1].content"></div>
      </DsfrTabContent>

      <DsfrTabContent panel-id="2" tab-id="suivi">
        <div v-html="tabs[2].content"></div>
      </DsfrTabContent>
    </DsfrTabs>
  </div>
</template>

<style>
.header-grid {
  display: grid;
  grid-template-columns: 
      [left-start]
      2fr
      [left-end right-start]
      1fr
      [right-end];
  column-gap: 2em;
  grid-auto-flow: dense;
}

@media screen and (max-width: 767px) {
  .header-grid {
    grid-template-columns: 
      [left-start]
      2fr
      [left-end];
  }

  img {
    display: none;
  }
}

h2 {
  color: var(--blue-france-sun-113-625);
  font-size: 1.8rem;
}

.cadre-meta {
  background-color: var(--blue-france-950-100);
  padding: 2em 2em 1em 2em;
  margin-top: 1em;

  a {
    margin-top: 1em;
  }
}

.fr-tabs .head {
  padding-left: 0;
  margin-bottom: 2em;
}

ul.head {
  li {
    list-style: none;
    margin-bottom: 0.8em;

    .vicon {
      color: var(--blue-france-sun-113-625) !important;
      width: 1.2em;
      height: 1.2em;
      margin-right: 0.5em;
    }

    b {
      color: var(--blue-france-sun-113-625);
    }
  }
}
</style>