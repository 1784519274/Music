import { defineStore } from 'pinia'
import { getSongUrl, getPlaylistSongsAll } from '@/api'
import { formatPlayListId } from '@/util'

const usePlayerStore = defineStore({
  id: 'player',
  state: () => ({
    // 正在播放的音乐id
    playingId: 0,
    // 正在播放音乐的url
    songUrl: '',
    // 正在播放的音乐信息
    songInfo: {},
    // 是否在播放
    isPlay: true,
    // 是否打开播放列表
    openPlayList: false,
    // 音乐id字符串，多个id
    ids: '',
    // 播放列表
    songList: [],
    // 当前歌单id
    songListId: ''
  }),
  actions: {
    changeSongList (list) {
      this.songList = list
    },
    changePlayingId (id) {
      this.playingId = id
    },
    changeSongUrl (url) {
      this.songUrl = url
    },
    chagneSongInfo (info) {
      this.songInfo = info
    },
    changeIsPlay (flag) {
      this.isPlay = flag
    },
    changeOpenPlayList () {
      this.openPlayList = !this.openPlayList
    },
    changeSonglistId (id) {
      this.changeIds(id)
      this.songListId = id
    },
    changeIds (id, flag = false) {
      if (id !== this.songListId) {
        this.songListId = id
        getPlaylistSongsAll(id).then((res) => {
          this.ids = formatPlayListId(res.songs)
        })
      }
      if (flag) return this.randomSong()
    },
    lastSong () {
      const idArr = this.ids.split(',')
      const oldIndex = idArr.indexOf(String(this.playingId))
      const newIndex = oldIndex - 1 < 0 ? idArr.length - 1 : oldIndex - 1
      const id = idArr[newIndex]
      this.updataInfoIn(id, newIndex)
    },
    nextSong () {
      const idArr = this.ids.split(',')
      const oldIndex = idArr.indexOf(String(this.playingId))
      const newIndex = oldIndex + 1 > idArr.length - 1 ? 0 : oldIndex + 1
      const id = idArr[newIndex]
      this.updataInfoIn(id, newIndex)
    },
    randomSong () {
      const idArr = this.ids.split(',')
      const oldIndex = idArr.indexOf(String(this.playingId))
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * (idArr.length - 1))
      } while (newIndex === oldIndex)
      const id = idArr[newIndex]
      this.updataInfoIn(id, newIndex)
    },
    updataInfoIn (id, index) {
      this.playingId = Number(id)
      this.songInfo = this.songList[index]
      getSongUrl(id).then((res) => {
        this.songUrl = res.data[0].url
      })
    }
  }
})

export default usePlayerStore
