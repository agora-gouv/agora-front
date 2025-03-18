<script setup lang="ts">
import type { Ref } from 'vue'
import type Link from '~/client/types/dsfr/link';

definePageMeta({
  layout: 'basic',
})

useHead({
  title: 'Politique de confidentialité - Agora',
})

const content = await (new PageContentApi()).getPolitiqueConfidentialiteContent()

const links: Ref<Link[]> = ref([{ to: '/', text: 'Accueil' }, { text: 'Politique de confidentialité' }])
</script>

<template>
  <DsfrBreadcrumb :links="links" />
  <div class="fr-mt-8w" v-html="content.politiqueDeConfidentialite"></div>
</template>