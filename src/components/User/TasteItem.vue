<template>
  <div
    id="TasteItem"
    class="w-full h-40 mx-2 flex flex-col pl-1 relative rounded-xl"
    :style="color"
  >
    <span class="text-base">{{ title }}</span>
    <span class="text-2xl mt-2 break-all">{{ data }}{{ unit }}</span>
    <span class="text-sm absolute bottom-0 break-normal flex mb-1">
      <slot />&nbsp;{{ describe }}</span
    >
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    color: {
      type: String,
      default:
        'border: 1px solid rgba(255, 234, 167,0.3);background-image: linear-gradient(180deg, rgba(255, 234, 167,0.3), transparent);'
    },
    title: {
      type: String,
      default: '音乐品味'
    },
    data: {
      type: [String, Number],
      default: 0
    },
    unit: {
      type: String,
      default: '首'
    },
    describe: {
      type: String,
      default: '音乐品味'
    }
  },
  setup () {}
})
</script>

<style scoped></style>
