<script setup lang="ts">
import { useScheme } from '@gouvminint/vue-dsfr'
import type { CSSProperties } from 'nuxt/dist/app/compat/capi';
import { AsyncData } from "nuxt/app";
import AccueilContent from "~/client/types/content/accueilContent";
import { FetchError } from "ofetch";

const runtimeConfig = useRuntimeConfig();

const logoText = ['Gouvernement']
const a11yCompliance = 'Partiellement conforme'
const operatorImgSrc: string = '/logo_agora.svg'
const operatorImgStyle: Record<string, string> = {
  'max-height': '60px',
  'width': '60px'
}
const operatorImgStyleFooter: CSSProperties = {
  'max-height': '120px',
  'margin-left': '2rem'
}
const skipLinks = [{ text: 'Contenu principal', id: 'main' }]
const profil = [{ label: 'Mon profil', to: '/profil', icon: 'ri:account-circle-line' }]

const mandatoryLinks: {label: string, to: string}[] = [{
  label: `Accessibilité: ${a11yCompliance}`,
  to: '/accessibilite',
}, {
  label: 'Mentions légales',
  to: '/mentions-legales',
}, {
  label: 'Politique de confidentialité',
  to: '/politique-confidentialite',
}, {
  label: 'Conditions générales d\'utilisation',
  to: '/cgu',
}, {
  label: 'Charte de participation',
  to: '/charte-participation',
}]

const ecosystemLinks: {label: string, href: string}[] = [{  
    href: 'https://www.info.gouv.fr/',
    label: 'info.gouv.fr',
  }, {
    href: 'https://www.service-public.fr/',
    label: 'service-public.fr',
  }, {
    href: 'https://legifrance.gouv.fr/',
    label: 'legifrance.gouv.fr',
  }, {
    href: 'https://data.gouv.fr/',
    label: 'data.gouv.fr',
}]

const menu = [
  {
    to: '/',
    text: 'Accueil'
  },
  runtimeConfig.public.features.consultations === '1' && {
    to: '/fiches-inventaire',
    text: 'Je participe',
  },
  runtimeConfig.public.features.qags === '1' && {
    to: '/qags',
    text: 'Je pose une question au Gouvernement',
  },
  {
    to: '/pgo',
    text: 'Actions pour renforcer la démocratie',
  },
  runtimeConfig.public.features.pedagogie === '1' && {
    text: 'En savoir plus sur la participation citoyenne',
    to: 'https://www.modernisation.gouv.fr/associer-les-citoyens/quest-ce-que-la-participation-citoyenne',
    target: "_blank",
    rel: "noopener noreferrer"
  },
].filter(element => Boolean(element))

const preferences = reactive({
  theme: '',
  scheme: '',
})

onMounted(() => {
  const {theme, setScheme} = useScheme()
  // preferences.scheme = 'dark';
  preferences.scheme = 'light'

  watchEffect(() => {
    preferences.theme = theme.value
  })

  watchEffect(() => setScheme(preferences.scheme))
})

const apiBaseUrl = runtimeConfig.public.apiBaseUrl
const routeUrl = `${apiBaseUrl}/content/page-site-vitrine-accueil`

const { data: accueilContent, error } = await useFetch(routeUrl) as AsyncData<AccueilContent, FetchError>

if (error.value) {
  throw createError({ statusCode: error.value!.statusCode})
}

function focusHash() {
  const hash = location.hash
  if (!hash) return;

  const target = document.getElementById(hash.substring(1))
  if (!target) return;

  if (!target.getAttribute('tabindex')) {
    target.setAttribute('tabindex', '-1')
  }
  target.focus();
}
const app = useNuxtApp().vueApp.mixin({
  mounted: focusHash,
})
</script>

<template>
  <DsfrSkipLinks :links="skipLinks" />
  <DsfrHeader
    :logo-text="logoText"
    :operator-img-src="operatorImgSrc"
    :operator-img-style="operatorImgStyle"
    :service-title="accueilContent.titreHeader"
    :quick-links="profil"
  >
    <template #mainnav>
      <DsfrNavigation :nav-items="menu" />
    </template>
  </DsfrHeader>
  <main id="main">
    <div class="fr-container fr-mb-8w">
      <slot/>
    </div>    
  </main>
  <DsfrFooter
    :logo-text="logoText"
    :mandatory-links="mandatoryLinks"
    :operator-img-src="operatorImgSrc"
    :operator-img-style="operatorImgStyleFooter"
    :ecosystem-links="ecosystemLinks"
  />
</template>