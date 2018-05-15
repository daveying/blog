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
      <v-container fluid mx-0>
        <v-layout>
          <v-flex xs12 md10 lg8 offset-md1 offset-lg2>
            <router-view></router-view>
          </v-flex>
        </v-layout>
        <v-btn
          color="primary"
          dark
          fixed
          bottom
          right
          fab
          v-show="floatBtn"
          @click="onFloatBtnClicked()"
        >
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
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
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      floatBtn: true
    }
  },
  methods: {
    onClicked () {

    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'home', title: '首页', link: '/' },
        { icon: 'library_books', title: '所有文章', link: '/blogs' },
        { icon: 'widgets', title: '其他应用', link: '/apps' },
        { icon: 'account_circle', title: '关于', link: '/about' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'home', title: '首页', link: '/' },
          { icon: 'library_books', title: '所有文章', link: '/blogs' },
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
