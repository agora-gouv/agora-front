<script setup lang="ts">
import NewsDto from "~/client/types/content/news";

const news = await new NewsApi().get();

function convertRouteName(routeName: NewsDto['routeName'], argument: NewsDto['routeArgument']) {
  switch (routeName) {
    case '/consultationsPage':
      return '/consultations'
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
  <DsfrNotice title="À la une !" class="break-container">
    <template #desc>
      <p>
        <span v-html="news.description"></span>
        <a :href="convertRouteName(news.routeName, news.routeArgument)">
          {{ news.callToActionText }}
        </a>
      </p>
    </template>
  </DsfrNotice>
</template>