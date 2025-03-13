<script setup lang="ts">
import type { Ref } from 'vue'
import type Link from '~/client/types/dsfr/link';

definePageMeta({
  layout: 'basic',
})

useHead({
  title: 'CGU - Agora',
})

const content = await (new PageContentApi()).getConditionGeneralesContent()

const links: Ref<Link[]> = ref([{ to: '/', text: 'Accueil' }, { text: 'Conditions générales d\'utilisation' }])
</script>

<template>
  <DsfrBreadcrumb :links="links" />
  <div class="fr-mt-8w" v-html="content.conditionsGeneralesDUtilisation"></div>
</template>