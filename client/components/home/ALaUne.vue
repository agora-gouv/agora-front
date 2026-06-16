<script setup lang="ts">
import type NewsDto from "~/types/content/news";

const news = await new NewsApi().get()
    .catch(error => undefined);

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
</script>

<template>
  <DsfrNotice title="À la une !" class="break-container" v-if="news">
    <template #desc>
      {{ news.short_description }} <a :href="convertRouteName(news.routeName, news.routeArgument)">
        {{ news.callToActionText }}
      </a>
    </template>
  </DsfrNotice>
</template>
