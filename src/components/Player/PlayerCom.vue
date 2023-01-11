<template>
  <Transition name="player">
    <div id="Player" v-if="JSON.stringify(songInfo) !== '{}'" class="z-50">
      <audio
        :src="url"
        @play="play"
        @pause="pause"
        @timeupdate="timeupdate"
        @canplay="getDuration"
        autoplay
        :muted="muted"
        :loop="loop"
        preload="auto"
        :volume="volume"
      ></audio>
      <div
        class="h-full overflow-hidden flex justify-between"
        style="z-index: 100"
      >
        <!-- 左 -->
        <div
          id="Show"
          class="flex flex-col overflow-hidden"
          :style="`flex: 3;transform: translateY(${open ? '0' : '-60'}px);`"
        >
          <!-- 展示歌词 -->
          <div style="min-height: 60px" class="h-full flex overflow-hidden">
            <div
              class="flex justify-center items-center cursor-pointer mr-10"
              style="width: 60px; height: 60px"
              @click="handleWords"
            >
              <Down></Down>
            </div>
            <div style="height: 60px" class="flex items-center">
              <div
                style="width: 50px; height: 50px"
                class="item flex justify-center items-center border-2 rounded-full"
              >
                <Like></Like>
              </div>
            </div>
          </div>
          <!-- 未展示歌词 -->
          <div class="h-full flex overflow-hidden">
            <div
              class="relative overflow-hidden mr-4 rounded-xl"
              @mouseover="isHoverWords = true"
              @mouseleave="isHoverWords = false"
              style="min-width: 60px; width: 60px; min-height: 60px"
            >
              <img
                v-if="!songInfo.al.picUrl"
                src="@/assets/logotheme.png"
                alt
                style="height: 60px; min-width: 60px; width: 60px"
                class="rounded-xl"
              />
              <img
                v-else
                style="height: 60px; min-width: 60px; width: 60px"
                :src="songInfo.al.picUrl"
                alt
                class="rounded-xl"
              />
              <Transition name="words">
                <div
                  v-if="isHoverWords"
                  id="Words"
                  class="absolute top-0 left-0 bg-gray-200 bg-opacity-50 rounded-xl flex justify-center items-center cursor-pointer"
                  style="height: 60px; width: 60px"
                  @click="handleWords"
                >
                  <Up></Up>
                </div>
              </Transition>
            </div>
            <div class="flex flex-col justify-between" style="overflow: hidden">
              <span
                class="text-2xl"
                style="
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
                >{{ songInfo.name }}</span
              >
              <div class="text-1xl">
                <span v-for="item in songInfo.ar" :key="item.id">
                  {{ item.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- 中 -->
        <div style="flex: 4" class="flex flex-col items-center">
          <!-- 控制 -->
          <div id="Control" class="flex cursor-pointer w-full" style="flex: 2">
            <div class="flex justify-center" @click="handlePlayType">
              <Loop v-show="playType === 0"></Loop>
              <LoopOnce v-show="playType === 1"></LoopOnce>
              <Random v-show="playType === 2"></Random>
            </div>
            <div class="flex justify-center">
              <GoStart @click="handleLast"></GoStart>
            </div>
            <div
              id="Play"
              class="flex justify-center items-center"
              @click="handlePlay"
            >
              <Play v-show="!isPlay"></Play>
              <PauseSvg v-show="isPlay"></PauseSvg>
            </div>
            <div class="flex justify-center">
              <GoEnd @click="handleNext"></GoEnd>
            </div>
            <div class="flex"></div>
          </div>
          <!-- 进度条 -->
          <div id="Progress" style="flex: 1" class="flex">
            <span style="width: 60px; text-align: center">{{
              formatMusicPlay(currentTime)
            }}</span>
            <div
              id="Bar"
              ref="bar"
              style="flex: 1"
              @mouseover="isHover = true"
              @mouseleave="isHover = false"
            >
              <div id="AllBar" class="back-theme"></div>
              <div id="NowBar">
                <div id="Before" :style="`width: ${percentage}%;`">
                  <div
                    id="Ball"
                    @mousedown="handleMousedown"
                    @mousemove="handleMousemove"
                  ></div>
                </div>
                <div id="After"></div>
              </div>
            </div>
            <span style="width: 60px; text-align: center">{{
              formatMusicPlay(allTime)
            }}</span>
          </div>
        </div>
        <!-- 右 -->
        <div
          style="flex: 3"
          class="flex flex-row-reverse items-center cursor-pointer"
        >
          <span
            id="MusicList"
            style="width: 30px; height: 30px"
            @click="handleOpenList"
          >
            <MusicList id="MusicList"></MusicList>
          </span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import usePlayerStore from '@/store/player'
import { useWordsStore } from '@/store'
import { formatMusicPlay } from '@/util'
import PauseSvg from '@/components/Svg/PauseSvg.jsx'
import Play from '@/components/Svg/PlaySvg.jsx'
import MusicList from '@/components/Svg/MusicList.jsx'
import Loop from '@/components/Svg/LoopSvg.jsx'
import LoopOnce from '@/components/Svg/LoopOnceSvg.jsx'
import Random from '@/components/Svg/RandomSvg.jsx'
import GoStart from '@/components/Svg/GoStart.jsx'
import GoEnd from '@/components/Svg/GoEnd.jsx'
import Up from '@/components/Svg/UpSvg.jsx'
import Down from '@/components/Svg/DownSvg.jsx'
import Like from '@/components/Svg/LikeSvg.jsx'

const playerStore = usePlayerStore()
const wordsStore = useWordsStore()
// 歌曲url
const url = ref('')
// 歌曲信息
const songInfo = ref({})
// 播放状态
const isPlay = ref(false)
// 播放百分比
const percentage = ref(0)
// 总时长
const allTime = ref(0)
const currentTime = ref(0)

// 是否静音
const muted = ref(false)
// 是否循环
const loop = ref(false)
// 音量大小
const volume = ref(1)

const wordsTimer = ref(null)
// 开始播放
const play = () => {
  isPlay.value = true
  playerStore.changeIsPlay(true)
}
// 暂停播放
const pause = () => {
  isPlay.value = false
  playerStore.changeIsPlay(false)
  clearInterval(wordsTimer.value)
  if (percentage.value === 100) {
    if (playType.value === 0) {
      console.log(0)
      playerStore.nextSong()
    }
    if (playType.value === 1) {
      percentage.value = 0
      console.log(1)
      handlePlay()
    }
    if (playType.value === 2) {
      console.log(2)
      playerStore.randomSong()
    }
  }
}
// 当前播放时间
const timeupdate = (audio) => {
  currentTime.value = audio.target.currentTime
  playerStore.changeCurrentPlayTime(audio.target.currentTime)
  if (!isDrag.value) {
    percentage.value = (audio.target.currentTime / allTime.value) * 100
  }
}

// 获取全部时长
const getDuration = (audio) => {
  allTime.value = audio.target.duration
}

// 监听歌曲url变化
playerStore.$subscribe((mutation, state) => {
  url.value = state.songUrl ?? url.value
  songInfo.value = state.songInfo ?? songInfo.value
})

// 播放
const handlePlay = () => {
  isPlay.value = !isPlay.value
  if (isPlay.value) {
    document.querySelector('audio').play()
  } else {
    document.querySelector('audio').pause()
  }
}

const timer = ref(null)

// 上一首
const handleLast = () => {
  if (!timer.value) {
    timer.value = setTimeout(() => {
      timer.value = null
    }, 500)
  } else {
    return
  }
  if (playType.value === 2) return playerStore.randomSong()
  playerStore.lastSong()
}

// 下一首
const handleNext = () => {
  if (!timer.value) {
    timer.value = setTimeout(() => {
      timer.value = null
    }, 500)
  } else {
    return
  }
  if (playType.value === 2) return playerStore.randomSong()
  playerStore.nextSong()
}

const init = () => {
  songInfo.value = playerStore.songInfo
  url.value = playerStore.songUrl
  window.addEventListener('mouseup', handleMouseup)
  window.addEventListener('mousemove', handleMousemove)
}

onMounted(init)

// 播放模式：列表循环，单曲循环，随机播放
const playType = ref(0)
const handlePlayType = () => {
  playType.value = playType.value === 2 ? 0 : playType.value + 1
}

const handleOpenList = (e) => {
  playerStore.changeOpenPlayList()
}

const isHover = ref(false)
const isDrag = ref(false)
const mouseLastOpt = ref(0)
const handleMousedown = (e) => {
  isDrag.value = true
  mouseLastOpt.value = e.clientX
}
const bar = ref()
const handleMousemove = (e) => {
  if (isDrag.value) {
    const barDis = bar.value.offsetWidth
    const mouseDis = e.clientX - mouseLastOpt.value
    const computedNum = mouseDis / barDis
    const changeDis = computedNum * 100
    percentage.value += changeDis
    mouseLastOpt.value = e.clientX
  }
}
const handleMouseup = () => {
  if (isDrag.value) {
    let num = percentage.value / 100
    num = num > 1 ? 1 : num < 0 ? 0 : num
    document.querySelector('audio').currentTime = num * allTime.value
  }
  isDrag.value = false
}

const isHoverWords = ref(false)
// 跳转歌词页面
const open = ref(false)
const handleWords = () => {
  open.value = !open.value
  wordsStore.changeOpen()
}

wordsStore.$subscribe((mutatin, state) => {
  open.value = state.open
})
</script>

<style scoped lang="less">
#Player {
  height: 80px;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 100;
  padding: 10px 20px;
  background: var(--background-secondary) !important;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.5);

  #Control {
    justify-content: space-around;
    height: 34px !important;

    div {
      width: 34px;
      height: 34px;
      font-size: 18px;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
    }

    div:hover {
      background: rgba(178, 190, 195, 0.6);
    }
  }

  #SongName {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

