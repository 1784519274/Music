<template>
  <div class="relative">
    <span id="Title" class="text-7xl text-white mb-8 inline-block"
      >歌单详情</span
    >
    <Detail :res="result"></Detail>
    <div class="mt-16 mb-8">
      <ul class="flex text-lg">
        <li
          class="mr-8 cursor-pointer flex flex-col"
          @click="handleRouter(item.router)"
          v-for="(item, index) in btnList"
          :key="index"
        >
          <span
            class="mb-2"
            :style="activeName === item.router ? 'font-size:24px' : ''"
            style="transition: 100ms"
            >{{ item.name }}</span
          >
          <span
            v-if="activeName === item.router"
            class="h-1 w-full rounded-full"
            style="
              background: linear-gradient(
                130deg,
                rgb(36, 198, 220),
                rgb(84, 51, 255) 41.07%,
                rgb(255, 0, 153) 76.05%
              );
            "
          ></span>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getPlayDetail } from '@/api'
import Detail from '@/components/Detail/DetailSongList.vue'
import { btnList } from '@/Data'

const { currentRoute } = useRouter()
const router = useRouter()

const result = ref({})
const activeName = ref('')
const init = async () => {
  activeName.value = currentRoute.value.name
  const res = await getPlayDetail(currentRoute.value.query.id)
  result.value = { code: 0 }
  await new Promise((resolve) => setTimeout(resolve, 300))
  result.value = res
}

onMounted(init)

const handleRouter = (name) => {
  activeName.value = name
  router.push({
    name,
    query: {
      id: currentRoute.value.query.id
    }
  })
}
</script>

<style scoped lang="less">
#Title {
  text-shadow: 0 2px 2px rgb(0 0 0 / 50%);
}
</style>
