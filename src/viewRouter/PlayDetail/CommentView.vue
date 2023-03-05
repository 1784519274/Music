<template>
  <div>
    <div
      class="flex justify-center items-center text-1xl"
      v-show="comments.length === 0 && hotComments.length === 0"
    >
      <el-icon class="is-loading">
        <Loading />
      </el-icon>
      <span>&nbsp;&nbsp;载入中...</span>
    </div>
    <div>
      <div v-if="currentPage === 1 && hotComments.length !== 0">
        <b class="title">精彩评论</b>
        <div
          class="flex my-3 w-full"
          v-for="(item, index) in hotComments"
          :key="index"
        >
          <div
            class="flex justify-center pt-1"
            style="min-width: 60px; height: 60px"
          >
            <img
              :src="item.user.avatarUrl"
              alt
              style="width: 40px; height: 40px"
              class="rounded-full"
            />
          </div>
          <div class="w-full">
            <div>
              <span class="nickname" @click="handleUser(item.user.userId)"
                >{{ item.user.nickname }}：</span
              >
              <span>{{ item.content }}</span>
            </div>
            <div
              class="beReplied bebox py-1 px-2 w-full my-2"
              v-if="item.beReplied.length > 0"
            >
              <span
                class="nickname"
                @click="handleUser(item.beReplied.user.userId)"
                >{{ item.beReplied[0].user.nickname }}：</span
              >
              <span>{{ item.beReplied[0].content }}</span>
            </div>
            <div>
              <span>{{ item.timeStr }}</span>
            </div>
          </div>
        </div>
      </div>
      <b class="title">全部评论({{ total }})</b>
      <div
        class="flex my-3 w-full"
        v-for="(item, index) in comments"
        :key="index"
      >
        <!-- 头像 -->
        <div
          class="flex justify-center pt-1"
          style="min-width: 60px; height: 60px"
        >
          <img
            :src="item.user.avatarUrl"
            alt
            style="width: 40px; height: 40px"
            class="rounded-full"
          />
        </div>
        <!-- 评论 -->
        <div class="w-full">
          <div>
            <span class="nickname" @click="handleUser(item.user.userId)"
              >{{ item.user.nickname }}：</span
            >
            <span>{{ item.content }}</span>
          </div>
          <div
            class="beReplied bebox py-1 px-2 w-full my-2"
            v-if="item.beReplied.length > 0"
          >
            <span
              class="nickname"
              @click="handleUser(item.beReplied[0].user.userId)"
              >{{ item.beReplied[0].user.nickname }}：</span
            >
            <span>{{ item.beReplied[0].content }}</span>
          </div>
          <div>
            <span>{{ item.timeStr }}</span>
          </div>
        </div>
      </div>
      <Paginator
        v-if="pageTotal !== 0"
        :total="pageTotal"
        :top="660"
        @pageClick="handlePageClick"
      ></Paginator>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCommentPlaylist } from '@/api'
import Paginator from '@/components/Paginator/PaginatorCom.vue'

const { currentRoute } = useRouter()
const comments = ref([])
const hotComments = ref([])
const total = ref(0)
const pageTotal = ref(0)
const id = ref(0)
const init = () => {
  id.value = currentRoute.value.query.id
  getCommentPlaylist(id.value).then((res) => {
    comments.value = res.comments
    hotComments.value = res.hotComments
    total.value = res.total
    pageTotal.value = Math.floor(res.total / 50)
  })
}

onMounted(init)

const handleUser = (id) => {
  console.log(id)
}

const currentPage = ref(1)
const handlePageClick = (pageNum) => {
  currentPage.value = pageNum
  getCommentPlaylist(id, pageNum).then((res) => {
    comments.value = res.comments
  })
}
</script>

<style scoped lang="less">
b {
  display: inline-block;
  width: 100%;
}
span {
  font-size: 10px;
}

.beReplied {
  border-radius: 5px;
}

.nickname {
  color: #74b9ff;
  cursor: pointer;
}

.title {
  color: var(--text-accent);
}

.bebox {
  background-color: rgba(178, 190, 195, 0.4);
}
</style>
