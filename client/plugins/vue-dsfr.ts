import { AgoraApple, AgoraGoogle } from '../assets/icons'
import {
  DsfrAccordion,
  DsfrAccordionsGroup,
  DsfrAlert,
  DsfrBadge,
  DsfrBreadcrumb,
  DsfrButton,
  DsfrCard,
  DsfrFooter,
  DsfrHeader,
  DsfrInput,
  DsfrInputGroup,
  DsfrModal,
  DsfrNavigation,
  DsfrSkipLinks,
  DsfrTag,
  DsfrTile,
  DsfrTranscription,
  DsfrVideo,
  DsfrSelect,
  DsfrFieldset,
  DsfrRadioButtonSet,
} from "@gouvminint/vue-dsfr";
import { addIcon, Icon } from '@iconify/vue';

const icons = {
  'agora:apple': AgoraApple,
  'agora:google': AgoraGoogle,
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('DsfrSkipLinks', DsfrSkipLinks);
  nuxtApp.vueApp.component('DsfrHeader', DsfrHeader);
  nuxtApp.vueApp.component('DsfrNavigation', DsfrNavigation);
  nuxtApp.vueApp.component('DsfrFooter', DsfrFooter);
  nuxtApp.vueApp.component('DsfrCard', DsfrCard);
  nuxtApp.vueApp.component('DsfrTag', DsfrTag);
  nuxtApp.vueApp.component('DsfrBreadcrumb', DsfrBreadcrumb);
  nuxtApp.vueApp.component('DsfrVideo', DsfrVideo);
  nuxtApp.vueApp.component('DsfrAccordionsGroup', DsfrAccordionsGroup);
  nuxtApp.vueApp.component('DsfrModal', DsfrModal);
  nuxtApp.vueApp.component('DsfrAccordion', DsfrAccordion);
  nuxtApp.vueApp.component('DsfrButton', DsfrButton);
  nuxtApp.vueApp.component('DsfrTranscription', DsfrTranscription);
  nuxtApp.vueApp.component('DsfrTile', DsfrTile);
  nuxtApp.vueApp.component('DsfrBadge', DsfrBadge)
  nuxtApp.vueApp.component('DsfrAlert', DsfrAlert);
  nuxtApp.vueApp.component('DsfrInput', DsfrInput);
  nuxtApp.vueApp.component('DsfrInputGroup', DsfrInputGroup);
  nuxtApp.vueApp.component('DsfrSelect', DsfrSelect);
  nuxtApp.vueApp.component('DsfrFieldset', DsfrFieldset);
  nuxtApp.vueApp.component('DsfrRadioButtonSet', DsfrRadioButtonSet);
  
  Object.entries(icons).forEach(([name, icon]) => {
    addIcon(name, icon)
  })
  nuxtApp.vueApp.component('VIcon', Icon);
})