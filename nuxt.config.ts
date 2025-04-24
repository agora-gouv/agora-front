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
        qags: process.env.QAGS_FEATURE,
        consultations: process.env.CONSULTATIONS_FEATURE,
        pedagogie: process.env.PEDAGOGIE_FEATURE,
        fiches: process.env.FICHES_FEATURE,
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

  compatibilityDate: '2024-08-01'
})