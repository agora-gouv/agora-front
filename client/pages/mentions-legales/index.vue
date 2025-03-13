<script lang="ts" setup>
import type { Ref } from 'vue'
import type Link from '~/client/types/dsfr/link';

definePageMeta({
  layout: 'basic',
})

useHead({
  title: 'Mentions légales - Agora',
})

const content = await (new PageContentApi()).getMentionsLegalesContent()

const links: Ref<Link[]> = ref([{ to: '/', text: 'Accueil' }, { text: 'Mentions légales' }])
</script>

<template>
  <DsfrBreadcrumb :links="links" />
  <div class="fr-mt-8w" v-html="content.mentionsLegales"></div>
</template>