#Progress {
  width: 100%;
  height: 20px;
  position: relative;
  border-radius: 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  #Bar {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    height: 2px;

    #AllBar {
      width: 100%;
      height: 2px;
      border-radius: 2px;
    }

    #NowBar {
      height: 2px;
      width: 100%;
      z-index: 10;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      border-radius: 2px;
      align-items: center;

      #Before {
        background: transparent;
        position: relative;
        height: 2px;

        #Ball {
          width: 8px;
          height: 8px;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%) translateX(4px);
          border-radius: 50%;
          background-color: var(--text-normal);
        }
      }

      #After {
        flex: 1;
        background: var(--text-normal);
        height: 2px;
        border-radius: 0 1px 1px 0;
      }
    }
  }
}

#Show {
  transition: 0.3s;
  height: 120px;

  .item {
    border: 1px solid rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
  .item:hover {
    background-color: rgba(223, 230, 233, 0.3);
  }
}

#MusicList {
  display: flex;
  justify-content: center;
  align-items: center;
}

.player-enter-active,
.player-leave-active {
  transition: 0.3s;
}

.player-enter-from,
.player-leave-to {
  transform: translateY(80px);
}

.words-enter-active,
.words-leave-active {
  transition: 0.3s;
}

.words-enter-from,
.words-leave-to {
  transform: translateY(60px);
}

.show-enter-active,
.show-leave-active {
  transition: 0.3s;
}

.show-enter-from,
.show-leave-to {
  transform: translateY(60px);
}

.hidden-enter-active,
.hidden-leave-active {
  transition: 0.3s;
}

.hidden-enter-from,
.hidden-leave-to {
  transform: translateY(-60px);
}
</style>
