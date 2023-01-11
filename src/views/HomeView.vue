<template>
  <div>
    <Banner></Banner>
    <Title routePath="/playlist">
      <MusicNoteSvg></MusicNoteSvg>
      {{ $t("home.recommend") }}
      <TitleRightSvg></TitleRightSvg>
    </Title>
    <div id="Recommend" class="flex">
      <div id="SongList">
        <el-row :gutter="20">
          <el-col v-for="item in recommendSong.values" :key="item.id" :span="6">
            <RecommendSong
              :id="item.id"
              :name="item.name"
              :picUrl="item.picUrl"
            ></RecommendSong>
          </el-col>
        </el-row>
      </div>
    </div>
    <Title routePath="/mine">For You<TitleRightSvg></TitleRightSvg></Title>
    <div class="flex justify-between mt-14">
      <div
        id="DayComm"
        class="rounded-xl cursor-pointer"
        style="width: 48%; height: 200px"
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
      >
        <div
          id="Content"
          class="flex justify-center items-center relative w-full h-full z-30 rounded-xl"
          @click="handleClick"
        >
          <CalendarSvg></CalendarSvg>
          <Play :isHover="isHover" @handlePlayMusic="handlePlayMusic"></Play>
        </div>
        <Tag :isHover="isHover" text="推荐"></Tag>
      </div>
      <div class="bg-slate-400" style="width: 48%; height: 200px"></div>
    </div>
    <Title>推荐艺人 <TitleRightSvg></TitleRightSvg></Title>
    <Title>新专速递<TitleRightSvg></TitleRightSvg></Title>
    <Title>排行榜<TitleRightSvg></TitleRightSvg></Title>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import { useAppStroe } from '@/store/app'
import { recommend, getAccountInfo, getUserDetail, getLevelInfo } from '@/api'
import Title from '@/components/Title/TitleCom.vue'
import Banner from '@/components/Banner/BannerCom.vue'
import RecommendSong from '@/components/Recommend/RecommendSong.vue'
import MusicNoteSvg from '@/components/Svg/MusicNoteSvg.jsx'
import TitleRightSvg from '@/components/Svg/TitleRightSvg.jsx'
import CalendarSvg from '@/components/Svg/CalendarSvg.vue'
import Play from '@/components/Play/PlayMusic.vue'
import Tag from '@/components/Tag/TagCom.vue'

const recommendSong = reactive([])
const appStore = useAppStroe()

const init = async () => {
  const recommendSongList = await recommend()
  recommendSong.values = recommendSongList.result
  const res = await getAccountInfo()
  if (!res.account) {
    console.log('登录信息过期')
  }
  const userDetail = await getUserDetail(res.account.id)
  appStore.changeUserDetail(userDetail)
  const levelInfo = await getLevelInfo()
  appStore.changeLevelInfo(levelInfo.data)
}
onMounted(init)

const isHover = ref(false)
const handleClick = () => {
  console.log(1)
}
const handlePlayMusic = () => {
  console.log(2)
}
</script>

<style scoped lang="less">
#Banner {
  color: aliceblue;
}
.el-skeleton.is-animated .el-skeleton__item {
  border-radius: 50px;
  background: linear-gradient(
    90deg,
    var(--skeleton-bg) 25%,
    var(--skeleton-hl) 37%,
    var(--skeleton-bg) 63%
  );
  background-size: 400% 100%;
  animation: el-skeleton-loading 1.4s ease infinite;
}

#Recommend {
  #SongList {
    flex: 3;
    padding-bottom: 50px;
  }
  #UserInfo {
    flex: 1;
    padding-bottom: 50px;
  }
}

#DayComm {
  position: relative;
  background-image: url(@/assets/default-cover.df7c128c.jpg);

  #Content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    backdrop-filter: blur(50px);
  }
}
</style>
