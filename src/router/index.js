import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import("../pages/login")
  },
  {
    path: '/home',
    component: () => import("../pages/home")
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;
