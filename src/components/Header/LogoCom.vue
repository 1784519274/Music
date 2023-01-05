<template>
  <div class="flex items-start self-stretch relative" @click="handleClick">
    <div
      class="flex flex-col relative py-4 z-10 text-white font-medium ob-drop-shadow cursor-pointer"
    >
      <span class="flex text-4xl">音乐</span>
      <span class="font-extrabold text-lg text-center uppercase">MUSIC</span>
    </div>
    <img
      id="Logo-Img"
      src="https://img-blog.csdnimg.cn/20210313122054101.png"
      alt="Logo-Img"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LogoCom',
  setup () {
    const router = useRouter()
    const handleClick = () => {
      router.push('/')
    }

    return {
      handleClick
    }
  }
})
</script>

<style scoped>
#Logo-Img {
  height: 200px;
  width: 200px;
  max-width: 200px;
  top: -60px;
  left: -60px;
  opacity: 0.05;
  @apply absolute mr-2 rounded-full;
}
</style>
