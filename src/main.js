import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store"
import vuetify from './plugins/vuetify'
import '@/assets/style/base.scss'
import components from "@/components/index";

Vue.config.productionTip = true

//全局注册公共组件
Vue.use(components)
//注册事件总线方法
Vue.prototype.$bus = new Vue()
//注册全局过滤器
Vue.filter('formatSize', function (value) {
  const num = Number(value)
  const size = 1024 * 1024;
  const a = num / size
  const b = a + ''
  if (b.indexOf('.') === -1) {
    //整数
    return a
  } else if (b.indexOf('.') === b.length - 2) {
    return a
  } else {
    const c = a.toFixed(3)
    const d = c + ''
    const e = d[d.length - 1]
    if (Number(e) > 4) {
      return Number(Number(c) + 0.01).toFixed(2)
    } else {
      return Number(c).toFixed(2)
    }
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
