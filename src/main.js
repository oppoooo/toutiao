import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/fonts/iconfont.css'

import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible/index.min.js'

Vue.config.productionTip = false

Vue.use(Vant)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
