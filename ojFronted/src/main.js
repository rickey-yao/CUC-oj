// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import { GOOGLE_ANALYTICS_ID } from './utils/constants'
import VueAnalytics from 'vue-analytics'

import iView from 'iview';
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false // 关闭生产模式下给出的提示

Vue.use(iView)
Vue.use(VueClipboard)
Vue.use(VueAnalytics, {
  id: GOOGLE_ANALYTICS_ID,
  router
})

Vue.prototype.$Message.config({
  duration: 2
})
Vue.prototype.$error = (s) => Vue.prototype.$Message.error(s)
Vue.prototype.$info = (s) => Vue.prototype.$Message.info(s)
Vue.prototype.$success = (s) => Vue.prototype.$Message.success(s)

// 创建一个 Vue 的根实例
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
