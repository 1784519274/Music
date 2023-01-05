<template>
  <div id="Paginator" class="flex justify-center py-10" v-if="total !== 0">
    <ul class="flex">
      <li
        class="flex items-center"
        v-show="currentPage !== 1"
        @click="handleClick(currentPage - 1)"
      >
        <el-icon><Back /></el-icon><span>&nbsp;新的</span>
      </li>
      <li v-show="currentPage !== 1" @click="handleClick(1)">
        <span>第一页</span>
      </li>
      <li
        v-for="item in pageSize"
        :key="item"
        :style="currentPage === item + beginNum ? activeStyle : ''"
        @click="handleClick(item + beginNum)"
      >
        <span>{{ item + beginNum }}</span>
      </li>
      <li class="flex items-center" v-if="total > 10">
        <el-icon v-show="beginNum < total - 10"><MoreFilled /></el-icon>
        <span
          v-show="beginNum >= total - 10"
          @click="handleClick(total - 2)"
          :style="currentPage === total - 2 ? activeStyle : ''"
          >{{ total - 2 }}</span
        >
      </li>
      <li
        v-show="total > 10"
        v-for="item in 2"
        :key="item"
        :style="currentPage === total + (item - 2) ? activeStyle : ''"
        @click="handleClick(total + (item - 2))"
      >
        {{ total + (item - 2) }}
      </li>
      <li v-if="currentPage !== total" @click="handleClick(total)">
        <span>最后一页</span>
      </li>
      <li
        class="flex items-center"
        @click="handleClick(currentPage + 1)"
        v-if="currentPage !== total"
      >
        <span>以往&nbsp;</span><el-icon><Right /></el-icon>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  getCurrentInstance
} from 'vue'
import usePlayList from '@/store/playlist'
import { backTop } from '@/util'

export default defineComponent({
  props: {
    total: {
      type: [String, Number]
    },
    top: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    const { ctx } = getCurrentInstance()
    const store = usePlayList()
    const currentPage = computed(() => store.currentPage)
    const pageSize = props.total > 10 ? 7 : props.total

    const handleClick = (pageNum) => {
      store.changeCurrentPage(pageNum)
      ctx.$emit('pageClick', pageNum)
      backTop(timer, props.top)
    }

    const timer = null

    const activeStyle = 'color: var(--text-accent);'

    return {
      currentPage,
      pageSize,
      activeStyle,
      beginNum: computed(() => {
        if (props.total < 11) {
          return 0
        }
        if (currentPage.value > 4) {
          return currentPage.value - 4 > props.total - 10
            ? props.total - 10
            : currentPage.value - 4
        }
        return 0
      }),
      handleClick
    }
  }
})
</script>

<style scoped lang="less">
ul {
  li {
    margin: 0 10px;
    min-width: 24px;
    cursor: pointer;
  }
}
</style>
