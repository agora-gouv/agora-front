<script setup lang="ts">
import { VIcon } from "@gouvminint/vue-dsfr";

definePageMeta({
  layout: 'basic'
})

// const ficheId = useRoute().params.id

const etat = "Consultation en cours"
const objectif = "Exprimer une opinion"
const thematique = "🌾 Agriculture et alimentation"
const titre = "Mieux rémunérer les agriculteurs : quels leviers pour le consommateur ?"
const illustration = "https://intuition-software.com/wp-content/uploads/2021/06/Checklist-1-edited-scaled.jpg"
const anneeLancement = "2024"
const porteur = "Ministère de la Transition Écologique et de la Cohésion des Territoires"
const site = "Concertation « notre avenir énergétique » - Octobre 2022- Janvier 2023"
const debutConsultation = "2024-10-12"
const finConsultation = "2024-12-10"
const statut = "ouvert à la participation"
const condition = "ouvert à tous"
const modalite = "en ligne"

const tabListName = 'Liste d’onglet'
const tabTitles = [
  {title: 'Lancement de la consultation'},
  {title: 'Analyse des résultats'},
  {title: 'Suivi de la consultation'},
]
const activeTab = ref(0)

const etape1 = "Contexte\n" +
  "Titre H4 SM\n" +
  "La Stratégie française pour l’énergie et le climat (SFEC) est la  feuille de route pour atteindre la neutralité carbone en 2050 et pour assurer l’adaptation de notre société aux impacts du changement climatique. Elle inclut plusieurs lois de programmation revues régulièrement. Pour élaborer sa prochaine version, le Gouvernement a fait plusieurs concertations dont celle intitulée « Notre avenir énergétique se décide maintenant », alliant plateforme en ligne, Tour de France des régions et Forum des jeunesses. \n" +
  "Objectifs\n" +
  "Mettre en discussion les enjeux de la transition énergétique pour atteindre la neutralité carbone en 2050 et sortir de notre dépendance aux énergies fossiles, en évoquant notamment les implications concrètes sur nos modes de vie \n" +
  "Engagements du porteur\n" +
  "Répondre au bilan et à la synthèse de la concertation en indiquant les orientations que le Gouvernement a retenues pour les lois qui font partie de la stratégie française sur l’énergie et le climat \n" +
  "Calendrier\n" +
  "du 20 octobre au 31 décembre 2022 : \n" +
  "Consultation en ligne, et Tour de France des régions  \n" +
  "du 19 au 22 janvier 2023 :  Forum des jeunesses \n" +
  "Autres informations\n" +
  "La Première Ministre a désigné un comité de garants de la Commission nationale du débat public (CNDP), chargé d’assurer le suivi et le bon déroulement de la concertation, composée de :\n" +
  "Mme Ilaria Casillo, vice-présidente de la CNDP ;\n" +
  "M. Floran Augagneur, vice-président de la CNDP ;\n" +
  "M. Thierry Lataste, conseiller d’Etat, membre de la CNDP ;\n" +
  "Mme Isabelle Jarry, garante dans la liste nationale des garants de la CNDP."
</script>

<template>
  <div class="fr-mt-4w">
    <div class="header-grid">
      <div>
        <div class="fr-mb-2w">
          <DsfrBadge :label="etat" type="success" class="fr-mr-1w" no-icon/>
          <DsfrBadge :label="objectif" type="info" no-icon/>
        </div>
        <p>{{ thematique }}</p>
        <h1>{{ titre }}</h1>
      </div>
      <div>
        <img :src="illustration" alt="" class="fr-mt-2w fr-responsive-img"/>
      </div>
    </div>

    <div class="cadre-meta fr-mb-8w">
      <p>
        <VIcon icon="ri:calendar-fill" :inline="true" :ssr="true"/>
        <b>Année de lancement :</b> {{ anneeLancement }}
      </p>
      <p>
        <VIcon icon="ri:government-fill" :inline="true" :ssr="true"/>
        <b>Porteur :</b> {{ porteur }}
      </p>
      <a :href="site" class="fr-btn" rel="external" target="_blank">Site officiel de la consultation</a>
    </div>

    <DsfrTabs
      v-model="activeTab"
      :tab-list-name="tabListName"
      :tab-titles="tabTitles"
    >
      <template #tab-items>
        <DsfrTabItem
          v-for="(tab, index) of tabTitles"
          :key="index"
          :tab-id="index.toString()"
          :panel-id="index.toString()"
          @click="activeTab = index"
        >
          {{ tab.title }}
        </DsfrTabItem>
      </template>

      <DsfrTabContent
        panel-id="0"
        tab-id="0"
      >
        <p>
          <VIcon icon="ri:time-fill" :inline="true" :ssr="true"/>
          <b>Statut de la consultation :</b> {{ statut }}
        </p>
        <p>
          <VIcon icon="ri:calendar-2-fill" :inline="true" :ssr="true"/>
          <b>Dates d’ouverture à la participation :</b> du
          <Date :date="debutConsultation"/>
          au
          <Date :date="finConsultation"/>
        </p>
        <p>
          <VIcon icon="ri:team-fill" :inline="true" :ssr="true"/>
          <b>Conditions de participation :</b> {{ condition }}
        </p>
        <p>
          <VIcon icon="ri:message-2-fill" :inline="true" :ssr="true"/>
          <b>Modalités de participation :</b> {{ modalite }}
        </p>
        {{ etape1 }}
      </DsfrTabContent>

      <DsfrTabContent
        panel-id="1"
        tab-id="1"
      >
        <div>Contenu 3 avec d'<em><strong>autres composants</strong></em></div>
      </DsfrTabContent>

      <DsfrTabContent
        panel-id="2"
        tab-id="2"
      >
        <div>
          <p>Contenu 4 avec beaucoup de contenus</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae fugit sit et eos a officiis adipisci nulla repellat
            cupiditate? Assumenda, explicabo ullam laboriosam ex sit corporis enim illum a itaque.</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi animi quis quos consectetur alias delectus recusandae
            sunt quisquam incidunt provident quidem, at voluptatibus id, molestias et? Temporibus perspiciatis aut voluptates.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam obcaecati at delectus iusto possimus! Molestiae,
            iusto veritatis. Nostrum magni officiis autem, in ullam aliquid, mollitia, commodi architecto vitae omnis vero.</p>
        </div>
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

.cadre-meta {
  background-color: var(--blue-france-950-100);
  padding: 2em;
  margin-top: 1em;
  
  a {
    margin-top: 1em;
  }
}

p {
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
</style>