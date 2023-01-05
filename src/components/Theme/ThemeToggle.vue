<template>
  <div
    @click="handleClick"
    id="ThemeToggle"
    class="w-8 h-8 p-1.5 rounded-full bg-current duration-300"
    :style="{ transform: translateX }"
  >
    <img v-if="theme === 'theme-light'" src="@/style/svg/sun.svg" alt="Sun" />
    <img v-if="theme === 'theme-dark'" src="@/style/svg/moom.svg" alt="Sun" />
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useAppStroe } from '@/store/app'

export default defineComponent({
  setup (props, ctx) {
    const appStore = useAppStroe()

    const handleClick = () => {
      ctx.emit('click')
    }

    return {
      handleClick,
      theme: computed(() => appStore.theme),
      translateX: computed(() =>
        appStore.theme === 'theme-dark'
          ? 'translateX(14px)'
          : 'translateX(-4px)'
      )
    }
  }
})
</script>

<style scoped lang="less">
#ThemeToggle {
  background-color: var(--theme-toggle);
}
</style>
