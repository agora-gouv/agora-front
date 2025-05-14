<script setup lang="ts">
import { VIcon } from "@gouvminint/vue-dsfr";

definePageMeta({
  layout: 'basic'
})

const ficheId = useRoute().params.id as string
const ficheInventaire = (await new FicheInventaireApi().get(ficheId))

const neContientQueDesBalisesSansContenu = /^\s*(<[^>]+>\s*)+$/i

const tabListName = 'Étapes de la consultation'
const tabs = [
  {id: "lancement", title: 'Présentation', content: ficheInventaire.etapeLancementHtml},
  {id: "analyse", title: 'Résultats', content: ficheInventaire.etapeAnalyseHtml},
  {id: "suivi", title: 'Actions mises en oeuvre', content: ficheInventaire.etapeSuiviHtml},
]

const activeTabIndex = tabs.findLastIndex(tab => neContientQueDesBalisesSansContenu.test(tab.content))
const activeTab = ref(activeTabIndex !== -1 ? activeTabIndex : 0)

const selectPrevious = async () => {
  activeTab.value = ((activeTab.value - 1) + tabs.length) % tabs.length
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
      <div class="reverse">
        <h1>{{ ficheInventaire.titre }}</h1>
        <p>{{ `${ficheInventaire.thematique.picto} ${ficheInventaire.thematique.label}` }}</p>
        <div class="fr-mb-2w">
          <DsfrBadge :label="ficheInventaire.etape" type="success" class="fr-mr-1w" no-icon/>
        </div>
      </div>
      <div>
        <img :src="ficheInventaire.illustrationUrl" alt="" class="fr-mt-2w fr-responsive-img"/>
      </div>
    </div>

    <div class="cadre-meta fr-mb-8w head">
      <dl>
        <div>
          <dt>
            <VIcon icon="ri:calendar-fill" :inline="true" :ssr="true"/>
            Année de lancement :
          </dt>
          <dd>{{ ficheInventaire.anneeDeLancement }}</dd>
        </div>
        <div>
          <dt>
            <VIcon icon="ri:government-fill" :inline="true" :ssr="true"/>
            Proposé par :
          </dt>
          <dd>{{ ficheInventaire.porteur }}</dd>
        </div>
      </dl>
      <a :href="ficheInventaire.lienSite" class="fr-btn" rel="external" target="_blank">Accéder au site dédié</a>
    </div>

    <DsfrTabs v-model="activeTab" :tab-list-name="tabListName" :tab-titles="tabs">
      <template #tab-items>
        <TabItem v-for="(tab, index) of tabs" :key="tab.id" :tab-id="tab.id"
                 :panel-id="index.toString()" @click="activeTab = index" @next="selectNext()"
                 @previous="selectPrevious()" @first="selectFirst()" @last="selectLast()"
                 :disabled="neContientQueDesBalisesSansContenu.test(tab.content)">
          {{ tab.title }}
        </TabItem>
      </template>

      <DsfrTabContent panel-id="0" tab-id="lancement">
        <dl class="head">
          <div>
            <dt>
              <VIcon icon="ri:dna-fill" :inline="true" :ssr="true"/>
              Type :
            </dt>
            <dd>{{ ficheInventaire.type }}</dd>
          </div>
          <div>
            <dt>
              <VIcon icon="ri:calendar-2-fill" :inline="true" :ssr="true"/>
              Dates d’ouverture à la participation :
            </dt>
            <dd>
              du
              <Date :date="ficheInventaire.debut"/>
              au
              <Date :date="ficheInventaire.fin"/>
            </dd>
          </div>
          <div>
            <dt><VIcon icon="ri:team-fill" :inline="true" :ssr="true"/> Conditions de participation : </dt>
            <dd>{{ ficheInventaire.conditionParticipation }}</dd>
          </div>
          <div>
            <dt><VIcon icon="ri:message-2-fill" :inline="true" :ssr="true"/> Modalités de participation : </dt>
            <dd>{{ ficheInventaire.modaliteParticipation }}</dd>
          </div>
        </dl>
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
.reverse {
  display: flex;
  flex-direction: column-reverse;
}

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

dl {
  padding-left: 0;
  
  div {
    margin-bottom: 0.8em;
    
    dt {
      display: inline;
      font-weight: bold;
      color: var(--blue-france-sun-113-625);

      .vicon {
        width: 1.2em;
        height: 1.2em;
        margin-right: 0.5em;
      }
    }

    dd {
      display: inline;
      padding: 0;
    }
  }
}
</style>