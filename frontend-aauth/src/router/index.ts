import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import LoginComponent from "@/components/Login.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'login',
    component: LoginComponent
  },
]

const router = new VueRouter({
  routes
})

export default router
