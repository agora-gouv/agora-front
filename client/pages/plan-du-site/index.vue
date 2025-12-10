<script setup lang="ts">
definePageMeta({
  layout: 'basic',
})

useHead({
  title: 'Plan du site - Agora',
})
</script>

<template>
  <main>
    <h1 class="fr-mt-8w">Plan du site</h1>
    <ul>
      <li><a href="/">Accueil</a></li>
      <li><a href="/je-participe">Je participe</a></li>
      <li><a href="/qags">Les questions au gouvernement</a></li>
      <li><a href="/qags/reponses">Les réponses du gouvernement</a></li>
      <li><a href="/pgo">Actions pour renforcer la démocratie</a></li>
      <li><a href="/profil">Mon profil</a></li>
    </ul>
    <h2 class="fr-mt-8w">Autres liens utiles</h2>
    <ul>
      <li>
        <a href="https://play.google.com/store/apps/details?id=fr.gouv.agora"
           target="_blank"
           rel="noopener noreferrer">
        Télécharger l'application sur Google Play
        </a>
      </li>
      <li>
        <a href="https://apps.apple.com/app/6449599025"
           target="_blank"
           rel="noopener noreferrer">
          Télécharger l'application sur l'AppStore
        </a>
      </li>
      <li>
        <a href="https://www.modernisation.gouv.fr/associer-les-citoyens/quest-ce-que-la-participation-citoyenne"
           target="_blank"
           rel="noopener noreferrer">
          En savoir plus sur la participation citoyenne
        </a>
      </li>
    </ul>
  </main>
</template>
