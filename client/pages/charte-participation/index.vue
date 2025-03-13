<script setup lang="ts">
import type { Ref } from 'vue'
import type Link from '~/client/types/dsfr/link';

definePageMeta({
  layout: 'basic',
})

useHead({
  title: 'Charte de participation - Agora',
})

const charte = await (new PageContentApi()).getParticipationCharterContent()

const links: Ref<Link[]> = ref([{ to: '/', text: 'Accueil' }, { text: 'Charte de participation' }])
</script>

<template>
  <DsfrBreadcrumb :links="links" />
  <h1>Charte de participation</h1>
  <div v-html="charte.extraText" class="fr-mt-8w"></div>
</template>