<template>
  <span id="Lable" :style="`width:${props.width}px;height: ${props.height}px;`">
    <i><b>{{props.text}}</b></i>
  </span>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  text: {
    type: String,
    default: 'LABLE'
  },
  width: {
    type: [String, Number],
    default: 48
  },
  height: {
    type: [String, Number],
    default: 18
  }
})
</script>

<style scoped>
#Lable {
  height: 18px;
  border: 2px solid var(--text-accent);
  border-radius: 2px;
  font-size: 2px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-accent);
  margin: 0 0 0 8px;
}
</style>
