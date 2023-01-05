<template>
  <nav class="flex-1 hidden lg:flex">
    <ul class="flex flex-row list-none px-6 text-white">
      <li
        class="not-italic font-medium text-xl h-full relative flex flex-col items-center justify-center cursor-pointer text-center py-4 px-10"
        v-for="(item, index) in nav"
        :key="index"
      >
        <div
          class="nav-link text-xl block px-3 py-1 rounded-md relative uppercase cursor-pointer hover:bg-gray-700"
          @click="handleClick(item.router)"
        >
          <span class="relative z-50">{{ $t(item.i18n) }}</span>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { } from 'vue'
import { useRouter } from 'vue-router'
import { nav } from '@/Data'

const router = useRouter()
const handleClick = (route) => {
  router.push(route)
}

</script>

<style scoped></style>
