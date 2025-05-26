<script setup lang="ts">
definePageMeta({
  layout: 'basic',
})
useHead({
  title: 'Fiches inventaire - Agora',
})

const fiches = await (new FicheInventaireApi().getAll())

const today = new Date()

const fichesEnCours = fiches.filter(fiche => {
  const dateFin = new Date(fiche.fin)
  return dateFin >= today
})
const fichesEnCoursAvecOuvertATousEnPremier = fichesEnCours.sort((a) => {
  return a.conditionParticipation === "Ouvert à tous" ? -1 : 1
});

const fichesTerminees = fiches.filter(fiche => {
  const dateFin = new Date(fiche.fin)
  return dateFin < today
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

      <DsfrCard :img-src="fiche.illustrationUrl" :link="fiche.lienSite" :title="fiche.titre" description="" 
                :badges="[{label: fiche.etape, type: getEtapeType(fiche.etape), noIcon: true}]"
                alt-img="" horizontal v-for="fiche in fichesEnCoursAvecOuvertATousEnPremier" :key="fiche.id" class="fr-mb-4w">
        <template #start-details>
          <DsfrTag :label="fiche.thematique.label"/>
          <p class="modalites">
            <VIcon icon="ri:chat-3-line" :inline="true" :ssr="true"/>
            {{ fiche.conditionParticipation }} ∙ {{ fiche.modaliteParticipation }}
          </p>
        </template>
        <template #end-details>
          <p><b>Proposé par :</b> {{ fiche.porteur }}</p>
          <p class="date-fin">
            <VIcon icon="ri:calendar-line" :inline="true" :ssr="true"/>
            jusqu'au
            <Date :date="fiche.fin"/>
          </p>
        </template>
      </DsfrCard>
    </div>

    <div v-if="fichesTerminees.length > 0" id="terminees">
      <h2>Explorez ce qui a été fait</h2>
      <p>
        Depuis <time>2017</time>, plusieurs rendez-vous ont permis aux Français de contribuer sur différents sujets. Certains, comme les
        conventions citoyennes, visent à construire un avis collectif sur des questions complexes. D'autres, comme les consultations en
        ligne, permettent à chacun de donner ses idées et ses préférences de façon individuelle. Ici, vous pouvez découvrir toutes les
        initiatives lancées, ce que les citoyens ont exprimé et ce à quoi cela a mené concrètement.
      </p>
      <div class="fr-grid-row fr-grid-row--gutters">
        <ConsultationFiltres class="fr-col fr-col-sm-12 fr-col-md-4" />
        <div class="fr-grid-row fr-col fr-col-sm-12 fr-col-md-8 fr-grid-row--gutters">
          <div class="fr-col fr-col-sm-6 fr-col-md-6 fr-mb-2w" v-for="fiche in fichesTerminees" :key="fiche.id">
          <DsfrCard
            :img-src="fiche.illustrationUrl"
            :link="`/fiches-inventaire/${fiche.id}`"
            :title="fiche.titre"
            description=""
            :badges="[{
              label: fiche.etape,
              type: 'success',
            }]"
            alt-img="">
            <template #start-details>
              <DsfrTag :label="fiche.thematique.label"/>
              <DsfrTag :label="fiche.anneeDeLancement"/>
              <p class="modalites">
                <VIcon icon="ri:chat-3-line" :inline="true" :ssr="true"/>
                {{ fiche.conditionParticipation }} ∙ {{ fiche.modaliteParticipation }}
              </p>
            </template>
            <template #end-details>
            </template>
          </DsfrCard>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.fr-grid-row .fr-card {
  height: auto;
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

.fr-badge {
  font-size: .75rem;
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

h2 + p {
  margin-bottom: 3rem;
}
</style>