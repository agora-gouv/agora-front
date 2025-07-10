<script setup lang="ts">
const {id = useId()} = defineProps<{
  id?: string,
  value: number,
}>()
</script>

<template>
  <div class="question-result" :style="`--value: '${value}';`">
    <!-- FIXME (GAFI 10-07-2025): Passer sur <meter> -->
    <progress :id="id" :value="value" max="100" v-bind="$attrs">{{ value }} %</progress>
    <label :for="id">
      <slot name="label"></slot>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.question-result {
  display: grid;
  grid-template-columns: minmax(6ch, auto) 1fr;
  margin-bottom: 10px;
  padding: 8px;
  &::before {
    // NOTE (GAFI 10-07-2025): Fallback si `content: ... / ""` pas supporté 
    content: var(--value) " %";
    content: var(--value) " %" / "";
    font-weight: bold;
    display: inline;
    align-content: center;
  }
  
  position: relative;
  progress {
    position: absolute;
    z-index: -1;
    inset: 0;
  }
  
  progress {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: white;
    border: 1px solid #bbbbbb;
  }

  progress::-webkit-progress-bar {
    background-color: white;
    border-radius: 5px;
  }

  progress::-webkit-progress-value {
    background-color: #ECECFE;
    border-radius: 5px;
  }

  progress::-moz-progress-bar {
    background-color: #ECECFE;
    border-radius: 5px;
  }

  label {
    width: 100%;
    margin-left: 4px;
    text-align: left;
    color: #161616;
    z-index: 1;
    font-size: 14px;
  }
}
</style>