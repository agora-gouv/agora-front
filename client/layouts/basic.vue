<script setup lang="ts">
import { useScheme } from '@gouvminint/vue-dsfr'
import type { CSSProperties } from 'nuxt/dist/app/compat/capi';
import { AsyncData } from "nuxt/app";
import AccueilContent from "~/client/types/content/accueilContent";
import { FetchError } from "ofetch";

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

const runtimeConfig = useRuntimeConfig()

const apiBaseUrl = runtimeConfig.public.apiBaseUrl
const routeUrl = `${apiBaseUrl}/content/page-site-vitrine-accueil`

const { data: accueilContent, error } = await useFetch(routeUrl) as AsyncData<AccueilContent, FetchError>

if (error.value) {
  throw createError({ statusCode: error.value!.statusCode})
}
</script>

<template>
  <DsfrHeader
    :logo-text="logoText"
    :operator-img-src="operatorImgSrc"
    :operator-img-style="operatorImgStyle"
    :service-title="accueilContent.titreHeader"
    :service-description="accueilContent.sousTitreHeader"
  />
  <main>
    <div class="fr-container fr-mb-8w">
      <div class="fr-grid-row fr-grid-row--center">
        <div class="fr-col-10">
          <slot/>
        </div>
      </div>
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