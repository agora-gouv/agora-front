<script setup lang="ts">
import type { NuxtError } from '@nuxt/types';

useHead({
  title: `Agora - 404`
})

defineProps<{
  error: NuxtError
}>()

</script>

<template>
  <div>
    <NuxtLayout name="basic">
      <div class="fr-grid-row fr-my-8w">
        <div class="fr-col-12 text-align-center">
          <h1>{{ error.statusCode }}</h1>
        </div>
        <div class="fr-col-12 text-align-center">
          <h2 v-if="error.statusCode === 404">Page non trouvée</h2>
          <h2 v-else>Une erreur est survenue </h2>
        </div>
        <div class="fr-col-12 text-align-center">
          <router-link to="/" class="fr-btn">
            Retourner à l'accueil
          </router-link>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>