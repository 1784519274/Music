<template>
  <div
    id="DropDownItem"
    class="block cursor-pointer hover:bg-opacity-20 my-1 px-4 py-1 font-medium hover:bg-white"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useAppStroe } from '@/store/app'

export default defineComponent({
  name: 'DropDownItem',
  props: {
    name: String
  },
  setup (props) {
    const appStore = useAppStroe()
    const handleClick = () => {
      appStore.changeLanguage(String(props.name))
      appStore.changeDropdown()
    }

    return {
      handleClick
    }
  }
})
</script>

<style scoped>
#DropDownItem {
  color: var(--text-bright);
}
</style>
