<template>
  <Transition name="Lyric">
    <div id="LyricView" class="px-36 z-50" v-if="props.open">
      <!-- 显示歌词部分 -->
      <div
        id="Lyric"
        class="flex rounded-xl shadow-them relative mb-12"
        :style="`background: url(${songInfo.al.picUrl});`"
      >
        <!-- blur -->
        <div id="Blur" class="rounded-xl"></div>
        <!-- 碟片机 -->
        <div
          class="flex flex-col justify-center items-center z-20"
          style="padding-left: 200px"
        >
          <img
            id="Rod"
            src="@/assets/needle.72039ea9.png"
            alt
            class="z-20 overflow-hidden"
            :style="`transform: translateX(50%) rotate(${isPlay ? 33 : 0}deg);`"
          />
          <div
            id="Rota"
            class="rounded-full bg-slate-600 flex justify-center items-center relative duration-300"
            :class="isPlay ? 'rotaactive' : ''"
          >
            <img src="@/assets/disc-ip6.png" alt />
            <img
              :src="songInfo.al.picUrl"
              alt
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style="width: 280px; height: 280px"
            />
          </div>
        </div>
        <!-- 歌词 -->
        <div style="flex: 1; width: 500px" class="flex flex-col ml-20 z-20">
          <!-- 标题 -->
          <div class="flex flex-col mb-4">
            <!-- 歌名 -->
            <span class="" style="font-size: 28px">{{ songInfo.name }}</span>
            <!-- 歌手、专辑 -->
            <span style="font-size: 14px; width: 500px" class="flex">
              <!-- 歌手 -->
              <span id="SingerName" style="flex: 1">
                歌手：<span v-for="singer in songInfo.ar" :key="singer.id"  @click="handleSinger(singer.id)">{{
                  singer.name
                }}</span>
              </span>
              <!-- 专辑 -->
              <span style="flex: 1" class="ml-2">
                专辑：<span id="Alname" class="cursor-pointer">{{
                  songInfo.al.name
                }}</span>
              </span>
            </span>
          </div>
          <!-- 歌词文字 -->
          <div
            id="Scroll"
            class="w-full overflow-y-scroll relative"
            style="height: 490px"
          >
            <div id="Text" class="flex flex-col justify-center items-center">
              <span
                v-for="(item, index) in lyric"
                :key="index"
                class="w-full block py-4"
                :class="playLyricIndex - 1 === index ? 'active' : ''"
                style="transition: 300ms"
              >
                {{ item.value }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 评论 -->
      <MusicComm :id="id"></MusicComm>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, onBeforeMount, ref, defineProps, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import usePlayerStore from '@/store/player'
import { useWordsStore } from '@/store'
import { getLyric } from '@/api'
import { formatLyric, getLyricIndex, computedScrollTop } from '@/util/utils'
import MusicComm from '@/components/Comment/MusicComm.vue'

const playerStore = usePlayerStore()
const wordsStore = useWordsStore()

const router = useRouter()

// 使用props传更快
const props = defineProps({
  open: Boolean
})
// 播放/暂停
const isPlay = ref(false)
// 歌曲id
const id = ref(0)
// 歌词
const lyric = ref([])
// img
const songInfo = ref({})

const mountedInit = () => {
  isPlay.value = playerStore.isPlay
  id.value = playerStore.playingId
  getLyric(id.value).then((res) => {
    lyric.value = formatLyric(res.lrc.lyric)
  })
}
const beforemountInit = () => {
  songInfo.value = playerStore.songInfo
}
onMounted(mountedInit)
onBeforeMount(beforemountInit)

const playLyricIndex = ref(0)

playerStore.$subscribe(async (mutation, state) => {
  isPlay.value = state.isPlay
  songInfo.value = playerStore.songInfo
  if (id.value !== state.playingId) {
    id.value = state.playingId
    const res = await getLyric(id.value)
    lyric.value = formatLyric(res.lrc.lyric)
    // 歌曲改变，修改歌词位置
    handleScroll(playLyricIndex.value)
  }
  if (mutation.events.key === 'currentPlayTime') {
    // 当前计算出歌词位置，内部使用
    const currentIndex = getLyricIndex(lyric.value, state.currentPlayTime)
    if (currentIndex !== playLyricIndex.value) {
      playLyricIndex.value = getLyricIndex(lyric.value, state.currentPlayTime)
      // 播放时间改变，修改歌词位置
      handleScroll(playLyricIndex.value)
    }
  }
})

wordsStore.$subscribe(async (mutation, state) => {
  await nextTick()
  // 打开歌词页面时，修改位置，关闭页面时，不做处理
  if (state.open) {
    handleScroll(playLyricIndex.value)
  }
})

// 计算歌词位置
const handleScroll = (index) => {
  if (!props.open) return
  const textDom = document.getElementById('Text').getElementsByTagName('span')

  const currentScrollTop = computedScrollTop(textDom, index)
  const scroll = document.getElementById('Scroll')
  scroll.scrollTo({
    top: currentScrollTop,
    behavior: 'smooth'
  })
}

// 点击歌手
const handleSinger = (id) => {
  router.push({
    name: 'singerinfo',
    query: {
      id
    }
  })
  wordsStore.changeOpen()
}
</script>

<style scoped lang="less">
#LyricView {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  padding-top: 60px;
  backdrop-filter: blur(20px);
}
#Lyric {
  // background: var(--background-secondary);
  background-size: 500%;
  backdrop-filter: blur(20px);

  #Blur {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    backdrop-filter: blur(20px);
    background: linear-gradient(
      180deg,
      var(--background-primary-op4) 0%,
      var(--background-primary-op) 50%,
      var(--background-secondary) 100%
    );
  }

  #Rod {
    width: 142px;
    height: 115px;
    transform-origin: top left;
    transition: 300ms;
  }

  #Rota {
    height: 400px;
    width: 400px;
  }

  .rotaactive {
    animation: rotation 15s linear infinite;
  }

  #SingerName {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    span {
      cursor: pointer;
    }
    span::before {
      content: " / ";
    }
    span:first-child::before {
      content: "";
    }
    span:hover {
      color: var(--text-accent);
    }
  }

  #Alname:hover {
    color: var(--text-accent);
  }
}

#Scroll {
  width: 600px;

  #Text {
    padding: 260px 0;
    font-size: 16px;
    width: 500px;

    span {
      display: block;
      transition: 300ms;
    }
  }
}

.active {
  color: var(--text-accent);
  transition: 300ms;
  font-weight: 700;
  font-size: 24px;
}

#Scroll::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

#Scroll::-webkit-scrollbar-thumb {
  background: #434343;
  border-radius: 16px;
  box-shadow: inset 2px 2px 2px rgba(100, 100, 100, 0.25),
    inset -2px -2px 2px rgba(0, 0, 0, 0.25);
}

#Scroll::-webkit-scrollbar-track {
  border: none;
  background: transparent;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

@keyframes rota {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(33deg);
  }
}

.Lyric-enter-active,
.Lyric-leave-active {
  transition: 0.5s;
}

.Lyric-enter-from,
.Lyric-leave-to {
  transform: translateY(100vh);
}
</style>
