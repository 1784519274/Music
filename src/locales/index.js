import { createI18n } from 'vue-i18n'
import cnLocal from './language/cn.json'
import enLocal from './language/en.json'

export const i18n = createI18n({
  locale: 'cn',
  messages: {
    en: {
      ...enLocal
    },
    cn: {
      ...cnLocal
    }
  }
})
