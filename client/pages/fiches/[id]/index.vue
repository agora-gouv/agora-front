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
const annéeLancement = "2024"
const porteur = "Ministère de la Transition Écologique et de la Cohésion des Territoires"
const site = "Concertation « notre avenir énergétique » - Octobre 2022- Janvier 2023"
const ouverture = "Ouvert à tous"
const format = "Présentiel"
const status = "Bientôt ouvert à la participation"

const tabListName = 'Liste d’onglet'
const tabTitles = [
  {title: 'Titre 1'},
  {title: 'Titre 2'},
  {title: 'Titre 3'},
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
  <div>
    <template>
      <div class="fr-mt-4w">
        <div class="consultation">
          <DsfrBadge :label="etat" type="success" no-icon/>
          <DsfrBadge :label="objectif" type="info" no-icon/>
          <DsfrTag :label="thematique"/>
          <h1>{{ titre }}</h1>
          <img :src="illustration" alt="" class="fr-mt-2w fr-responsive-img"/>

          <div>
            <p>Année de lancement : {{ annéeLancement }}</p>
            <p>Porteur : {{ porteur }}</p>
            <p>Site de la consultation : {{ site }}</p>
            <a :href="site" class="fr-btn">Site officiel de la consultation</a>
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
              <DsfrBadge :label="ouverture" type="warning" no-icon/>
              <DsfrBadge :label="format" type="new" no-icon/>
              <DsfrBadge :label="status" class="fr-badge--purple-glycine" no-icon/>

              <p>
                <VIcon icon="ri:calendar-2-line" :inline="true" :ssr="true"/>
                Dates d’ouverture à la participation : du 14 avril 2024 au 15 juin 2024
              </p>
              <p>
                <VIcon icon="ri:calendar-2-line" :inline="true" :ssr="true"/>
                Statut de la consultation : bientôt ouvert à la participation / ouvert à la participation / consultation terminée
              </p>
              <p>
                <VIcon icon="ri:calendar-2-line" :inline="true" :ssr="true"/>
                Dates d’ouverture à la participation : du 14 avril 2024 au 15 juin 2024
              </p>
              <p>
                <VIcon icon="ri:calendar-2-line" :inline="true" :ssr="true"/>
                Conditions de participation : ouvert à tous / tirage au sort
              </p>
              <p>
                <VIcon icon="ri:calendar-2-line" :inline="true" :ssr="true"/>
                Modalités de participation : en ligne / présentiel
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
      </div>
    </template>
  </div>
</template>

<style>
</style>