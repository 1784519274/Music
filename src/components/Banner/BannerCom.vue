<template>
  <div
    id="Banner"
    class="w-full h-96 relative rounded-3xl mt-4 z-10"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="w-full h-full absolute flex rounded-2xl z-10">
      <div id="BImg" class="rounded-2xl" style="flex: 8">
        <img src="@/assets/banner.jpg" alt class="rounded-2xl" />
      </div>
      <div id="BEmpty" class="" style="flex: 2"></div>
    </div>
    <div
      class="absolute right-0 top-0 h-full py-8 px-12 flex flex-col z-10"
      style="width: 40%"
    >
      <div style="color: var(--text-normal)">
        <b style="color: var(--text-accent)" class="mr-2">MUSIC</b>
        #<em class="mr-2">vue</em> #<em class="mr-2">hexo</em> #<em class="mr-2"
          >tailwindcss</em
        >
      </div>
      <div class="flex my-8 items-center">
        <img
          v-if="avatarUrl === ''"
          src="@/assets/logotheme.png"
          alt
          style="width: 70px; height: 70px"
          class="rounded-full mr-4"
        />
        <img
          v-else
          :src="avatarUrl"
          alt
          style="width: 70px; height: 70px"
          class="rounded-full mr-4"
        />
        <h1 id="Nickname" class="text-5xl" style="color: var(--text-bright)">
          {{ nickname }}
        </h1>
        <div class="h-full relative" style="min-width: 75px">
          <img
            v-if="levelImg !== ''"
            :src="levelImg"
            alt=""
            style="width: 65px; height: 28px"
            class="absolute right-0 top-0"
          />
        </div>
      </div>
      <div class="mb-4" style="color: var(--text-normal)">
        <span class="mr-2">关注：{{ follows }}</span>
        <span class="mr-2">粉丝：{{ followeds }}</span>
        <span class="mr-2">性别：{{ gender ? "♂" : "♀" }}</span>
      </div>
      <div class="flex items-center" style="color: var(--text-normal)">
        <span class="mr-2 flex">
          <CakeSvg></CakeSvg>&nbsp;{{ formatDate(1622476800000) }}</span
        >
        <span class="flex">
          <LevelSvg></LevelSvg>&nbsp;<b><i>10</i></b>
        </span>
      </div>
      <div
        class="absolute bottom-0 right-0 py-8 px-12"
        style="color: var(--text-normal)"
      >
        <Btn></Btn>
      </div>
    </div>
    <Tag :isHover="isHover" text="用户"></Tag>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAppStroe } from '@/store/app'
import { formatDate } from '@/util'
import Tag from '@/components/Tag/TagCom.vue'
import Btn from '@/components/User/LoginBtn.vue'
import CakeSvg from '@/components/Svg/CakeSvg.vue'
import LevelSvg from '@/components/Svg/LevelSvg.vue'

const isHover = ref(false)
const appStore = useAppStroe()
const avatarUrl = computed(() =>
  JSON.stringify(appStore.userDeatil) === '{}'
    ? ''
    : appStore.userDeatil.profile.avatarUrl
)
const nickname = computed(() =>
  JSON.stringify(appStore.userDeatil) === '{}'
    ? '网易云音乐'
    : appStore.userDeatil.profile.nickname
)
const follows = computed(() =>
  JSON.stringify(appStore.userDeatil) === '{}'
    ? 0
    : appStore.userDeatil.profile.follows
)
const followeds = computed(() =>
  JSON.stringify(appStore.userDeatil) === '{}'
    ? 0
    : appStore.userDeatil.profile.followeds
)
const gender = computed(() =>
  JSON.stringify(appStore.userDeatil) === '{}'
    ? 0
    : appStore.userDeatil.profile.gender
)
const levelImg = computed(() =>
  JSON.stringify(appStore.levelInfo) === '{}'
    ? ''
    : appStore.levelInfo?.levelCard?.flashIconImgUrl
)
</script>

<style scoped lang="less">
#Banner {
  background: var(--background-primary);
  transition: 300ms;
  color: var(--text-normal);
}
#Banner:hover {
  scale: 1.02;
}
#BImg {
  background-size: 100% 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }
}
#BImg::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--gradient-cover);
}

#BEmpty {
  background: var(--background-secondary);
  border-radius: 0 20px 20px 0;
}

#Nickname {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

svg path,
svg circle {
  stroke: var(--text-accent);
}
</style>
