<template>
  <div>
    <ul class="flex">
      <li style="flex: 3; justify-content: center">操作</li>
      <li style="flex: 7">标题</li>
      <li style="flex: 6">歌手</li>
      <li style="flex: 4">专辑</li>
      <li style="flex: 1">时间</li>
    </ul>
    <div
      v-show="songList.length === 0"
      class="flex justify-center items-center text-1xl"
    >
      <el-icon class="is-loading">
        <Loading />
      </el-icon>
      <span>&nbsp;&nbsp;载入中...</span>
    </div>
    <div ref="el" class="el">
      <ul
        id="List"
        class="flex"
        v-for="(item, index) in songList"
        :key="item.id"
        @dblclick="handlePlay(item)"
      >
        <li class="flex justify-between" style="flex: 3">
          <span
            v-if="playingId === item.id"
            style="flex: 1"
            class="flex justify-center pl-4"
          >
            <span>
              <VolumeNotice v-if="isPlay"></VolumeNotice>
              <VolumeSmall v-else></VolumeSmall>
            </span>
          </span>
          <span v-else class="pl-4 text-center" style="flex: 1">{{
            index > 8 ? index + 1 : `0${index + 1}`
          }}</span>
          <span class="flex justify-center" style="flex: 1">
            <Like></Like>
          </span>
          <span class="pr-4 flex justify-center" style="flex: 1">
            <Download></Download>
          </span>
        </li>
        <!-- 歌名 -->
        <li style="flex: 7" class="flex">
          <span class="cursor-pointer z-10">{{ item.name }}</span>
          <Lable v-if="item.fee === 1" text="VIP" width="34"></Lable>
          <Lable v-if="item.mv !== 0" text="MV" width="34"></Lable>
        </li>
        <!-- 歌手 -->
        <li style="flex: 6" class="flex">
          <span id="Singer">
            <span
              v-for="singer in item.ar"
              :key="singer.id"
              class="signer"
              @click="handleSinger(singer.id)"
              >{{ singer.name }}</span
            >
          </span>
        </li>
        <!-- 专辑 -->
        <li style="flex: 4" @click="handleAlbum(item.al.id)">
          <span>{{ item.al.name }}</span>
        </li>
        <!-- 时间 -->
        <li style="flex: 1">
          <span>{{ formatSecToStr(item.dt) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { getPlaylistSongsAll, getSongUrl } from '@/api'
import { formatSecToStr } from '@/util'
import usePlayerStore from '@/store/player'
import useScrollStore from '@/store/scroll'
import Lable from '@/components/SmallLable/LableCom.vue'
import VolumeNotice from '@/components/Svg/VolumeNotice.jsx'
import VolumeSmall from '@/components/Svg/VolumeSmall.jsx'
import Like from '@/components/Svg/LikeSvg.jsx'
import Download from '@/components/Svg/DownloadSvg.jsx'

const playerStore = usePlayerStore()
const scrollStore = useScrollStore()
const { currentRoute } = useRouter()
const router = useRouter()
const songList = ref([])
const songListId = ref()
const init = async () => {
  const id = currentRoute.value.query.id
  songListId.value = id
  getPlaylistSongsAll(songListId.value).then((res) => {
    songList.value = res.songs
    playerStore.changeSongList(res.songs)
  })
  playerStore.changeSonglistId(id)
}
onBeforeMount(init)

const handleAlbum = (id) => {
  console.log(`专辑id：${id}`)
}

const handlePlay = async (item) => {
  playerStore.changePlayingId(item.id)
  playerStore.chagneSongInfo(item)
  console.log(item.id)
  getSongUrl(item.id).then((res) => {
    playerStore.changeSongUrl(res.data[0].url)
  })
}

const playingId = ref()
const isPlay = ref()

playerStore.$subscribe((mutation, state) => {
  playingId.value = state.playingId
  isPlay.value = state.playingId
})

const el = ref()
scrollStore.$subscribe((mutation, state) => {})

const handleSinger = (id) => {
  console.log(id)
  router.push({
    name: 'singerinfo',
    query: {
      id
    }
  })
}
</script>

<style scoped lang="less">
li {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }
}

#List:hover {
  background: var(--background-trans);
}

#Singer {
  span::before {
    content: " / ";
    color: var(--text-normal);
    cursor: default;
  }

  span:first-child::before {
    content: "";
  }
}

.signer:hover {
  color: var(--text-accent);
}
</style>
