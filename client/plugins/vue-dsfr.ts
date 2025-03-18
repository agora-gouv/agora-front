import { AgoraApple, AgoraGoogle } from '../assets/icons'
import {
  DsfrAccordion,
  DsfrAlert,
  DsfrBadge,
  DsfrBreadcrumb,
  DsfrButton,
  DsfrFooter,
  DsfrHeader,
  DsfrModal,
  DsfrTile,
  DsfrTranscription,
  DsfrVideo,
} from "@gouvminint/vue-dsfr";
import { addIcons, OhVueIcon } from 'oh-vue-icons';
import { RiCalendar2Line, RiCheckLine, RiGroup2Line, RiGroupLine, RiHeartLine, RiQuestionnaireLine, RiTimerLine } from 'oh-vue-icons/icons';

const icons = [
  AgoraApple,
  AgoraGoogle,
  RiHeartLine,
  RiCalendar2Line,
  RiCheckLine,
  RiTimerLine,
  RiGroupLine,
  RiQuestionnaireLine,
  RiGroup2Line
]

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('DsfrHeader', DsfrHeader);
  nuxtApp.vueApp.component('DsfrFooter', DsfrFooter);
  nuxtApp.vueApp.component('DsfrBreadcrumb', DsfrBreadcrumb);
  nuxtApp.vueApp.component('DsfrVideo', DsfrVideo);
  nuxtApp.vueApp.component('DsfrModal', DsfrModal);
  nuxtApp.vueApp.component('DsfrAccordion', DsfrAccordion);
  nuxtApp.vueApp.component('DsfrButton', DsfrButton);
  nuxtApp.vueApp.component('DsfrTranscription', DsfrTranscription);
  nuxtApp.vueApp.component('DsfrTile', DsfrTile);
  nuxtApp.vueApp.component('DsfrBadge', DsfrBadge)
  nuxtApp.vueApp.component('DsfrAlert', DsfrAlert);


  addIcons(...icons);
  nuxtApp.vueApp.component('VIcon', OhVueIcon);
})