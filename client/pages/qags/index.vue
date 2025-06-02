<script setup lang="ts">

import {QagsApiDTO} from "~/client/types/qag/qags";

definePageMeta({
  layout: 'basic',
})
useHead({
  title: 'Questions au gouvernement - Agora',
})

const latest = useState<QagsApiDTO["qags"]>(() => ([]));
const popular = useState<QagsApiDTO["qags"]>(() => ([]));

onMounted(async () => {
  const {jwtToken} = await useAuthentication()
  latest.value = (await (new QagApi().getLatest(jwtToken))).value.qags.slice(0, 4)
  popular.value = (await (new QagApi().getPopular(jwtToken))).value.qags.slice(0, 4)
})
</script>
<template>
  <h1 class="fr-mt-4w">Posez vos questions au Gouvernement avec l’application mobile Agora</h1>
  <p>
    Dans le cadre de la consultation sur l'Économie sociale et solidaire (<abbr>ESS</abbr>), la <b>Ministre Véronique Louwagie</b> répondra à vos questions sur ce thème.
  </p>
  <p>
    Vous pouvez poser vos questions et soutenir celles que vous trouvez les plus intéressantes en téléchargeant l'application (sur <a
    href="https://apps.apple.com/app/6449599025">iOS</a> ou <a href="https://play.google.com/store/apps/details?id=fr.gouv.agora">Android</a>).
  </p>
  <p>
    Voici les 4 dernières questions posées par des citoyens sur Agora.
  </p>
  <div class="fr-mb-2w fr-mt-6w">
    <ol class="fr-mb-1w fr-raw-list">
      <li class="fr-my-4w" v-for="qag in latest" :key="qag.qagId">
        <Qag :qag="qag"/>
      </li>
    </ol>
  </div>
  <h2 class="fr-mt-8w">Découvrez les questions les plus populaires sur l'<abbr title="Économie sociale et solidaire">ESS</abbr></h2>
  <div class="fr-mb-2w fr-mt-6w">
    <ol class="fr-mb-1w fr-raw-list">
      <li class="fr-my-4w" v-for="qag in popular" :key="qag.qagId">
        <Qag :qag="qag"/>
      </li>
    </ol>
  </div>
  <BandeauTelechargementAdaptatif title="Rendez-vous sur l'application mobile Agora pour participer." />
</template>
<style scoped>
.fr-card__title {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
  margin: 0;
  color: #333;
}

.card_author {
  color: var(--text-mention-grey);
  font-size: 0.80rem;
  line-height: 1.25rem;
  margin-bottom: 0;
  vertical-align: super;
}

.fr-card__portrait {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 1rem;
  display: inline;
}

h2 {
  color: var(--blue-france-sun-113-625);
}
</style>