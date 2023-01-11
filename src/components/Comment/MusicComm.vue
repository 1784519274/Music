<template>
  <div>
    <div>全部评论</div>
    <div class="flex" v-for="item in commentsData" :key="item.commentId">
      <div
        class="flex justify-center pt-1"
        style="min-width: 60px; height: 60px"
      >
        <img
          src="../../assets/logotheme.png"
          alt=""
          class="pt-1"
          style="windth: 40px; height: 40px; margin: 0 10px"
        />
      </div>

      <div>
        <div>
          <span class="" style="color: red">{{ item.user.nickname }}</span
          >：
          <span>{{ item.content }}</span>
        </div>
        <span style="color: red">{{ item.timeStr }}</span>
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

const commentsData = ref({})

const init = async () => {
  const res = await getCommentMusic(props.id)
  commentsData.value = res.comments
  console.log(res)
}

onMounted(init)
</script>
