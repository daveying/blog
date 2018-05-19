// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueDisqus from 'vue-disqus'
import App from './App'
import router from './router'
import { store } from './store'
import '../node_modules/material-design-icons-iconfont/dist/material-design-icons.css'
import '../node_modules/@mdi/font/css/materialdesignicons.min.css'
import 'vuetify/dist/vuetify.min.css'
import SocialNetworkList from '@/components/SocialNetworkList.vue'
import Markdown from '@/components/Markdown.vue'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueDisqus)

Vue.component('social-network-list', SocialNetworkList)
Vue.component('markdown', Markdown)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  created () {
    this.$store.dispatch('loadBlogs')
  }
})
