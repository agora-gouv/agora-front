<script setup lang="ts">

import type ThemeHebdo from "~/types/theme_hebdo/themeHebdo";
import type {QagsApiDTO} from "~/types/qag/qags";

definePageMeta({
  layout: 'basic',
})
useHead({
  title: 'Questions au gouvernement - Agora',
})

const themeHebdo = useState<ThemeHebdo>();
const latest = useState<QagsApiDTO["qags"]>((): QagsApiDTO["qags"] => []);
const popular = useState<QagsApiDTO["qags"]>((): QagsApiDTO["qags"] => []);

onMounted(async () => {
  const {jwtToken} = await useAuthentication()
  themeHebdo.value = (await (new ThemeHebdoApi().getThemeHebdo())).value
  latest.value = (await (new QagApi().getLatest(jwtToken))).value?.qags.slice(0, 4) ?? []
  popular.value = (await (new QagApi().getPopular(jwtToken))).value?.qags.slice(0, 4) ?? []
})

const shareTitle = computed(() => {
  const theme = themeHebdo.value
  if (!theme) return ''
  return "Questions au Gouvernement - " + themeHebdo.value.theme
})
const shareText = computed(() => {
  const theme = themeHebdo.value
  if (!theme) return ''
  return themeHebdo.value.estThemeLibre ? "Cette semaine sur Agora, on peut poser nos questions à n'importe quel ministre.  J'ai pensé que ça pourrait t'intéresser !"
    : "Cette semaine sur Agora, on peut poser nos questions à " + themeHebdo.value.nom + ", " + themeHebdo.value.fonction + " sur " + themeHebdo.value.theme + ". J'ai pensé que ça pourrait t'intéresser !"
})

</script>
<template>
  <h1 class="fr-mt-4w">Posez vos questions au Gouvernement avec l’application mobile Agora</h1>
  <DsfrCallout v-if="themeHebdo" :title="`Thème de la semaine : ${themeHebdo.theme}`" class="fr-mb-4w">
    <span v-if="themeHebdo.estThemeLibre">Posez vos questions sur n’importe quelle politique publique et votez pour celles que vous trouvez les plus intéressantes sur l’application mobile Agora.</span>
    <span v-if="!themeHebdo.estThemeLibre">Posez vos questions à {{ themeHebdo.nom }}, {{ themeHebdo.fonction }} et votez pour celles que vous trouvez les plus intéressantes sur l’application mobile Agora.</span>
    <div class="fr-btns-group fr-btns-group--inline-md">
      <a href="https://apps.apple.com/app/6449599025" class="fr-btn">Télécharger l'application sur iOS</a>
      <a href="https://play.google.com/store/apps/details?id=fr.gouv.agora" class="fr-btn">Télécharger l'application sur Android</a>
    </div>
  </DsfrCallout>
  <ConsultationShare
    :share-text="shareText"
    :share-title="shareTitle"/>
  <h2 class="fr-mt-6w">Découvrez les 4 dernières questions posées</h2>
  <div class="fr-mb-2w fr-mt-6w">
    <ol class="fr-mb-1w fr-raw-list">
      <li class="fr-my-4w" v-for="qag in latest" :key="qag.qagId">
        <Qag :qag="qag"/>
      </li>
    </ol>
  </div>
  <h2 class="fr-mt-8w">Découvrez les questions les plus populaires</h2>
  <div class="fr-mb-2w fr-mt-6w">
    <ol class="fr-mb-1w fr-raw-list">
      <li class="fr-my-4w" v-for="qag in popular" :key="qag.qagId">
        <Qag :qag="qag"/>
      </li>
    </ol>
  </div>
  <BandeauTelechargementAdaptatif title="Rendez-vous sur l'application mobile Agora pour participer."/>
</template>

<style scoped>
h2 {
  color: var(--blue-france-sun-113-625);
}
</style>