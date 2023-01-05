<template>
  <div class="flex justify-center items-center mb-4">
    <BaseItem :content="follows" label="关注"></BaseItem>
    <BaseItem :content="followeds" label="粉丝"></BaseItem>
    <BaseItem :content="gender ? '♂' : '♀'" label="性别"></BaseItem>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useAppStroe } from '@/store/app'
import BaseItem from '@/components/User/BaseItem.vue'

export default defineComponent({
  components: { BaseItem },
  setup () {
    const store = useAppStroe()

    return {
      follows: computed(() =>
        JSON.stringify(store.userDeatil) === '{}'
          ? 0
          : store.userDeatil.profile.follows
      ),
      followeds: computed(() =>
        JSON.stringify(store.userDeatil) === '{}'
          ? 0
          : store.userDeatil.profile.followeds
      ),
      gender: computed(() =>
        JSON.stringify(store.userDeatil) === '{}'
          ? 0
          : store.userDeatil.profile.gender
      )
    }
  }
})
</script>
