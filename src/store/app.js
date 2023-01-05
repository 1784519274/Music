import { defineStore } from 'pinia'
import { i18n } from '@/locales'

export const useAppStroe = defineStore({
  id: 'app',
  state: () => ({
    activeDropdown: false,
    language: 'cn',
    theme: 'theme-dark',
    mu_cookie: localStorage.getItem('mu_cookie')
      ? localStorage.getItem('mu_cookie')
      : null,
    userDeatil: {},
    levelInfo: {}
  }),
  getters: {
    getDropdownStatus () {
      return this.activeDropdown
    }
  },
  actions: {
    changeDropdown () {
      this.activeDropdown = !this.activeDropdown
    },
    changeLanguage (name) {
      this.language = name
      i18n.global.locale = name
    },
    changeTheme (name) {
      this.theme = name
    },
    changeUserDetail (detail) {
      this.userDeatil = detail
    },
    changeLevelInfo (info) {
      this.levelInfo = info
    }
  }
})
