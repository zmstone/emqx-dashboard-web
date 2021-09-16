import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import store from '@/stores'
import { toLogin } from '../common/utils'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const { fullPath, matched } = to
  const { authRequired = false } = matched[0]?.meta || to.meta
  // const { hideLeftBar: hideLeftBarForm = false } = from?.matched[0]?.meta || from.meta
  const info = store.state.user

  if (authRequired && !info.token) {
    toLogin(fullPath)
  }
  next()
})

export default router
