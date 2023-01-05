<template>
  <div
    id="Login"
    class="flex flex-col relative justify-center items-center rounded-3xl m-auto duration-300 mt-12 cursor-pointer overflow-auto"
  >
    <img class="bg-cover w-full z-10" src="@/assets/photo.jpg" alt />
    <div id="LoginBg" class="w-full h-full"></div>
    <div
      id="LoginContent"
      class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white z-20"
    >
      <el-skeleton
        class="absolute top-0 left-0 flex flex-col w-full h-full justify-center items-center text-white"
        animated
        :loading="qrBase64 === ''"
      >
        <template #template>
          <el-skeleton-item variant="text" class="h-10" style="width: 220px" />
          <el-skeleton-item
            variant="image"
            style="width: 200px; height: 200px"
            class="my-8"
          />
          <el-skeleton-item variant="text" class="h-7" style="width: 226px" />
        </template>
        <template #default>
          <span
            class="text-center text-4xl font-bold"
            v-if="
              qrBase64 &&
              qrBase64 !== '' &&
              qrcodeStatus &&
              qrcodeStatus === 801
            "
            >登录网易云账号</span
          >
          <span
            class="text-center text-4xl font-bold"
            v-if="qrcodeStatus === 802"
            >扫描成功</span
          >
          <div class="my-8 rounded-2xl" style="width: 200px; height: 200px">
            <img
              v-if="qrcodeStatus === 801"
              :src="qrBase64"
              alt="login"
              class="rounded-2xl"
            />
            <Transition name="fade">
              <img
                v-if="qrcodeStatus && qrcodeStatus === 802"
                src="https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9765284460/1b1d/9f46/2fa3/2d5d07bb5fcf8c24c1ad788c923ef313.png"
                alt="login"
                class="rounded-2xl"
                key="1"
              />
            </Transition>
          </div>
          <span
            class="text-center text-xl"
            v-if="
              qrBase64 &&
              qrBase64 !== '' &&
              qrcodeStatus &&
              qrcodeStatus === 801
            "
            >打开网易云音乐APP扫码登录</span
          >
          <span
            class="text-center text-xl"
            v-if="qrcodeStatus && qrcodeStatus === 802"
            >请在手机上确认登录</span
          >
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { getLoginKey, getLoginQR, getLoginCheck } from '@/api/index'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const qrBase64 = ref('')
    const router = useRouter()
    const init = async () => {
      const firstRes = await getLoginKey()
      const key = await firstRes.data.unikey
      const secondRes = await getLoginQR(key)
      qrBase64.value = secondRes.data.qrimg
      await polling(key)
    }

    // const TTL = 5 * 1000 * 1000
    const qrcodeStatus = ref(0)
    const polling = async (key) => {
      if (router.currentRoute._rawValue.fullPath !== '/login') return
      const res = await getLoginCheck(key)
      if (res.code === 800) {
        // 二维码失效
        qrcodeStatus.value = 800
      } else if (res.code === 801) {
        // 等待扫码
        qrcodeStatus.value = 801
        await new Promise((resolve) => setTimeout(resolve, 3000))
        return await polling(key)
      } else if (res.code === 802) {
        // 待确认
        qrcodeStatus.value = 802
        await new Promise((resolve) => setTimeout(resolve, 3000))
        return await polling(key)
      } else if (res.code === 803) {
        const cookie = res.cookie
        localStorage.removeItem('mu_cookie')
        localStorage.setItem('mu_cookie', cookie)
        router.push('/')
        clearTimeout()
      }
    }

    onMounted(init)

    return {
      qrBase64,
      qrcodeStatus
    }
  }
})
</script>

<style scoped lang="less">
#Login {
  height: 480px;
  width: 360px;
  overflow: hidden;
  // box-shadow: 0px 0px 10px var(--background-secondary);
  box-shadow: 0px 0px 10px #212121;

  #LoginShadow {
    // background-color: var(--background-secondary);
    background-color: #212121;
    // box-shadow: 0px -100px 300px var(--background-secondary);
    box-shadow: 0px -100px 300px #212121;
  }

  #LoginBg {
    background-color: #212121;
  }

  #LoginContent {
    img {
      width: 200px;
      height: 200px;
    }
  }
}

#Login:hover {
  scale: 1.02;
}

// .qrcode-scanning-enter-active,
// .qrcode-scanning-leave-active {
//   transition: 5s;
//   opacity: 1;
// }
// .qrcode-scanning-enter,
// .qrcode-scanning-leave-to {
//   opacity: 0;
// }

/* 下面我们会解释这些 class 是做什么的 */
.fade-enter-active,
.fade-leave-active {
  transition: 1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 1;
  transform: translateX(-30px);
}

.el-skeleton.is-animated .el-skeleton__item {
  border-radius: 10px;
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
