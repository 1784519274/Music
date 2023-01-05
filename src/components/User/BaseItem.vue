<template>
  <div class="px-3 py-1 border-2 mx-2 min-w-max rounded-full">
    <span>{{ content }}&nbsp;&nbsp;{{ label }}</span>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    content: {
      type: [String, Number],
      default: 0
    },
    label: {
      type: String,
      default: '标签'
    }
  },
  setup () {}
})
</script>
