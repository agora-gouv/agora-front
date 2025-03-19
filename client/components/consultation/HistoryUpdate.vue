<script setup lang="ts">
import { ConsultationUpdate } from '~/client/types/consultation/consultation';

defineProps<{
  update: ConsultationUpdate
  consultationSlug: string
  currentUpdateId: string
}>()
</script>

<template>
  <div :class="{'current-update': currentUpdateId == update.updateId, 'last-update': update.status=='current', 'next-update' : update.status ==='incoming'}">
    <div class="step"></div>
    <VIcon
      icon="ri:check-line"
      class="icon icon-fill"
      v-if="update.status==='done'"
    />

    <VIcon
      icon="ri:check-line"
      class="icon"
      v-else-if="update.status==='current'"
    />

    <VIcon
      icon="ri:calendar-2-line"
      class="icon"
      v-else-if="update.status==='incoming'"
    />
    
  <div class="content">
   <div class="content-title">
     {{update.title }}
   </div>
    <div class="content-date">
      {{ update.date ? new Date(update.date).toLocaleDateString("fr-FR") : 'Prochainement'}}
    </div>
    <a :href="`/consultations/${consultationSlug}/updates/${update.slug ?? update.updateId}`"  class="fr-mt-1w action">
      {{ update.actionText}}    
    </a>
  </div>
    
  </div>
</template>

<style>
.current-update{
  .content{
    font-weight: bold;
  }
}

.last-update{
  .icon{
    outline: 2px dashed #e1010e;
    outline-offset: 3px;
  }
}

.next-update{
  .content{
    background-color: #c1c1fb40 !important;
  }
}

.icon-fill{
  background-color: var(--blue-france-sun-113-625) !important;
  color: white !important;
}

.content{
  .content-date{
    font-style: italic;
  }
  .action{
    color: var(--blue-france-sun-113-625)
  }
}


</style>