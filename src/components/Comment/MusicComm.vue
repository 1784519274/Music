<template>
  <div style="">
    <b class="" style="color: var(--text-accent);">全部评论({{commentsData.length}})</b>
    <div class="flex" v-for="item in commentsData" :key="item.commentId">
      <!-- 头像 -->
      <div
        class="flex justify-center pt-1"
        style="min-width: 60px; height: 60px"
      >
        <img
          :src="item.user.avatarUrl"
          alt=""
          class="pt-1 rounded-full"
          style="windth: 40px; height: 40px; margin: 0 10px"
        />
      </div>
      <!-- 评论 -->
      <div class="pt-1" style="font-size: 10px">
        <!-- 内容 -->
        <div>
          <span class="nickname" style="color: #74b9ff;cursor: pointer;">{{ item.user.nickname }}</span
          >：
          <span>{{ item.content }}</span>
        </div>
        <!-- 时间 -->
        <span style="color: #74b9ff">{{ item.timeStr }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps, ref } from 'vue-demi'
import { getCommentMusic } from '@/api'

const props = defineProps({
  id: {
    type: [String, Number]
  }
})

const commentsData = ref([])

const init = async () => {
  const res = await getCommentMusic(props.id)
  commentsData.value = res.comments
  console.log(res)
}

onMounted(init)
</script>
