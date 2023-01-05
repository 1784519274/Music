<template>
  <div
    id="Detail"
    class="w-full flex rounded-xl overflow-hidden"
    style="justify-content: space-between"
  >
    <div id="Lower"></div>
    <div id="LowerImg"></div>
    <el-skeleton
      :loading="props.res.code !== 200"
      animated
      class="flex p-6 z-20"
    >
      <template #template>
        <el-skeleton-item
          variant="image"
          style="width: 300px; height: 300px"
          class="mr-6"
        />
        <div class="relative">
          <div class="flex flex-col">
            <el-skeleton-item
              variant="text"
              style="width: 400px; height: 30px"
              class="mb-2"
            />
            <el-skeleton-item
              variant="text"
              style="width: 250px; height: 30px"
              class="my-6"
            />
            <el-skeleton-item
              variant="text"
              style="width: 150px; height: 40px; border-radius: 20px"
              class="mb-2"
            />
          </div>
          <div class="absolute flex flex-col bottom-0 left-0">
            <el-skeleton-item
              variant="text"
              style="width: 160px; height: 16px"
              class="mb-1"
            />
            <el-skeleton-item
              variant="text"
              style="width: 130px; height: 16px"
              class="mb-1"
            />
            <el-skeleton-item
              variant="text"
              style="width: 200px; height: 16px"
            />
          </div>
        </div>
      </template>
      <template #default>
        <div id="Text" class="flex z-20 p-6">
          <img
            class="mr-6 rounded-xl"
            :src="props.res.playlist.coverImgUrl"
            alt=""
            style="width: 300px; height: 300px"
          />
          <div class="relative">
            <div class="flex items-center mb-3">
              <span id="Label" class="px-4 py-1 rounded-xl mr-2">歌单</span>
              <span class="text-2xl font-medium">{{
                props.res.playlist.name
              }}</span>
            </div>
            <div class="flex items-center mb-3">
              <img
                class="my-2 rounded-full mr-4"
                :src="props.res.playlist.creator.avatarUrl"
                alt
                style="width: 60px; height: 60px"
              />
              <span
                class="text-lg mr-2 cursor-pointer"
                style="color: var(--text-accent)"
                >{{ props.res.playlist.creator.nickname }}</span
              >
              <span class="text-lg"
                >{{ formatDate(props.res.playlist.createTime) }}创建</span
              >
            </div>
            <div
              id="Play"
              class="flex rounded-full text-white back-theme justify-center"
            >
              <span class="flex items-center m-2 cursor-pointer" @click="handlePlayAll"
                ><el-icon :size="25"><CaretRight /></el-icon>播放全部</span
              >
              <span class="flex items-center m-2"
                ><el-icon :size="18"><Plus /></el-icon
              ></span>
            </div>
            <div class="flex flex-col absolute bottom-0 left-0">
              <span id="Class"
                >标签：
                <span
                  style="color: var(--text-accent)"
                  v-for="item in props.res.playlist.tags"
                  :key="item"
                  @click="handleRouter(item)"
                  class="cursor-pointer"
                  >{{ item }}
                </span>
              </span>
              <div>
                <span class="mr-4"
                  >歌曲：{{ props.res.playlist.trackCount }}</span
                >
                <span
                  >播放：{{ numberUnit(props.res.playlist.playCount) }}</span
                >
              </div>
              <span
                >简介：{{
                  props.res.playlist.creator.description === ""
                    ? "无"
                    : props.res.playlist.creator.description
                }}</span
              >
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import usePlayList from '@/store/playlist'
import usePlayerStore from '@/store/player'
import { numberUnit, formatDate } from '@/util'

const props = defineProps({
  res: Object
})

const { currentRoute } = useRouter()
const songListId = ref()
const init = () => {
  songListId.value = currentRoute.value.query.id
}

onMounted(init)

const playerStore = usePlayerStore()
const store = usePlayList()
const router = useRouter()
const handleRouter = (name) => {
  router.push('/playlist')
  store.changeCat(name)
}
const handlePlayAll = () => {
  playerStore.changeIds(songListId.value, true)
}
</script>

<style scoped lang="less">
#Detail {
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
  background-image: url(@/assets/banner.jpg);
  background-size: 80% 100%;
  background-repeat: no-repeat;
  background-position: right;
  position: relative;
}
#Detail::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  backdrop-filter: blur(1px);
  z-index: 10;
}
#Lower {
  position: absolute;
  width: 20%;
  height: 100%;
  background: var(--background-secondary);
  box-shadow: 0px 20px 50px 100px var(--background-secondary);
}
#LowerImg {
  position: absolute;
  width: 80%;
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--background-secondary),
    var(--background-primary-op7) 41.07%,
    var(--background-primary-op4) 76.05%
  );
  right: 0;
}

#Label {
  border: 2px solid var(--text-accent);
}

#Play {
  width: 150px !important;
}

#Class {
  span::before {
    content: " / ";
    color: var(--text-normal);
    cursor: default;
  }
  span:first-child::before {
    content: "";
  }
}

.el-skeleton.is-animated .el-skeleton__item {
  border-radius: 1rem;
  background: linear-gradient(
    90deg,
    var(--skeleton-bg) 25%,
    var(--skeleton-hl) 37%,
    var(--skeleton-bg) 63%
  );
  background-size: 400% 100%;
  animation: el-skeleton-loading 1.4s ease infinite;
}
</style>
