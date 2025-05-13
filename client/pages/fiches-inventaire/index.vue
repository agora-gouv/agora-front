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
const fichesTerminees = fiches.filter(fiche => {
  const dateFin = new Date(fiche.fin)
  return dateFin < today
})
</script>
<template>
  <div class="fr-mb-2w fr-mt-6w">
    <div v-if="fichesEnCours.length > 0" id="fiches-en-cours">
      <h2>Participer aux consultations en cours</h2>
      <p>Pour répondre au plus près à vos préoccupations et vos attentes, le Gouvernement peut vous demander votre avis et vos idées sur les
        politiques à mener. Il propose régulièrement des consultations en ligne : voici celles actuellement ouvertes à la participation.</p>

      <DsfrCard :img-src="fiche.illustrationUrl" :link="fiche.lienSite" :title="fiche.titre" description=""
                alt-img="" horizontal v-for="fiche in fichesEnCours" :key="fiche.id" class="fr-mb-2w">
        <template #start-details>
          <DsfrTag :label="fiche.thematique.label"/>
          <p class="modalites">
            <VIcon icon="ri:chat-3-line" :inline="true" :ssr="true"/>
            {{ fiche.conditionParticipation }} ∙ {{ fiche.modaliteParticipation }}
          </p>
        </template>
        <template #end-details>
          <p><b>Porteur :</b> {{ fiche.porteur }}</p>
          <p class="date-fin">
            <VIcon icon="ri:calendar-line" :inline="true" :ssr="true"/>
            jusqu'au
            <Date :date="fiche.fin"/>
          </p>
        </template>
      </DsfrCard>
    </div>

    <div v-if="fichesTerminees.length > 0" id="fiches-terminees">
      <h2>Explorez toutes les consultations</h2>
      <p>Les résultats de chaque initiative sont publics et l'Etat s’engage à vous informer des suites qui y sont données. Voici l’ensemble
        des initiatives lancées, avec la synthèse de des contributions citoyennes et ce sur quoi elles ont abouti.</p>
      <div class="fr-grid-row">
        <div class="fr-col fr-col-sm-6 fr-col-md-4 fr-mb-2w" v-for="fiche in fichesTerminees" :key="fiche.id">
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
</template>
<style scoped lang="scss">
.fr-grid-row .fr-card {
  min-height: 100%;
  height: auto;
  margin-inline: 1rem;
}

.iconify {
  color: var(--grey-425-625)
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