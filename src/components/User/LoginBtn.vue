<template>
  <div id="Login" class="flex">
    <div id="Item" class="mx-4 flex" @click="handleClick">
      <svg
        t="1672285324049"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4768"
        width="200"
        height="200"
      >
        <path
          d="M96 448h832a32 32 0 0 0 22.6-54.6l-224-224a32 32 0 0 0-45.2 45.2L850.7 384H96a32 32 0 0 0 0 64zM928 576H96a32 32 0 0 0-22.6 54.6l224 224a31.9 31.9 0 0 0 45.2 0 31.9 31.9 0 0 0 0-45.2L173.3 640H928a32 32 0 1 0 0-64z"
          :fill="theme === 'theme-dark' ? '#bcbcbc' : '#333333'"
          p-id="4769"
        ></path></svg
      >切换登录
    </div>
    <div id="Item" class="mx-4 flex">
      <svg
        t="1672285190184"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3554"
        width="200"
        height="200"
      >
        <path
          d="M704.3 129.9v78.7c78 64.5 127.7 161.8 127.7 270.7 0 193.6-157.5 351.2-351.2 351.2S129.7 672.9 129.7 479.3c0-108.8 49.8-206.2 127.7-270.7v-78.7C142.3 203.7 65.9 332.4 65.9 479.3c0 229.2 185.8 415 415 415s415-185.8 415-415c0-146.9-76.5-275.6-191.6-349.4z"
          :fill="theme === 'theme-dark' ? '#bcbcbc' : '#333333'"
          p-id="3555"
        ></path>
        <path
          d="M448.9 64.3h63.8v446.9h-63.8z"
          :fill="theme === 'theme-dark' ? '#bcbcbc' : '#333333'"
          p-id="3556"
        ></path></svg
      >退出登录
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStroe } from '@/store/app'

export default defineComponent({
  setup () {
    const router = useRouter()
    const store = useAppStroe()
    const handleClick = () => {
      router.push('/login')
    }
    return {
      theme: computed(() => store.theme),
      handleClick
    }
  }
})
</script>

<style scoped lang="less">
#Login {
  #Item {
    color: var(--text-normal);
    padding: 10px;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0px 2px 5px rgba(255, 255, 255, 0.5);
    border-radius: 20px;
  }
  #Item:hover {
    background: linear-gradient(
      130deg,
      rgb(36, 198, 220),
      rgb(84, 51, 255) 41.07%,
      rgb(255, 0, 153) 76.05%
    );
    box-shadow: 0px 2px 5px rgb(255, 0, 153);
  }
}
div {
  svg {
    width: 20px;
    height: 20px;
    margin: 0 5px;
  }
}
</style>
