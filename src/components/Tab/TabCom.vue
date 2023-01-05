<template>
  <div class="relative">
    <div id="Tab" class="flex px-4 py-3 rounded-2xl justify-between mb-4">
      <ul id="All" class="flex">
        <li
          class="rounded-xl cursor-pointer"
          :style="cat === '全部' ? activeStyle : activeStyleNot"
          @click="handleClick('全部')"
        >
          全部
        </li>
        <li
          class="rounded-xl cursor-pointer"
          @click="isOpen = !isOpen"
          :style="isOpen ? activeStyle : ''"
        >
          歌单分类
        </li>
      </ul>
      <ul id="Host" class="flex items-center">
        <li
          class="rounded-lg cursor-pointer"
          v-for="item in hotList.values"
          :key="item.id"
          :style="cat === item.name ? activeStyle : activeStyleNot"
          @click="handleClick(item.name)"
        >
          {{ item.name }}
        </li>
        <li
          class="rounded-lg cursor-pointer"
          :style="!hotOther ? activeStyle : activeStyleNot"
        >
          其他
        </li>
      </ul>
    </div>
    <SongListClass
      :isOpen="isOpen"
      @clickClass="(name) => handleClick(name)"
    ></SongListClass>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import usePlayList from '@/store/playlist'
import { getPlaylistHot } from '@/api'
import SongListClass from '@/components/Tab/SongListClass.vue'
import { backTop } from '@/util'

export default defineComponent({
  components: { SongListClass },
  setup () {
    const store = usePlayList()
    const cat = computed(() => store.cat)

    const hotList = reactive([])

    const init = async () => {
      const res = await getPlaylistHot()
      hotList.values = res.tags
      isOther(cat)
    }
    onMounted(init)

    const hotOther = ref(false)
    const isOther = () => {
      hotOther.value = false
      for (const iterator of hotList.values) {
        if (iterator.name === cat.value || cat.value === '全部') {
          hotOther.value = true
          return
        }
      }
    }

    const timer = null
    const handleClick = (name) => {
      store.changeCat(name)
      isOpen.value = false
      backTop(timer)
      isOther(name)
    }
    const activeStyle =
      'background: linear-gradient(130deg, rgb(36, 198, 220), rgb(84, 51, 255) 41.07%, rgb(255, 0, 153) 76.05%);box-shadow: 0px 2px 5px rgb(255, 0, 153);color: aliceblue;'
    const activeStyleNot =
      'background-color: var(--background-primary);box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);'

    const isOpen = ref(false)

    return {
      hotList,
      activeStyle,
      handleClick,
      activeStyleNot,
      isOpen,
      cat,
      hotOther
    }
  }
})
</script>

<style scoped lang="less">
#Tab {
  background: var(--background-secondary);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
}
#All {
  li {
    padding: 8px 22px;
    margin: 0 10px;
  }
}
#Host {
  li {
    padding: 4px 14px;
    margin: 0 10px;
  }
}

li:hover {
  background: linear-gradient(
    130deg,
    rgb(36, 198, 220),
    rgb(84, 51, 255) 41.07%,
    rgb(255, 0, 153) 76.05%
  ) !important;
  box-shadow: 0px 2px 5px rgb(255, 0, 153) !important;
  color: aliceblue;
}
</style>
