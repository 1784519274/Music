<template>
  <div
    class="flex justify-center items-center text-1xl"
    v-show="subscribers.length === 0"
  >
    <el-icon class="is-loading">
      <Loading />
    </el-icon>
    <span>&nbsp;&nbsp;载入中...</span>
  </div>
  <div id="Collection">
    <ul>
      <li
        class="flex items-center"
        v-for="item in subscribers"
        :key="item.userId"
        style="width: 33%"
      >
        <img
          :src="item.avatarUrl"
          style="height: 100px; width: 100px"
          class="rounded-full cursor-pointer"
          @click="handleUser(item.userId)"
        />
        <div class="flex flex-col justify-around h-full cursor-pointer">
          <span @click="handleUser(item.userId)">{{ item.nickname }}</span>
          <span>{{ item.signature }}</span>
        </div>
      </li>
    </ul>
    <Paginator
      v-if="totalPage !== 0"
      :total="totalPage"
      @pageClick="handlePageClick"
    ></Paginator>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getPlaylistSubscribers } from '@/api'
import Paginator from '@/components/Paginator/PaginatorCom.vue'

const router = useRouter()
const { currentRoute } = useRouter()
const subscribers = ref([])
const totalPage = ref(0)
const id = ref(0)
const init = () => {
  id.value = currentRoute.value.query.id
  getData(1)
}

const getData = (pageNum) => {
  getPlaylistSubscribers(id.value, pageNum).then((res) => {
    subscribers.value = res.subscribers
    totalPage.value = Math.ceil(res.total / 99)
  })
}

onMounted(init)

const handlePageClick = (num) => {
  console.log(num)
  getData(num)
}

const handleUser = (userId) => {
  router.push({ name: 'userinfo' })
  console.log(userId)
}
</script>

<style scoped lang="less">
#Collection {
  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      margin-bottom: 20px;

      img {
        margin-right: 10px;
      }

      div {
        overflow: hidden;
        padding: 10px 0;

        span:first-child {
        }
        span:last-child {
          font-size: 10px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
