<template>
  <Transition name="fade">
    <div v-if="isHover" class="w-12 h-12 rounded-full bg-gray-50 bg-opacity-50">
      <svg
        t="1672278313649"
        class="icon w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6986"
        width="200"
        height="200"
      >
        <path
          d="M102.425742 102.393565v819.148516l614.361387-409.574258z"
          fill="#ec4141"
          p-id="6987"
        ></path>
        <path
          d="M153.622524 102.393565v819.148516l614.361387-409.574258z"
          fill="#ec4141"
          p-id="6988"
        ></path>
        <path
          d="M259.599863 15.871003V834.507551l619.481066-405.478515z"
          fill="#ec4141"
          p-id="6989"
        ></path>
        <path
          d="M261.135767 189.428094l-1.535904 818.636549L875.497154 599.002353z"
          fill="#ec4141"
          p-id="6990"
        ></path>
        <path
          d="M204.819306 102.393565m-102.393564 0a102.393565 102.393565 0 1 0 204.787129 0 102.393565 102.393565 0 1 0-204.787129 0Z"
          fill="#ec4141"
          p-id="6991"
        ></path>
        <path
          d="M819.180694 409.574258c-56.316461 0-102.393565 46.077104-102.393565 102.393565s46.077104 100.345693 102.393565 102.393564c57.852364 2.047871 102.905532-45.053168 102.393564-102.393564-0.511968-56.316461-46.077104-102.393565-102.393564-102.393565zM204.819306 819.148517c-56.316461 0-102.393565 46.077104-102.393564 102.393564s46.077104 100.345693 102.393564 102.393565c53.756621 2.047871 100.857661-45.053168 102.393565-102.393565 1.535903-56.316461-46.077104-102.393565-102.393565-102.393564z"
          fill="#ec4141"
          p-id="6992"
        ></path>
      </svg>
    </div>
  </Transition>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isHover: {
      type: Boolean,
      default: false
    }
  },
  setup () {}
})
</script>

<style scoped lang="less">
div{
  backdrop-filter: blur(3px);
}
svg{
  margin-left: 3px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
