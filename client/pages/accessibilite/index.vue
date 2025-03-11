<script setup lang="ts">
import type { Ref } from 'vue'
import type Link from '~/client/types/dsfr/link';
import { AsyncData } from "nuxt/app";
import { FetchError } from "ofetch";
import DeclarationAccessibiliteContent from "~/client/types/content/declarationAccessibiliteContent";

definePageMeta({
  layout: 'basic',
})

useHead({
  title: 'Accessibilité - Agora',
})

const runtimeConfig = useRuntimeConfig()

const apiBaseUrl = runtimeConfig.public.apiBaseUrl
const routeUrl = `${apiBaseUrl}/content/page-site-vitrine-declaration-accessibilite`

const { data: declarationAccessibilite, error } = await useFetch(routeUrl) as AsyncData<DeclarationAccessibiliteContent, FetchError>

if (error.value) {
  throw createError({ statusCode: error.value!.statusCode})
}

const links: Ref<Link[]> = ref([{ to: '/', text: 'Accueil' }, { text: 'Accessibilité' }])
</script>

<template>
  <DsfrBreadcrumb :links="links" />
  <div class="fr-mt-8w" v-html="declarationAccessibilite.declaration"></div>
</template>