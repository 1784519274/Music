<template>
  <div class="relative">
    <el-skeleton style="justify-content: center;align-items: center;display:flex;flex-direction: column;" :loading="loading" animated>
      <template #template>
        <el-skeleton-item
          variant="image"
          :style="`width: ${size}px; height: ${size}px`"
          class="mt-10 mx-1"
        />
      </template>
      <template #default>
        <div id="Song" class="mt-10 mx-1 mb-6">
          <div
            id="Img"
            class="relative cursor-pointer duration-300 z-10"
            @mouseover="
              isHover = true;
            "
            @mouseleave="isHover = false"
            @click="handleClick"
          >
            <img
              id="SongListImg"
              class="rounded-2xl w-full h-full"
              :src="picUrl"
              alt
            />
            <PlayMusic
              class="absolute bottom-4 right-4"
              :isHover="isHover"
            ></PlayMusic>
          </div>
          <span id="SongName" class="cursor-pointer block mt-2">{{
            name
          }}</span>
        </div>
        <Tag :isHover="isHover" text="推荐"></Tag>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import PlayMusic from '@/components/Play/PlayMusic.vue'
import Tag from '@/components/Tag/TagCom.vue'

export default defineComponent({
  props: {
    id: {
      type: [String, Number],
      default: 0
    },
    name: {
      type: String,
      default: '加载中...'
    },
    picUrl: {
      type: String
    },
    size: {
      type: [String, Number],
      default: 340
    }
  },
  components: { PlayMusic, Tag },
  setup (props) {
    const router = useRouter()
    const isHover = ref(false)

    const loading = ref(true)

    const ready = () => {
      const xiu = new Image()
      xiu.src = props.picUrl
      xiu.onload = async () => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        loading.value = false
      }
    }

    onMounted(ready)

    const handleClick = () => {
      router.push({
        name: 'PlayDetail',
        query: {
          id: props.id
        }
      })
    }

    return {
      isHover,
      loading,
      handleClick
    }
  }
})
</script>

<style scoped>
#SongName {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
#Song:hover #Img {
  scale: 1.02;
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
