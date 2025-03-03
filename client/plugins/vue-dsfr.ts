import { AgoraApple, AgoraGoogle } from '../assets/icons'
import {
  DsfrAccordion, 
  DsfrAlert,
  DsfrBadge,
  DsfrBreadcrumb,
  DsfrFooter,
  DsfrHeader,
  DsfrModal,
  DsfrTile,
  DsfrVideo
} from "@gouvminint/vue-dsfr";
import { addIcons, OhVueIcon } from 'oh-vue-icons';
import {RiHeartLine, RiCalendar2Line, RiTimerLine, RiGroupLine, RiQuestionnaireLine, RiCheckLine} from 'oh-vue-icons/icons';

const icons = [
  AgoraApple,
  AgoraGoogle,
  RiHeartLine,
  RiCalendar2Line, 
  RiCheckLine,
  RiTimerLine,
  RiGroupLine,
  RiQuestionnaireLine
]

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('DsfrHeader', DsfrHeader);
  nuxtApp.vueApp.component('DsfrFooter', DsfrFooter);
  nuxtApp.vueApp.component('DsfrBreadcrumb', DsfrBreadcrumb);
  nuxtApp.vueApp.component('DsfrVideo', DsfrVideo);
  nuxtApp.vueApp.component('DsfrModal', DsfrModal);
  nuxtApp.vueApp.component('DsfrAccordion', DsfrAccordion);
  nuxtApp.vueApp.component('DsfrTile', DsfrTile);
  nuxtApp.vueApp.component('DsfrBadge', DsfrBadge)
  nuxtApp.vueApp.component('DsfrAlert', DsfrAlert);


  addIcons(...icons);
  nuxtApp.vueApp.component('VIcon', OhVueIcon);
})