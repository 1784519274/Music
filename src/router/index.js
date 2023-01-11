import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/playlist',
    name: 'PlayList',
    component: () => import('@/views/PlayView.vue')
  },
  {
    path: '/playdetail',
    name: 'PlayDetail',
    redirect: {
      name: 'songs'
    },
    component: () => import('@/views/DetailView.vue'),
    children: [
      {
        path: 'songs',
        name: 'songs',
        component: () => import('@/viewRouter/PlayDetail/SongsView.vue')
      },
      {
        path: 'comment',
        name: 'comment',
        component: () => import('@/viewRouter/PlayDetail/CommentView.vue')
      },
      {
        path: 'collection',
        name: 'collection',
        component: () => import('@/viewRouter/PlayDetail/CollectionView.vue')
      },
      {
        path: 'daycomm',
        name: 'daycomm',
        component: () => import('@/viewRouter/PlayDetail/DayCommView.vue')
      }
    ]
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    component: () => import('@/views/UserView.vue')
  },
  {
    path: '/singerinfo',
    name: 'singerinfo',
    component: () => import('@/views/SignerView.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('@/views/MineView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
