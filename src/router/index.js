import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import MyOrder from '@/views/myorder'
import Pay from '@/views/pay'
import ProDetail from '@/views/prodetail'
import Search from '@/views/search'
import SearchList from '@/views/search/list'
import Home from '@/views/layout/home'
import CateGory from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: Home
      },
      {
        path: '/category',
        component: CateGory
      },
      {
        path: '/user',
        component: User
      },
      {
        path: '/cart',
        component: Cart
      }
    ]
  },
  {
    path: '/myorder',
    component: MyOrder
  },
  {
    path: '/pay',
    component: Pay
  },
  {
    path: '/prodetail/:id',
    component: ProDetail
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/searchlist',
    component: SearchList
  }
]

const router = new VueRouter({
  routes
})

const authUrls = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
