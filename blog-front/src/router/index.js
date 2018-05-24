import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AllArticals from '@/components/AllArticals'
import About from '@/components/About'
import Artical from '@/components/Artical'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/blog/:id',
      props: true,
      name: 'Artical',
      component: Artical
    },
    {
      path: '/blogs/:tag',
      props: true,
      name: 'AllArticals',
      component: AllArticals
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ],
  mode: 'history'
})
