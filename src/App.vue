<template>
  <div
    ref="el"
    id="App-Wrapper"
    :class="theme"
    class="h-full overflow-auto w-screen relative flex flex-col"
    @scroll="handelScroll"
    :style="
      isPlay
        ? 'height: calc(100% - 80px)  !important'
        : 'height: calc(100%)  !important'
    "
  >
    <div id="App-Container" class="px-36 relative">
      <AppBg></AppBg>
      <Header></Header>
      <div class="">
        <WordsView :open="open"></WordsView>
        <router-view v-if="!open"></router-view>
      </div>
    </div>
    <div class="mt-auto">
      <SplicLine></SplicLine>
      <Footer> </Footer>
    </div>
    <BackTopBall></BackTopBall>
    <Player></Player>
    <PlayList></PlayList>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useTitle, useScroll } from '@vueuse/core'
import { useAppStroe } from '@/store/app'
import useNavigatorStore from '@/store/navigator'
import usePlayerStore from '@/store/player'
import useScrollStore from '@/store/scroll'
import { useWordsStore } from '@/store'
import Header from './components/Header/HeaderCom.vue'
import SplicLine from '@/components/SplicLine/LineCom.vue'
import Footer from '@/components/Footer/FooterCom.vue'
import AppBg from '@/components/AppBg/AppBg.vue'
import Player from '@/components/Player/PlayerCom.vue'
import BackTopBall from '@/components/BackTopBall/BackTop.vue'
import PlayList from '@/components/Player/PlayList.vue'
import WordsView from '@/views/WordsView.vue'

const el = ref()
const { y } = useScroll(el)

const title = useTitle()
title.value = 'MUSIC'
const appStore = useAppStroe()
const navigatorStore = useNavigatorStore()
const playerStore = usePlayerStore()
const scrollStore = useScrollStore()
const isPlay = ref(false)
const theme = computed(() => appStore.theme)
const timer = ref()
const isTop = computed(() => navigatorStore.appScrollTop)
const handelScroll = () => {
  scrollStore.changeScrollY(y.value)
  const appTop = document.getElementById('App-Wrapper').scrollTop
  if (appTop === 0) {
    if (!isTop.value) {
      navigatorStore.changeScrollTop()
    }
  } else {
    if (isTop.value) {
      navigatorStore.changeScrollTop()
    }
  }

  navigatorStore.chageScrollState(true)
  clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    navigatorStore.chageScrollState(false)
  }, 500)

  playerStore.$subscribe((mutation, state) => {
    isPlay.value = state.isPlay
  })
}
const wordsStore = useWordsStore()
const open = ref(false)
wordsStore.$subscribe((mutation, state) => {
  open.value = state.open
})
</script>

<style lang="less">
#App-Wrapper {
  background: var(--background-primary);
  color: var(--text-normal);
  min-width: 1600px;

  #App-Container {
    background: var(--background-primary);
  }
}
</style>
