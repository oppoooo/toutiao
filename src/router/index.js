import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    // 懒加载页面  需要那个页面就去请求那个页面
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
