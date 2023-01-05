<template>
  <div>
    <Banner></Banner>
    <Title routePath="/playlist"
      ><svg
        t="1672056084977"
        class="icon w-10 h-10 font-black inline-block mr-2"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2070"
        width="200"
        height="200"
      >
        <path
          d="M254.7712 652.6976c-90.5216 0-163.84 64.1024-163.84 143.36s73.3184 143.36 163.84 143.36 163.84-64.1024 163.84-143.36-73.3184-143.36-163.84-143.36z m0 245.76c-67.7888 0-122.88-45.8752-122.88-102.4s55.0912-102.4 122.88-102.4 122.88 45.8752 122.88 102.4-55.0912 102.4-122.88 102.4zM766.7712 529.8176c-90.5216 0-163.84 64.1024-163.84 143.36s73.3184 143.36 163.84 143.36 163.84-64.1024 163.84-143.36-73.3184-143.36-163.84-143.36z m0 245.76c-67.7888 0-122.88-45.8752-122.88-102.4s55.0912-102.4 122.88-102.4 122.88 45.8752 122.88 102.4-55.0912 102.4-122.88 102.4z"
          p-id="2071"
        ></path>
        <path
          d="M398.1312 222.6176a20.48 20.48 0 0 1 20.48 20.48v532.48a20.48 20.48 0 0 1-40.96 0v-532.48a20.48 20.48 0 0 1 20.48-20.48zM912.5888 84.992a20.48 20.48 0 0 1 20.48 20.48v573.44a20.48 20.48 0 0 1-40.96 0v-573.44a20.48 20.48 0 0 1 20.48-20.48z"
          p-id="2072"
        ></path>
        <path
          d="M392.8064 223.232l514.2528-137.8304a20.48 20.48 0 0 1 10.6496 39.5264L403.456 262.7584a20.48 20.48 0 0 1-10.6496-39.5264zM500.5312 399.1552l-107.7248 28.8768a20.48 20.48 0 0 0 10.6496 39.5264l97.0752-26.0096zM932.2496 304.5376a20.48 20.48 0 0 0-24.9856-14.5408L541.4912 389.12v40.96l376.2176-100.352a20.48 20.48 0 0 0 14.5408-25.1904z"
          p-id="2073"
        ></path></svg
      >{{ $t("home.recommend")
      }}<svg
        t="1672286698636"
        class="icon w-10 h-10"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5984"
        width="200"
        height="200"
      >
        <path
          d="M731.7 475.1L370.6 80.8c-19.7-21.5-53-22.9-74.4-3.3-21.5 19.7-22.9 53-3.3 74.4l328.6 358.8-328.3 359.8c-19.6 21.5-18.1 54.8 3.4 74.4 21.5 19.6 54.8 18.1 74.4-3.4l360.5-394.9c0.7-0.8 1.5-1.7 2.1-2.5 16.4-19.9 16.1-49.4-1.9-69z"
          p-id="5985"
        ></path></svg
    ></Title>
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
    <Title>For You</Title>
    <img v-if="isLoading" src="../assets/logo.png" alt="" />
    <img v-else :src="avatarUrl" />
    <Title
      ><svg
        t="1672056084977"
        class="icon w-10 h-10 font-black inline-block mr-2"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2070"
        width="200"
        height="200"
      >
        <path
          d="M254.7712 652.6976c-90.5216 0-163.84 64.1024-163.84 143.36s73.3184 143.36 163.84 143.36 163.84-64.1024 163.84-143.36-73.3184-143.36-163.84-143.36z m0 245.76c-67.7888 0-122.88-45.8752-122.88-102.4s55.0912-102.4 122.88-102.4 122.88 45.8752 122.88 102.4-55.0912 102.4-122.88 102.4zM766.7712 529.8176c-90.5216 0-163.84 64.1024-163.84 143.36s73.3184 143.36 163.84 143.36 163.84-64.1024 163.84-143.36-73.3184-143.36-163.84-143.36z m0 245.76c-67.7888 0-122.88-45.8752-122.88-102.4s55.0912-102.4 122.88-102.4 122.88 45.8752 122.88 102.4-55.0912 102.4-122.88 102.4z"
          p-id="2071"
        ></path>
        <path
          d="M398.1312 222.6176a20.48 20.48 0 0 1 20.48 20.48v532.48a20.48 20.48 0 0 1-40.96 0v-532.48a20.48 20.48 0 0 1 20.48-20.48zM912.5888 84.992a20.48 20.48 0 0 1 20.48 20.48v573.44a20.48 20.48 0 0 1-40.96 0v-573.44a20.48 20.48 0 0 1 20.48-20.48z"
          p-id="2072"
        ></path>
        <path
          d="M392.8064 223.232l514.2528-137.8304a20.48 20.48 0 0 1 10.6496 39.5264L403.456 262.7584a20.48 20.48 0 0 1-10.6496-39.5264zM500.5312 399.1552l-107.7248 28.8768a20.48 20.48 0 0 0 10.6496 39.5264l97.0752-26.0096zM932.2496 304.5376a20.48 20.48 0 0 0-24.9856-14.5408L541.4912 389.12v40.96l376.2176-100.352a20.48 20.48 0 0 0 14.5408-25.1904z"
          p-id="2073"
        ></path></svg
      >推荐艺人<svg
        t="1672286698636"
        class="icon w-10 h-10"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5984"
        width="200"
        height="200"
      >
        <path
          d="M731.7 475.1L370.6 80.8c-19.7-21.5-53-22.9-74.4-3.3-21.5 19.7-22.9 53-3.3 74.4l328.6 358.8-328.3 359.8c-19.6 21.5-18.1 54.8 3.4 74.4 21.5 19.6 54.8 18.1 74.4-3.4l360.5-394.9c0.7-0.8 1.5-1.7 2.1-2.5 16.4-19.9 16.1-49.4-1.9-69z"
          p-id="5985"
        ></path></svg
    ></Title>
    <Title>新专速递</Title>
    <Title>排行榜</Title>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useAppStroe } from '@/store/app'
import { recommend, getAccountInfo, getUserDetail, getLevelInfo } from '@/api'
import Title from '@/components/Title/TitleCom.vue'
import Banner from '@/components/Banner/BannerCom.vue'
import RecommendSong from '@/components/Recommend/RecommendSong.vue'
import { useImage } from '@vueuse/core'
const recommendSong = reactive([])
const appStore = useAppStroe()

const avatarUrl = 'https://place.dog/300/200'
const { isLoading } = useImage({ src: avatarUrl })

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

// const bgImg = ref('')
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

svg path {
  fill: var(--text-bright);
}
</style>
