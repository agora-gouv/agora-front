<script setup lang="ts">
definePageMeta({
  layout: 'basic',
})
useHead({
  title: 'Fiches inventaire - Agora',
})

const fiches = await (new FicheInventaireApi().getAll())

const today = new Date()

const fichesAVenir = fiches.filter(fiche => {
  const dateDebut = new Date(fiche.debut)
  return dateDebut > today
})
const fichesEnCours = fiches.filter(fiche => {
  const dateFin = new Date(fiche.fin)
  const dateDebut = new Date(fiche.debut)
  return dateFin > today //&& dateDebut < today
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

      <DsfrCard
        :img-src="fiche.illustrationUrl"
        :link="fiche.lienSite"
        :title="fiche.titre"
        description=""
        alt-img=""
        horizontal
        v-for="fiche in fichesEnCours" :key="fiche.id"
        class="fr-mb-2w">
        <template #start-details>
          <DsfrTag :label="fiche.thematique.label"/>
          <div>
            <VIcon icon="ri:chat-3-line" :inline="true" :ssr="true"/>
            {{ fiche.conditionParticipation }} ∙ {{ fiche.modaliteParticipation }}
          </div>
        </template>
        <template #end-details>
          <div><b>Porteur :</b> {{ fiche.porteur }}</div>
          <div class="date-fin">
            <VIcon icon="ri:calendar-line" :inline="true" :ssr="true"/>
            jusqu'au
            <Date :date="fiche.fin"/>
          </div>
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
            :badges="[
            {
              label: fiche.etape,
              type: 'success',
            }
            ]"
            alt-img="">
            <template #start-details>
              <DsfrTag :label="fiche.thematique.label"/>
              <DsfrTag :label="fiche.anneeDeLancement"/>
              <div>
                <VIcon icon="ri:chat-3-line" :inline="true" :ssr="true"/>
                {{ fiche.conditionParticipation }} ∙ {{ fiche.modaliteParticipation }}
              </div>
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

.fr-badge {
  font-size: .75rem;
}

.fr-card__end {
  b {
    color: var(--blue-france-sun-113-625);
  }
}

.date-fin {
  font-size: .75rem;
  margin-top: 0.5rem;
  color: var(--grey-425-625)
}

.fr-card__start div {
  font-size: .75rem;
}

h1, h2 {
  color: var(--blue-france-sun-113-625);
}

h2 {
  margin-bottom: 2rem;
  margin-top: 4rem;
}

p {
  font-size: 1rem;
}
</style>