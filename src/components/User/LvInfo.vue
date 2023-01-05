<template>
  <div id="Lv" class="w-full mb-4">
    <div
      id="LvText"
      class="text-2xl px-4 flex justify-center items-center mb-4"
    >
      当前等级：<span
        ><i id="LvTextIcon"></i
        ><i class="text-red-600 font-semibold text-3xl">{{ level }}</i></span
      >
    </div>
    <div id="LvBar">
      <div id="LvDivnum">
        <ul class="flex">
          <li
            v-for="index in 11"
            :key="index - 1"
            :style="level === index - 1 ? 'color: red' : ''"
          >
            {{ index - 1 }}
          </li>
        </ul>
      </div>
      <div id="LvDivison" class="">
        <span v-for="index in 11" :key="index"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useAppStroe } from '@/store/app'

export default defineComponent({
  setup () {
    const store = useAppStroe()

    return {
      level: computed(() =>
        JSON.stringify(store.userDeatil) === '{}' ? 0 : store.userDeatil.level
      )
    }
  }
})
</script>

<style scoped lang="less">
#Lv {
  #LvText {
    height: 26px;
    line-height: 26px;
    span {
      padding-left: 36px;
      position: relative;
      #LvTextIcon {
        width: 30px;
        height: 26px;
        background-image: url("@/assets/mylevel.png");
        background-repeat: no-repeat;
        background-position: 0 0;
        position: absolute;
        top: 7px;
        left: 0;
        scale: 1.2;
      }
    }
  }

  #LvBar {
    position: relative;

    #LvDivnum {
      width: 98%;
      margin: 0 auto;
      padding-bottom: 10px;
      ul {
        display: flex;
        height: 10px;
        justify-content: space-between;
      }
    }

    #LvDivison {
      width: 95%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      background-color: var(--text-normal);
      border-radius: 5px;
      height: 10px;

      span {
        float: left;
        display: inline;
        width: 1px;
        background: #fff;
        height: 10px;
      }

      span:nth-child(1),
      span:last-child {
        background: transparent;
      }
    }
  }
}
</style>
