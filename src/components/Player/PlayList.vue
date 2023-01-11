<template>
  <Transition name="playlist">
    <div id="PlayList" v-if="openPlay" class="pt-4 PlayList" ref="target">
      <div style="height: 80px; padding-left: 30px;padding-right:20px" class="PlayList">
        <h1 style="font-size: 28px">当前播放</h1>
        <div class="flex justify-between">
          <span>总{{ songList.length }}首</span>
          <div>
            <span>收藏全部</span>
            <span>清空列表</span>
          </div>
        </div>
      </div>
      <hr />
      <div id="SongList" class="PlayList">
        <ul class="PlayList">
          <li
            v-for="item in songList"
            :key="item.id"
            class="flex PlayList"
            :style="playingId === item.id ? 'color:var(--text-accent)' : ''"
          >
            <span id="Svg" class="PlayList">
              <Play v-if="playingId === item.id"></Play>
            </span>
            <span style="flex: 9" class="PlayList">{{ item.name }}</span>
            <span style="flex: 5" class="PlayList">
              <span v-for="singer in item.ar" :key="singer.id" class="PlayList">
                {{ singer.name }}
              </span>
            </span>
            <div style="flex: 2" id="Link" class="PlayList">
              <Link
                class="PlayList"
                :color="
                  playingId === item.id
                    ? 'var(--text-accent)'
                    : 'var(--text-normal)'
                "
              ></Link>
            </div>
            <span style="flex: 2" class="PlayList">{{
              formatSecToStr(item.dt)
            }}</span>
          </li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { getSongDetail } from '@/api'
import usePlayerStore from '@/store/player'
import { formatSecToStr } from '@/util'
import Link from '@/components/Svg/LinkSvg.jsx'
import Play from '@/components/Svg/PlayListPlaySvg.jsx'

const playStore = usePlayerStore()
const openPlay = computed(() => playStore.openPlayList)

const target = ref(null)
onClickOutside(target, (event) => {
  if (openPlay.value) {
    playStore.changeOpenPlayList()
  }
})

const playingId = computed(() => playStore.playingId)
const songList = ref([])
playStore.$subscribe(async (mutation, state) => {
  if (state.openPlayList) {
    const res = await getSongDetail(state.ids)
    songList.value = res.songs
  }
})
</script>

<style scoped lang="less">
#PlayList {
  width: 600px;
  height: calc(100vh - 80px);
  background: var(--background-secondary);
  position: fixed;
  z-index: 60;
  top: 0;
  right: 0;
  color: var(--text-normal);

  #SongList {
    height: calc(100% - 80px);
    overflow-y: scroll;

    #Svg {
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.playlist-enter-active,
.playlist-leave-active {
  transition: 0.3s;
}

.playlist-enter-from,
.playlist-leave-to {
  transform: translateX(600px);
}

li {
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 32px;
  }

  #Link {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

#SongList::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

#SongList::-webkit-scrollbar-thumb {
  background: #434343;
  border-radius: 16px;
  box-shadow: inset 2px 2px 2px rgba(100, 100, 100, 0.25),
    inset -2px -2px 2px rgba(0, 0, 0, 0.25);
}

#SongList::-webkit-scrollbar-track {
  border: none;
  background: linear-gradient(90deg, #434343, #434343 1px, #111 0, #111);
}
</style>
