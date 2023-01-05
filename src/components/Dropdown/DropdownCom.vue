<template>
  <div id="DropDown" class="relative z-20">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({

})
</script>

<style scoped lang="less">
#DropDown {
  color: #fff;
}
img {
  width: 32px;
  height: 32px;
}
</style>
