<template>
  <transition
    name="fade-bounce-y"
    mode="out-in"
    :style="isScroll ? 'right: -20px;' : 'right: 65px;'"
  >
    <div
      v-show="!isTop"
      id="BackTop"
      class="flex justify-center items-center shadow-them cursor-pointer"
      @click="handleBackTop"
    >
      <Rocket></Rocket>
    </div>
  </transition>
</template>

<script setup>
import useNavigatorStore from '@/store/navigator'
import { computed } from 'vue-demi'
import { backTop } from '@/util'
import Rocket from '@/components/Svg/RocketSvg.jsx'

const navigatorStore = useNavigatorStore()
const isTop = computed(() => navigatorStore.appScrollTop)
const isScroll = computed(() => navigatorStore.appScrollState)
const timer = null
const currentTop = 0
const handleBackTop = () => {
  backTop(timer, currentTop)
}
</script>

<style scoped>
#BackTop {
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 260px;
  border-radius: 100%;
  background: var(--background-secondary);
  transition: all 0.5s cubic-bezier(0, 1.8, 1, 1.2);
}

.fade-bounce-y-enter-active {
  transition: all 0.5s cubic-bezier(0, 1.8, 1, 1.2);
}

.fade-bounce-y-leave-active {
  transition: all 0.5s cubic-bezier(0, 1.8, 1, 1.2);
}

.fade-bounce-y-enter-from,
.fade-bounce-y-leave-to {
  transform: translateX(60px);
  opacity: 0;
}

svg path {
  fill: var(--text-accent);
}
</style>
