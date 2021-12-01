import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Design from '../views/Design.vue'
import Cart from '../views/Cart.vue'
import Admin from '../views/Admin.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
    {
	path: '/design',
	name: 'Design',
	component: Design
    },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
