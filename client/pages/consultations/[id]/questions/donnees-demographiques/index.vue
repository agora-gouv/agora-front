<script setup lang="ts">

definePageMeta({
  layout: 'basic',
})

useHead({
  title: `Indiquez votre profil - Agora`,
})

const consultationId = useRoute().params.id as string;
const resultatsConsultation = `/consultations/${consultationId}?answered=true`;
</script>

<template>
  <h1>Psst... nous avons quelques questions supplémentaires pour vous</h1>
  <p>Pour analyser les résultats des consultations, cela nous aide beaucoup de connaître un peu mieux le profil des participants.</p>
  <p>Ces informations ne permettent pas de vous identifier. Vous pourrez les retrouver, les modifier ou les supprimer directement dans l’onglet “Profil” à tout instant.</p>
  <p>Concrètement, cela nous permet :</p>
  <ul>
    <li>De savoir dans quelle mesure les personnes qui répondent sont représentatives de l’ensemble de la population française (plus la représentativité est forte, plus les résultats sont solides et fiables).</li>
    <li>De voir s’il y a des différences de réponses, par exemple entre les départements ou entre les catégories d’âge.</li>  
  </ul>
  <p>Promis, on ne vous demandera ces infos qu’une seule fois !</p>

  <p>Pour en savoir plus, lire la <NuxtLink to="/politique-confidentialite">politique de confidentialité</NuxtLink>.</p>

  <NuxtLink :to="`/profil?redirect=${encodeURIComponent(resultatsConsultation)}`" class="fr-mb-4w fr-mr-2w fr-btn">
    Commencer
  </NuxtLink>
  
  <NuxtLink :to="resultatsConsultation" class="fr-mb-4w fr-btn fr-btn--secondary">
    Ne pas répondre
  </NuxtLink>
</template>

<style scoped>
h1 {
  margin-top: 1em;
} 
</style>
