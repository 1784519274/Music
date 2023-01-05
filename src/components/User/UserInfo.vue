<template>
  <div class="relative">
    <div
      id="UserInfo"
      class="rounded-2xl relative flex justify-center z-10"
      @mouseover="handleMouse(true)"
      @mouseleave="handleMouse(false)"
    >
      <div id="UserInfoBg" class="bottom-0 absolute pt-4 px-2 pb-2 w-full z-10">
        <div id="UserinfoContent" class="w-full h-full rounded-xl relative">
          <div
            id="Content"
            class="flex flex-col items-center cursor-pointer absolute -top-20 w-full"
            @click="handleClick"
          >
            <img
              class="w-30 h-30"
              v-if="!avatarUrl"
              src="https://img-blog.csdnimg.cn/20210313122054101.png"
              alt=""
            />
            <img v-else :src="avatarUrl" alt class="rounded-full w-44 h-44" />
            <h1 class=" text-5xl truncate w-full px-6 text-center" style="height:60px !important">
              {{ nickname ? nickname : "昵称" }}
            </h1>
            <span
              class="h-1 w-40 rounded-full mt-2 mb-4"
              style="
                background: linear-gradient(
                  130deg,
                  rgb(36, 198, 220),
                  rgb(84, 51, 255) 41.07%,
                  rgb(255, 0, 153) 76.05%
                );
              "
            ></span>
            <LvInfo></LvInfo>
            <BaseInfo></BaseInfo>
            <TasteInfo></TasteInfo>
            <LoginBtn></LoginBtn>
          </div>
        </div>
      </div>
    </div>
    <Tag :isHover="isHover" text="用户"></Tag>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAccountInfo, getUserDetail } from '@/api/index'
import { useAppStroe } from '@/store/app'
import LvInfo from '@/components/User/LvInfo.vue'
import BaseInfo from '@/components/User/BaseInfo.vue'
import TasteInfo from '@/components/User/TasteInfo.vue'
import LoginBtn from '@/components/User/LoginBtn.vue'
import Tag from '@/components/Tag/TagCom.vue'

const router = useRouter()
const store = useAppStroe()
const avatarUrl = ref()
const nickname = ref()
const handleClick = () => {
  if (localStorage.getItem('mu_cookie') === null) router.push('/login')
}

// https://img-blog.csdnimg.cn/20210313122054101.png
const init = async () => {
  const res = await getAccountInfo()
  const userDetail = await getUserDetail(res.account.id)
  store.changeUserDetail(userDetail)
  avatarUrl.value = userDetail.profile.avatarUrl
  nickname.value = userDetail.profile.nickname
}

onMounted(init)

const isHover = ref(false)

const handleMouse = (status) => {
  isHover.value = status
}

</script>

<style scoped lang="less">
#UserInfo {
  min-width: 380px;
  min-height: 670px;
  background: linear-gradient(
    130deg,
    rgb(36, 198, 220),
    rgb(84, 51, 255) 41.07%,
    rgb(255, 0, 153) 76.05%
  );
  padding: 20px 5px 5px;

  #UserInfoBg {
    height: 90%;

    #UserinfoContent {
      background-color: var(--background-primary-op);
    }
  }
}
</style>
