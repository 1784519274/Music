import { defineStore } from 'pinia'
import { getSongUrl, getPlaylistSongsAll } from '@/api'
import { formatPlayListId } from '@/util'

const usePlayerStore = defineStore({
  id: 'player',
  state: () => ({
    // 正在播放的音乐id
    playingId:
      JSON.parse(JSON.stringify(localStorage.getItem('player.playingId'))) ?? 0,
    // 正在播放音乐的url
    songUrl:
      JSON.parse(JSON.stringify(localStorage.getItem('player.songUrl'))) ?? '',
    // 正在播放的音乐信息
    songInfo:
      JSON.parse(JSON.stringify(localStorage.getItem('player.songInfo'))) ?? {},
    // 是否在播放
    isPlay:
      JSON.parse(JSON.stringify(localStorage.getItem('player.isPlay'))) ?? true,
    // 是否打开播放列表
    openPlayList:
      JSON.parse(JSON.stringify(localStorage.getItem('player.openPlayList'))) ??
      false,
    // 音乐id字符串，多个id
    ids: JSON.parse(JSON.stringify(localStorage.getItem('player.ids'))) ?? '',
    // 播放列表
    songList:
      JSON.parse(JSON.stringify(localStorage.getItem('player.songList'))) ?? [],
    // 当前歌单id
    songListId:
      JSON.parse(JSON.stringify(localStorage.getItem('player.songListId'))) ??
      '',
    currentPlayTime: JSON.parse(JSON.stringify(localStorage.getItem('player.currentPlayTime'))) ??
      0
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
    changeCurrentPlayTime (time) {
      this.currentPlayTime = time
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
  },
  persist: true
})

export default usePlayerStore
