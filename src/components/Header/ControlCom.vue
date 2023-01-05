<template>
  <div class="Header-Control flex flex-row items-center z-20">
    <span
      class="ob-drop-shadow hover:opacity-50 cursor-pointer duration-300"
      data-dia="search"
    >
      <img class="mr-8" src="@/style/svg/search.svg" alt="Search" />
    </span>
    <DropDown>
      <span
        class="flex flex-row justify-center items-center mr-8 hover:opacity-50 cursor-pointer "
        @click="handleClick"
      >
        <img class="mr-2" src="@/style/svg/lunguage.svg" alt="Lunguage" />
        <span v-if="lunguage == 'cn'">中文</span>
        <span v-if="lunguage == 'en'">EN</span>
      </span>
      <DropDownMenu>
        <DropDownItem name="cn">中文</DropDownItem>
        <DropDownItem name="en">English</DropDownItem>
      </DropDownMenu>
    </DropDown>
    <span
      id="Theme"
      class="w-12 h-6 mr-8 rounded-full flex items-center cursor-pointer"
      @click="handleTheme"
    >
      <ThemeToggle @click="handleTheme"></ThemeToggle>
    </span>
  </div>
</template>
<script>
import { computed, defineComponent } from 'vue'
import { useAppStroe } from '@/store/app'
import DropDown from '@/components/Dropdown/DropdownCom.vue'
import DropDownMenu from '@/components/Dropdown/DropdownMenu.vue'
import DropDownItem from '@/components/Dropdown/DropdownItem.vue'
import ThemeToggle from '@/components/Theme/ThemeToggle.vue'

export default defineComponent({
  components: {
    DropDown,
    DropDownMenu,
    DropDownItem,
    ThemeToggle
  },
  setup () {
    const appStore = useAppStroe()
    const handleClick = () => {
      appStore.changeDropdown()
    }

    const handleTheme = () => {
      appStore.theme === 'theme-dark'
        ? appStore.changeTheme('theme-light')
        : appStore.changeTheme('theme-dark')
    }

    return {
      handleClick,
      lunguage: computed(() => appStore.language),
      handleTheme
    }
  }
})
</script>

<style scoped lang="less">
.Header-Control {
  img {
    width: 32px;
    height: 32px;
  }

  #Theme {
    box-sizing: border-box;
    background-color: var(--background-primary);
    border: 3px solid rgba(110, 64, 201, 0.35);
  }
}
</style>
