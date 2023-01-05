<template>
  <Transition name="player">
    <div id="Player" v-if="JSON.stringify(songInfo) !== '{}'">
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
      <div class="h-full flex justify-between">
        <div class="h-full flex" style="flex: 3; overflow: hidden">
          <img v-if="isLoading" src="@/assets/logotheme.png" alt style="height: 60px; width: 60px" class="rounded-xl mr-4 cursor-pointer">
          <img
            v-else
            style="height: 60px; width: 60px"
            :src="avatarUrl"
            alt
            class="rounded-xl mr-4 cursor-pointer"
          />
          <div
            class="flex flex-col justify-between box-border"
            style="overflow: hidden"
          >
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
        <div style="flex: 4" class="flex flex-col items-center">
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
import { useImage } from '@vueuse/core'
import usePlayerStore from '@/store/player'
import { formatMusicPlay } from '@/util'
import PauseSvg from '@/components/Svg/PauseSvg.jsx'
import Play from '@/components/Svg/PlaySvg.jsx'
import MusicList from '@/components/Svg/MusicList.jsx'
import Loop from '@/components/Svg/LoopSvg.jsx'
import LoopOnce from '@/components/Svg/LoopOnceSvg.jsx'
import Random from '@/components/Svg/RandomSvg.jsx'
import GoStart from '@/components/Svg/GoStart.jsx'
import GoEnd from '@/components/Svg/GoEnd.jsx'

const playerStore = usePlayerStore()
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
// 开始播放
const play = () => {
  isPlay.value = true
  playerStore.changeIsPlay(true)
}
// 暂停播放
const pause = () => {
  isPlay.value = false
  playerStore.changeIsPlay(false)
  if (percentage.value === 100) {
    if (playType.value === 0) {
      playerStore.nextSong()
    }
    if (playType.value === 1) {
      percentage.value = 0
      handlePlay()
    }
    if (playType.value === 2) {
      playerStore.randomSong()
    }
  }
}
// 当前播放时间
const timeupdate = (audio) => {
  currentTime.value = audio.target.currentTime
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
  if (JSON.stringify(songInfo.value) !== '{}') {
    avatarUrl.value = songInfo.value.al.picUrl
  }
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

const avatarUrl = ref()
const { isLoading } = useImage({ src: avatarUrl })
</script>

<style scoped lang="less">
#Player {
  height: 80px;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 10;
  padding: 10px 20px;
  background: var(--background-secondary) !important;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.5);

  #Control {
    justify-content: space-around;

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
  height: 2px;
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
</style>
