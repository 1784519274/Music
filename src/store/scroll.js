import { defineStore } from 'pinia'

const useScrollSrore = defineStore('scroll', {
  state: () => {
    return {
      scrollY: 0
    }
  },
  actions: {
    changeScrollY (y) {
      this.scrollY = y
    }
  }
})

export default useScrollSrore
