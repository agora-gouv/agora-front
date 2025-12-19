<script setup lang="ts">
const {id = useId()} = defineProps<{
  id?: string,
  value: number,
}>()
</script>

<template>
  <div class="question-result" :style="`--value-text: '${value}'; --value: ${value}`">
    <div role="meter"
         :id="id"
         :aria-labelledby="`${id}-label`"
         aria-valuemin="0"
         :aria-valuenow="value"
         :aria-valuetext="`${value} %`"
         aria-valuemax="100"
         v-bind="$attrs" />
    <label :id="`${id}-label`">
      <slot name="label"></slot>
    </label>
  </div>
</template>

<style lang="scss">
.question-result {
  position: relative;
  display: grid;
  grid-template-columns: minmax(5ch, auto) 1fr;
  margin-bottom: 8px;
  padding: 8px;
  gap: 1ch;
  &::before {
    content: var(--value-text) " %";
    @supports (content: var(--value-text) " %" / "") { content: var(--value-text) " %" / ""; }
  }
  
  
  [role="meter"] {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
  [role="meter"]::after {
    content: "";
    position: absolute;
    height: 100%;
    width: calc(var(--value) * 1%);
  }
  
  [role="meter"] {
    border-radius: 5px;
    overflow: hidden;
    background-color: white;
    border: 1px solid #bbbbbb;
  }
  [role="meter"]::after {
    background-color: #ECECFE;
  }
  &::before {
    font-weight: bold;
    align-content: center;
  }
  label {
    color: #161616;
    font-size: 14px;
  }
}
</style>