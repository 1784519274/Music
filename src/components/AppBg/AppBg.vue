<template>
  <div id="App-Bg" class="w-full absolute left-0">
    <svg
      class="absolute bottom-0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
    >
      <path
        :fill="theme === 'theme-dark' ? '#1a1a1a' : '#f1f3f9'"
        fill-opacity="1"
        d="M0,128L30,133.3C60,139,120,149,180,149.3C240,149,300,139,360,149.3C420,160,480,192,540,213.3C600,235,660,245,720,229.3C780,213,840,171,900,128C960,85,1020,43,1080,42.7C1140,43,1200,85,1260,128C1320,171,1380,213,1410,234.7L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
      ></path>
    </svg>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useAppStroe } from '@/store/app'

export default defineComponent({
  setup () {
    const appStore = useAppStroe()
    return {
      theme: computed(() => appStore.theme)
    }
  }
})
</script>

<style scoped>
#App-Bg {
  z-index: 0;
  height: 600px;
  background: linear-gradient(130deg, #24c6dc, #5433ff 41.07%, #ff0099 76.05%);
}
</style>
