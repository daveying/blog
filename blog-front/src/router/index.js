import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AllArticals from '@/components/AllArticals'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/blogs',
      name: 'AllArticals',
      component: AllArticals
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
