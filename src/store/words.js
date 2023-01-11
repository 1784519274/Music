import { defineStore } from 'pinia'

const useWordsStore = defineStore({
  id: 'words',
  state: () => ({
    open: false
  }),
  actions: {
    changeOpen () {
      this.open = !this.open
    }
  }
})
export default useWordsStore
