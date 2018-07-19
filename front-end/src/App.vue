<template>
  <v-app light>
    <v-navigation-drawer
      v-model="sideNav"
      fixed
      app
      style="z-index:101;"
    >
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          @click="void 0"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app style="z-index:100;">
      <v-toolbar-items>
        <v-layout justify-space-around align-center>
          <v-avatar @click="sideNav = !sideNav" style="cursor: pointer" color="blue" size="35">
            <img src="/static/photo.jpg" alt="logo">
          </v-avatar>
        </v-layout>
      </v-toolbar-items>
      <v-toolbar-title style="cursor: pointer" @click="sideNav = !sideNav">
          Xingpeng
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container :fill-height="fullWidth" fluid mx-0 px-0>
        <v-layout v-if="!fullWidth">
          <v-flex xs12 md10 lg8 offset-md1 offset-lg2>
            <router-view></router-view>
          </v-flex>
        </v-layout>
        <v-layout v-if="fullWidth">
          <v-flex xs12>
            <router-view></router-view>
          </v-flex>
        </v-layout>
        <v-speed-dial
          fixed
          v-model="fab"
          bottom
          right
          :direction="'top'"
          :open-on-hover="false"
          :transition="transition"
        >
          <v-btn
            slot="activator"
            v-model="fab"
            color="blue darken-2"
            dark
            fab
          >
            <v-icon>menu</v-icon>
            <v-icon>close</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            small
            color="green"
            @click="ongoTopBtnClicked()"
          >
            <v-icon>keyboard_arrow_up</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            small
            color="indigo"
            to="/"
          >
            <v-icon>home</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            small
            color="red"
            to="/blogs/all"
          >
            <v-icon>library_books</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-container>
      <v-container v-if="!fullWidth" fluid class="ml-0">
        <v-layout>
          <v-flex xs12 class="grey lighten-5 text-xs-center">
            <!-- <v-divider></v-divider> -->
            <br>
            &copy; 2018 — <strong>Xingpeng (David) Da</strong>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      direction: 'top',
      fab: false,
      fling: false,
      transition: 'slide-y-reverse-transition'
    }
  },
  created () {
    function isMobileDevice () {
      return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1)
    }
    this.$store.dispatch('setMobile', isMobileDevice())
  },
  methods: {
    ongoTopBtnClicked () {
      let itvId = setInterval(moveTop, 5)
      function moveTop () {
        let top = document.documentElement.scrollTop || document.body.scrollTop
        top -= 20
        if (top < 0) {
          top = 0
          clearInterval(itvId)
        }
        document.documentElement.scrollTop = top
        document.body.scrollTop = top
      }
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'home', title: '首页', link: '/' },
        { icon: 'library_books', title: '所有文章', link: '/blogs/all' },
        { icon: 'widgets', title: '其他应用', link: '/apps' },
        { icon: 'account_circle', title: '关于', link: '/about' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'home', title: '首页', link: '/' },
          { icon: 'library_books', title: '所有文章', link: '/blogs/all' },
          { icon: 'widgets', title: '其他应用', link: '/apps' },
          { icon: 'account_circle', title: '关于', link: '/about' },
          { icon: 'create', title: '写博客', link: '/create' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return true
      // return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    fullWidth () {
      return this.$store.getters.fullWidth === true
    }
  },
  name: 'App'
}
</script>

<style>
:target:before {
  display: block;
  content: " ";
  margin-top: -75px;
  height: 75px;
  visibility: hidden;
}
</style>
