<script setup lang="ts">
import type { Ref } from 'vue'
import type Link from '~/client/types/dsfr/link';

definePageMeta({
  layout: 'basic',
})

useHead({
  title: 'Accessibilité - Agora',
})

const declarationAccessibilite = await (new PageContentApi()).getDeclarationAccessibiliteContent()

const links: Ref<Link[]> = ref([{to: '/', text: 'Accueil'}, {text: 'Accessibilité'}])
</script>

<template>
  <DsfrBreadcrumb :links="links"/>
  <div class="fr-mt-8w" v-html="declarationAccessibilite.declaration"></div>
</template>