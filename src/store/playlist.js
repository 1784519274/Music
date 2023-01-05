import { defineStore } from 'pinia'
import { getPlaylist } from '@/api'

const usePlayList = defineStore({
  id: 'playList',
  state: () => ({
    cat: '全部',
    playlists: [],
    total: 0,
    currentPage: 1
  }),
  getters: {
    getTotal () {
      return this.total
    }
  },
  actions: {
    changeCat (cat) {
      this.cat = typeof cat === 'undefined' ? '全部' : cat
      this.getPlayLists()
      this.currentPage = 1
    },
    changeCurrentPage (page) {
      this.currentPage = page
    },
    async getPlayLists (pageNum = 1) {
      const res = await getPlaylist(this.cat, pageNum)
      const num = Math.ceil(res.total / 48)
      this.total = num
      this.playlists = res.playlists
    }
  }
})

export default usePlayList
