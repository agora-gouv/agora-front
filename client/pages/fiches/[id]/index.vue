<script setup lang="ts">
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

const tabListName = 'Liste d’onglet'
const tabTitles = [
  { title: 'Titre 1' },
  { title: 'Titre 2' },
  { title: 'Titre 3' },
]
const activeTab = ref(0)
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
              <div>Contenu 2 avec d'<strong>autres composants</strong></div>
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
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae fugit sit et eos a officiis adipisci nulla repellat cupiditate? Assumenda, explicabo ullam laboriosam ex sit corporis enim illum a itaque.</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi animi quis quos consectetur alias delectus recusandae sunt quisquam incidunt provident quidem, at voluptatibus id, molestias et? Temporibus perspiciatis aut voluptates.</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam obcaecati at delectus iusto possimus! Molestiae, iusto veritatis. Nostrum magni officiis autem, in ullam aliquid, mollitia, commodi architecto vitae omnis vero.</p>
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