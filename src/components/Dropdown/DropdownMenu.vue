<template>
  <transition name="dropdown-content">
    <div
      id="DropDownMenu"
      v-if="appStore.activeDropdown"
      class="flex flex-col absolute right-0 mt-4 mr-10 w-48 rounded-lg py-2 shadow-md"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
import { defineComponent } from 'vue'
import { useAppStroe } from '@/store/app'

export default defineComponent({
  setup () {
    const appStore = useAppStroe()
    return {
      appStore
    }
  }
})
</script>

<style lang="less" scoped>
#DropDownMenu {
  background-color: var(--background-primary);
}
.dropdown-content-enter-active,
.dropdown-content-leave-active {
  transition: all 0.2s;
}
.dropdown-content-enter,
.dropdown-content-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
