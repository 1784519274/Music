<template>
  <div
    id="Title"
    class="relative opacity-90 pt-12 pb-4 mb-8 text-4xl text-ob-bright uppercase font-medium "
  >
    <div class="flex cursor-pointer" @click="handleClick">
      <slot />
      <span
        class="absolute bottom-0 h-1 w-24 rounded-full"
        style="
          background: linear-gradient(
            130deg,
            rgb(36, 198, 220),
            rgb(84, 51, 255) 41.07%,
            rgb(255, 0, 153) 76.05%
          );
        "
      ></span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    routePath: {
      type: String
    }
  },
  setup (props) {
    const route = useRouter()
    const handleClick = () => {
      route.push(props.routePath)
    }

    return {
      handleClick
    }
  }
})
</script>

<style scoped lang="less">
#Title {
  color: var(--text-bright);
  svg path {
    fill: var(--text-bright);
  }
}
</style>
