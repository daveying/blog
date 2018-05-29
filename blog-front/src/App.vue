<template>
  <v-app>
    <v-navigation-drawer
      v-model="sideNav"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          @click="onClicked()"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
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
      <v-container fluid mx-0 px-0>
        <v-layout>
          <v-flex xs12 md10 lg8 offset-md1 offset-lg2>
            <router-view></router-view>
          </v-flex>
        </v-layout>
        <!-- <v-btn
          color="primary"
          dark
          fixed
          bottom
          right
          fab
          v-show="goTopBtn"
          @click="ongoTopBtnClicked()"
        >
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn> -->
      </v-container>
      <v-container fluid class="ml-0">
        <v-layout>
          <v-flex xs12 class="grey lighten-5 text-xs-center">
            <!-- <v-divider></v-divider> -->
            <br>
            &copy; 2018 — <strong>Xingpeng (David) Da</strong>
          </v-flex>
        </v-layout>
      </v-container>
      <v-speed-dial
        absolute
        fixed
        v-model="fab"
        bottom
        left
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
          <v-icon>add</v-icon>
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
        >
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="red"
        >
          <v-icon>delete</v-icon>
        </v-btn>
      </v-speed-dial>
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
      tabs: null,
      transition: 'slide-y-reverse-transition'
    }
  },
  created () {
    let oldCb = window.onscroll
    window.onscroll = function () {
      if (oldCb) {
        oldCb()
      }
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        this.$store.dispatch('setGoTopBtnShow', true)
      } else {
        this.$store.dispatch('setGoTopBtnShow', false)
      }
    }.bind(this)
  },
  methods: {
    onClicked () {},
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
    activeFab () {
      switch (this.tabs) {
        case 'one': return { 'class': 'purple', icon: 'account_circle' }
        case 'two': return { 'class': 'red', icon: 'edit' }
        case 'three': return { 'class': 'green', icon: 'keyboard_arrow_up' }
        default: return {}
      }
    },
    goTopBtn () {
      return this.$store.getters.goTopBtnShow
    },
    menuItems () {
      let menuItems = [
        { icon: 'home', title: '首页', link: '/' },
        { icon: 'library_books', title: '所有文章', link: '/blogs/YWxs' },
        { icon: 'widgets', title: '其他应用', link: '/apps' },
        { icon: 'account_circle', title: '关于', link: '/about' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'home', title: '首页', link: '/' },
          { icon: 'library_books', title: '所有文章', link: '/blogs/YWxs' },
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
