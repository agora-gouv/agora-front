<script setup lang="ts">
import type QueryParam from "~/types/fiche_inventaire/query";
import {FicheInventaireDTO} from "~/types/fiche_inventaire/ficheInventaire";


definePageMeta({
  layout: 'basic',
})
useHead({
  title: 'Consultations - Agora',
})

const runtimeConfig = useRuntimeConfig();
const withFilters = runtimeConfig.public.features.filtresConsultations
const etapeDTO = FicheInventaireDTO.Etape

const today = new Date()
const etapes: QueryParam = { "etape": [etapeDTO.EnCours, etapeDTO.AVenir]}

const fiches = await (new FicheInventaireApi().getAll(etapes))

const fichesEnCours = fiches.filter(fiche => {
  const dateFin = new Date(fiche.fin)
  return dateFin >= today
})
const fichesEnCoursAvecOuvertATousEnPremier = fichesEnCours.sort((a, b) => {
  return Number(b.conditionParticipation === "Ouvert à tous") - Number(a.conditionParticipation === "Ouvert à tous")
});
const query: QueryParam = useRoute().query

const fichesFiltrees = await (new FicheInventaireApi().getAll(query))

const etapesTerminees = [etapeDTO.Actions, etapeDTO.ResultatAVenir, etapeDTO.ResultatDispo]

const fichesTerminees = fichesFiltrees.filter(fiche => {
  const dateFin = new Date(fiche.fin)
  return dateFin < today && etapesTerminees.includes(fiche.etape)
})

const getEtapeType = (etape: string) => {
  if (etape === 'En cours') return 'info'
  return 'success'
}
</script>

