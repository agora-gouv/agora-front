import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,

  app: {
    head: {
      title: 'Agora',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Les citoyens aspirent à partager leurs convictions et idées régulièrement, pas seulement à chaque élection : c’est pourquoi Agora propose, pour la première fois, de créer les conditions d’un dialogue démocratique continu entre les citoyens et le Gouvernement.',
        },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:title', content: 'Présentation de l\'application Agora (Gouvernement)' },
        {
          property: 'og:description',
          content: 'Les citoyens aspirent à partager leurs convictions et idées régulièrement, pas seulement à chaque élection : c’est pourquoi Agora propose, pour la première fois, de créer les conditions d’un dialogue démocratique continu entre les citoyens et le Gouvernement.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `https://${process.env.DOMAIN_NAME}` },
        { property: 'og:locale', content: 'fr_FR' },
        { property: 'og:image', content: `https://${process.env.DOMAIN_NAME}/favicon.svg` },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
      htmlAttrs: {
        lang: 'fr',
      },
    },
  },

  css: [
    '@gouvfr/dsfr/dist/core/core.main.min.css',
    '@gouvfr/dsfr/dist/component/component.main.min.css',
    '@gouvminint/vue-dsfr/styles',
    'assets/main.scss',
  ],

  ignore: [
    '**/*.test.*',
    '**/*.spec.*',
    '**/*.cy.*',
  ],

  srcDir: 'client/',

  imports: {
    autoImport: true,
  },

  modules: [
    process.env.APP_ENV !== 'local' ? '@nuxtjs/robots' : '',
    '@nuxtjs/sitemap',
  ],

  runtimeConfig: {
    public: {
      domainName: process.env.DOMAIN_NAME,
      apiBaseUrl: process.env.API_BASE_URL,
      features: {
        qags: process.env.QAGS_FEATURE === "1",
        consultations: process.env.CONSULTATIONS_FEATURE === "1",
        pedagogie: process.env.PEDAGOGIE_FEATURE === "1",
        filtresConsultations: process.env.FILTRES_CONSULTATIONS_FEATURE === "1",
        aLaUne: process.env.A_LA_UNE_FEATURE === "1"
      },
    },
  },

  hooks: {
    'build:manifest': (manifest) => {
      // Suppression du prefetch pour les icônes
      for (const key in manifest) {
        const file = manifest[key]

        if (file.assets) {
          file.assets = file.assets
            .filter(
              (asset: string) =>
                !asset.endsWith('.webp') &&
                !asset.endsWith('.jpg') &&
                !asset.endsWith('.png') &&
                !asset.endsWith('.svg')
            )
        }
      }
    }
  },

  sitemap: {
    siteUrl: `https://${process.env.DOMAIN_NAME}`,
  },

  compatibilityDate: '2024-08-01',

  routeRules: {
    '/consultations': { redirect: { to: '/je-participe', statusCode: 301 }
    },
  },

  appConfig: {
    lists: {
      etapesTerminees: [
        { text: 'Non renseigné', value: '' },
        'Résultats à venir',
        'Résultats disponibles',
        'Actions'
      ] as const,
      etapesEnCours: [
        { text: 'Non renseigné', value: '' },
        'À venir',
        'En cours'
      ] as const,
      modalites: [
        { label: "Ouvert à tous", value: "Ouvert à tous", name: "modaliteParticipation" },
        { label: "Tirage au sort représentatif", value: "Tirage au sort représentatif", name: "modaliteParticipation" },
        { label: "En ligne", value: "En ligne", name: "modaliteParticipation" },
        { label: "En présentiel", value: "En présentiel", name: "modaliteParticipation" },
      ] as const
    }
  }
})