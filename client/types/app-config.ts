export {}

declare module 'nuxt/schema' {
  interface EtapeOption {
    text: string
    value: string
  }
  interface ModaliteOption {
    label: string
    value: string
    name: string
  }

  interface AppConfig {
    lists: {
      etapesTerminees: EtapeOption[]
      etapesEnCours: EtapeOption[]
      modalites: ModaliteOption[]
    }
  }
}