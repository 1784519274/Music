import { defineStore } from 'pinia'

const useNavigatorStore = defineStore({
  id: 'navigator',
  state: () => ({
    appScrollTop: true,
    appScrollState: false
  }),
  actions: {
    changeScrollTop () {
      this.appScrollTop = !this.appScrollTop
    },
    chageScrollState (state) {
      this.appScrollState = state
    }
  }
})

export default useNavigatorStore
