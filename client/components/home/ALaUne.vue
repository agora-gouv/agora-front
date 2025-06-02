<script setup lang="ts">
import NewsDto from "~/client/types/content/news";

const news = await new NewsApi().get();

function convertRouteName(routeName: NewsDto['routeName'], argument: NewsDto['routeArgument']) {
  switch (routeName) {
    case '/consultationsPage':
      return '/je-participe'
    case '/qagsPage':
      return '/qags'
    case '/consultation/dynamic':
      return `/consultations/${argument}`
    case '/qagDetailsPage':
      return `/qags/${argument}`
  }
}

const textWithoutLineBreaks = news.value.description.replace(/<(\/?)br(\/?)>/g, '')
</script>

<template>
  <DsfrNotice title="Nouvelle consultation" class="break-container">
    <template #desc>
      <span><span role="img" aria-hidden>📣</span> Économie sociale et solidaire : quelle stratégie nationale ?</span> <a :href="convertRouteName(news.routeName, news.routeArgument)">
        Je réponds à la consultation
      </a>
    </template>
  </DsfrNotice>
</template>