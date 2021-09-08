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
    component: () => import("../pages/home"),
    children: [
      {path:'image',component:()=> import("../views/image")},
      {path:'video',component:()=> import("../views/video")},
      {path:'folder',component:()=> import("../views/folder")},
      {path:'profile',component:()=> import("../views/profile")},
      {path:'timeline',component:()=> import("../views/timeline")},
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;
