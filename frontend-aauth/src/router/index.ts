import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import LoginComponent from "@/components/Login.vue";
import RegisterComponent from "@/components/Register.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginComponent
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterComponent
  }
]

const router = new VueRouter({
  routes
})

export default router