<template>
  <div class="fr-mb-2w fr-mt-6w">
    <div v-if="fichesEnCours.length > 0" id="en-cours">
      <h2>Participez dès maintenant</h2>
      <p>
        La participation citoyenne permet à l’État d'associer les citoyens aux orientations du pays et des réformes à mener, en dehors des
        élections. Elle peut prendre différentes formes selon les besoins : participer en ligne ou bien en se réunissant en physique,
        ouverte au plus grand nombre ou avec un échantillon représentatif de la population, etc. Retrouvez ici les dispositifs qui
        impliquent les citoyens dans la vie publique en ce moment et faites entendre votre voix.
      </p>

      <ul class="fr-p-0 fr-m-0">
        <li v-for="fiche in fichesEnCoursAvecOuvertATousEnPremier" :key="fiche.id" class="fr-mb-4w fr-p-0">
          <!-- FIXME (GAFI 19-11-2025): Pas DsfrCard, sinon on est obligés d'avoir une liste au tour des tags -->
          <div class="fr-card fr-enlarge-link fr-card--horizontal">
            <div class="fr-card__body">
              <div class="fr-card__content">
                <h3 class="fr-card__title">
                  <a :href="fiche.lienSite">{{ fiche.titre }}</a>
                </h3>
                  <div class="fr-card__start">
                    <DsfrTag :label="fiche.thematique.label"/>
                    <p class="modalites">
                      <VIcon icon="ri:chat-3-line" :inline="true" :ssr="true"/>
                      {{ fiche.conditionParticipation }} ∙ {{ fiche.modaliteParticipation }}
                    </p>
                  </div>
                  <div class="fr-card__end">
                    <p><b>Proposé par :</b> {{ fiche.porteur }}</p>
                    <p class="date-fin">
                      <VIcon icon="ri:calendar-line" :inline="true" :ssr="true"/>
                      jusqu'au
                      <Date :date="fiche.fin"/>
                    </p>
                  </div>
                <!-- FIXME (GAFI 12-11-2025): Sans desc vide, il y a manque un espacement -->
                <div class="fr-card__desc"></div>
              </div>
            </div>
            <div class="fr-card__header">
              <div class="fr-card__img">
                <img class="fr-responsive-img" :src="fiche.illustrationUrl" alt="">
              </div>
              <div class="fr-badges-group">
                <p :class="`fr-badge fr-badge--${getEtapeType(fiche.etape)} fr-badge--no-icon`">
                  {{ fiche.etape }}
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div id="terminees">
      <h2>Explorez ce qui a été fait</h2>
      <p>
        Depuis <time>2017</time>, plusieurs rendez-vous ont permis aux Français de contribuer sur différents sujets. Certains, comme les
        conventions citoyennes, visent à construire un avis collectif sur des questions complexes. D'autres, comme les consultations en
        ligne, permettent à chacun de donner ses idées et ses préférences de façon individuelle. Ici, vous pouvez découvrir toutes les
        initiatives lancées, ce que les citoyens ont exprimé et ce à quoi cela a mené concrètement.
      </p>
      <div class="fr-grid-row fr-grid-row--gutters">
        <ConsultationFiltres class="fr-col fr-col-sm-12 fr-col-md-4" v-if="withFilters" />
        <ul v-if="fichesTerminees.length > 0" :class="`fr-grid-row fr-col fr-grid-row--gutters ${withFilters ? 'fr-col-sm-12 fr-col-md-8' : 'fr-col-12'}`">
          <li class="fr-col fr-col-sm-6 fr-col-md-6 fr-mb-2w" v-for="fiche in fichesTerminees" :key="fiche.id">
            <!-- FIXME (GAFI 19-11-2025): Pas DsfrCard, sinon on est obligés d'avoir une liste autour des tags -->
            <div class="fr-card fr-enlarge-link">
                <div class="fr-card__body">
                  <div class="fr-card__content">
                    <h3 class="fr-card__title">
                      <a :href="`/je-participe/${fiche.id}`">{{ fiche.titre }}</a>
                    </h3>
                    <div class="fr-card__start">
                      <DsfrTag :label="fiche.thematique.label"/>
                      <DsfrTag :label="fiche.anneeDeLancement"/>
                      <p class="modalites">
                        <VIcon icon="ri:chat-3-line" :inline="true" :ssr="true"/>
                        {{ fiche.conditionParticipation }} ∙ {{ fiche.modaliteParticipation }}
                      </p>
                    </div>
                    <!-- FIXME (GAFI 12-11-2025): Sans end vide, il y a un espacement supplémentaire -->
                    <div class="fr-card__end"></div>
                    <!-- FIXME (GAFI 12-11-2025): Sans desc vide, il y a manque un espacement -->
                    <div class="fr-card__desc"></div>
                  </div>
                </div>
                <div class="fr-card__header">
                  <div class="fr-card__img">
                    <img class="fr-responsive-img" :src="fiche.illustrationUrl" alt="">
                  </div>
                  <div class="fr-badges-group">
                    <p class="fr-badge fr-badge--success">
                      {{ fiche.etape }}
                    </p>
                  </div>
                </div>
            </div>
          </li>
        </ul>
        <p v-else>Aucun résultat avec les filtres sélectionnés</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
ul {
  list-style: none;
}

.fr-grid-row .fr-card {
  height: 100%;
  margin-inline: 1rem;
}

.iconify {
  color: currentColor;
}

.modalites {
  margin-block: 0.5rem 0.4rem;
}

.fr-tag {
  font-size: 0.9rem;
  margin-right: 0.5rem;
}

:deep(.fr-card__end) {
  margin-top: 0;
  padding-top: 0;
}

.fr-card__body .fr-card__end b {
  color: var(--blue-france-sun-113-625);
}

.date-fin {
  font-size: .75rem;
  margin-top: 1.5rem;
  color: var(--grey-425-625)
}

.fr-card__start p {
  font-size: .75rem;
}

h1, h2 {
  color: var(--blue-france-sun-113-625);
}

h2 {
  margin-bottom: 1rem;
  margin-top: 4rem;
}

p {
  font-size: 1rem;
}
// FIXME (GAFI 19-11-2025): Le style scopé de `p` écrase le style par défaut de `.fr-badge`
.fr-badge {
  font-size: .875rem;
}

h2 + p {
  margin-bottom: 3rem;
}
</style>
